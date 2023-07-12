import React from 'react';
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const Ingredient: React.FC = () => {

  const path = useParams<{path?:string}>();

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest,
  });

  const { ingredientsList, ingredientsRequest } = useSelector(getData);

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