import { Link } from 'react-router-dom'
import { getPresetByKey } from '../../media/presets'
import { sr } from '../../../i18n/sr'
import type { Article } from '../types'

const categoryLabels = sr.articles.categories

interface Props {
  article: Article
}

export function ArticleCard({ article }: Props) {
  const preset = getPresetByKey(article.preset_image_key)
  const formattedDate = article.publish_date
    ? new Date(article.publish_date).toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''
  const categoryLabel = categoryLabels[article.category as keyof typeof categoryLabels] ?? article.category

  return (
    <Link to={`/articles/${article.slug}`} className="card group block overflow-hidden">
      <div className="h-40 overflow-hidden">
        {article.featured_image_url ? (
          <img src={article.featured_image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : preset ? (
          <div className={`w-full h-full bg-gradient-to-br ${preset.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
            <span className="text-4xl">{preset.icon}</span>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-lumi-lavender to-lumi-sky" />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-lumi-secondary bg-lumi-secondary-light px-2 py-1 rounded-lg">{categoryLabel}</span>
          {formattedDate && <span className="text-xs text-lumi-muted">{formattedDate}</span>}
        </div>
        <h3 className="font-bold text-lumi-dark text-lg mb-2 leading-tight group-hover:text-lumi-primary transition-colors">{article.title}</h3>
        <p className="text-lumi-muted text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-lumi-muted">{article.author}</span>
          <span className="text-lumi-primary font-semibold text-sm group-hover:underline">Čitaj →</span>
        </div>
      </div>
    </Link>
  )
}
