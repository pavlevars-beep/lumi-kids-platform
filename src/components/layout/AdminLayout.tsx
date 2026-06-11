import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Newspaper, LogOut } from 'lucide-react'
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
    { to: '/admin/dashboard', label: t.admin.nav.dashboard, icon: LayoutDashboard, end: true },
    { to: '/admin/workshops', label: t.admin.nav.workshops, icon: BookOpen, end: false },
    { to: '/admin/articles', label: t.admin.nav.articles, icon: Newspaper, end: false },
  ]

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-lumi-dark-blue flex flex-col">
        <div className="h-16 flex items-center justify-center px-4 border-b border-blue-700">
          <img src="/logo.svg" alt="LumiKids Studio" className="h-10 w-auto object-contain brightness-0 invert" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-lumi-blue text-white shadow-glow'
                    : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-blue-200 hover:bg-red-500 hover:text-white transition-all w-full"
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
