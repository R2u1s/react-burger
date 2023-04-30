import { GET_INGREDIENTS_REQUEST,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         WRITE_INGREDIENT_PREVIEW,
         CLEAR_INGREDIENT_PREVIEW,
         SET_ORDERDETAILS
 } from "../actions/burger";

 const initialState = {
    ingredientsList: [],
    selectedIngredients: {},
    currentIngredient: {},

    orderDetails: {
      id: "---",
      status: "Ожидаем подтверждение заказа",
      todo: 'Дождитесь готовности на орбитальной станции',
      ingredients: {
        bun: {
          name: "Булка не выбрана",
          price: 0,
          image: "https://code.s3.yandex.net/react/code/bun-02.png"
        },
        otherIngredients: []
      },
      totalPrice: 0
    },

    ingredientsRequest: false,
    ingredientsFailed: false,
  };

  export const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
        return {
          ...state,
          ingredientsRequest: true
        };
      }
      case GET_INGREDIENTS_SUCCESS: {
        return { ...state, ingredientsFailed: false, ingredientsList: action.ingredientsList, ingredientsRequest: false };
      }
      case GET_INGREDIENTS_FAILED: {
        return { ...state, ingredientsFailed: true, ingredientsRequest: false };
      }
      case WRITE_INGREDIENT_PREVIEW: {
        return { ...state, currentIngredient: action.currentIngredient };
      }
      case CLEAR_INGREDIENT_PREVIEW: {
        return { ...state, currentIngredient: {} };
      }
      case SET_ORDERDETAILS: {
        return { ...state, orderDetails: {
          ...state.orderDetails,
          id: action.orderDetails.id,
          status: action.orderDetails.status,
          todo: action.orderDetails.todo
        } };
      }
      default: {
        return state;
      }
    }
  };