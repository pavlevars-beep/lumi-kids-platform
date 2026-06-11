import { supabase, isSupabaseConfigured } from '../../../lib/supabaseClient'
import type { UserProfile } from '../types'

export const authService = {
  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured) throw new Error('Supabase nije konfigurisan')
    return supabase.auth.signInWithPassword({ email, password })
  },

  async signOut() {
    if (!isSupabaseConfigured) return
    return supabase.auth.signOut()
  },

  async getSession() {
    if (!isSupabaseConfigured) return null
    const { data } = await supabase.auth.getSession()
    return data.session
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (!isSupabaseConfigured) return null
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) return null
    return data as UserProfile
  },
}
