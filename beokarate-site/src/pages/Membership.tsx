import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui'

const steps = [
  { n: 1, t: 'Prijava kluba', d: 'Klub podnosi zahtev za prijem uz osnovnu dokumentaciju i podatke o trenerima.' },
  { n: 2, t: 'Provera uslova', d: 'Savez proverava licence trenera, prostor za trening i ispunjenost standarda.' },
  { n: 3, t: 'Prijem u članstvo', d: 'Po odluci nadležnog organa klub postaje punopravni član BKS-a.' },
  { n: 4, t: 'Registracija takmičara', d: 'Klub registruje takmičare i uključuje se u takmičarski sistem.' },
]

const benefits = [
  'Učešće u takmičarskom sistemu BKS-a',
  'Pristup seminarima i edukaciji trenera i sudija',
  'Vidljivost u direktorijumu klubova',
  'Podrška u organizaciji događaja',
  'Informacije o prelaznim rokovima i propisima',
  'Osiguranje i sankcionisanje događaja',
]

export default function Membership() {
  return (
    <>
      <PageHeader
        eyebrow="Klubovi i članstvo"
        title="Postanite član Beogradskog karate saveza"
        subtitle="Sve informacije za postojeće i buduće klubove članove — od prijema u članstvo do registracije takmičara."
      />

      <section className="container-bks py-12">
        <h2 className="mb-6 text-2xl font-extrabold text-bks-blue">Kako klub postaje član</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="card p-6">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-bks-red font-bold text-white">
                {s.n}
              </div>
              <h3 className="font-bold text-bks-blue">{s.t}</h3>
              <p className="mt-1 text-sm text-bks-ink/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bks-mist py-12">
        <div className="container-bks grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-bks-blue">Benefiti članstva</h2>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-bks-ink/80">
                  <span className="mt-1 text-bks-red">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-bks-blue">Obrasci i dokumenta</h2>
            <ul className="space-y-3">
              {['Pristupnica za klubove', 'Obrazac za registraciju takmičara', 'Zahtev za prelazak takmičara', 'Pravilnik o članstvu', 'Cenovnik taksi i naknada'].map(
                (doc) => (
                  <li key={doc}>
                    <a href="#" className="flex items-center gap-3 rounded-lg border border-black/5 bg-white p-3 text-sm font-medium text-bks-blue hover:border-bks-blue/30">
                      <span>📄</span>
                      {doc}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-bks py-12 text-center">
        <h2 className="text-2xl font-extrabold text-bks-blue">Imate pitanje o članstvu?</h2>
        <Link to="/kontakt" className="btn-secondary mt-5">
          Kontakt za administraciju
        </Link>
      </section>
    </>
  )
}
