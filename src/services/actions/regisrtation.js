export const REGISTRATION_EMAIL = "REGISTRATION_EMAIL";
export const REGISTRATION_PASSWORD = "REGISTRATION_PASSWORD";
export const REGISTRATION_NAME = "REGISTRATION_NAME";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";
export const REGISTRATION_SECCESS = "REGISTRATION_SECCESS";

export function registEmail(msg) {
  return {
    type: REGISTRATION_EMAIL,
    payload: { email: msg },
  };
}

export function registPassword(msg) {
  return {
    type: REGISTRATION_PASSWORD,
    payload: { password: msg },
  };
}

export function registName(msg) {
  return {
    type: REGISTRATION_NAME,
    payload: { name: msg },
  };
}

export function registError(msg) {
  return {
    type: REGISTRATION_ERROR,
    payload: { error: msg },
  };
}

export function registSuccess(msg) {
  return {
    type: REGISTRATION_SECCESS,
    payload: { success: msg },
  };
}
