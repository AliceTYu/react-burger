import {
  loginError,
  loginGetUser,
  loginSuccess,
} from "../services/actions/auth";
import { registError, registSuccess } from "../services/actions/regisrtation";
import { request } from "./checkResponse";
import { eraseCookie, getCookie, setCookie } from "./cookie";
import {AppDispatch, useDispatch} from '../index'

// ============ РЕГИСТРАЦИЯ ===============
interface IregisterEmail {
  "success": boolean,
  "user": {
    "email": string,
    "name": string,
  },
  "accessToken": string,
  "refreshToken": string,
}

export const registerEmail = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
  try {
    const data = await request<IregisterEmail>("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    localStorage.setItem("refreshToken", data.refreshToken);
    setCookie("accessToken", data.accessToken, 200);

    dispatch(getUserData());
    dispatch(registSuccess(true));
    dispatch(registError(""));
  } catch (err: any) {
    dispatch(registError(err.message));
  }
};

/*
  turaeva.alis@yandex.ru
  123
  Алиса
*/
// ============ ВХОД ===============
export const loginEmailTh = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const data = await request<IregisterEmail>("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    localStorage.setItem("refreshToken", data.refreshToken);
    setCookie("accessToken", data.accessToken, 200);

    dispatch(loginGetUser(data.user));
    dispatch(loginSuccess(true));
  } catch (err: any) {
    dispatch(loginError(err.message));
  }
};

// ============ ВЫХОД ===============
interface IforgotEmail {
  success: boolean
  message: string
}

export const exitLogin = () => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const data = await request<IforgotEmail>("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: refreshToken }),
    });
    localStorage.removeItem("refreshToken");
    eraseCookie("accessToken");

    dispatch(loginGetUser(null));
  } catch (err: any) {
    console.log("выход из профиля err", err.message);
  }
};

// ============ ВОССТАНОВИТЬ ПАРОЛЬ ===============
export const forgotEmail = async (objData: string) => {
  try {
    const data = await request<IforgotEmail>("password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: objData }),
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const resetPasswordProfile = async (password: string, token: string) => {
  try {
    const data = await request<IforgotEmail>("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ password: password, token: token }),
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

// ============ ОБНОВИТЬ accessToken ===============
interface IUpdateAccessToken {
  "success": boolean;
  "accessToken": string;
  "refreshToken": string
} 

export const updateAccessToken = () => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  
  if (!refreshToken) {
    return null;
  }

  try {
    const data = await request<IUpdateAccessToken>("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: refreshToken }),
    });
    if (data.accessToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
      setCookie("accessToken", data.accessToken, 200);
      dispatch(getUserData());
    }
  } catch (err) {
    localStorage.removeItem("refreshToken");
    eraseCookie("accessToken");
  }
};

// ============ ОБНОВИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ===============
interface IUser{
  "success": boolean,
  "user": { 
    "email": string,
    "name": string
  }
} 

export const saveChange = (name: string, email: string, pass: string) => async (dispatch: AppDispatch) => {
  try {
    const data = await fetchWithRefresh<IUser>("auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pass, name }),
    });

    dispatch(loginSuccess(true));
    dispatch(loginGetUser(data.user));
  } catch (err) {
    console.log(err);
  }
}

// ============ ПРОВЕРИТЬ ПОЛЬЗОВАТЕЛЯ ===============

export const getUserData = () => async (dispatch: AppDispatch) => {
  dispatch(loginSuccess(false));
  try {
    const data = await fetchWithRefresh<IUser>("auth/user", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    dispatch(loginSuccess(true));
    dispatch(loginGetUser(data.user));
  } catch (err) {
    console.log(err);
  }
};

async function fetchWithRefresh<T>(url: string, options: RequestInit = {}, dispatch?: AppDispatch): Promise<T> {
  const accessToken = getCookie("accessToken");

  if (accessToken) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: accessToken,
    };
  }

  try {
    const response = await request(url, options);
    return response as T;
  } catch (error) {
    if (dispatch) {
      await dispatch(updateAccessToken());
      return fetchWithRefresh(url, options, dispatch);
    } else {
      throw error;
    }
  }
}
