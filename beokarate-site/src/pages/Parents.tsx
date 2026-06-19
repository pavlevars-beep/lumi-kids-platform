import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { parentArticles } from '../data/parentArticles'

const faqs = [
  {
    q: 'Kada dete može da počne sa karateom?',
    a: 'Većina klubova prima decu od 4–5 godina u posebne grupe za najmlađe, sa programom kroz igru.',
  },
  {
    q: 'Šta je potrebno za prvi trening?',
    a: 'Samo udobna sportska odeća i voda. Kimono i opremu nabavljate kasnije, u dogovoru sa klubom.',
  },
  {
    q: 'Koliko treninga nedeljno je dovoljno?',
    a: 'Za početnike su obično dovoljna dva treninga nedeljno. Takmičari treniraju češće.',
  },
  {
    q: 'Kako da izaberem dobar klub?',
    a: 'Proverite da li klub ima licencirane trenere, jasne termine i da je član BKS-a. Posetite probni trening.',
  },
]

export default function Parents() {
  return (
    <>
      <PageHeader
        eyebrow="Za roditelje"
        title="Vodič za roditelje"
        subtitle="Sve što treba da znate pre nego što upišete dete na karate — od prvog treninga do prvog takmičenja."
      />

      <section className="container-bks py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {parentArticles.map((a) => (
            <Link
              key={a.slug}
              to={`/za-roditelje/${a.slug}`}
              className="card flex flex-col p-6"
            >
              <h3 className="text-lg font-bold text-bks-blue">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm text-bks-ink/70">{a.summary}</p>
              <span className="mt-4 text-sm font-semibold text-bks-red">
                Pročitaj · {a.readingMinutes} min →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bks-mist py-12">
        <div className="container-bks">
          <h2 className="mb-6 text-2xl font-extrabold text-bks-blue sm:text-3xl">
            Najčešća pitanja roditelja
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="card p-5">
                <h3 className="font-bold text-bks-blue">{f.q}</h3>
                <p className="mt-2 text-sm text-bks-ink/70">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-bks py-12">
        <div className="rounded-3xl bg-bks-red p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Spremni da upišete dete?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/90">
            Pronađite najbliži klub član BKS-a i pošaljite upit za probni trening.
          </p>
          <Link to="/pronadji-klub" className="btn mt-6 bg-white text-bks-red hover:bg-white/90">
            Pronađi klub
          </Link>
        </div>
      </section>
    </>
  )
}
