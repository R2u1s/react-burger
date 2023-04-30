import React from 'react';
import styles from './ConstructorElementsList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/actions/burger';

const ConstructorElementsList = () => {

  const dispatch = useDispatch();

  //информация об ингредиентах (сейчас все ингредиенты подтянутые API образуют заказ)
  const { orderDetails } = useSelector(store => ({
    orderDetails: store.burger.orderDetails,
  }));

  //отрисовка булки снизу сверху одной константой
  const bun = (name, priceBun, imageBun, topOrBottom) => {
    let pos = '';
    topOrBottom === 'top' ? pos = 'верх' : pos = 'низ';
    return (
      <ConstructorElement
        type={topOrBottom}
        isLocked='true'
        text={`${name} (${pos})`}
        price={priceBun}
        thumbnail={imageBun}
      />
    )
  }

  return (
    <ul className={`${styles['constructor-elements-list__list']}`}>
      {<li className={`${styles['constructor-elements-list__item']} pl-4`} key={bun._id} id={bun._id} >
        {bun(orderDetails.ingredients.bun.name, orderDetails.ingredients.bun.price, orderDetails.ingredients.bun.image, 'top')}
      </li>}

      {(orderDetails.ingredients.otherIngredients.length > 0) ? 
      <ul className={styles['constructor-elements-list__list-ingredients']}>
        {orderDetails.ingredients.otherIngredients
          .map(function (item) {
            return (
              <li className={styles['constructor-elements-list__item']} key={Math.random()} id={item._id}>
                <DragIcon />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={()=>{dispatch(removeIngredient(item))}}
                />
              </li>
            )
          })}
      </ul>
      : <p className="text text_type_main-default" style={{textAlign: "center"}}>Нет добавленных ингредиентов</p>
      }

      {<li className={`${styles['constructor-elements-list__item']} pl-4`} key={bun._id} id={bun._id}>
        {bun(orderDetails.ingredients.bun.name, orderDetails.ingredients.bun.price, orderDetails.ingredients.bun.image, 'bottom')}
      </li>}
    </ul>
  )
}

export default ConstructorElementsList;