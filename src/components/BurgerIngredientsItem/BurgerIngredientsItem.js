import React from 'react';
import ReactDOM from 'react-dom';
import styles from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredientsItem = (props) => {
  return (
    <li className={styles['burger-ingredients__item']} key={props.item._id}>
      <img src={props.item.image}></img>
      <div className={styles['burger-ingredients__price']}>
        <p className="text text_type_digits-default">{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.item.name}</p>
      <Counter count={1} size="default" extraClass="m-1" />
    </li>
  );
}

export default BurgerIngredientsItem;