import { Link } from 'react-router-dom'
import { InfoCard, SectionHeading, Stat, formatDate } from '../components/ui'
import EventCard from '../components/EventCard'
import { events } from '../data/events'
import { news } from '../data/news'

const upcoming = [...events]
  .filter((e) => e.status !== 'zavrseno' && e.status !== 'rezultati')
  .sort((a, b) => +new Date(a.date) - +new Date(b.date))
  .slice(0, 3)

const latestNews = [...news]
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .slice(0, 3)

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-bks-blue text-white">
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-bks-red blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-white/30 blur-3xl" />
        </div>
        <div className="container-bks relative grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">
              Zajednica beogradskih karate klubova
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Karate za decu, mlade i šampione Beograda
            </h1>
            <p className="mt-4 max-w-lg text-lg text-white/85">
              Beogradski karate savez okuplja klubove koji kroz sport razvijaju disciplinu,
              samopouzdanje, poštovanje i takmičarski duh.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/pronadji-klub" className="btn-primary">
                Pronađi klub
              </Link>
              <Link to="/takmicenja" className="btn-outline">
                Pogledaj kalendar
              </Link>
              <Link to="/za-roditelje" className="btn-outline">
                Saveti za roditelje
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { t: 'Roditelj', d: 'Hoću da upišem dete', to: '/za-roditelje' },
              { t: 'Klub / takmičar', d: 'Kalendar, prijave, rezultati', to: '/takmicenja' },
              { t: 'Trener / sudija', d: 'Seminari i licence', to: '/treneri-i-sudije' },
              { t: 'Partner / medij', d: 'Saradnja i media kit', to: '/media-i-partneri' },
            ].map((c) => (
              <Link
                key={c.t}
                to={c.to}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur transition-colors hover:bg-white/20"
              >
                <div className="text-sm font-bold uppercase tracking-wide text-white/70">
                  {c.t}
                </div>
                <div className="mt-1 font-semibold">{c.d}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ZAŠTO KARATE */}
      <section className="container-bks py-16">
        <SectionHeading title="Zašto karate?" action={{ to: '/za-roditelje', label: 'Saznaj više' }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <InfoCard icon="🥋" title="Disciplina">
            Jasna struktura treninga uči dete redu i istrajnosti.
          </InfoCard>
          <InfoCard icon="💪" title="Samopouzdanje">
            Napredak kroz pojaseve gradi sigurnost u sebe.
          </InfoCard>
          <InfoCard icon="🎯" title="Fokus">
            Koncentracija sa tatamija prenosi se i na školu.
          </InfoCard>
          <InfoCard icon="🤝" title="Poštovanje">
            Poštovanje trenera, protivnika i pravila.
          </InfoCard>
          <InfoCard icon="🏃" title="Fizički razvoj">
            Koordinacija, snaga i zdrave navike od malih nogu.
          </InfoCard>
        </div>
      </section>

      {/* SLEDEĆI DOGAĐAJI */}
      <section className="bg-bks-mist py-16">
        <div className="container-bks">
          <SectionHeading
            title="Sledeći događaji"
            action={{ to: '/takmicenja', label: 'Ceo kalendar' }}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* PRONAĐI KLUB CTA */}
      <section className="container-bks py-16">
        <div className="rounded-3xl bg-bks-blue p-8 text-white sm:p-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold">Pronađi klub u svom delu Beograda</h2>
              <p className="mt-3 text-white/85">
                Unesite opštinu ili naselje i pronađite najbliži karate klub član BKS-a —
                sa terminima treninga, kontaktima i programima za decu.
              </p>
            </div>
            <div className="lg:text-right">
              <Link to="/pronadji-klub" className="btn-primary">
                Otvori direktorijum klubova
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NAJNOVIJE VESTI */}
      <section className="container-bks py-4 pb-16">
        <SectionHeading title="Najnovije vesti" />
        <div className="grid gap-6 md:grid-cols-3">
          {latestNews.map((n) => (
            <article key={n.id} className="card p-5">
              <div className="flex items-center justify-between">
                <span className="badge bg-bks-red/10 text-bks-red">{n.category}</span>
                <time className="text-xs text-bks-ink/50">{formatDate(n.date)}</time>
              </div>
              <h3 className="mt-3 text-lg font-bold text-bks-blue">{n.title}</h3>
              <p className="mt-2 text-sm text-bks-ink/70">{n.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BKS U BROJKAMA */}
      <section className="bg-bks-blue-dark py-16 text-white">
        <div className="container-bks">
          <h2 className="mb-10 text-center text-3xl font-extrabold">BKS u brojkama</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            <Stat value="60+" label="klubova članova" />
            <Stat value="4.500+" label="registrovanih takmičara" />
            <Stat value="40+" label="događaja godišnje" />
            <Stat value="500+" label="medalja godišnje" />
            <Stat value="120+" label="licenciranih trenera" />
            <Stat value="50+" label="sudija" />
          </div>
          <p className="mt-8 text-center text-sm text-white/60">
            Ilustrativni podaci — zamenite zvaničnim brojkama saveza.
          </p>
        </div>
      </section>

      {/* PARTNERI */}
      <section className="container-bks py-16">
        <SectionHeading
          title="Partneri i podrška"
          action={{ to: '/media-i-partneri', label: 'Postanite partner' }}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid h-20 place-items-center rounded-xl border border-black/5 bg-bks-mist text-sm font-semibold text-bks-ink/40"
            >
              Logo {i + 1}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
