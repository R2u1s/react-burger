import React from 'react';
import ReactDOM from 'react-dom';
import styles from './IngredientDetails.module.css';

function IngredientDetails({ingredientDetails}){
  return (
    <div className={styles['ingredient-details']}>
      <div className={`${styles['ingredient-details__title']}`}>
        <p className={'text text_type_main-large'}>Детали ингредиента</p>
      </div>
      <div className={styles['ingredient-details__image']}>
        <img src={ingredientDetails.image}/>
      </div>
      <p className={`${styles['ingredient-details__name']} text text_type_main-medium`}>{ingredientDetails.name}</p>
      <ul className={styles['ingredient-details__values']}>
        <li className={styles['ingredient-details__value']}>
          <p className={'text text_type_main-small text_color_inactive'}>Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientDetails.calories}</p>
        </li>
        <li className={styles['ingredient-details__value']}>
          <p className={'text text_type_main-small text_color_inactive'}>Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientDetails.proteins}</p>
        </li>
        <li className={styles['ingredient-details__value']}>
          <p className={'text text_type_main-small text_color_inactive'}>Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientDetails.fat}</p>
        </li>
        <li className={styles['ingredient-details__value']}>
          <p className={'text text_type_main-small text_color_inactive'}>Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientDetails.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;