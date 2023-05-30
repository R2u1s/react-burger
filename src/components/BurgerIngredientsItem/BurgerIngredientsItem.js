import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientObjectType } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { writeIngredientPreview } from '../../services/actions/burger';
import { useDrag } from 'react-dnd';
import { openModal } from '../../services/actions/modal';
import { useNavigate, Link } from 'react-router-dom';

const BurgerIngredientsItem = ({ item }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = (store) => ({
    selectedIngredients: store.burger.selectedIngredients
  })

  const { selectedIngredients } = useSelector(getData);

  const qty = item.type === "bun" ?
    selectedIngredients.bun._id === item._id ? 2 : 0
    :
    selectedIngredients.otherIngredientsQty[item._id];

  const [{ isDrag }, ref] = useDrag({
    type: 'ingredients',
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const className = isDrag ? styles['burger-ingredients__item'] + ` ` + styles['burger-ingredients__item_dragging'] : styles['burger-ingredients__item']

  return (
    <li
      name='ingredient'
      id={item._id}
      onClick={() => {
        dispatch(openModal());
        dispatch(writeIngredientPreview(item));
      }}
      ref={ref}>
      <Link to={{ pathname: `/ingredients/${item._id}` }} className={className}>
        <img src={item.image}></img>
        <div className={styles['burger-ingredients__price']}>
          <p className="text text_type_digits-default">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{item.name}</p>
        {qty > 0 ? <Counter count={qty} size="default" extraClass="m-1" /> : <></>}
      </Link>
    </li>
  );
}

BurgerIngredientsItem.propTypes = {
  item: (PropTypes.shape(ingredientObjectType)),
};

export default BurgerIngredientsItem;