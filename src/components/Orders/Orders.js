import React from 'react';
import styles from './Orders.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { PROFILE } from '../AppHeader/AppHeader';
import { logout } from '../../services/actions/auth';
import { useNavigate } from 'react-router-dom';

function Orders() {

  return (
    <section className={`${styles['orders']}`}>

    </section>
  );
}

export default Orders;