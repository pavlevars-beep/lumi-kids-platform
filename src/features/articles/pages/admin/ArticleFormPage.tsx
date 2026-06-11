import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { ArticleForm } from './ArticleForm'
import { articleService } from '../../services/articleService'
import { LoadingState } from '../../../../components/ui/LoadingState'
import type { Article } from '../../types'

export function ArticleFormPage() {
  const { id } = useParams<{ id?: string }>()
  const isEdit = !!id
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(isEdit)

  useEffect(() => {
    if (!id) return
    articleService.getById(id).then(data => {
      setArticle(data)
      setLoading(false)
    })
  }, [id])

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/articles" className="flex items-center gap-1 text-lumi-muted hover:text-lumi-dark transition-colors">
          <ChevronLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold text-lumi-dark">
          {isEdit ? 'Izmeni tekst' : 'Napiši tekst'}
        </h1>
      </div>
      {loading ? <LoadingState /> : <ArticleForm existing={article ?? undefined} />}
    </div>
  )
}
