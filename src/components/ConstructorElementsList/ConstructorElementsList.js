import React from 'react';
import styles from './ConstructorElementsList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const ConstructorElementsList = () => {

  //информация об ингредиентах (сейчас все ингредиенты подтянутые API образуют заказ)
  const { orderInfo, ingredientsRequest } = useSelector(store => ({
    orderInfo: store.burger.orderInfo,
    ingredientsRequest: store.burger.ingredientsRequest
  }));

  // функция удаления ингредиента из списка в заказе (её пробрасываем в компонент отрисовывающий ингредиенты)
  /*   function deleteIngredient(item) {
      orderDispatcher({type: "remove", currentIngredient: item});
    } */

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
        {bun(orderInfo.ingredients.bun.name, orderInfo.ingredients.bun.price, orderInfo.ingredients.bun.image, 'top')}
      </li>}

      {(orderInfo.ingredients.otherIngredients.length > 0) ? 
      <ul className={styles['constructor-elements-list__list-ingredients']}>
        {orderInfo.ingredients.otherIngredients
          .map(function (item) {
            return (
              <li className={styles['constructor-elements-list__item']} key={item._id} id={item._id} onClick={(e) => {
                console.log(e.target);
              }}>
                <DragIcon />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            )
          })}
      </ul>
      : <p className="text text_type_main-default" style={{textAlign: "center"}}>Нет добавленных ингредиентов</p>
      }

      {<li className={`${styles['constructor-elements-list__item']} pl-4`} key={bun._id} id={bun._id}>
        {bun(orderInfo.ingredients.bun.name, orderInfo.ingredients.bun.price, orderInfo.ingredients.bun.image, 'bottom')}
      </li>}
    </ul>
  )
}

export default ConstructorElementsList;