import { OrdersListUI } from '@ui';
import type { TOrder } from '@utils-types';

export type OrdersListProps = {
  orders: TOrder[];
};

export const OrdersList = ({ orders }: OrdersListProps): React.JSX.Element => {
  return <OrdersListUI orders={orders} />;
};