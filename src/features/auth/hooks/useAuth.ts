import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient'
import { authService } from '../services/authService'
import type { UserProfile } from '../types'

interface AuthState {
  user: { id: string; email?: string } | null
  profile: UserProfile | null
  loading: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
  })

  const loadProfile = useCallback(async (userId: string) => {
    const profile = await authService.getUserProfile(userId)
    setState(prev => ({ ...prev, profile, loading: false }))
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setState({ user: null, profile: null, loading: false })
      return
    }

    authService.getSession().then(session => {
      if (session?.user) {
        setState(prev => ({ ...prev, user: session.user }))
        loadProfile(session.user.id)
      } else {
        setState({ user: null, profile: null, loading: false })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setState(prev => ({ ...prev, user: session.user, loading: true }))
        loadProfile(session.user.id)
      } else {
        setState({ user: null, profile: null, loading: false })
      }
    })

    return () => subscription.unsubscribe()
  }, [loadProfile])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await authService.signIn(email, password)
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    await authService.signOut()
    setState({ user: null, profile: null, loading: false })
  }, [])

  return {
    user: state.user,
    profile: state.profile,
    loading: state.loading,
    isAdmin: !!state.user,
    isAuthenticated: !!state.user,
    signIn,
    signOut,
  }
}
