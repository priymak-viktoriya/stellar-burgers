import { OrderCard } from '@components';
import styles from './orders-list.module.css';
import type { TOrder } from '@utils-types';

export type OrdersListUIProps = {
  orders: TOrder[];
};

export const OrdersListUI = ({ orders }: OrdersListUIProps): React.JSX.Element => (
  <ul className={styles.content}>
    {orders.map((order) => (
      <OrderCard key={order._id} order={order} />
    ))}
  </ul>
);