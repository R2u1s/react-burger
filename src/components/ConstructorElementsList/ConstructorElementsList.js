import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConstructorElementsList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientObjectType } from '../../utils/data';

const ConstructorElementsList = (props) => {
  const buns = React.useMemo(
    () =>
    props.ingredients.filter(function(item) {
      return item.type === 'bun'  }), 
  [props]);

  const filterNoBuns = React.useMemo(
    () =>
    props.ingredients
      .filter(function(item) {
        return item.type !== 'bun'}),
  [props]
  );

  const bunTop = buns[0];
  const bunBottom = buns[1];

  return (

    <ul className={`${styles['constructor-elements-list__list']}`}>
     {bunTop && <li className={`${styles['constructor-elements-list__item']}  pr-4`} key={bunTop._id} id={bunTop._id} name='ingredient'>
        <ConstructorElement
          type= 'top'
          isLocked = 'true'
          text={`${bunTop.name} (верх)`}
          price={bunTop.price}
          thumbnail={bunTop.image}
        />
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
      {bunBottom && <li className={`${styles['constructor-elements-list__item']} pr-4`} key={bunBottom._id} id={bunBottom._id} name='ingredient'>
        <ConstructorElement
          type= 'bottom'
          isLocked = 'true'
          text={`${bunBottom.name} (низ)`}
          price={bunBottom.price}
          thumbnail={bunBottom.image}
        />
      </li> }
    </ul>
  )
}

ConstructorElementsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientObjectType))
}; 

export default ConstructorElementsList;