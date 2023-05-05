import { request } from "../../utils/utils";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const WRITE_INGREDIENT_PREVIEW = 'WRITE_INGREDIENT_PREVIEW';
export const CLEAR_INGREDIENT_PREVIEW = 'CLEAR_INGREDIENT_PREVIEW';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SORT_INGREDIENTLIST = 'SORT_INGREDIENTLIST';

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
      })
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
        console.log(error);
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
  return function (dispatch) {
    dispatch({
      type: CLEAR_INGREDIENT_PREVIEW,
    });
  }
}

export const postOrder = (ingredientsList) => {

  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    request("orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": ingredientsList
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            orderId: res.order.number.toString(),
            ingredientsList: ingredientsList
          });
        } else {
          dispatch({
            type: POST_ORDER_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: POST_ORDER_FAILED
        });
        console.log(error);
      });
  };
}

export const addIngredient = (ingredient) => {
  const listId = Math.random();
  const newIngredient = Object.assign({}, ingredient);
  newIngredient.listId = listId;
  return function (dispatch) {
    dispatch({
      type: ADD_INGREDIENT,
      currentIngredient: newIngredient,
    });
  }
}

export const removeIngredient = (ingredient) => {
  return function (dispatch) {
    dispatch({
      type: REMOVE_INGREDIENT,
      currentIngredient: ingredient,
    });
  }
}

export const sortIngredient = (dragIndex, hoverIndex) => {
  return function (dispatch) {
    dispatch({
      type: SORT_INGREDIENTLIST,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    });
  }
}