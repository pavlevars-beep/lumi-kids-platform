import { useState, useEffect } from 'react'
import { articleService } from '../../services/articleService'
import { ArticleCard } from '../../components/ArticleCard'
import { LoadingState } from '../../../../components/ui/LoadingState'
import { ErrorState } from '../../../../components/ui/ErrorState'
import { EmptyState } from '../../../../components/ui/EmptyState'
import { SetupBanner } from '../../../../components/ui/SetupBanner'
import { isSupabaseConfigured } from '../../../../lib/supabaseClient'
import type { Article } from '../../types'

const CATEGORIES = [
  { value: '', label: 'Sve kategorije' },
  { value: 'Parenting', label: 'Roditeljstvo' },
  { value: 'Child Development', label: 'Razvoj deteta' },
  { value: 'Emotions & Behavior', label: 'Emocije i ponašanje' },
  { value: 'Creativity', label: 'Kreativnost' },
  { value: 'Talent Exploration', label: 'Otkrivanje talenata' },
  { value: 'Studio News', label: 'Vesti studija' },
  { value: 'Other', label: 'Ostalo' },
]

export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [search, setSearch] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await articleService.getPublished()
      setArticles(data)
    } catch {
      setError('Greška pri učitavanju tekstova.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = articles.filter(a => {
    if (categoryFilter && a.category !== categoryFilter) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.excerpt.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="section-title">Korisni tekstovi</h1>
        <p className="section-subtitle">Inspiracija i podrška za roditelje</p>
      </div>

      {!isSupabaseConfigured && <SetupBanner />}

      <div className="flex flex-wrap gap-3 mb-8">
        <input
          type="text"
          placeholder="Pretraži tekstove..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field w-auto flex-1 min-w-48"
        />
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="input-field w-auto">
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState icon="📝" title="Nema tekstova" description="Trenutno nema tekstova koji odgovaraju pretrei." />
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}
    </div>
  )
}
