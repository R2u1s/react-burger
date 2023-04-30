import React from 'react';
import PropTypes from 'prop-types'
import styles from './OrderDetails.module.css';
import { useSelector } from 'react-redux';

function OrderDetails(){

  const { orderDetails } = useSelector(store => ({
    orderDetails: store.burger.orderDetails
  }));

  return (
    <div className={`${styles['order-details']} pt-20 pb-15`}>
      <p className={`${styles['order-details__id']} text text_type_digits-large`}>{orderDetails.id}</p>
      <p className={`${styles['order-details__id-text']} text text_type_main-medium`}>идентификатор заказа</p>
      <div className={styles['order-details__icon']}>
      </div>
      <p className={`${styles['order-details__status']} text text_type_main-small`}>{orderDetails.status}</p>
      <p className={`${styles['order-details__todo-text']} text text_type_main-small text_color_inactive`}>{orderDetails.todo}</p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderDetails: (PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    todo: PropTypes.string
  }))
}; 

export default OrderDetails;