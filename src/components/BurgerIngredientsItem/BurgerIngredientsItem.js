import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientObjectType } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { writeIngredientPreview } from '../../services/actions/burger';
import { addIngredient } from '../../services/actions/burger';

const BurgerIngredientsItem = (props) => {
  const dispatch = useDispatch();

  const { selectedIngredients } = useSelector(store => ({
    selectedIngredients: store.burger.selectedIngredients
  }));
 
  const qty = selectedIngredients.otherIngredientsQty[props.item._id];
  return (
      <li className={styles['burger-ingredients__item']} name='ingredient' id={props.item._id} onClick={() => {
        props.openModal();
        dispatch(writeIngredientPreview(props.item));
/*         dispatch(addIngredient(props.item)); */
      }}>
        <img src={props.item.image}></img>
        <div className={styles['burger-ingredients__price']}>
          <p className="text text_type_digits-default">{props.item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.item.name}</p>
        {qty > 0 ? <Counter count={qty} size="default" extraClass="m-1" /> : <></>}
      </li>
  );
}

BurgerIngredientsItem.propTypes = {
  item: (PropTypes.shape(ingredientObjectType)),
  openModal: PropTypes.func
}; 

export default BurgerIngredientsItem;