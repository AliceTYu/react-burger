import {
  LOGIN_EMAIL,
  LOGIN_ERROR,
  LOGIN_GET_USER,
  LOGIN_PASSWORD,
  LOGIN_SECCESS,
} from "../actions/auth";

const initialState = {
  user: {},
  email: "",
  password: "",
  error: "",
  success: false,
};

export const loginEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
    case LOGIN_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case LOGIN_SECCESS:
      return {
        ...state,
        success: action.payload.success,
      };
    case LOGIN_GET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};