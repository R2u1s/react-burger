import React from 'react';
import styles from './Feed.module.css';
import { serverAnswer } from '../../utils/data';
import FeedOrder from './FeedOrder';

function FeedLenta() {

  return (
    <>
      <section className={styles['feed__lenta']}>
        <h1 className={`mb-5 text text_type_main-large`}>Лента заказов</h1>
        <ul className={styles['feed__orders-list']} >
          {serverAnswer.orders.map(function (item) {
            return <FeedOrder order={item} key={item._id} />
          })}
        </ul>
      </section>
    </>
  );
}

export default FeedLenta;