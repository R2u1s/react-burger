import React from 'react';
import styles from './Orders.module.css';
import FeedOrdersList from '../Feed/FeedOrdersList';

function Orders() {

  return (
    <section className={`${styles['orders']}`}>
      <FeedOrdersList status={true} />
    </section>
  );
}

export default Orders;