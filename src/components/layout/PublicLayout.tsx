import { Outlet, Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { useTranslation } from '../../i18n/useTranslation'

export function PublicLayout() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/radionice', label: t.nav.workshops },
    { to: '/tekstovi', label: t.nav.articles },
    { to: '/brza-igra', label: t.nav.quickPlay },
    { to: '/ai-savetnik', label: t.nav.aiAdvisor },
    { to: '/o-nama', label: t.nav.about },
    { to: '/kontakt', label: t.nav.contact },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-lumi-primary">
            <Sparkles className="w-6 h-6" />
            <span>LumiKids Studio</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive ? 'bg-lumi-primary-light text-lumi-primary' : 'text-gray-600 hover:text-lumi-primary hover:bg-lumi-warm'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button className="md:hidden p-2 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive ? 'bg-lumi-primary-light text-lumi-primary' : 'text-gray-600 hover:bg-lumi-warm'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-extrabold text-lumi-primary">
            <Sparkles className="w-5 h-5" />
            LumiKids Studio
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} LumiKids Studio. Sva prava zadržana.</p>
          <nav className="flex gap-4 text-sm">
            <Link to="/o-nama" className="text-gray-500 hover:text-lumi-primary font-medium">O nama</Link>
            <Link to="/kontakt" className="text-gray-500 hover:text-lumi-primary font-medium">Kontakt</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
