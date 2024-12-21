import {
  REGISTRATION_EMAIL,
  REGISTRATION_ERROR,
  REGISTRATION_NAME,
  REGISTRATION_PASSWORD,
  REGISTRATION_SECCESS,
} from "../actions/regisrtation";

const initialState = {
  email: "",
  password: "",
  name: "",
  error: "",
  success: false,
};

export const registrationEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
    case REGISTRATION_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
      };
    case REGISTRATION_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case REGISTRATION_SECCESS:
      return {
        ...state,
        success: action.payload.success,
      };
    default:
      return state;
  }
};
