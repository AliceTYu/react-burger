import { ISetOrder } from "../../utils/types";

export const ORDER_REQUEST: "SEND_REQUEST" = "SEND_REQUEST";
export const DEL_NUMBER: "DEL_NUMBER" = "DEL_NUMBER";
export const ORDER_ERROR: "ERROR" = "ERROR";
export const ORDER_IS_LOADING: "IS_LOADING" = "IS_LOADING";

type OrderRequestAction = {
  type: typeof ORDER_REQUEST;
  payload: { order: ISetOrder };
}

type DelNumberAction = {
  type: typeof DEL_NUMBER;
}

type OrderErrorAction = {
  type: typeof ORDER_ERROR;
  payload: { error: boolean };
}

type OrderIsLoadingAction = {
  type: typeof ORDER_IS_LOADING;
  payload: { loading: boolean };
}

export type OrderAction =
  | OrderRequestAction
  | DelNumberAction
  | OrderErrorAction
  | OrderIsLoadingAction;

export function setOrder(msg: ISetOrder): OrderRequestAction {
  return {
    type: ORDER_REQUEST,
    payload: { order: msg },
  };
}

export function delOrder(): DelNumberAction {
  return {
    type: DEL_NUMBER,
  };
}

export function errorOrder(msg: boolean): OrderErrorAction {
  return {
    type: ORDER_ERROR,
    payload: { error: msg },
  };
}

export function isLoadingOrder(msg: boolean): OrderIsLoadingAction {
  return {
    type: ORDER_IS_LOADING,
    payload: { loading: msg },
  };
}
