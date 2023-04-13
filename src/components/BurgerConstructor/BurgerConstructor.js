import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import ConstructorElementsList from '../ConstructorElementsList/ConstructorElementsList'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { DataContext } from '../../services/dataContext';
import { PriceContext } from '../../services/priceContext';

function BurgerConstructor(){

  const [ totalPrice, setTotalPrice ] = React.useState(null);
  const [ modalActive, setModalActive ] = React.useState(false);
  const { burger } = React.useContext(DataContext);

  React.useEffect(
    () => {
      let total = 0;
      burger.ingredients.map(item => (total += item.price));
      setTotalPrice(total);
    },
    [burger, setTotalPrice]
  );

  return (
    <PriceContext.Provider value={{totalPrice, setTotalPrice}}>
    <section className={`${styles['burger-constructor']} pt-15`}>
      <ConstructorElementsList className={'mb-10'}/>
      <div className={`${styles['burger-constructor__overall-flex']}`}>
        <div className={`${styles['burger-constructor__price']}`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
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
    </PriceContext.Provider>
  );
}

export default BurgerConstructor;