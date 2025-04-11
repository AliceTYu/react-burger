import {
  connectFeedUser,
  disconnectFeedUser,
  onFeedWsCloseUser,
  onFeedWsErrorUser,
  onFeedWsMessageUser,
  onFeedWsOpenUser,
} from "../actions/feedActionsUser";
import { feedReducerUser } from "../reducers/feedReducerUser";

describe("feedReducerUser", () => {
  const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
  };

  const mockOrders = [
    {
      _id: "1",
      ingredients: ["ing1", "ing2"],
      status: "done",
      name: "Order 1",
      number: 1234,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
  ];

  it("should return initial state", () => {
    expect(feedReducerUser(undefined, { type: "UNKNOWN" })).toEqual(
      initialState
    );
  });

  it("should handle connectFeedUser action", () => {
    const action = connectFeedUser();
    const state = feedReducerUser(initialState, action);

    expect(state).toEqual({
      ...initialState,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle disconnectFeedUser action", () => {
    const action = disconnectFeedUser();
    const state = feedReducerUser(
      {
        ...initialState,
        wsConnected: true,
        orders: mockOrders,
        total: 10,
        totalToday: 5,
      },
      action
    );

    expect(state).toEqual({
      ...initialState,
      wsConnected: false,
      error: null,
      // Данные сохраняются (по текущей логике редьюсера)
      orders: mockOrders,
      total: 10,
      totalToday: 5,
    });
  });

  it("should handle onFeedWsOpenUser action", () => {
    const action = onFeedWsOpenUser();
    const state = feedReducerUser(initialState, action);

    expect(state).toEqual({
      ...initialState,
      wsConnected: true,
      error: null,
    });
  });

  it("should handle onFeedWsCloseUser action", () => {
    const action = onFeedWsCloseUser();
    const state = feedReducerUser(
      {
        ...initialState,
        wsConnected: true,
        orders: mockOrders,
        total: 10,
        totalToday: 5,
      },
      action
    );

    expect(state).toEqual({
      ...initialState,
      wsConnected: false,
      error: null,
      orders: mockOrders,
      total: 10,
      totalToday: 5,
    });
  });

  it("should handle onFeedWsErrorUser action", () => {
    const errorMessage = "Connection error";
    const action = onFeedWsErrorUser(errorMessage);
    const state = feedReducerUser(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });

  it("should handle onFeedWsMessageUser action", () => {
    const payload = {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };
    const action = onFeedWsMessageUser(payload);
    const state = feedReducerUser(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orders: mockOrders,
      total: 100,
      totalToday: 10,
      error: null,
    });
  });

  it("should not modify state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const state = feedReducerUser(initialState, action);

    expect(state).toBe(initialState);
  });

  it("should handle sequence of actions", () => {
    let state = feedReducerUser(initialState, connectFeedUser());
    expect(state.wsConnected).toBe(false);

    state = feedReducerUser(state, onFeedWsOpenUser());
    expect(state.wsConnected).toBe(true);

    state = feedReducerUser(
      state,
      onFeedWsMessageUser({
        orders: mockOrders,
        total: 100,
        totalToday: 10,
      })
    );
    expect(state.orders).toEqual(mockOrders);

    state = feedReducerUser(state, onFeedWsCloseUser());
    expect(state.wsConnected).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it("should clear error on successful connection", () => {
    const errorState = {
      ...initialState,
      error: "Previous error",
    };

    const state = feedReducerUser(errorState, onFeedWsOpenUser());
    expect(state.error).toBeNull();
  });
});
