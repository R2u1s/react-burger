import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/burger';

function App() {
  const dispatch = useDispatch();

  const getData = (store) => ({
    ingredientsList: store.burger.ingredientsList,
    ingredientsRequest: store.burger.ingredientsRequest,
  })

  const { ingredientsList,ingredientsRequest } = useSelector(getData);

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