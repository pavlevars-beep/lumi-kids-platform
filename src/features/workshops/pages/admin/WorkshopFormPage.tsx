import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { WorkshopForm } from './WorkshopForm'
import { workshopService } from '../../services/workshopService'
import { LoadingState } from '../../../../components/ui/LoadingState'
import type { Workshop } from '../../types'

export function WorkshopFormPage() {
  const { id } = useParams<{ id?: string }>()
  const isEdit = !!id
  const [workshop, setWorkshop] = useState<Workshop | null>(null)
  const [loading, setLoading] = useState(isEdit)

  useEffect(() => {
    if (!id) return
    workshopService.getById(id).then(data => {
      setWorkshop(data)
      setLoading(false)
    })
  }, [id])

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/workshops" className="flex items-center gap-1 text-lumi-muted hover:text-lumi-dark transition-colors">
          <ChevronLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold text-lumi-dark">
          {isEdit ? 'Izmeni radionicu' : 'Nova radionica'}
        </h1>
      </div>
      {loading ? <LoadingState /> : <WorkshopForm existing={workshop ?? undefined} />}
    </div>
  )
}
