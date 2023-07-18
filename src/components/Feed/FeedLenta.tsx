import React from 'react';
import styles from './Feed.module.css';
import FeedOrdersList from './FeedOrdersList';
import { PATH_FEED } from '../App/App';
import { useSelector } from '../../services/hooks';

const FeedLenta: React.FC = () => {

  const {wsConnectedAll,orders} = useSelector((store) => ({
    wsConnectedAll: store.wsOrders.wsConnectedAll,
    orders: store.wsOrders.orders
  }));

  return (
    <section className={styles['feed__lenta']}>
      <h1 className={`mb-5 text text_type_main-large`}>Лента заказов</h1>
      <FeedOrdersList status={false} navigatePath={PATH_FEED} orders={orders} />
    </section>
  );
}

export default FeedLenta;