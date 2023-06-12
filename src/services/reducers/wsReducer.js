import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_SUCCESS_USER,
  WS_CONNECTION_ERROR_USER,
  WS_CONNECTION_CLOSED_USER,
  WS_GET_ORDERS_USER
} from '../actions/wsActions';

const initialState = {
  wsConnectedAll: false,
  wsConnectedUser: false,
  orders: { orders: [] },
  userOrders: { orders: [] }
};

export const wsReducer = (state = initialState, action) => {

  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnectedAll: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnectedAll: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnectedAll: false
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case WS_CONNECTION_SUCCESS_USER:
      return {
        ...state,
        wsConnectedUser: true
      };

    case WS_CONNECTION_ERROR_USER:
      return {
        ...state,
        wsConnectedUser: false
      };

    case WS_CONNECTION_CLOSED_USER:
      return {
        ...state,
        wsConnectedUser: false
      };

    case WS_GET_ORDERS_USER:
      return {
        ...state,
        userOrders: action.payload,
      };
    default:
      return state;
  }
};