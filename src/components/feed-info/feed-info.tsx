import { FeedInfoUI } from '@ui';
import { useSelector } from '../../services/store';

export const FeedInfo = (): React.JSX.Element => {
  const { orders, total, totalToday } = useSelector((state) => state.feed);

  const readyOrders = orders
    .filter((o) => o.status === 'done')
    .map((o) => o.number)
    .slice(0, 10);
    
  const pendingOrders = orders
    .filter((o) => o.status === 'pending')
    .map((o) => o.number)
    .slice(0, 10);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      total={total}
      totalToday={totalToday}
    />
  );
};