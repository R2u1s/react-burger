import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderDetails.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUserRequest, refreshToken } from '../../services/actions/auth';
import { Navigate } from 'react-router-dom';
import { clearIngredientsList, postOrder } from '../../services/actions/burger';
import { PATH_LOGIN } from '../App/App';

function OrderDetails({ orderRequest, setOrderRequest }) {
  const dispatch = useDispatch();

  const getData = (store) => ({
    orderDetails: store.burger.orderDetails,
    selectedIngredients: store.burger.selectedIngredients,
    postOrderRequest: store.burger.postOrderRequest,
    postOrderFailed: store.burger.postOrderFailed
  })

  const getUser = (store) => ({
    user: store.auth
  });
  const { user } = useSelector(getUser);

  const { orderDetails, selectedIngredients, postOrderRequest, postOrderFailed } = useSelector(getData);

  function collectId() {
    let arrayOfId = [];
    arrayOfId.push(selectedIngredients.bun._id);
    arrayOfId.push(selectedIngredients.bun._id);
    selectedIngredients.otherIngredients.forEach(item => arrayOfId.push(item._id));
    return arrayOfId;
  }

  React.useEffect(
    () => {
      if (orderRequest && user.accessToken && selectedIngredients.otherIngredients.length > 0) {
        dispatch(postOrder(collectId(), user.accessToken));
        dispatch(clearIngredientsList());
      } else {
        if (orderRequest) {
          if (user.accessToken) {
            dispatch(getUserRequest(user.accessToken));
          } else {
            dispatch(refreshToken());
          }
        }
      }
    },
    [dispatch, user.accessToken, orderRequest]
  );

  const content = React.useMemo(
    () => {
      if (orderRequest) {
        return (user.authRequest || !user.accessToken) ?
          <p style={{ textAlign: 'center' }}>Аутентификация...</p>
          : (
            user.accessToken ?
              (
                <div className={`${styles['order-details']} pt-20 pb-15`}>
                  {postOrderRequest ? <p style={{ textAlign: 'center' }}>Отправка заказа...</p> :
                    <p className={`${styles['order-details__id']} text text_type_digits-large`}>{orderDetails.id}</p>}
                  <p className={`${styles['order-details__id-text']} text text_type_main-medium`}>идентификатор заказа</p>
                  <div className={styles['order-details__icon']}>
                  </div>
                  <p className={`${styles['order-details__status']} text text_type_main-small`}>
                    {orderDetails.status}
                  </p>
                  <p className={`${styles['order-details__todo-text']} text text_type_main-small text_color_inactive`}>{orderDetails.todo}</p>
                </div>
              )
              : <Navigate to={PATH_LOGIN} replace />
          )
}
    },
[user.authRequest, postOrderRequest, user.accessToken, orderRequest]
  );

return (
  <>
    {content}
  </>
);
}

OrderDetails.propTypes = {
  orderRequest: PropTypes.bool
};

export default OrderDetails;

