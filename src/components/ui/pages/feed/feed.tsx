import { FeedInfo, OrdersList } from '@components';
import styles from './feed.module.css';
import type { TOrder } from '@utils-types';

export type FeedUIProps = {
  orders: TOrder[];
  handleGetFeeds: () => void;
};

export const FeedUI = ({ orders, handleGetFeeds }: FeedUIProps): React.JSX.Element => (
  <main className={styles.containerMain}>
    <div className={styles.titleBox}>
      <h1 className="text text_type_main-large mt-10 mb-5 pl-5">Лента заказов</h1>
      <button
        className="text text_type_main-default ml-2 mb-4"
        onClick={handleGetFeeds}
      >
        Обновить
      </button>
    </div>
    <div className={styles.main}>
      <div className={styles.columnOrders}>
        <OrdersList orders={orders} />
      </div>
      <div className={styles.columnInfo}>
        <FeedInfo />
      </div>
    </div>
  </main>
);