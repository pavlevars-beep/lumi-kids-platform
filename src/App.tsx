import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/components/AuthContext'
import { router } from './app/router'

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
