import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Eye, Trash2 } from 'lucide-react'
import { articleService } from '../../services/articleService'
import { StatusPill } from '../../../../components/ui/StatusPill'
import { Button } from '../../../../components/ui/Button'
import { LoadingState } from '../../../../components/ui/LoadingState'
import { EmptyState } from '../../../../components/ui/EmptyState'
import type { Article } from '../../types'

const categoryMap: Record<string, string> = {
  'Parenting': 'Roditeljstvo', 'Child Development': 'Razvoj deteta',
  'Emotions & Behavior': 'Emocije i ponašanje', 'Creativity': 'Kreativnost',
  'Talent Exploration': 'Otkrivanje talenata', 'Studio News': 'Vesti studija', 'Other': 'Ostalo',
}

export function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const data = await articleService.getAll()
    setArticles(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handlePublishToggle = async (a: Article) => {
    if (a.status === 'published') await articleService.unpublish(a.id)
    else await articleService.publish(a.id)
    load()
  }

  const handleDelete = async (a: Article) => {
    if (!window.confirm(`Da li ste sigurni da želite da obrišete "${a.title}"?`)) return
    await articleService.delete(a.id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-lumi-dark">Tekstovi</h1>
          <p className="text-lumi-muted text-sm mt-1">Upravljajte tekstovima za roditelje</p>
        </div>
        <Link to="/admin/articles/new">
          <Button size="sm"><Plus size={16} className="mr-2" />Napiši tekst</Button>
        </Link>
      </div>

      {loading && <LoadingState />}
      {!loading && articles.length === 0 && (
        <EmptyState
          icon="📝"
          title="Još nema tekstova"
          description="Napišite prvi tekst za roditelje."
          action={{ label: 'Napiši tekst', onClick: () => window.location.href = '/admin/articles/new' }}
        />
      )}

      {!loading && articles.length > 0 && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Naslov', 'Kategorija', 'Datum', 'Status', 'Akcije'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-lumi-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {articles.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 font-medium text-lumi-dark max-w-xs">
                      <div className="truncate">{a.title}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-lumi-muted">{categoryMap[a.category] ?? a.category}</td>
                    <td className="px-4 py-4 text-sm text-lumi-muted whitespace-nowrap">
                      {a.publish_date ? new Date(a.publish_date).toLocaleDateString('sr-RS') : '—'}
                    </td>
                    <td className="px-4 py-4"><StatusPill status={a.status} /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Link to={`/articles/${a.slug}`} target="_blank">
                          <button className="p-2 rounded-lg hover:bg-gray-100 text-lumi-muted hover:text-lumi-dark transition-colors" title="Pregled">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link to={`/admin/articles/${a.id}/edit`}>
                          <button className="p-2 rounded-lg hover:bg-gray-100 text-lumi-muted hover:text-lumi-dark transition-colors" title="Izmeni">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handlePublishToggle(a)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            a.status === 'published' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {a.status === 'published' ? 'Skini' : 'Objavi'}
                        </button>
                        <button onClick={() => handleDelete(a)} className="p-2 rounded-lg hover:bg-red-50 text-lumi-muted hover:text-red-500 transition-colors" title="Obriši">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
