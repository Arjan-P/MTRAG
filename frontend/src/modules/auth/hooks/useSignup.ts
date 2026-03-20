import { useState } from "react";
import { registerApi } from "../api/auth.api";

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (name: string, email: string, password: string, confirmedPassword: string) => {
    if(confirmedPassword !== password) {
      throw new Error("Passwords do not match");
    }
    setLoading(true);
    try {
      await registerApi({ name, email, password });
    } catch(err: any) {
        const message = err?.response?.data?.message || "Signup failed"; 
        throw new Error(message);
    } finally {
      setLoading(false);
    }
  }
  return { handleSignup, loading }
}
