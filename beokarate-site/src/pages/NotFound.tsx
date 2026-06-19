import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-bks py-24 text-center">
      <div className="text-6xl font-extrabold text-bks-red">404</div>
      <h1 className="mt-4 text-2xl font-extrabold text-bks-blue">Stranica nije pronađena</h1>
      <p className="mt-2 text-bks-ink/70">
        Tražena stranica ne postoji ili je premeštena.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Nazad na naslovnu
      </Link>
    </section>
  )
}
