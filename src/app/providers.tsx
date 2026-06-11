import { ReactNode } from 'react'
import { AuthProvider } from '../features/auth/components/AuthContext'

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
