import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feed.module.css';
import { serverAnswer } from '../../utils/data';
import FeedOrder from './FeedOrder';
import { useSelector } from 'react-redux';

function FeedOrdersList({ status,navigatePath }) {

  const getWs = (store) => ({
    orders: store.wsOrders.orders
  })
  const {orders} = useSelector(getWs);

  return (
    <ul className={styles['feed__orders-list']} >
      {orders.orders.map(function (item) {
        return <FeedOrder status={status} order={item} navigatePath={navigatePath} key={item._id} />
      })}
    </ul>
  );
}

FeedOrdersList.propTypes = {
  status: (PropTypes.bool),
};

export default FeedOrdersList;