import React from 'react';
import styles from './Orders.module.css';
import FeedOrdersList from '../Feed/FeedOrdersList';
import { PATH_PROFILE_ORDERS } from '../App/App';

function Orders() {

  return (
    <section className={`${styles['orders']}`}>
      <FeedOrdersList status={true} navigatePath={PATH_PROFILE_ORDERS} />
    </section>
  );
}

export default Orders;