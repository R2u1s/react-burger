import { request } from "../../utils/utils";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const WRITE_INGREDIENT_PREVIEW = 'WRITE_INGREDIENT_PREVIEW';
export const CLEAR_INGREDIENT_PREVIEW = 'CLEAR_INGREDIENT_PREVIEW';
export const SET_ORDERDETAILS = 'SET_ORDERDETAILS';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

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
  return function (dispatch) {
    dispatch({
      type: CLEAR_INGREDIENT_PREVIEW,
    });
  }
}

export const setOrderDetails = ({details}) => {
  return function (dispatch) {
    dispatch({
      type: SET_ORDERDETAILS,
      orderDetails: details
    });
  }
}

export const postOrder = (ingredientsList) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
      /* orderStatus = 'Заказ отправляется'; */
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
            orderId: res.order.number.toString()
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

