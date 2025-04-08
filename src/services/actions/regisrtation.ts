export const REGISTRATION_EMAIL: "REGISTRATION_EMAIL" = "REGISTRATION_EMAIL";
export const REGISTRATION_PASSWORD: "REGISTRATION_PASSWORD" = "REGISTRATION_PASSWORD";
export const REGISTRATION_NAME: "REGISTRATION_NAME" = "REGISTRATION_NAME";
export const REGISTRATION_ERROR: "REGISTRATION_ERROR" = "REGISTRATION_ERROR";
export const REGISTRATION_SECCESS: "REGISTRATION_SECCESS" = "REGISTRATION_SECCESS";

interface RegistrationEmailAction {
  type: typeof REGISTRATION_EMAIL;
  payload: { email: string };
}

interface RegistrationPasswordAction {
  type: typeof REGISTRATION_PASSWORD;
  payload: { password: string };
}

interface RegistrationNameAction {
  type: typeof REGISTRATION_NAME;
  payload: { name: string };
}

interface RegistrationErrorAction {
  type: typeof REGISTRATION_ERROR;
  payload: { error: string };
}

interface RegistrationSuccessAction {
  type: typeof REGISTRATION_SECCESS;
  payload: { success: boolean };
}

export type RegistrationAction =
  | RegistrationEmailAction
  | RegistrationPasswordAction
  | RegistrationNameAction
  | RegistrationErrorAction
  | RegistrationSuccessAction;


export function registEmail(msg: string) {
  return {
    type: REGISTRATION_EMAIL,
    payload: { email: msg },
  };
}

export function registPassword(msg: string) {
  return {
    type: REGISTRATION_PASSWORD,
    payload: { password: msg },
  };
}

export function registName(msg: string) {
  return {
    type: REGISTRATION_NAME,
    payload: { name: msg },
  };
}

export function registError(msg: string): RegistrationErrorAction {
  return {
    type: REGISTRATION_ERROR,
    payload: { error: msg },
  };
}

export function registSuccess(msg: boolean): RegistrationSuccessAction {
  return {
    type: REGISTRATION_SECCESS,
    payload: { success: msg },
  };
}
