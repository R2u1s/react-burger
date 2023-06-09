import React from 'react';
import styles from './Feed.module.css';
import FeedOrdersList from './FeedOrdersList';

function FeedLenta() {

  return (
    <>
      <section className={styles['feed__lenta']}>
        <h1 className={`mb-5 text text_type_main-large`}>Лента заказов</h1>
        <FeedOrdersList status={false} />
      </section>
    </>
  );
}

export default FeedLenta;