import React from 'react';
import ReactDOM from 'react-dom';
import styles from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const BurgerIngredientsItem = (props) => {
  const [modalActive, setModalActive] = React.useState(false);
  return (
    <>
      <li className={styles['burger-ingredients__item']} onClick={()=>{setModalActive(true)}}>
        <img src={props.item.image}></img>
        <div className={styles['burger-ingredients__price']}>
          <p className="text text_type_digits-default">{props.item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.item.name}</p>
        <Counter count={1} size="default" extraClass="m-1" />
      </li>
      <Modal active={modalActive} setActive={setModalActive}>
        <IngredientDetails ingredientDetails={{
          image: props.item.image,
          name: props.item.name,
          calories: props.item.calories,
          proteins: props.item.proteins,
          fat: props.item.fat,
          carbohydrates: props.item.carbohydrates
        }} />
      </Modal>
    </>
  );
}

export default BurgerIngredientsItem;