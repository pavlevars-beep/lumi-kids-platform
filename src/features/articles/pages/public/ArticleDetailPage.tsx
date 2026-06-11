import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { articleService } from '../../services/articleService'
import { getPresetByKey } from '../../../media/presets'
import { LoadingState } from '../../../../components/ui/LoadingState'
import { ErrorState } from '../../../../components/ui/ErrorState'
import { sr } from '../../../../i18n/sr'
import type { Article } from '../../types'

const categoryLabels = sr.articles.categories

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    articleService.getBySlug(slug)
      .then(data => { setArticle(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [slug])

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-12"><LoadingState /></div>
  if (error || !article) return <div className="max-w-3xl mx-auto px-4 py-12"><ErrorState message="Tekst nije pronađen." /></div>

  const preset = getPresetByKey(article.preset_image_key)
  const formattedDate = article.publish_date
    ? new Date(article.publish_date).toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''
  const categoryLabel = categoryLabels[article.category as keyof typeof categoryLabels] ?? article.category

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/articles" className="inline-flex items-center gap-2 text-lumi-muted hover:text-lumi-dark mb-8 transition-colors">
        <ChevronLeft size={18} /> Svi tekstovi
      </Link>

      <article className="card overflow-hidden">
        <div className="h-56 md:h-72 relative">
          {article.featured_image_url ? (
            <img src={article.featured_image_url} alt={article.title} className="w-full h-full object-cover" />
          ) : preset ? (
            <div className={`w-full h-full bg-gradient-to-br ${preset.gradient} flex items-center justify-center`}>
              <span className="text-7xl">{preset.icon}</span>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-lumi-lavender to-lumi-sky" />
          )}
        </div>

        <div className="p-6 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-lumi-secondary bg-lumi-secondary-light px-3 py-1 rounded-full">{categoryLabel}</span>
            {formattedDate && <span className="text-sm text-lumi-muted">{formattedDate}</span>}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-lumi-dark mb-4 leading-tight">{article.title}</h1>
          <p className="text-xl text-lumi-muted mb-2 leading-relaxed font-medium">{article.excerpt}</p>
          <p className="text-sm text-lumi-muted mb-8">Autor: {article.author}</p>

          <div className="prose max-w-none text-lumi-dark leading-relaxed">
            {article.body.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h3 key={i} className="text-xl font-bold text-lumi-dark mt-8 mb-3">{paragraph.slice(2, -2)}</h3>
              }
              if (paragraph.startsWith('- ') || paragraph.includes('\n- ')) {
                const items = paragraph.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2))
                return <ul key={i} className="list-disc list-inside space-y-2 mb-6 text-lumi-muted">{items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              }
              return <p key={i} className="mb-5 text-lumi-muted leading-relaxed">{paragraph}</p>
            })}
          </div>

          {article.tags.length > 0 && (
            <div className="border-t border-gray-100 pt-6 mt-8 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="bg-lumi-warm text-lumi-muted text-sm px-3 py-1 rounded-full">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
