import React from 'react';
import styles from './ConstructorElementsList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd/dist/hooks';
import { addIngredient } from '../../services/actions/burger';
import ConstructorElementsListItem from '../ConstructorElementsListItem/ConstructorElementsListItem';

const ConstructorElementsList = () => {

  const dispatch = useDispatch();

  //информация об ингредиентах (сейчас все ингредиенты подтянутые API образуют заказ)
  const { ingredientsList, selectedIngredients } = useSelector(store => ({
    ingredientsList: store.burger.ingredientsList,
    selectedIngredients: store.burger.selectedIngredients,
  }));

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

  
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });

  const [, drop] = useDrop({
    accept: "sort",
  });

  return (
    <ul className={`${styles['constructor-elements-list__list']}`} ref={dropTarget}>
      {<li className={`${styles['constructor-elements-list__item']} pl-4`} key={bun._id} id={bun._id} >
        {bun(selectedIngredients.bun.name, selectedIngredients.bun.price, selectedIngredients.bun.image, 'top')}
      </li>}

      {selectedIngredients.otherIngredients.length > 0 ?
        <ul className={styles['constructor-elements-list__list-ingredients']} ref={drop}>
          {selectedIngredients.otherIngredients
            .map(function (item, index) {
              return (
                <ConstructorElementsListItem ingredient={item} index={index} key={index} />
              )
            })}
        </ul>
        : <p className="text text_type_main-default" style={{ textAlign: "center" }}>Нет добавленных ингредиентов</p>
      }

      {<li className={`${styles['constructor-elements-list__item']} pl-4`} key={bun._id} id={bun._id}>
        {bun(selectedIngredients.bun.name, selectedIngredients.bun.price, selectedIngredients.bun.image, 'bottom')}
      </li>}
    </ul>
  )
}

export default ConstructorElementsList;