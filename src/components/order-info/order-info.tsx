import { OrderInfoUI, Preloader } from '@ui';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getOrderByNumberApi } from '@utils/burger-api';
import type { TIngredient, TOrder } from '@utils-types';
import styles from './order-info.module.css';

export const OrderInfo = (): React.JSX.Element | null => {
  const { number } = useParams<{ number: string }>();
  const num = Number(number);
  
  const location = useLocation();
  const isModal = location.state?.background;

  const fromFeed = useSelector((s) => s.feed.orders.find((o) => o.number === num));
  const fromOrders = useSelector((s) => s.orders.orders.find((o) => o.number === num));
  const cached = fromFeed ?? fromOrders;

  const ingredientsMap = useSelector((s) => s.ingredients.ingredients);

  const [order, setOrder] = useState<TOrder | null>(cached ?? null);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (cached) {
      setOrder(cached);
      setLoading(false);
      return;
    }
    
    let cancelled = false;
    setLoading(true);
    
    getOrderByNumberApi(num)
      .then((res) => {
        if (!cancelled) {
          // Безопасно достаем заказ из ответа
          setOrder(res?.orders?.[0] || null);
        }
      })
      .catch(() => {
        // Если произошла ошибка, просто идем дальше
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
      
    return () => {
      cancelled = true;
    };
  }, [num, cached]);

  const orderInfo = useMemo(() => {
    if (!order) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc, id) => {
        const ingredient = ingredientsMap.find((i) => i._id === id);
        if (!ingredient) return acc;
        if (acc[id]) acc[id].count += 1;
        else acc[id] = { ...ingredient, count: 1 };
        return acc;
      },
      {} as Record<string, TIngredient & { count: number }>
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, i) => sum + i.price * i.count,
      0
    );

    const date = new Date(order.createdAt);

    return { ...order, ingredientsInfo, total, date };
  }, [order, ingredientsMap]);

  if (loading) return <Preloader />;
  if (!orderInfo) return null;

  return isModal ? (
    <OrderInfoUI orderInfo={orderInfo} />
  ) : (
    <div className={styles.pageWrapper}>
      <OrderInfoUI orderInfo={orderInfo} />
    </div>
  );
};