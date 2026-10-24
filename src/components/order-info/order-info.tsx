import { OrderInfoUI, Preloader } from '@ui';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getOrderByNumberApi } from '@utils/burger-api';
import type { TIngredient, TOrder } from '@utils-types';

export const OrderInfo = (): React.JSX.Element | null => {
  const { number } = useParams<{ number: string }>();
  const num = Number(number);

  const fromFeed = useSelector((s) =>
    s.feed.orders.find((o) => o.number === num)
  );
  const fromOrders = useSelector((s) =>
    s.orders.orders.find((o) => o.number === num)
  );
  const cached = fromFeed ?? fromOrders;

  const ingredientsMap = useSelector((s) => s.ingredients.ingredients);

  const [order, setOrder] = useState<TOrder | null>(cached ?? null);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (cached) {
      setOrder(cached);
      return;
    }
    let cancelled = false;
    setLoading(true);
    getOrderByNumberApi(num)
      .then((res) => {
        if (!cancelled) setOrder(res.orders[0]);
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

  return <OrderInfoUI orderInfo={orderInfo} />;
};
