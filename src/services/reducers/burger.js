import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  WRITE_INGREDIENT_PREVIEW,
  CLEAR_INGREDIENT_PREVIEW,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  CLEAR_INGREDIENTS_LIST,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SORT_INGREDIENTLIST
} from "../actions/burger";

import { arrayToObject,moveIngredient } from "../../utils/utils";

const initialState = {
  ingredientsList: {},
  currentIngredient: {},

  selectedIngredients: {
    bun: {
      name: "Булка не выбрана",
      price: 0,
      image: require('../../images/burger.png')
    },
    otherIngredients: [],
    otherIngredientsQty: {},
    totalPrice: 0
  },

  orderDetails: {
    id: "---",
    status: "Ожидаем подтверждение заказа",
    todo: "Подождите...",
    totalPrice: 0
  },

  ingredientsRequest: false,
  ingredientsFailed: false,
  postOrderRequest: false,
  postOrderFailed: false,
};

export const burgerReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, ingredientsList: arrayToObject(action.ingredientsList), ingredientsRequest: false };
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
      return {
        ...state, 
        orderDetails: {
          ...state.orderDetails,
          id: action.orderId,
          status: 'Заказ отправлен',
          todo: 'Дождитесь готовности на орбитальной станции',
        },
        postOrderFailed: false,
        postOrderRequest: false
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state, orderDetails: {
          ...state.orderDetails,
          id: '---',
          status: 'Заказ не удалось отправить',
          todo: 'Попробуйте снова.Возможно стоит добавить ингредиенты'
        },
        postOrderFailed: true,
        postOrderRequest: false
      };
    }
    case CLEAR_INGREDIENTS_LIST: {
      return { ...state, selectedIngredients: initialState.selectedIngredients};
    }
    case ADD_INGREDIENT: {
      //если хотим добавить булку, то меняем выбранную булку сверху и снизу
      if (action.currentIngredient.type === 'bun') {
        return {
          ...state,
          selectedIngredients: {
            ...state.selectedIngredients,
            totalPrice: state.selectedIngredients.totalPrice - (state.selectedIngredients.bun.price * 2) + (action.currentIngredient.price * 2),
            bun: action.currentIngredient
          }
        };
      } else {
        //если хотим добавить ингредиент, то проверяем есть ли он. Если есть - увеличиваем количество и добавляем в список id
        if (action.currentIngredient._id in state.selectedIngredients.otherIngredientsQty) {
          return {
            ...state,
            selectedIngredients: {
              ...state.selectedIngredients,
              totalPrice: state.selectedIngredients.totalPrice + action.currentIngredient.price,
              otherIngredientsQty: {
                ...state.selectedIngredients.otherIngredientsQty,

                [action.currentIngredient._id]: state.selectedIngredients.otherIngredientsQty[action.currentIngredient._id] + 1,
              },
              otherIngredients: [...state.selectedIngredients.otherIngredients, action.currentIngredient]
            }
          };
          //если ингредиента в списке нет - добавляем его в оба списка
        } else {
          return {
            ...state,
            selectedIngredients: {
              ...state.selectedIngredients,
              totalPrice: state.selectedIngredients.totalPrice + action.currentIngredient.price,
              otherIngredientsQty: {
                ...state.selectedIngredients.otherIngredientsQty,
                [action.currentIngredient._id]: 1
              },
              otherIngredients: [...state.selectedIngredients.otherIngredients, action.currentIngredient]
            }
          };
        }

      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: {
          ...state.selectedIngredients,
          totalPrice: state.selectedIngredients.totalPrice - action.currentIngredient.price,
          otherIngredientsQty: {
            ...state.selectedIngredients.otherIngredientsQty,
            [action.currentIngredient._id]: state.selectedIngredients.otherIngredientsQty[action.currentIngredient._id] - 1,
          },
          otherIngredients: state.selectedIngredients.otherIngredients.filter(item => item.listId !== action.currentIngredient.listId)
        }
      };
    }
    case SORT_INGREDIENTLIST: {
      return {
        ...state,
        selectedIngredients: {
          ...state.selectedIngredients,
          otherIngredients: moveIngredient(state.selectedIngredients.otherIngredients,action.dragIndex,action.hoverIndex)
        }
      };
    }
    default: {
      return state;
    }
  }
}; 