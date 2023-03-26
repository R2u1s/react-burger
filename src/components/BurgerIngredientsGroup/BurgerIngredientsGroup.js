import React from 'react';
import ReactDOM from 'react-dom';
import styles from './BurgerIngredientsGroup.module.css';
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';

const BurgerIngredientsGroup = (props) => {
  return (
    <li>
      <p className="text text_type_main-medium">{props.ingredient.type}</p>
      <ul className={`${styles['burger-ingredients-group__group']} pl-4 pr-2 pt-6 pb-10`}>
        {props.ingredient.list.map(function (item) {
          return <BurgerIngredientsItem item={item} key={item._id} />
        })}
      </ul>
    </li>
  );
}

export default BurgerIngredientsGroup;