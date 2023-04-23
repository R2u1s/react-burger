import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main'
import { request } from '../../utils/utils';
import { DataContext } from '../../services/dataContext';
import { IngredientsContext } from '../../services/IngredientsContext';

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

  const [ingredients, setIngredients] = React.useState({
    ingredients: [],
    hasError: false,
    loading: true
  });

  const getIngredientsData = async () => {
    setIngredients({ ...ingredients, loading: true });
    return await request("ingredients")
      .then(res => {
        setIngredients({ ingredients: res.data, hasError: false, loading: false });
        return res;
      })
      .catch(error => {
        setIngredients({ ...ingredients, hasError: true, loading: false });
        console.log(error);
      });
  }

  React.useEffect(() => {
    let total = 0;
    let bun = {};
    let otherIngredients = [];

    getIngredientsData().then(res => {

      const ingredientsData = res.data;
      bun = ingredientsData.find(function (item) {
        return item.type === 'bun'
      });
      otherIngredients = ingredientsData.filter(function (item) {
        return item.type !== 'bun'
      });
      otherIngredients.map(item => (total += item.price));
      total = total + 2 * bun.price;
      const initIngredients = {
        bun: bun,
        otherIngredients: otherIngredients
      }
      orderDispatcher({ type: "init", currentIngredient: { totalPrice: total, ingredients: initIngredients } });
    })
  }, []);

  const [orderInfo, orderDispatcher] = React.useReducer(reducer, { totalPrice: null, ingredients: { bun: {}, otherIngredients: [] } }, undefined);

  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
      <DataContext.Provider value={{ orderInfo, orderDispatcher }}>
        <AppHeader />
        {ingredients.loading && 'Загрузка...'}
        {ingredients.hasError && 'Произошла ошибка'}
        {!ingredients.loading && <Main />}
      </DataContext.Provider>
    </IngredientsContext.Provider>
  );
}

export default App;