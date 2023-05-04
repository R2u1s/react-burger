import React from 'react';
import styles from '../ConstructorElementsList/ConstructorElementsList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeIngredient } from '../../services/actions/burger';
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import { sortIngredient } from '../../services/actions/burger';

const ConstructorElementsListItem = ({ ingredient, index }) => {
  const dispatch = useDispatch();

  const { ingredientsList } = useSelector(store => ({
    ingredientsList: store.burger.selectedIngredients.otherIngredients,
  }));

  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: 'sort',
    hover(ingredient, monitor) {
      const dragIndex = ingredientsList.indexOf(ingredient);
      const hoverIndex = index;
      dispatch(sortIngredient(dragIndex, hoverIndex));
    },
  });

  const [, drag] = useDrag({
    type: 'sort',
    item: ingredient,
    index
  });

  drop(drag(ref));

  return (
    <div ref={ref}>
      <li className={styles['constructor-elements-list__item']} key={Math.random()} id={ingredient._id} >
        <DragIcon />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => { dispatch(removeIngredient(ingredient)) }}
        />
      </li>
    </div>

  )
}


export default ConstructorElementsListItem;