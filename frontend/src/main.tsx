import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from './shared/ui/sonner' 
import './index.css'
import { ThemeProvider } from './shared/theme/ThemeContext'
import { AuthProvider } from './modules/auth/context/AuthContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
