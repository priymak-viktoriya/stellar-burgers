import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrdersFeed } from '../../services/slices/feedSlice';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders);
  const isLoading = useSelector((state) => state.feed.isLoading);

  useEffect(() => {
    void dispatch(fetchOrdersFeed());
    const interval = setInterval(() => {
      void dispatch(fetchOrdersFeed());
    }, 15000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    void dispatch(fetchOrdersFeed());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};