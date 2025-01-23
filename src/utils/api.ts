import {
  loginError,
  loginGetUser,
  loginSuccess,
} from "../services/actions/auth";
import { registError, registSuccess } from "../services/actions/regisrtation";
import { Navigate } from "react-router-dom";
import { request } from "./checkResponse";
import { eraseCookie, getCookie, setCookie } from "./cookie";

// ============ РЕГИСТРАЦИЯ ===============
interface IregisterEmail {
  "success": boolean,
  "user": {
    "email": string,
    "name": string
  },
  "accessToken": string,
  "refreshToken": string
}

// @ts-ignore
export const registerEmail = (email: string, password: string, name: string) => async (dispatch) => {
  try {
    const data = await request("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }) as IregisterEmail;
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
// @ts-ignore
export const loginEmailTh = (email: string, password: string) => async (dispatch) => {
  try {
    const data = await request("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }) as IregisterEmail;
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

// @ts-ignores
export const exitLogin = () => async (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const data = await request("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: refreshToken }),
    }) as IforgotEmail;
    localStorage.removeItem("refreshToken");
    eraseCookie("accessToken");

    dispatch(loginGetUser({}));
  } catch (err: any) {
    console.log("выход из профиля err", err.message);
  }
};

// ============ ВОССТАНОВИТЬ ПАРОЛЬ ===============
export const forgotEmail = async (objData: string) => {
  try {
    const data = await request("password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: objData }),
    }) as IforgotEmail;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const resetPasswordProfile = async (password: string, token: string) => {
  try {
    const data = await request("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ password: password, token: token }),
    }) as IforgotEmail;

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

// @ts-ignore
export const updateAccessToken = () => async (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return null;
  }

  try {
    const data = await request("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: refreshToken }),
    }) as IUpdateAccessToken;
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

// @ts-ignore
export const saveChange = (name: string, email: string, pass: string) => async (dispatch) => {
  try {
    const data = await fetchWithRefresh("auth/user", {
      method: "PATCH",
      body: JSON.stringify({ email, pass, name }),
    }) as IUser;

    dispatch(loginSuccess(true));
    dispatch(loginGetUser(data.user));
  } catch (err) {
    console.log(err);
  }
};

// ============ ПРОВЕРИТЬ ПОЛЬЗОВАТЕЛЯ ===============
// @ts-ignore
export const getUserData = () => async (dispatch) => {
  dispatch(loginSuccess(false));
  try {
    const data = await fetchWithRefresh("auth/user", {
      method: "GET",
    }) as IUser;
    dispatch(loginSuccess(true));
    dispatch(loginGetUser(data.user));
  } catch (err) {
    console.log(err);
  }
};

// export const getUserData = () => async (dispatch) => {
//   dispatch(loginSuccess(false));
//   const accessToken = getCookie("accessToken");

//   if (accessToken) {
//     try {
//       const data = await request("auth/user", {
//         method: "GET",
//         mode: "cors",
//         cache: "no-cache",
//         credentials: "same-origin",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: accessToken,
//         },
//         redirect: "follow",
//         referrerPolicy: "no-referrer",
//       });

//       dispatch(loginSuccess(true));
//       dispatch(loginGetUser(data.user));
//     } catch (err) {
//       console.log(err);
//       await dispatch(updateAccessToken());
//     }
//   }
// };


// @ts-ignore
async function fetchWithRefresh(url: string, options: RequestInit = {}, dispatch?) {
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
    return response;
  } catch (error) {
    await dispatch(updateAccessToken());
    return dispatch(fetchWithRefresh(url, options, dispatch));
  }
}
