import { Outlet, Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from '../../i18n/useTranslation'
import { MusicPlayer } from '../ui/MusicPlayer'

export function PublicLayout() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/workshops', label: t.nav.workshops },
    { to: '/articles', label: t.nav.articles },
    { to: '/quick-play', label: t.nav.quickPlay },
    { to: '/ai-advisor', label: t.nav.aiAdvisor },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.svg"
              alt="LumiKids Studio"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-lumi-blue text-white shadow-sm'
                      : 'text-gray-600 hover:text-lumi-dark-blue hover:bg-lumi-secondary-light'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <MusicPlayer />
            <button className="md:hidden p-2 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
                    isActive ? 'bg-lumi-blue text-white' : 'text-gray-600 hover:bg-lumi-secondary-light'
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

      <footer className="bg-lumi-dark-blue text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/logo.svg" alt="LumiKids Studio" className="h-10 w-auto object-contain brightness-0 invert" />
          <p className="text-blue-200 text-sm">© {new Date().getFullYear()} LumiKids Studio. Sva prava zadržana.</p>
          <nav className="flex gap-4 text-sm">
            <Link to="/about" className="text-blue-200 hover:text-white font-medium transition-colors">O nama</Link>
            <Link to="/contact" className="text-blue-200 hover:text-white font-medium transition-colors">Kontakt</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
