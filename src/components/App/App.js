import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/burger';

function App() {
  const dispatch = useDispatch();

  const { ingredientsList, selectedIngredients, currentIngredient, orderInfoNew, ingredientsRequest, ingredientsFailed } = useSelector(store => ({
    ingredientsList: store.burger.ingredientsList,
    selectedIngredients: store.burger.selectedIngredients,
    currentIngredient: store.burger.currentIngredient,
    orderInfo: store.burger.orderInfo,
    ingredientsRequest: store.burger.ingredientsRequest,
    ingredientsFailed: store.burger.ingredientsFailed
  }));

  React.useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const content = React.useMemo(
    () => {
      return ingredientsRequest ? (
        "Загрузка"
      ) : (
        <Main />
      );
    },
    [ingredientsRequest, ingredientsList]
  );

  return (
    <>
      <AppHeader />
      {content}
    </>
  );
}

export default App;