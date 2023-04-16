import React from 'react';
import styles from './BurgerConstructor.module.css';
import ConstructorElementsList from '../ConstructorElementsList/ConstructorElementsList'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { DataContext } from '../../services/dataContext';
import request from '../../utils/utils';

const API_POST = `https://norma.nomoreparties.space/api/orders`;

function BurgerConstructor(){

  //информация об ингредиентах (сейчас все ингредиенты подтянутые API образуют заказ)
  
  const { orderInfo } = React.useContext(DataContext); 

  const [ modalActive, setModalActive ] = React.useState(false);

  const [ orderSubmit, setOrderSubmit ] = React.useState({
    id: "---",
    status: "Ожидаем подтверждение заказа",
    todo: 'Дождитесь готовности на орбитальной станции'
  });

  function collectId() {
    let arrayOfId = [];
    arrayOfId.push(orderInfo.ingredients.bun._id);
    arrayOfId.push(orderInfo.ingredients.bun._id);
    orderInfo.ingredients.otherIngredients.forEach(item => arrayOfId.push(item._id));
    return arrayOfId;
  }

  async function submitHandler(){
    setModalActive(true);
    let orderStatus = 'Заказ отправляется';

    return await request(API_POST, {
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
      setOrderSubmit({
        id: res.order.number.toString(),
        status: orderStatus,
        todo: 'Дождитесь готовности на орбитальной станции'
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <section className={`${styles['burger-constructor']} pt-15`}>
      <ConstructorElementsList className={'mb-10'}/>
      <div className={`${styles['burger-constructor__overall-flex']}`}>
        <div className={`${styles['burger-constructor__price']}`}>
          <p className="text text_type_digits-medium">{orderInfo.totalPrice}</p>
          <div className={`${styles['burger-constructor__currency-icon']}`}> 
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={submitHandler}>Оформить заказ</Button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <OrderDetails orderDetails={orderSubmit} />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;