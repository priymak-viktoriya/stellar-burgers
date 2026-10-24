import React, { useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders, getProfileOrdersSelector } from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();

  // 1. Берем реальный список заказов из нашего нового Redux-слайса
  const orders = useSelector(getProfileOrdersSelector);
  const isLoading = useSelector((state) => state.orders.isLoading);

  // 2. Запрашиваем историю заказов с сервера при открытии страницы
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  // Пока данные загружаются — показываем красивый прелоадер
  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
