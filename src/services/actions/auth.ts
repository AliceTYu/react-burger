import { IUserr } from "../../utils/types";

export const LOGIN_EMAIL: "LOGIN_EMAIL" = "LOGIN_EMAIL";
export const LOGIN_PASSWORD: "LOGIN_PASSWORD" = "LOGIN_PASSWORD";
export const LOGIN_ERROR: "LOGIN_ERROR" = "LOGIN_ERROR";
export const LOGIN_SECCESS: "LOGIN_SECCESS" = "LOGIN_SECCESS";
export const LOGIN_GET_USER: "LOGIN_GET_USER" = "LOGIN_GET_USER";

interface LoginEmailAction {
  type: typeof LOGIN_EMAIL;
  payload: {email: string;};
}

interface LoginPasswordAction {
  type: typeof LOGIN_PASSWORD;
  payload: {password: string;};
}

interface LoginErrorAction {
  type: typeof LOGIN_ERROR;
  payload: {error: string;};
}

interface LoginSuccessAction {
  type: typeof LOGIN_SECCESS;
  payload: {success: boolean;};
}

interface LoginGetUserAction {
  type: typeof LOGIN_GET_USER;
  payload: {user: IUserr | null;};
}

// Общий тип для всех действий
export type LoginActions =
  | LoginEmailAction
  | LoginPasswordAction
  | LoginErrorAction
  | LoginSuccessAction
  | LoginGetUserAction;

export function loginEmail(msg: string) {
  return {
    type: LOGIN_EMAIL,
    payload: { email: msg },
  };
}

export function loginPassword(msg: string) {
  return {
    type: LOGIN_PASSWORD,
    payload: { password: msg },
  };
}

export function loginError(msg: string): LoginErrorAction {
  return {
    type: LOGIN_ERROR,
    payload: { error: msg },
  };
}

export function loginSuccess(msg: boolean): LoginSuccessAction {
  return {
    type: LOGIN_SECCESS,
    payload: { success: msg },
  };
}

export function loginGetUser(user: IUserr | null ): LoginGetUserAction {
  return {
    type: LOGIN_GET_USER,
    payload: { user },
  };
}
