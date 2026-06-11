import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl mb-6">🔍</div>
      <h1 className="text-4xl font-extrabold text-lumi-dark mb-4">404</h1>
      <p className="text-lumi-muted text-lg mb-8">Stranica nije pronađena.</p>
      <Link to="/" className="btn-primary">Nazad na početnu</Link>
    </div>
  )
}
