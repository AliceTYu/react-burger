import { URL_BASE } from "./fileWithConstants";

export function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }
  return res.json();
}

export function request(url, options = {}) {
  return fetch(`${URL_BASE}${url}`, options).then(checkResponse);
}
