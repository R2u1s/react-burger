import React from 'react';
import styles from './BurgerConstructor.module.css';
import ConstructorElementsList from '../ConstructorElementsList/ConstructorElementsList'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { request } from '../../utils/utils';
import { useSelector,useDispatch } from 'react-redux';
import { setOrderDetails } from '../../services/actions/burger';
import { postOrder } from '../../services/actions/burger';

function BurgerConstructor() {

  const dispatch = useDispatch();

  const { orderDetails } = useSelector(store => ({
    orderDetails: store.burger.orderDetails,
  }));

  const { isModalOpen, openModal, closeModal } = useModal();

  function collectId() {
    let arrayOfId = [];
    arrayOfId.push(orderDetails.ingredients.bun._id);
    arrayOfId.push(orderDetails.ingredients.bun._id);
    orderDetails.ingredients.otherIngredients.forEach(item => arrayOfId.push(item._id));
    return arrayOfId;
  }

  const submitHandler = () => {
    openModal();
    dispatch(postOrder(collectId()));
/*     let orderStatus = 'Заказ отправляется';

    return await request("orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": collectId()
      })
    })
      .then(res => {
        res.success ? (orderStatus = "Ваш заказ начали готовить") : (orderStatus = "Заказ не отправлен");
        dispatch(setOrderDetails({
          id: res.order.number.toString(),
          status: orderStatus,
          todo: 'Дождитесь готовности на орбитальной станции'
        }))
      })
      .catch(error => {
        console.log(error);
      }); */
  }

  return (
    <section className={`${styles['burger-constructor']} pt-15`}>
      <ConstructorElementsList className={'mb-10'} />
      <div className={`${styles['burger-constructor__overall-flex']}`}>
        <div className={`${styles['burger-constructor__price']}`}>
          <p className="text text_type_digits-medium">{orderDetails.totalPrice}</p>
          <div className={`${styles['burger-constructor__currency-icon']}`}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={submitHandler}>Оформить заказ</Button>
      </div>
      <Modal active={isModalOpen} setActive={openModal} setClose={closeModal}>
        <OrderDetails />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;