import React from 'react';
import styles from './Feed.module.css';
import FeedOrdersList from './FeedOrdersList';
import { PATH_FEED } from '../App/App';

function FeedLenta() {

  return (
    <>
      <section className={styles['feed__lenta']}>
        <h1 className={`mb-5 text text_type_main-large`}>Лента заказов</h1>
        <FeedOrdersList status={false} navigatePath={PATH_FEED} />
      </section>
    </>
  );
}

export default FeedLenta;