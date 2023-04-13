import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import ConstructorElementsList from '../ConstructorElementsList/ConstructorElementsList'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { DataContext } from '../../services/dataContext';

function BurgerConstructor(){

  //информация об ингредиентах (сейчас все ингредиенты подтянутые API образуют заказ)
  const { burger } = React.useContext(DataContext); 
  
  // формируем список ингредиентов бургера: булка отдельно, соусы начинки отдельно. Его забрасываем в компонент отрисовки
  const [ orderList, setOrderList] = React.useState(
    {
      bun: burger.ingredients.find(function(item) {
          return item.type === 'bun'}),
      ingredients: burger.ingredients.filter(function(item) {
          return item.type !== 'bun'})
    }
  );
  
  // функция удаления ингредиента из списка в заказе (её пробрасываем в компонент отрисовывающий ингредиенты)
  function deleteIngredient(id) {
    setOrderList({ ...orderList, ingredients: orderList.ingredients.filter(item => item._id !== id)});
  }

  const [ totalPrice, setTotalPrice ] = React.useState(null);
  const [ modalActive, setModalActive ] = React.useState(false);
  
  //подсчет общей суммы заказа
  React.useEffect(
    () => {
      let total = 0;
      orderList.ingredients.map(item => (total += item.price));
      total = total + 2*orderList.bun.price;
      setTotalPrice(total);
    },
    [orderList, setTotalPrice]
  );

  return (
    <section className={`${styles['burger-constructor']} pt-15`}>
      <ConstructorElementsList orderList={orderList} deleteIngredient={deleteIngredient} className={'mb-10'}/>
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
  );
}

export default BurgerConstructor;