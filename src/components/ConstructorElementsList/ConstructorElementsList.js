import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConstructorElementsList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientObjectType } from '../../utils/data';

const ConstructorElementsList = (props) => {
  const findBun = React.useMemo(
    () =>
    props.ingredients.find(function(item) {
      return item.type === 'bun'  }), 
  [props]);

  const filterNoBuns = React.useMemo(
    () =>
    props.ingredients
      .filter(function(item) {
        return item.type !== 'bun'}),
  [props]
  );

  const bun = (text, price, image, topOrBottom) => {

    return (
      <ConstructorElement
          type = {topOrBottom}
          isLocked = 'true'
          text={`${text} (верх)`}
          price={price}
          thumbnail={image}
        />
    )
  }

  return (

    <ul className={`${styles['constructor-elements-list__list']}`}>
     {bun && <li className={`${styles['constructor-elements-list__item']}  pr-4`} key={bun} id={bun._id} name='ingredient'>
        {bun(findBun.name,findBun.price, findBun.image, findBun.image,'top')}
      </li> }
     
      { <ul className={styles['constructor-elements-list__list-ingredients']}>
      {filterNoBuns
        .map(function (item) {
          return (
            <li className={styles['constructor-elements-list__item']} key={item._id} id={item._id} name='ingredient'>
              <DragIcon />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          )
        })}
        </ul>}
      {bun && <li className={`${styles['constructor-elements-list__item']} pr-4`} key={bun} id={bun._id} name='ingredient'>
        {bun(findBun.name,findBun.price, findBun.image, findBun.image,'bottom')}
      </li> }
    </ul>
  )
}

ConstructorElementsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientObjectType))
}; 

export default ConstructorElementsList;