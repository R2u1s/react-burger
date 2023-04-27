import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main'
import { request } from '../../utils/utils';
import { DataContext } from '../../services/dataContext';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/app';

function reducer(state, action) {

  switch (action.type) {
    case "add":
      return {
        totalPrice: state.totalPrice + action.currentIngredient.price,
        ingredients: {
          ...state.ingredients,
          otherIngredients: [...state.ingredients.otherIngredients, action.currentIngredient]
        }
      };
    case "remove":
      return {
        totalPrice: state.totalPrice - action.currentIngredient.price,
        ingredients: {
          ...state.ingredients,
          otherIngredients: state.ingredients.otherIngredients.filter(item => item._id !== action.currentIngredient._id)
        }
      };
    case "init":
      return {
        totalPrice: action.currentIngredient.totalPrice,
        ingredients: action.currentIngredient.ingredients
      }
    default:
      throw new Error(`Wrong value`);
  }
}

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

  const [orderInfo, orderDispatcher] = React.useReducer(reducer, { totalPrice: null, ingredients: { bun: {}, otherIngredients: [] } }, undefined);

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
    <DataContext.Provider value={{ orderInfo, orderDispatcher }}>
      <AppHeader />
      {content}
    </DataContext.Provider>
  );
}

export default App;