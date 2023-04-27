import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main'
import { request } from '../../utils/utils';
import { DataContext } from '../../services/dataContext';
import { IngredientsContext } from '../../services/IngredientsContext';
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

  const {ingredientsList, selectedIngredients, currentIngredient, orderInfoNew, ingredientsRequest, ingredientsFailed } = useSelector(store => ({
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

/*   const content = React.useMemo(
    () => {
      return ingredientsRequest ? (
        "Загрузка"
      ) : (
        <Main />
      );
    },
    [ingredientsRequest, ingredientsList]
  ); */

  const content = React.useMemo(
    () => {
      return ingredients.loading ? (
        "Загрузка"
      ) : (
        <Main />
      );
    },
    [ingredientsRequest, ingredientsList,ingredients.loading]
  );

  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
      <DataContext.Provider value={{ orderInfo, orderDispatcher }}>
        <AppHeader />
        {content}
      </DataContext.Provider>
    </IngredientsContext.Provider>
  );
}

export default App;