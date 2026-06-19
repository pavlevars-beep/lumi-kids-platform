import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui'

const topics = [
  { icon: '🛡️', t: 'Zaštita dece', d: 'Standardi i procedure zaštite dece i mladih u svim klubovima članovima.' },
  { icon: '📜', t: 'Kodeksi ponašanja', d: 'Pravila ponašanja za trenere, roditelje i takmičare.' },
  { icon: '🚸', t: 'Anti-bullying politika', d: 'Nulta tolerancija na vršnjačko nasilje i zlostavljanje.' },
  { icon: '🩺', t: 'Zdravstvena bezbednost', d: 'Postupanje u slučaju povreda i zdravstveni standardi na treninzima.' },
  { icon: '📷', t: 'Fotografisanje dece', d: 'Pravila i saglasnosti za fotografisanje i objavljivanje fotografija dece.' },
  { icon: '⚖️', t: 'Fer-plej', d: 'Promocija poštenja, poštovanja protivnika i sportskog duha.' },
]

export default function SafeKarate() {
  return (
    <>
      <PageHeader
        eyebrow="Bezbedan karate"
        title="Bezbednost dece i etički standardi"
        subtitle="Moderan savez nije samo organizator takmičenja, nego garant standarda, bezbednosti i kvaliteta rada sa decom."
      />

      <section className="container-bks py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <div key={t.t} className="card p-6">
              <div className="mb-3 text-3xl">{t.icon}</div>
              <h3 className="font-bold text-bks-blue">{t.t}</h3>
              <p className="mt-1 text-sm text-bks-ink/70">{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bks-red py-12 text-white">
        <div className="container-bks grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Prijava nepravilnosti</h2>
            <p className="mt-2 max-w-lg text-white/90">
              Ako kao roditelj, takmičar ili član kluba primetite nepravilnost ili imate
              problem, savez obezbeđuje jasnu i poverljivu proceduru prijave.
            </p>
          </div>
          <div className="lg:text-right">
            <Link to="/kontakt" className="btn bg-white text-bks-red hover:bg-white/90">
              Prijavi nepravilnost
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
