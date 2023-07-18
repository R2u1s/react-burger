import React from 'react';
import styles from './IngredientDetails.module.css';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../types/types';

const IngredientDetails: React.FC<{ ingredient: TIngredient | undefined }> = () => {

  const path = useParams<string>();

  let { currentIngredient, ingredientsList } = useSelector((store) => ({
    currentIngredient: store.burger.currentIngredient,
    ingredientsList: store.burger.ingredientsList
  }));

  //если в сторе нет ингредиента для просмотра в модальном окне - заменяем его, взяв id из адресной строки, не изменяем стор

  if (!(currentIngredient !== undefined) && path.id) {
    currentIngredient = ingredientsList[path.id];
  }

  return (
    <div className={styles['ingredient-details']}>
      <div className={`${styles['ingredient-details__title']}`}>
        <p className={'text text_type_main-large'}>Детали ингредиента</p>
      </div>
      {currentIngredient !== undefined && <>
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
      </>}
    </div>
  );
}

export default IngredientDetails;