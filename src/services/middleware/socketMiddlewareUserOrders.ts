import { Middleware } from "redux";
import {
  WS_CONNECTION_CLOSED_USER,
  WS_CONNECTION_ERROR_USER,
  WS_CONNECTION_START_USER,
  WS_CONNECTION_SUCCESS_USER,
  WS_GET_ORDERS_USER
} from '../actions/wsActions';
import { TMiddleware } from "../../types/types";


const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInit: WS_CONNECTION_START_USER,
  onOpen: WS_CONNECTION_SUCCESS_USER,
  onClose: WS_CONNECTION_CLOSED_USER,
  onError: WS_CONNECTION_ERROR_USER,
  onOrders: WS_GET_ORDERS_USER
};


export const socketMiddlewareUserOrders: TMiddleware = () => (store) => {
  let socket: WebSocket;
  return next => action => {
    const { dispatch, getState } = store;
    const { type, payload } = action;
    const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;
    const { accessToken } = getState().auth;

    if (type === wsInit) {
      socket = new WebSocket(`${wsUrl}?token=${accessToken.split(' ')[1]}`);
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