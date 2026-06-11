import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Props {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = true }: Props) {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lumi-warm">
        <div className="text-lumi-muted">Učitavanje...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lumi-warm">
        <div className="text-center">
          <p className="text-2xl font-bold text-lumi-dark mb-2">Nemate pristup ovoj stranici.</p>
          <p className="text-lumi-muted">Kontaktirajte administratora.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
