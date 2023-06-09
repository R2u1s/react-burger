import React from 'react';
import styles from './Feed.module.css';
import { serverAnswer } from '../../utils/data';

function FeedInfo() {

  return (
    <>
      <section className={`${styles['feed__info']} pt-15`}>
        <div className={styles['feed__info-status']}>
          <div className={styles['feed__info-column']}>
            <p className={`${styles['feed__info-status-title']} text text_type_main-medium mb-6`}>
              Готовы:
            </p>
            <ul className={styles['feed__info-status-list']}>
              {serverAnswer.orders.map(function (item) {
                return item.status === "done" && <li key={Math.random()} className={`text text_type_digits-default text_color_success`}>
                  {item._id}
                </li>
              })}
            </ul>
          </div>
          <div className={styles['feed__info-column']}>
            <p className={`${styles['feed__info-status-title']} text text_type_main-medium mb-6`}>
              В работе:
            </p>
            <ul className={styles['feed__info-status-list']}>
              {serverAnswer.orders.map(function (item) {
                return item.status !== "done" && <li key={Math.random()} className={`text text_type_digits-default`}>
                {item._id}
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
            {serverAnswer.total}
          </p>
        </div>
        <div className={styles['feed__info-column']}>
          <p className={`feed__info-status-title text text_type_main-medium`}>
            Выполнено за сегодня:
          </p>
          <p className={`${styles['feed__info-digits-shadow']} text text_type_digits-large`}>
            {serverAnswer.totalToday}
          </p>
        </div>
      </section>
    </>
  );
}

export default FeedInfo;