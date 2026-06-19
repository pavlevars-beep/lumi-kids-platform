import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { parentArticles } from '../data/parentArticles'

export default function ParentArticle() {
  const { slug } = useParams()
  const article = parentArticles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <section className="container-bks py-20 text-center">
        <h1 className="text-2xl font-extrabold text-bks-blue">Tekst nije pronađen</h1>
        <Link to="/za-roditelje" className="btn-ghost mt-6">
          ← Nazad na vodič za roditelje
        </Link>
      </section>
    )
  }

  return (
    <>
      <PageHeader eyebrow="Za roditelje" title={article.title} subtitle={article.summary} />
      <article className="container-bks max-w-3xl py-12">
        <div className="mb-6 text-sm text-bks-ink/50">
          Vreme čitanja: {article.readingMinutes} min
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-bks-ink/85">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-bks-mist p-6">
          <h2 className="text-lg font-bold text-bks-blue">Sledeći korak</h2>
          <p className="mt-1 text-sm text-bks-ink/70">
            Pronađite klub član BKS-a u svojoj opštini i zakažite probni trening.
          </p>
          <Link to="/pronadji-klub" className="btn-primary mt-4">
            Pronađi klub
          </Link>
        </div>

        <Link to="/za-roditelje" className="mt-8 inline-block text-sm font-semibold text-bks-red">
          ← Svi tekstovi za roditelje
        </Link>
      </article>
    </>
  )
}
