import { GET_INGREDIENTS_REQUEST,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         WRITE_INGREDIENT_PREVIEW,
         CLEAR_INGREDIENT_PREVIEW,
         POST_ORDER_REQUEST,
         POST_ORDER_SUCCESS,
         POST_ORDER_FAILED,
         ADD_INGREDIENT,
         REMOVE_INGREDIENT
 } from "../actions/burger";

 const initialState = {
    ingredientsList: [],
    currentIngredient: {},
    selectedIngredients: {},

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
        id:'---',
        status: 'Заказ не удалось отправить',
        todo: 'Попробуйте снова.Возможно стоит добавить ингредиенты'
        },
        postOrderFailed: true, 
        postOrderRequest: false };
      }
      case ADD_INGREDIENT: {
        if (action.currentIngredient.type === 'bun') {
          return {
            ...state,
            orderDetails: {
              ...state.orderDetails,
              totalPrice: state.orderDetails.totalPrice - (state.orderDetails.ingredients.bun.price*2) + (action.currentIngredient.price*2),
              ingredients: {
                ...state.orderDetails.ingredients,
                bun: action.currentIngredient
              }
            }
          };
        } else {
          return {
            ...state,
            orderDetails: {
              ...state.orderDetails,
              totalPrice: state.orderDetails.totalPrice + action.currentIngredient.price,
              ingredients: {
                ...state.orderDetails.ingredients,
                otherIngredients: [...state.orderDetails.ingredients.otherIngredients, action.currentIngredient]
              }
            }
          };
        }
      }
      case REMOVE_INGREDIENT: {
        return {
          ...state,
          orderDetails: {
            ...state.orderDetails,
            totalPrice: state.orderDetails.totalPrice - action.currentIngredient.price,
            ingredients: {
              ...state.orderDetails.ingredients,
              otherIngredients: state.orderDetails.ingredients.otherIngredients.filter(item => item._id !== action.currentIngredient._id)
            }
          }
        };
      }
      default: {
        return state;
      }
    }
  };