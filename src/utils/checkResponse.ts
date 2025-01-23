import { URL_BASE } from "./fileWithConstants";

interface ApiError {
  message: string;
}

export function checkResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // return Promise.reject(new Error(res.status));
    return res.json().then((err: ApiError) => {
      return Promise.reject(new Error(err.message));
    });
  }
  return res.json();
}

export function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  return fetch(`${URL_BASE}${url}`, options).then(checkResponse<T>);
}
