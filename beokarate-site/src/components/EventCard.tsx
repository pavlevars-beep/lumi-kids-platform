import type { KarateEvent } from '../data/events'
import { EVENT_KIND_LABELS, EVENT_STATUS_LABELS } from '../data/events'
import { formatDate } from './ui'

const statusStyles: Record<string, string> = {
  najavljeno: 'bg-slate-100 text-slate-700',
  'prijave-otvorene': 'bg-green-100 text-green-800',
  zavrseno: 'bg-slate-200 text-slate-600',
  rezultati: 'bg-bks-blue/10 text-bks-blue',
}

export default function EventCard({ event }: { event: KarateEvent }) {
  const dateLabel = event.endDate
    ? `${formatDate(event.date)} – ${formatDate(event.endDate)}`
    : formatDate(event.date)

  return (
    <article className="card flex flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="badge bg-bks-red/10 text-bks-red">
          {EVENT_KIND_LABELS[event.kind]}
        </span>
        <span className={`badge ${statusStyles[event.status]}`}>
          {EVENT_STATUS_LABELS[event.status]}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-bold text-bks-blue">{event.title}</h3>

      <dl className="mt-3 space-y-1.5 text-sm text-bks-ink/75">
        <div className="flex gap-2">
          <dt className="font-semibold">📅</dt>
          <dd>{dateLabel}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold">📍</dt>
          <dd>
            {event.location}, {event.city}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold">👥</dt>
          <dd>{event.ages}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold">🏛️</dt>
          <dd>{event.organizer}</dd>
        </div>
      </dl>

      <p className="mt-3 text-sm text-bks-ink/70">{event.description}</p>

      {event.links && event.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-3 pt-4">
          {event.links.map((l) => (
            <a key={l.label} href={l.href} className="btn-ghost">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
