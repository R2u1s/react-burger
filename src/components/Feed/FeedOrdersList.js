import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feed.module.css';
import FeedOrder from './FeedOrder';

function FeedOrdersList({ status,navigatePath,orders }) {

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