import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientObjectType } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { writeIngredientPreview } from '../../services/actions/burger';
import { useDrag } from 'react-dnd';

const BurgerIngredientsItem = ({ item, openModal }) => {
  const dispatch = useDispatch();

  const { selectedIngredients } = useSelector(store => ({
    selectedIngredients: store.burger.selectedIngredients
  }));


  const qty = item.type === "bun" ?
    selectedIngredients.bun._id === item._id ? 2 : 0
    :
    selectedIngredients.otherIngredientsQty[item._id];

  const [{ opacity }, ref] = useDrag({
    type: 'ingredients',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <li className={styles['burger-ingredients__item']}
      name='ingredient'
      id={item._id}
      onClick={() => {
        openModal();
        dispatch(writeIngredientPreview(item));
      }}
      ref={ref}>
      <img src={item.image}></img>
      <div className={styles['burger-ingredients__price']}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
      {qty > 0 ? <Counter count={qty} size="default" extraClass="m-1" /> : <></>}
    </li>
  );
}

BurgerIngredientsItem.propTypes = {
  item: (PropTypes.shape(ingredientObjectType)),
  openModal: PropTypes.func
};

export default BurgerIngredientsItem;