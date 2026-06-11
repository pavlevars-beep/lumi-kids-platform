import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Eye, Trash2 } from 'lucide-react'
import { workshopService } from '../../services/workshopService'
import { StatusPill } from '../../../../components/ui/StatusPill'
import { Button } from '../../../../components/ui/Button'
import { LoadingState } from '../../../../components/ui/LoadingState'
import { EmptyState } from '../../../../components/ui/EmptyState'
import type { Workshop } from '../../types'

export function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const data = await workshopService.getAll()
    setWorkshops(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handlePublishToggle = async (w: Workshop) => {
    if (w.status === 'published') {
      await workshopService.unpublish(w.id)
    } else {
      await workshopService.publish(w.id)
    }
    load()
  }

  const handleDelete = async (w: Workshop) => {
    if (!window.confirm(`Da li ste sigurni da želite da obrišete "${w.title}"?`)) return
    await workshopService.delete(w.id)
    load()
  }

  const categoryMap: Record<string, string> = {
    'Music': 'Muzika', 'Reading': 'Čitanje', 'Speech Therapy': 'Logopedija',
    'Mini Science Kitchen': 'Mala naučna kuhinja', 'Photography': 'Fotografija',
    'Architecture': 'Arhitektura', 'Dance': 'Ples', 'Acting': 'Gluma', 'Other': 'Ostalo',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-lumi-dark">Radionice</h1>
          <p className="text-lumi-muted text-sm mt-1">Upravljajte radionicama studija</p>
        </div>
        <Link to="/admin/workshops/new">
          <Button size="sm"><Plus size={16} className="mr-2" />Dodaj radionicu</Button>
        </Link>
      </div>

      {loading && <LoadingState />}

      {!loading && workshops.length === 0 && (
        <EmptyState
          icon="🎨"
          title="Još nema radionica"
          description="Dodajte prvu radionicu i predstavite je roditeljima."
          action={{ label: 'Dodaj radionicu', onClick: () => window.location.href = '/admin/workshops/new' }}
        />
      )}

      {!loading && workshops.length > 0 && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Naziv', 'Datum', 'Kategorija', 'Uzrast', 'Status', 'Akcije'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-lumi-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {workshops.map(w => (
                  <tr key={w.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 font-medium text-lumi-dark max-w-xs">
                      <div className="truncate">{w.title}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-lumi-muted whitespace-nowrap">
                      {new Date(w.date).toLocaleDateString('sr-RS')}
                    </td>
                    <td className="px-4 py-4 text-sm text-lumi-muted">{categoryMap[w.topic_category] ?? w.topic_category}</td>
                    <td className="px-4 py-4 text-sm text-lumi-muted">{w.age_group}</td>
                    <td className="px-4 py-4"><StatusPill status={w.status} /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Link to={`/workshops/${w.slug}`} target="_blank">
                          <button className="p-2 rounded-lg hover:bg-gray-100 text-lumi-muted hover:text-lumi-dark transition-colors" title="Pregled">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link to={`/admin/workshops/${w.id}/edit`}>
                          <button className="p-2 rounded-lg hover:bg-gray-100 text-lumi-muted hover:text-lumi-dark transition-colors" title="Izmeni">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handlePublishToggle(w)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            w.status === 'published'
                              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {w.status === 'published' ? 'Skini' : 'Objavi'}
                        </button>
                        <button
                          onClick={() => handleDelete(w)}
                          className="p-2 rounded-lg hover:bg-red-50 text-lumi-muted hover:text-red-500 transition-colors"
                          title="Obriši"
                        >
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
