import { Link } from 'react-router-dom'
import { CalendarBlank, Clock, Users } from '@phosphor-icons/react'
import { getPresetByKey } from '../../media/presets'
import type { Workshop } from '../types'
import { sr } from '../../../i18n/sr'

interface Props {
  workshop: Workshop
}

const categoryLabels = sr.workshops.categories

function PresetImage({ presetKey }: { presetKey: string | null }) {
  const preset = getPresetByKey(presetKey)
  if (!preset) {
    return <div className="w-full h-full bg-gradient-to-br from-lumi-secondary to-lumi-sky" />
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${preset.gradient} flex items-center justify-center`}>
      <span className="text-5xl">{preset.icon}</span>
    </div>
  )
}

export function WorkshopCard({ workshop }: Props) {
  const formattedDate = new Date(workshop.date).toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const categoryLabel = categoryLabels[workshop.topic_category as keyof typeof categoryLabels] ?? workshop.topic_category

  return (
    <Link to={`/workshops/${workshop.slug}`} className="card group block overflow-hidden">
      <div className="h-44 overflow-hidden relative">
        {workshop.featured_image_url ? (
          <img src={workshop.featured_image_url} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <PresetImage presetKey={workshop.preset_image_key} />
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-lumi-dark text-xs font-semibold px-3 py-1 rounded-full">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lumi-dark text-lg mb-2 group-hover:text-lumi-primary transition-colors leading-tight">
          {workshop.title}
        </h3>
        <p className="text-lumi-muted text-sm mb-4 leading-relaxed line-clamp-2">{workshop.short_summary}</p>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-lumi-muted">
            <CalendarBlank size={14} className="text-lumi-secondary flex-shrink-0" weight="duotone" />
            <span>{formattedDate}</span>
          </div>
          {workshop.start_time && (
            <div className="flex items-center gap-2 text-sm text-lumi-muted">
              <Clock size={14} className="text-lumi-secondary flex-shrink-0" weight="duotone" />
              <span>{workshop.start_time}{workshop.end_time ? ` – ${workshop.end_time}` : ''}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-lumi-muted">
            <Users size={14} className="text-lumi-secondary flex-shrink-0" weight="duotone" />
            <span>Uzrast: {workshop.age_group}</span>
          </div>
        </div>

        <span className="text-lumi-primary font-semibold text-sm group-hover:underline">
          Saznaj više →
        </span>
      </div>
    </Link>
  )
}
