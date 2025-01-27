import {
  DEL_NUMBER,
  ORDER_ERROR,
  ORDER_IS_LOADING,
  ORDER_REQUEST,
} from "../actions/order";

const initialState = {
  order: null,
  error: true,
  isLoading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...state,
        order: action.payload.order,
      };
    case DEL_NUMBER:
      return {};
    case ORDER_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.loading,
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
