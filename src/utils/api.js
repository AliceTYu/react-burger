import {
  loginAccessToken,
  loginError,
  loginGetUser,
  loginSuccess,
} from "../services/actions/auth";
import { registError, registSuccess } from "../services/actions/regisrtation";
import { Navigate } from "react-router-dom";
import { request } from "./checkResponse";

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

// функция обычная
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
    console.log("Ошибка при обновлении токена", err);
    localStorage.removeItem("refreshToken");
    eraseCookie("accessToken");
  }
};

// ============ ОБНОВИТЬ ДАННЫЕ ===============
export const saveChange = (name, email, pass) => async (dispatch) => {
  const accessToken = getCookie("accessToken");
  try {
    const data = await request("auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        email,
        pass,
        name,
      }),
    });

    if (accessToken) {
      dispatch(loginSuccess(true));
      dispatch(loginGetUser(data.user));
    }
  } catch (err) {
    console.log(err);
  }
};

// ============ ПРОВЕРИТЬ ПОЛЬЗОВАТЕЛЯ ===============
export const getUserData = () => async (dispatch) => {
  dispatch(loginSuccess(false));
  const accessToken = getCookie("accessToken");

  if (accessToken) {
    try {
      const data = await request("auth/user", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });

      dispatch(loginSuccess(true));
      dispatch(loginGetUser(data.user));
    } catch (err) {
      console.log(err);
      await dispatch(updateAccessToken());
    }
  }
};

function setCookie(name, value, minutes) {
  let expires = "";
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=0;";
}
