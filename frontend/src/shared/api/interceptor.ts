import { toast } from "sonner";
import {api} from "./client";
import { getErrorMessage } from "./error";

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
      const message = getErrorMessage(err);
      // handle specific error
      toast.error(message);
      return Promise.reject(err);
    }
  )
}
