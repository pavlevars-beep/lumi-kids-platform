import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Newspaper, LogOut, Sparkles } from 'lucide-react'
import { useAuth } from '../../features/auth/hooks/useAuth'
import { useTranslation } from '../../i18n/useTranslation'

export function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const navItems = [
    { to: '/admin', label: t.admin.nav.dashboard, icon: LayoutDashboard, end: true },
    { to: '/admin/radionice', label: t.admin.nav.workshops, icon: BookOpen, end: false },
    { to: '/admin/tekstovi', label: t.admin.nav.articles, icon: Newspaper, end: false },
  ]

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-white shadow-card flex flex-col">
        <div className="h-16 flex items-center px-6 gap-2 font-extrabold text-lumi-primary border-b border-gray-100">
          <Sparkles className="w-5 h-5" />
          LumiKids Admin
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive ? 'bg-lumi-primary-light text-lumi-primary' : 'text-gray-600 hover:bg-lumi-warm'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            {t.admin.nav.logout}
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 bg-lumi-warm overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
