export const LOGIN_EMAIL = "LOGIN_EMAIL";
export const LOGIN_PASSWORD = "LOGIN_PASSWORD";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SECCESS = "LOGIN_SECCESS";
export const LOGIN_GET_USER = "LOGIN_GET_USER";

export function loginEmail(msg) {
  return {
    type: LOGIN_EMAIL,
    payload: { email: msg },
  };
}

export function loginPassword(msg) {
  return {
    type: LOGIN_PASSWORD,
    payload: { password: msg },
  };
}

export function loginError(msg) {
  return {
    type: LOGIN_ERROR,
    payload: { error: msg },
  };
}

export function loginSuccess(msg) {
  return {
    type: LOGIN_SECCESS,
    payload: { success: msg },
  };
}

export function loginGetUser(user) {
  return {
    type: LOGIN_GET_USER,
    payload: { user },
  };
}
