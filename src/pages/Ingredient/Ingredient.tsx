import React from 'react';
import styles from './Ingredient.module.css';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';

const Ingredient: React.FC = () => {

  const path = useParams<{id:string}>();

  const { ingredientsList, ingredientsRequest } = useSelector((store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest,
  }));

  const content = React.useMemo(
    () => {
      return path.id && ((ingredientsRequest || !ingredientsList[path.id]) ? (
        "Загрузка"
      ) : (
        <IngredientDetails ingredient={ingredientsList[path.id]} />
      ));
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