import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function IngredientDetails() {

  const path = useParams();

  const getData = (store) => ({
    currentIngredient: store.burger.currentIngredient,
    ingredientsList: store.burger.ingredientsList
  })

  let { currentIngredient,ingredientsList } = useSelector(getData);

  //если в сторе нет ингредиента для просмотра в модальном окне - заменяем его, взяв id из адресной строки, не изменяем стор
  if (!('_id' in currentIngredient) && path.id) {
    currentIngredient = ingredientsList[path.id];
  }

  return (
    <div className={styles['ingredient-details']}>
      <div className={`${styles['ingredient-details__title']}`}>
        <p className={'text text_type_main-large'}>Детали ингредиента</p>
      </div>
      <div className={styles['ingredient-details__image']}>
        <img src={currentIngredient.image} />
      </div>
      <p className={`${styles['ingredient-details__name']} text text_type_main-medium`}>{currentIngredient.name}</p>
      <ul className={styles['ingredient-details__values']}>
        <li className={styles['ingredient-details__value']}>
          <p className={'text text_type_main-small text_color_inactive'}>Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{currentIngredient.calories}</p>
        </li>
        <li className={styles['ingredient-details__value']}>
          <p className={'text text_type_main-small text_color_inactive'}>Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentIngredient.proteins}</p>
        </li>
        <li className={styles['ingredient-details__value']}>
          <p className={'text text_type_main-small text_color_inactive'}>Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentIngredient.fat}</p>
        </li>
        <li className={styles['ingredient-details__value']}>
          <p className={'text text_type_main-small text_color_inactive'}>Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentIngredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;