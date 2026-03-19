import {api} from "./client";

export const setupInterceptors = (getToken: () => string | null, logout: () => void) => {
  api.interceptors.request.use((config) => {
    const token = getToken();
    if(token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if(err.response.status === 401) {
        logout();
      }
      return Promise.reject(err);
    }
  )
}
