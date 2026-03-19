import { api } from "@/shared/api/client";

export const registerApi = async (data: { email: string; password: string }) => {
  const res = await api.post("/api/users", data);
  return res.data as {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  }
}

export const loginApi = async (data:  {email: string; password: string}) => {
  const res = await api.post("/api/user/login", data);
  return res.data as {
    token: string;
    id: string;
    email: string;
    name: string;
  };
}

export const getUserApi = async () => {
  const res = await api.get("/api/user/me");
  return res.data as {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    };
}
