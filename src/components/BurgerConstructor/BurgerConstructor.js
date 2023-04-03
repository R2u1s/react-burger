import React from 'react';
import ReactDOM from 'react-dom';
import styles from './BurgerConstructor.module.css';
import ConstructorElementsList from '../ConstructorElementsList/ConstructorElementsList'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'

function BurgerConstructor({data}){
  const [modalActive, setModalActive] = React.useState(false);
  return (
    <section className={`${styles['burger-constructor']} pt-15`}>
      <ConstructorElementsList ingredients={{list:data}} />
      <div className={`${styles['burger-constructor__overall-flex']}`}>
        <div className={`${styles['burger-constructor__price']}`}>
          <p className="text text_type_digits-medium">300</p>
          <div className={`${styles['burger-constructor__currency-icon']}`}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={()=>{setModalActive(true)}}>Оформить заказ</Button>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <OrderDetails orderDetails={{
          id: '034536',
          status: 'Ваш заказ начали готовить',
          todo: 'Дождитесь готовности на орбитальной станции'
        }
        } />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;