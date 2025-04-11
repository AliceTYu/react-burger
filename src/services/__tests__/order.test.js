import {
  DEL_NUMBER,
  ORDER_ERROR,
  ORDER_IS_LOADING,
  ORDER_REQUEST,
} from "../actions/order";
import { initialState, orderReducer } from "../reducers/order";

describe("orderReducer", () => {
  const mockOrder = {
    name: "Space флюоресцентный бургер",
    order: {
      number: 12345,
    },
    success: true,
  };

  it("should return initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ORDER_REQUEST action", () => {
    const action = {
      type: ORDER_REQUEST,
      payload: {
        order: mockOrder,
      },
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      order: mockOrder,
      error: true, // остается без изменений
      isLoading: false, // остается без изменений
    });
  });

  it("should handle DEL_NUMBER action", () => {
    const stateWithOrder = {
      ...initialState,
      order: mockOrder,
      isLoading: true,
      error: false,
    };

    const action = {
      type: DEL_NUMBER,
    };

    expect(orderReducer(stateWithOrder, action)).toEqual({
      ...initialState,
      order: null,
      error: false,
      isLoading: false,
    });
  });

  it("should handle ORDER_IS_LOADING action", () => {
    const action = {
      type: ORDER_IS_LOADING,
      payload: {
        loading: true,
      },
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle ORDER_ERROR action", () => {
    const action = {
      type: ORDER_ERROR,
      payload: {
        error: false,
      },
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      error: false,
    });
  });

  it("should not modify state for unknown action", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    };

    expect(orderReducer(initialState, action)).toBe(initialState);
  });

  it("should handle sequence of actions", () => {
    let state = orderReducer(initialState, {
      type: ORDER_IS_LOADING,
      payload: {
        loading: true,
      },
    });

    expect(state.isLoading).toBe(true);

    state = orderReducer(state, {
      type: ORDER_REQUEST,
      payload: {
        order: mockOrder,
      },
    });

    expect(state.order).toEqual(mockOrder);
    expect(state.isLoading).toBe(true); // остается true

    state = orderReducer(state, {
      type: ORDER_ERROR,
      payload: {
        error: false,
      },
    });

    expect(state.error).toBe(false);

    state = orderReducer(state, {
      type: DEL_NUMBER,
    });

    expect(state).toEqual({
      ...initialState,
      error: false,
    });
  });

  it("should handle error state correctly", () => {
    const action = {
      type: ORDER_ERROR,
      payload: {
        error: true,
      },
    };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    });
  });
});
