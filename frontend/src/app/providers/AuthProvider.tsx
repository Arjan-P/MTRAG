import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User {
  token: string;
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuth: boolean,
  login: (token: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
        
  }, []);

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const cntx = useContext(AuthContext);
  if (!cntx) {
    throw new Error("useSignaling must be used within an AuthProvider");
  }
  return cntx;
}
