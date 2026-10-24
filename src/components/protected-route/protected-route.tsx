import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth = false, children }: TProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();

  // Получаем актуальный статус проверки и данные пользователя из Redux
  const { user, isAuthChecked } = useSelector((state) => state.user);

  // 1. Пока идет проверка токенов — крутим прелоадер
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // 2. Если страница для гостей (логин), а пользователь уже залогинен — уводим его обратно
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  // 3. Если страница приватная, а пользователя нет — отправляем на /login
  if (!onlyUnAuth && !user) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  // 4. Всё хорошо — рендерим дочерний UI
  return children;
};
