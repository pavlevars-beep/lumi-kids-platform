import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, LogIn } from 'lucide-react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { Input } from '../components/ui/Input'

export function AdminLoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin/dashboard')
    } catch {
      setError('Pogrešan email ili lozinka')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-lumi-warm flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lumi-primary rounded-2xl shadow-warm mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">LumiKids Admin</h1>
          <p className="text-gray-500 mt-2">Prijavite se na administratorski panel</p>
        </div>
        <div className="bg-white rounded-3xl shadow-card p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 mb-4 text-sm text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email adresa" type="email" value={email} onChange={setEmail} required />
            <Input label="Lozinka" type="password" value={password} onChange={setPassword} required />
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 mt-6">
              <LogIn className="w-4 h-4" />
              {loading ? 'Prijavljivanje...' : 'Prijavi se'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
