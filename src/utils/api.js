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
export const registerEmail = (email, password, name) => async (dispatch) => {
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
    });
    localStorage.setItem("refreshToken", data.refreshToken);
    setCookie("accessToken", data.accessToken, 200);

    dispatch(getUserData());
    dispatch(registSuccess(true));
    dispatch(registError(""));
  } catch (err) {
    dispatch(registError(err.message));
  }
};

/*
  turaeva.alis@yandex.ru
  123
  Алиса
*/
// ============ ВХОД ===============
export const loginEmailTh = (email, password) => async (dispatch) => {
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
    });
    localStorage.setItem("refreshToken", data.refreshToken);
    setCookie("accessToken", data.accessToken, 200);

    dispatch(loginGetUser(data.user));
    dispatch(loginSuccess(true));
  } catch (err) {
    dispatch(loginError(err.message));
  }
};

// ============ ВЫХОД ===============
export const exitLogin = () => async (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const data = await request("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: refreshToken }),
    });
    localStorage.removeItem("refreshToken");
    eraseCookie("accessToken");

    dispatch(loginGetUser({}));
  } catch (err) {
    console.log("выход из профиля err", err.message);
  }
};

// ============ ВОССТАНОВИТЬ ПАРОЛЬ ===============
export const forgotEmail = async (objData) => {
  try {
    const data = await request("password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: objData }),
    });

    return <Navigate to="/reset-password" />;
  } catch (err) {
    console.log(err);
  }
};

export const resetPasswordProfile = async (password, token) => {
  try {
    const data = await request("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ password: password, token: token }),
    });

    return <Navigate to="/login" />;
  } catch (err) {
    console.log(err);
  }
};

// ============ ОБНОВИТЬ accessToken ===============
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
export const saveChange = (name, email, pass) => async (dispatch) => {
  try {
    const data = await fetchWithRefresh(
      "auth/user",
      {
        method: "PATCH",
        body: JSON.stringify({ email, pass, name }),
      },
      dispatch
    );

    dispatch(loginSuccess(true));
    dispatch(loginGetUser(data.user));
  } catch (err) {
    console.log(err);
  }
};

// ============ ПРОВЕРИТЬ ПОЛЬЗОВАТЕЛЯ ===============
export const getUserData = () => async (dispatch) => {
  dispatch(loginSuccess(false));
  try {
    const data = await fetchWithRefresh(
      "auth/user",
      {
        method: "GET",
      },
      dispatch
    );
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

async function fetchWithRefresh(url, options = {}, dispatch) {
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
