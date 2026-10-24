import styles from './feed-info.module.css';

export type FeedInfoUIProps = {
  readyOrders: number[];
  pendingOrders: number[];
  total: number;
  totalToday: number;
};

export const FeedInfoUI = ({
  readyOrders,
  pendingOrders,
  total,
  totalToday,
}: FeedInfoUIProps): React.JSX.Element => {
  return (
    <section className={styles.content}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={styles.list}>
            {readyOrders.map((num) => (
              <li key={num} className={`text text_type_digits-default mb-2 ${styles.list_item}`}>
                {num}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={styles.list}>
            {pendingOrders.map((num) => (
              <li key={num} className={`text text_type_digits-default mb-2 ${styles.list_item}`}>
                {num}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.column}>
        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
        <p className={`text text_type_digits-large ${styles.title}`}>{total}</p>
      </div>
      <div className={styles.column}>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.title}`}>{totalToday}</p>
      </div>
    </section>
  );
};