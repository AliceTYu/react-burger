import { IUserr } from "../../utils/types";
import {
  LOGIN_EMAIL,
  LOGIN_ERROR,
  LOGIN_GET_USER,
  LOGIN_PASSWORD,
  LOGIN_SECCESS,
  LoginActions,
} from "../actions/auth";

interface initialStateType {
  email: string;
  password: string;
  error: string ;
  success: boolean;
  user: IUserr | null;
}

export const initialState: initialStateType = {
  user: null,
  email: "",
  password: "",
  error: "",
  success: false,
};

export const loginEmailReducer = (state = initialState, action: LoginActions): initialStateType => {
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
