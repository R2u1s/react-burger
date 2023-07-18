import { TOrder, TOrderList } from "../../types/types";

export const WS_CONNECTION_START:'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS:'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED:'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS:'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_CONNECTION_START_USER:'WS_CONNECTION_START_USER' = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_SUCCESS_USER:'WS_CONNECTION_SUCCESS_USER' = 'WS_CONNECTION_SUCCESS_USER';
export const WS_CONNECTION_ERROR_USER:'WS_CONNECTION_ERROR_USER' = 'WS_CONNECTION_ERROR_USER';
export const WS_CONNECTION_CLOSED_USER:'WS_CONNECTION_CLOSED_USER' = 'WS_CONNECTION_CLOSED_USER';
export const WS_GET_ORDERS_USER:'WS_GET_ORDERS_USER' = 'WS_GET_ORDERS_USER';

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS,
  readonly payload: TOrderList
}

export interface IWsConnectionSuccessUserAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_USER
}

export interface IWsConnectionErrorUserAction {
  readonly type: typeof WS_CONNECTION_ERROR_USER
}

export interface IWsConnectionClosedUserAction {
  readonly type: typeof WS_CONNECTION_CLOSED_USER
}

export interface IWsGetOrdersUser {
  readonly type: typeof WS_GET_ORDERS_USER,
  readonly payload: TOrderList
}

export type TWsActions =
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetOrders
  | IWsConnectionSuccessUserAction
  | IWsConnectionErrorUserAction
  | IWsConnectionClosedUserAction
  | IWsGetOrdersUser;

export const wsConnectionSuccess = ():IWsConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS
});

export const wsConnectionError = ():IWsConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR
});

export const wsConnectionClosed = ():IWsConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED
});

export const wsGetOrders = (orders:TOrderList):IWsGetOrders => ({
  type: WS_GET_ORDERS,
  payload: orders
});

/////////////////////////////////////////////////////////////////////////////

export const wsConnectionSuccessUser = ():IWsConnectionSuccessUserAction => ({
  type: WS_CONNECTION_SUCCESS_USER
});

export const wsConnectionErrorUser = ():IWsConnectionErrorUserAction => ({
  type: WS_CONNECTION_ERROR_USER
});

export const wsConnectionClosedUser = ():IWsConnectionClosedUserAction => ({
  type: WS_CONNECTION_CLOSED_USER
});

export const wsGetOrdersUser = (orders:TOrderList):IWsGetOrdersUser => ({
  type: WS_GET_ORDERS_USER,
  payload: orders
});

