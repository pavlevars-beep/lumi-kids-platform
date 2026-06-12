import { useState, useEffect } from 'react'
import { workshopService } from '../../services/workshopService'
import { WorkshopCard } from '../../components/WorkshopCard'
import { LoadingState } from '../../../../components/ui/LoadingState'
import { ErrorState } from '../../../../components/ui/ErrorState'
import { EmptyState } from '../../../../components/ui/EmptyState'
import type { Workshop, WorkshopCategory } from '../../types'

const CATEGORIES: { value: string; label: string }[] = [
  { value: '', label: 'Sve kategorije' },
  { value: 'Music', label: 'Muzika' },
  { value: 'Reading', label: 'Čitanje' },
  { value: 'Speech Therapy', label: 'Logopedija' },
  { value: 'Mini Science Kitchen', label: 'Mala naučna kuhinja' },
  { value: 'Photography', label: 'Fotografija' },
  { value: 'Architecture', label: 'Arhitektura' },
  { value: 'Dance', label: 'Ples' },
  { value: 'Acting', label: 'Gluma' },
  { value: 'Other', label: 'Ostalo' },
]

const AGE_GROUPS = ['Svi uzrasti', '1.5–3', '3–6', '4–7', '7–10', 'tinejdžeri', 'odrasli', 'roditelji + deca']

export function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [ageFilter, setAgeFilter] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await workshopService.getPublished()
      setWorkshops(data)
    } catch {
      setError('Greška pri učitavanju radionica.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = workshops.filter(w => {
    if (categoryFilter && w.topic_category !== (categoryFilter as WorkshopCategory)) return false
    if (ageFilter && ageFilter !== 'Svi uzrasti' && w.age_group !== ageFilter) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="section-title">Radionice</h1>
        <p className="section-subtitle">Osmišljena iskustva koja ostavljaju trag</p>
      </div>


      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="input-field w-auto"
        >
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <select
          value={ageFilter}
          onChange={e => setAgeFilter(e.target.value)}
          className="input-field w-auto"
        >
          {AGE_GROUPS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState icon="🎨" title="Nema radionica" description="Trenutno nema radionica koje odgovaraju filterima." />
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(w => <WorkshopCard key={w.id} workshop={w} />)}
        </div>
      )}
    </div>
  )
}
