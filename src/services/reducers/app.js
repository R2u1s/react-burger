import { GET_INGREDIENTS_REQUEST,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED
 } from "../actions/app";

 const initialState = {
    ingredientsList: [],
    selectedIngredients: {},
    currentIngredient: {},
    orderInfo: {},
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
      default: {
        return state;
      }
    }
  };