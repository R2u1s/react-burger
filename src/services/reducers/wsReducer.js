import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_GET_USER_ORDERS
} from '../actions/wsActions';

import { getCurrentTimestamp } from '../../utils/utils';

const initialState = {
  wsConnected: false,
  orders: {orders:[]},
  userOrders: []
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userOrders: [
          ...state.userOrders,
          {
            userOrders: action.payload,
            timestamp: getCurrentTimestamp()
          }
        ],
      };

    default:
      return state;
  }
};