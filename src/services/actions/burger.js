import { request } from "../../utils/utils";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const WRITE_INGREDIENT_PREVIEW = 'WRITE_INGREDIENT_PREVIEW';
export const CLEAR_INGREDIENT_PREVIEW = 'CLEAR_INGREDIENT_PREVIEW';

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    request('ingredients')
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredientsList: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      });
  };
}

export const writeIngredientPreview = (ingredient) => {
  return function (dispatch) {
    dispatch({
      type: WRITE_INGREDIENT_PREVIEW,
      currentIngredient: ingredient
    });
  }
}

export const clearIngredientPreview = () => {
  console.log('clear');
  return function (dispatch) {
    dispatch({
      type: CLEAR_INGREDIENT_PREVIEW,
    });
  }
}