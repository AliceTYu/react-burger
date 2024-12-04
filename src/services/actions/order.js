export const ORDER_REQUEST = "SEND_REQUEST";
export const DEL_NUMBER = "DEL_NUMBER";
export const ORDER_ERROR = "ERROR";
export const ORDER_IS_LOADING = "IS_LOADING";

export function setOrder(msg) {
  return {
    type: ORDER_REQUEST,
    payload: { order: msg },
  };
}

export function delOrder() {
  return {
    type: DEL_NUMBER,
  };
}

export function errorOrder(msg) {
  return {
    type: ORDER_ERROR,
    payload: { error: msg },
  };
}

export function isLoadingOrder(msg) {
  return {
    type: ORDER_IS_LOADING,
    payload: { loading: msg },
  };
}
