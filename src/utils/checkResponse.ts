import { URL_BASE } from "./fileWithConstants";

export function checkResponse(res: Response): Promise<any> {
  if (!res.ok) {
    return res.json().then((err: { message: string }) => {
      return Promise.reject(new Error(err.message));
    });
  }
  return res.json();
}

export function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  return fetch(`${URL_BASE}${url}`, options).then(checkResponse);
}