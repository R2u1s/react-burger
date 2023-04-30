import { GET_INGREDIENTS_REQUEST,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         WRITE_INGREDIENT_PREVIEW,
         CLEAR_INGREDIENT_PREVIEW,
         POST_ORDER_REQUEST,
         POST_ORDER_SUCCESS,
         POST_ORDER_FAILED,
         SET_ORDERDETAILS
 } from "../actions/burger";

 const initialState = {
    ingredientsList: [],
    selectedIngredients: {},
    currentIngredient: {},

    orderDetails: {
      id: "---",
      status: "Ожидаем подтверждение заказа",
      todo: "Подождите...",
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
    postOrderRequest: false,
    postOrderFailed: false,
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
      case POST_ORDER_REQUEST: {
        return {
          ...state,
          postOrderRequest: true
        };
      }
      case POST_ORDER_SUCCESS: {
        return { ...state, orderDetails: {
          ...state.orderDetails,
          id: action.orderId,
          status: 'Заказ отправлен',
          todo: 'Дождитесь готовности на орбитальной станции'
        },
          postOrderFailed: false, 
          postOrderRequest: false };
      }
      case POST_ORDER_FAILED: {
        return { ...state, orderDetails:{
        ...state.orderDetails,
        status: 'Заказ не удалось отправить'
        },
        postOrderFailed: true, postOrderRequest: false };
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