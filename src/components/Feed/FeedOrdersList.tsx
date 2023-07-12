import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feed.module.css';
import FeedOrder from './FeedOrder';
import { TOrder } from '../../types/types';

const FeedOrdersList: React.FC<{ 
  status:boolean;
  navigatePath: string
  orders: {
    orders: Array<TOrder>,
    total: number,
    totalToday: number
  };
 }> = ({ status,navigatePath,orders }) => {

  return (
    <ul className={styles['feed__orders-list']} >
      {orders.orders.map(function (item:TOrder) {
        return <FeedOrder status={status} order={item} navigatePath={navigatePath} key={item._id} />
      })}
    </ul>
  );
}

export default FeedOrdersList;