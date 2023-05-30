import React from 'react';
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, writeIngredientPreview } from '../../services/actions/burger';
import { useParams } from 'react-router-dom';


function Ingredient() {

  const dispatch = useDispatch();
  const path = useParams();

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest,
  });

  const { ingredientsList, ingredientsRequest } = useSelector(getData);

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const content = React.useMemo(
    () => {
      return (ingredientsRequest || !ingredientsList[path.id]) ? (
        "Загрузка"
      ) : (
        <IngredientDetails ingredient={ingredientsList[path.id]} />
      );
    },
    [ingredientsRequest, ingredientsList]
  );


  return (
    <div className={`${styles['ingredient']}`}>
      {content}
    </div>
  );
}

export default Ingredient;