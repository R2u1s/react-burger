import React from 'react';
import styles from './Feed.module.css';
import { useSelector } from 'react-redux';
import { TOrder } from '../../types/types';

const FeedInfo: React.FC = () => {

  const getWs = (store) => ({
    wsConnected: store.wsOrders.wsConnected,
    orders:store.wsOrders.orders
  })
  const {orders} = useSelector(getWs);

  return (
    <>
      <section className={`${styles['feed__info']} pt-15`}>
        <div className={styles['feed__info-status']}>
          <div className={styles['feed__info-column']}>
            <p className={`${styles['feed__info-status-title']} text text_type_main-medium mb-6`}>
              Готовы:
            </p>
            <ul className={styles['feed__info-status-list']}>
              {orders.orders.map(function (item:TOrder) {
                return item.status === "done" && <li key={Math.random()} className={`text text_type_digits-default text_color_success`}>
                  {item.number}
                </li>
              })}
            </ul>
          </div>
          <div className={styles['feed__info-column']}>
            <p className={`${styles['feed__info-status-title']} text text_type_main-medium mb-6`}>
              В работе:
            </p>
            <ul className={styles['feed__info-status-list']}>
              {orders.orders.map(function (item:TOrder) {
                return item.status !== "done" && <li key={Math.random()} className={`text text_type_digits-default`}>
                {item.number}
              </li>
              })}
            </ul>
          </div>
        </div>
        <div className={styles['feed__info-column']}>
          <p className={`feed__info-status-title text text_type_main-medium`}>
            Выполнено за всё время:
          </p>
          <p className={`${styles['feed__info-digits-shadow']} text text_type_digits-large`}>
            {orders.total}
          </p>
        </div>
        <div className={styles['feed__info-column']}>
          <p className={`feed__info-status-title text text_type_main-medium`}>
            Выполнено за сегодня:
          </p>
          <p className={`${styles['feed__info-digits-shadow']} text text_type_digits-large`}>
            {orders.totalToday}
          </p>
        </div>
      </section>
    </>
  );
}

export default FeedInfo;