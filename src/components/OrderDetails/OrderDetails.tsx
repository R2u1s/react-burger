import React from 'react';
import styles from './OrderDetails.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { getUserRequest, refreshToken } from '../../services/actions/auth';
import { Navigate } from 'react-router-dom';
import { postOrder } from '../../services/actions/burger';
import { PATH_LOGIN } from '../App/App';
import { statusRus } from '../../utils/data';
import { TIngredient } from '../../types/types';

const OrderDetails: React.FC<{ orderRequest:boolean }> = ({ orderRequest }) => {

  const dispatch = useDispatch();

  const { user } = useSelector((store) => ({
    user: store.auth
  }));

  const { orderDetails, selectedIngredients, postOrderRequest } = useSelector((store) => ({
    orderDetails: store.burger.orderDetails,
    selectedIngredients: store.burger.selectedIngredients,
    postOrderRequest: store.burger.postOrderRequest,
    postOrderFailed: store.burger.postOrderFailed
  }));

  function collectId():Array<string> {
    let arrayOfId = [];
    arrayOfId.push(selectedIngredients.bun._id);
    arrayOfId.push(selectedIngredients.bun._id);
    selectedIngredients.otherIngredients.forEach((item:TIngredient) => arrayOfId.push(item._id));
    return arrayOfId;
  }

  React.useEffect(
    () => {
      if (orderRequest) {
        if (user.accessToken) {
          dispatch(getUserRequest(user.accessToken));
        } else {
          dispatch(refreshToken());
        }
      }
      if (orderRequest && user.accessToken && selectedIngredients.otherIngredients.length > 0) {
        dispatch(postOrder(collectId(), user.accessToken));
      }
    },
    [dispatch, user.accessToken, orderRequest]
  );

  const content = React.useMemo(
    () => {
      if (orderRequest) {
        return (user.authRequest || (!user.name && !user.authFailed)) ?
          <p style={{ textAlign: 'center' }}>Аутентификация...</p>
          : (
            user.accessToken ?
              (
                <div className={`${styles['order-details']} pt-20 pb-15`}>
                  {!postOrderRequest && <>
                    <p className={`${styles['order-details__id']} text text_type_digits-large`}>{orderDetails.id}</p>
                    <p className={`${styles['order-details__id-text']} text text_type_main-medium`}>идентификатор заказа</p>
                    <div className={styles['order-details__icon']}>
                    </div>
                  </>
                  }
                  <p className={`${styles['order-details__status']} text text_type_main-small`}>
                    {statusRus(orderDetails.status)}
                  </p>
                  <p className={`${styles['order-details__todo-text']} text text_type_main-small text_color_inactive`}>{orderDetails.todo}</p>
                </div>
              )
              : <Navigate to={PATH_LOGIN} replace />
          )
      }
    },
    [user.authRequest, postOrderRequest, user.accessToken, orderRequest, orderDetails]
  );

  return (
    <>
      {content}
    </>
  );
}

export default OrderDetails;

