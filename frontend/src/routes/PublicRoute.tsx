import { Navigate } from "react-router-dom";
import { useAuth } from "@/modules/auth/context/AuthContext";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
