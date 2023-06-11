import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feed.module.css';
import { serverAnswer } from '../../utils/data';
import FeedOrder from './FeedOrder';
import { PATH_FEED } from '../App/App';
import { useNavigate } from 'react-router-dom';

function FeedOrdersList({ status,navigatePath }) {

  return (
    <ul className={styles['feed__orders-list']} >
      {serverAnswer.orders.map(function (item) {
        return <FeedOrder status={status} order={item} navigatePath={navigatePath} key={item._id} />
      })}
    </ul>
  );
}

FeedOrdersList.propTypes = {
  status: (PropTypes.bool),
};

export default FeedOrdersList;