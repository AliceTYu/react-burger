import { ISetOrder } from "../../utils/types";
import {
  DEL_NUMBER,
  ORDER_ERROR,
  ORDER_IS_LOADING,
  ORDER_REQUEST,
  OrderAction,
} from "../actions/order";

interface OrderStateType {
  order: ISetOrder | null;
  error: boolean;
  isLoading: boolean;
}

const initialState: OrderStateType = {
  order: null,
  error: true,
  isLoading: false,
};

export const orderReducer = (state = initialState, action: OrderAction): OrderStateType => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...state,
        order: action.payload.order,
      };
    case DEL_NUMBER:
      return {
        ...state,
        order: null,
        error: false,
        isLoading: false,
      };
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
