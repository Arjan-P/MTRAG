import { createBrowserRouter } from "react-router-dom";
import { PublicRoute } from "./PublicRoute"

import { AuthLayout } from "@/modules/auth/layouts/AuthLayout";
import { LoginPage } from "@/modules/auth/pages/LoginPage";
import { SignupPage } from "@/modules/auth/pages/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </PublicRoute>
    )
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <AuthLayout>
          <SignupPage />
        </AuthLayout>
      </PublicRoute>
    )
  }
])
