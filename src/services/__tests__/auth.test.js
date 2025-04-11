import {
  LOGIN_PASSWORD,
  LOGIN_ERROR,
  LOGIN_SECCESS,
  LOGIN_GET_USER,
  LOGIN_EMAIL,
} from "../actions/auth";
import { loginEmailReducer } from "../reducers/auth";

describe("loginEmailReducer", () => {
  const initialState = {
    user: null,
    email: "",
    password: "",
    error: "",
    success: false,
  };

  const mockUser = {
    email: "test@example.com",
    name: "Test User",
  };

  it("should return initial state", () => {
    expect(loginEmailReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOGIN_EMAIL", () => {
    const action = {
      type: LOGIN_EMAIL,
      payload: { email: "test@example.com" },
    };

    expect(loginEmailReducer(initialState, action)).toEqual({
      ...initialState,
      email: "test@example.com",
    });
  });

  it("should handle LOGIN_PASSWORD", () => {
    const action = {
      type: LOGIN_PASSWORD,
      payload: { password: "secure123" },
    };

    expect(loginEmailReducer(initialState, action)).toEqual({
      ...initialState,
      password: "secure123",
    });
  });

  it("should handle LOGIN_ERROR", () => {
    const action = {
      type: LOGIN_ERROR,
      payload: { error: "Invalid credentials" },
    };

    expect(loginEmailReducer(initialState, action)).toEqual({
      ...initialState,
      error: "Invalid credentials",
    });
  });

  it("should handle LOGIN_SECCESS", () => {
    const action = {
      type: LOGIN_SECCESS,
      payload: { success: true },
    };

    expect(loginEmailReducer(initialState, action)).toEqual({
      ...initialState,
      success: true,
    });
  });

  it("should handle LOGIN_GET_USER", () => {
    const action = {
      type: LOGIN_GET_USER,
      payload: { user: mockUser },
    };

    expect(loginEmailReducer(initialState, action)).toEqual({
      ...initialState,
      user: mockUser,
    });
  });

  it("should not modify state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(loginEmailReducer(initialState, action)).toBe(initialState);
  });

  it("should handle multiple actions sequentially", () => {
    let state = loginEmailReducer(initialState, {
      type: LOGIN_EMAIL,
      payload: { email: "user@example.com" },
    });

    state = loginEmailReducer(state, {
      type: LOGIN_PASSWORD,
      payload: { password: "qwerty" },
    });

    state = loginEmailReducer(state, {
      type: LOGIN_GET_USER,
      payload: { user: mockUser },
    });

    expect(state).toEqual({
      user: mockUser,
      email: "user@example.com",
      password: "qwerty",
      error: "",
      success: false,
    });
  });
});
