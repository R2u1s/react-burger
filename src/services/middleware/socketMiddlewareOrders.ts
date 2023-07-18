import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS
} from '../actions/wsActions';
import { TMiddleware } from '../../types/types'

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS
};

export const socketMiddlewareOrders: TMiddleware = () => (store) => {

  let socket: WebSocket;

  return next => action => {
    const { dispatch, getState } = store;
    const { type, payload } = action;
    const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;

    if (type === wsInit) {
      socket = new WebSocket(`${wsUrl}`);
    }
    if (socket) {
      socket.onopen = event => {
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = event => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = event => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;
        dispatch({ type: onOrders, payload: restParsedData });
      };

      socket.onclose = event => {
        dispatch({ type: onClose, payload: event });
      };
    }

    next(action);
  };
};
