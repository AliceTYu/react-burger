import {
  REGISTRATION_EMAIL,
  REGISTRATION_ERROR,
  REGISTRATION_NAME,
  REGISTRATION_PASSWORD,
  REGISTRATION_SECCESS,
} from "../actions/regisrtation";
import {
  initialState,
  registrationEmailReducer,
} from "../reducers/regisrtation";

describe("registrationEmailReducer", () => {
  it("should return initial state", () => {
    expect(registrationEmailReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle REGISTRATION_EMAIL action", () => {
    const action = {
      type: REGISTRATION_EMAIL,
      payload: { email: "test@example.com" },
    };

    expect(registrationEmailReducer(initialState, action)).toEqual({
      ...initialState,
      email: "test@example.com",
    });
  });

  it("should handle REGISTRATION_PASSWORD action", () => {
    const action = {
      type: REGISTRATION_PASSWORD,
      payload: { password: "secure123!" },
    };

    expect(registrationEmailReducer(initialState, action)).toEqual({
      ...initialState,
      password: "secure123!",
    });
  });

  it("should handle REGISTRATION_NAME action", () => {
    const action = {
      type: REGISTRATION_NAME,
      payload: { name: "John Doe" },
    };

    expect(registrationEmailReducer(initialState, action)).toEqual({
      ...initialState,
      name: "John Doe",
    });
  });

  it("should handle REGISTRATION_ERROR action", () => {
    const action = {
      type: REGISTRATION_ERROR,
      payload: { error: "Registration failed" },
    };

    expect(registrationEmailReducer(initialState, action)).toEqual({
      ...initialState,
      error: "Registration failed",
    });
  });

  it("should handle REGISTRATION_SECCESS action", () => {
    const action = {
      type: REGISTRATION_SECCESS,
      payload: { success: true },
    };

    expect(registrationEmailReducer(initialState, action)).toEqual({
      ...initialState,
      success: true,
    });
  });

  it("should not modify state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(registrationEmailReducer(initialState, action)).toBe(initialState);
  });

  it("should handle multiple actions sequentially", () => {
    let state = registrationEmailReducer(initialState, {
      type: REGISTRATION_EMAIL,
      payload: { email: "user@example.com" },
    });

    state = registrationEmailReducer(state, {
      type: REGISTRATION_PASSWORD,
      payload: { password: "P@ssw0rd" },
    });

    state = registrationEmailReducer(state, {
      type: REGISTRATION_NAME,
      payload: { name: "Alice Smith" },
    });

    state = registrationEmailReducer(state, {
      type: REGISTRATION_SECCESS,
      payload: { success: true },
    });

    expect(state).toEqual({
      email: "user@example.com",
      password: "P@ssw0rd",
      name: "Alice Smith",
      error: "",
      success: true,
    });
  });

  it("should handle empty values", () => {
    const action = {
      type: REGISTRATION_NAME,
      payload: { name: "" },
    };

    expect(registrationEmailReducer(initialState, action)).toEqual({
      ...initialState,
      name: "",
    });
  });
});
