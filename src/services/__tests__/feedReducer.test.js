import {
  connectFeed,
  disconnectFeed,
  onFeedWsClose,
  onFeedWsError,
  onFeedWsMessage,
  onFeedWsOpen,
} from "../actions/feedActions";
import { feedReducer, initialState } from "../reducers/feedReducer";

describe("feedReducer", () => {
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
    expect(feedReducer(undefined, { type: "UNKNOWN" })).toEqual(initialState);
  });

  it("should handle connectFeed action", () => {
    const action = connectFeed();
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      wsConnected: false,
      error: null,
    });
  });

  it("should handle disconnectFeed action", () => {
    const action = disconnectFeed();
    const state = feedReducer(
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

  it("should handle onFeedWsOpen action", () => {
    const action = onFeedWsOpen();
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      wsConnected: true,
      error: null,
    });
  });

  it("should handle onFeedWsClose action", () => {
    const action = onFeedWsClose();
    const state = feedReducer(
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

  it("should handle onFeedWsError action", () => {
    const errorMessage = "Connection error";
    const action = onFeedWsError(errorMessage);
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });

  it("should handle onFeedWsMessage action", () => {
    const payload = {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };
    const action = onFeedWsMessage(payload);
    const state = feedReducer(initialState, action);

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
    const state = feedReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it("should handle sequence of actions", () => {
    let state = feedReducer(initialState, connectFeed());
    expect(state.wsConnected).toBe(false);

    state = feedReducer(state, onFeedWsOpen());
    expect(state.wsConnected).toBe(true);

    state = feedReducer(
      state,
      onFeedWsMessage({
        orders: mockOrders,
        total: 100,
        totalToday: 10,
      })
    );
    expect(state.orders).toEqual(mockOrders);

    state = feedReducer(state, onFeedWsClose());
    expect(state.wsConnected).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it("should clear error on successful connection", () => {
    const errorState = {
      ...initialState,
      error: "Previous error",
    };

    const state = feedReducer(errorState, onFeedWsOpen());
    expect(state.error).toBeNull();
  });

  it("should preserve orders on reconnect", () => {
    const stateWithOrders = {
      ...initialState,
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };

    const state = feedReducer(stateWithOrders, connectFeed());
    expect(state.orders).toEqual(mockOrders);
  });
});
