import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredientsItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { writeIngredientPreview } from '../../services/actions/burger';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../types/types';

const BurgerIngredientsItem: React.FC<{ 
  item: TIngredient;
  openModal:()=>void;
 }> = ({ item, openModal }) => {

  const location = useLocation();

  const dispatch = useDispatch();

  const { selectedIngredients } = useSelector((store) => ({
    selectedIngredients: store.burger.selectedIngredients
  }));

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
/*       name='ingredient' */
      id={item._id}
      onClick={() => {
        openModal();
        dispatch(writeIngredientPreview(item));
      }}
      ref={ref}>
      <Link to={{ pathname: `/ingredients/${item._id}`}} state={{ background: location }} className={className}>
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

export default BurgerIngredientsItem;