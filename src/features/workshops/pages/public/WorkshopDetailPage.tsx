import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, Users, MapPin, ChevronLeft, ExternalLink } from 'lucide-react'
import { workshopService } from '../../services/workshopService'
import { getPresetByKey } from '../../../media/presets'
import { LoadingState } from '../../../../components/ui/LoadingState'
import { ErrorState } from '../../../../components/ui/ErrorState'
import { Button } from '../../../../components/ui/Button'
import { sr } from '../../../../i18n/sr'
import type { Workshop } from '../../types'

const categoryLabels = sr.workshops.categories

export function WorkshopDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [workshop, setWorkshop] = useState<Workshop | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    workshopService.getBySlug(slug)
      .then(data => {
        setWorkshop(data)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [slug])

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-12"><LoadingState /></div>
  if (error || !workshop) return <div className="max-w-4xl mx-auto px-4 py-12"><ErrorState message="Radionica nije pronađena." /></div>

  const preset = getPresetByKey(workshop.preset_image_key)
  const formattedDate = new Date(workshop.date).toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' })
  const categoryLabel = categoryLabels[workshop.topic_category as keyof typeof categoryLabels] ?? workshop.topic_category

  const handleRegister = () => {
    window.open(workshop.registration_form_url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/workshops" className="inline-flex items-center gap-2 text-lumi-muted hover:text-lumi-dark mb-8 transition-colors">
        <ChevronLeft size={18} /> Sve radionice
      </Link>

      <div className="card overflow-hidden mb-8">
        <div className="h-64 md:h-80 relative">
          {workshop.featured_image_url ? (
            <img src={workshop.featured_image_url} alt={workshop.title} className="w-full h-full object-cover" />
          ) : preset ? (
            <div className={`w-full h-full bg-gradient-to-br ${preset.gradient} flex items-center justify-center`}>
              <span className="text-8xl">{preset.icon}</span>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-lumi-secondary to-lumi-sky" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="bg-white/90 backdrop-blur-sm text-lumi-dark text-sm font-semibold px-4 py-1.5 rounded-full">
              {categoryLabel}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-lumi-dark mb-4">{workshop.title}</h1>
          <p className="text-lumi-muted text-lg leading-relaxed mb-6">{workshop.short_summary}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Calendar, label: formattedDate },
              { icon: Clock, label: `${workshop.start_time}${workshop.end_time ? ` – ${workshop.end_time}` : ''}` },
              { icon: Users, label: `Uzrast: ${workshop.age_group}` },
              ...(workshop.location ? [{ icon: MapPin, label: workshop.location }] : []),
              ...(workshop.capacity ? [{ icon: Users, label: `Do ${workshop.capacity} dece` }] : []),
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-lumi-warm rounded-xl p-3">
                <item.icon size={16} className="text-lumi-secondary flex-shrink-0" />
                <span className="text-sm text-lumi-dark">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-bold text-lumi-dark mb-3">O radionici</h2>
            <div className="text-lumi-muted leading-relaxed whitespace-pre-wrap">{workshop.full_description}</div>
          </div>

          {workshop.learning_goals && (
            <div className="bg-lumi-secondary-light rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-lumi-dark mb-3">🎯 Šta dete stiče</h2>
              <div className="text-lumi-dark leading-relaxed whitespace-pre-wrap">{workshop.learning_goals}</div>
            </div>
          )}

          {workshop.video_explainer_url && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-lumi-dark mb-3">Video o radionici</h2>
              <a href={workshop.video_explainer_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lumi-primary hover:underline">
                <ExternalLink size={16} /> Pogledaj video
              </a>
            </div>
          )}

          <div className="border-t border-gray-100 pt-8">
            <Button onClick={handleRegister} size="lg" className="w-full md:w-auto">
              Prijavi dete na radionicu →
            </Button>
            <p className="text-xs text-lumi-muted mt-2">Bićete preusmereni na formular za prijavu.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
