import { useState } from "react";
import {loginApi} from "../api/auth.api";
import {useAuth} from "../context/AuthContext";

export const useLogin = () => {
  const {login} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginApi({email, password});
      login(data.token);
    } finally {
      setLoading(false);
    }
  }
  return {handleLogin, loading}
}
