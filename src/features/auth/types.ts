export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: 'parent' | 'admin'
  created_at: string
  updated_at: string
}
