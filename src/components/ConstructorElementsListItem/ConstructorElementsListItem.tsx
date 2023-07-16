import React from 'react';
import styles from '../ConstructorElementsList/ConstructorElementsList.module.css';
import PropTypes from 'prop-types';
import { chosenIngredientObjectType } from '../../utils/data';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { removeIngredient } from '../../services/actions/burger';
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import { sortIngredient } from '../../services/actions/burger';
import { TIngredient } from '../../types/types';

const ConstructorElementsListItem: React.FC<{
  ingredient: TIngredient;
  index: number;
}> = ({ ingredient, index }) => {
  const dispatch = useDispatch();

  const { ingredientsList } = useSelector((store) => ({
    ingredientsList: store.burger.selectedIngredients.otherIngredients
  }));

  const ref = React.useRef<HTMLParagraphElement>(null);

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
    item: ingredient
  });

  drop(drag(ref));

  return (
    <div ref={ref}>
      <li className={styles['constructor-elements-list__item']} key={Math.random()} id={ingredient._id} >
        <DragIcon type={'primary'} />
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