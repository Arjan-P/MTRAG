import { useState } from "react";
import { registerApi } from "../api/auth.api";

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await registerApi({ name, email, password });
    } finally {
      setLoading(false);
    }
  }
  return { handleSignup, loading }
}
