import { setupInterceptors } from "@/shared/api/interceptor";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { getUserApi } from "../api/auth.api";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children: ReactNode}) => {
  const [token, setToken] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const [user, setUser] = useState<User | null>(null); 

  const login = (token: string) => {
    setToken(token)
  }

  const logout = () => {
    setToken(null);
    setUser(null);
  }

  // run this effect before fetch user effect
  useEffect(() => {
    tokenRef.current = token;
  }, [token])

  useEffect(() => {
    if(!token) return;
    const fetchUser = async () => {
      try {
        const user = await getUserApi();
        setUser(user);
      } catch {
        logout();
      }
    }
    fetchUser();
  }, [token])

  useEffect(() => {
    setupInterceptors(() => tokenRef.current, logout)
  }, [])
  
  return (
    <AuthContext.Provider value={{token, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error("AuthContext not found");
  return ctx;
}
