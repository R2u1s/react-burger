import React from 'react';
import styles from './Orders.module.css';
import FeedOrdersList from '../Feed/FeedOrdersList';
import { PATH_PROFILE_ORDERS } from '../App/App';
import { useSelector, useDispatch } from '../../services/hooks';
import { wsGetOrdersUser, WS_CONNECTION_START_USER, WS_CONNECTION_CLOSED_USER } from '../../services/actions/wsActions';

const Orders: React.FC = () => {

  const dispatch = useDispatch();

  const { wsConnectedUser,orders } = useSelector((store) => ({
    wsConnectedUser: store.wsOrders.wsConnectedUser,
    orders: store.wsOrders.userOrders,
  }));

  const ordersReversed = {
    ...orders,
    orders:[...orders.orders].reverse()
  }

  React.useEffect(
    () => {
        if (wsConnectedUser) {
          dispatch(wsGetOrdersUser);
        } else {
          dispatch({ type: WS_CONNECTION_START_USER });
        }

        return () => {
          dispatch({ type: WS_CONNECTION_CLOSED_USER });
        }
    },
    []
  );

  return (
    <section className={`${styles['orders']}`}>
      <FeedOrdersList status={true} navigatePath={PATH_PROFILE_ORDERS} orders={ordersReversed} />
    </section>
  );
}

export default Orders;