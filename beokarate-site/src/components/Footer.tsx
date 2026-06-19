import { Link } from 'react-router-dom'

const secondary = [
  { to: '/o-nama', label: 'Normativna akta' },
  { to: '/o-nama', label: 'Struktura saveza' },
  { to: '/treneri-i-sudije', label: 'Učenička i majstorska zvanja' },
  { to: '/bezbedan-karate', label: 'Disciplinske mere' },
  { to: '/media-i-partneri', label: 'Galerija i arhiva' },
  { to: '/kontakt', label: 'Dokumenta za preuzimanje' },
]

export default function Footer() {
  return (
    <footer className="mt-20 bg-bks-blue-dark text-white">
      {/* Ponovljeni poziv na akciju — roditelj uvek lako pronalazi klub */}
      <div className="bg-bks-red">
        <div className="container-bks flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-extrabold">Tražite karate klub za svoje dete?</h3>
            <p className="text-white/85">Pronađite najbliži klub član BKS-a po opštini.</p>
          </div>
          <Link
            to="/pronadji-klub"
            className="btn bg-white text-bks-red hover:bg-white/90"
          >
            Pronađi klub
          </Link>
        </div>
      </div>

      <div className="container-bks grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-3 text-lg font-extrabold">Beogradski karate savez</div>
          <p className="max-w-md text-sm text-white/75">
            Zajednica klubova koja kroz karate razvija disciplinu, karakter i sportski duh
            dece i mladih. Centralno mesto beogradskog karatea za roditelje, klubove,
            takmičare, trenere, sudije, medije i partnere.
          </p>
        </div>

        <div>
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-white/60">
            Administracija
          </div>
          <ul className="space-y-2 text-sm">
            {secondary.map((item, i) => (
              <li key={i}>
                <Link to={item.to} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-white/60">
            Kontakt
          </div>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Beograd, Srbija</li>
            <li>
              <a href="mailto:info@beokarate.rs" className="hover:text-white">
                info@beokarate.rs
              </a>
            </li>
            <li>
              <Link to="/media-i-partneri" className="hover:text-white">
                Postanite partner BKS-a
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-bks flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Beogradski karate savez. Sva prava zadržana.</span>
          <span>Demonstracioni sajt — sadržaj je primer.</span>
        </div>
      </div>
    </footer>
  )
}
