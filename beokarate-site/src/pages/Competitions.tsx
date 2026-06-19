import { useMemo, useState } from 'react'
import { PageHeader } from '../components/ui'
import EventCard from '../components/EventCard'
import { events, EVENT_KIND_LABELS } from '../data/events'
import type { EventKind } from '../data/events'

const kinds = Object.keys(EVENT_KIND_LABELS) as EventKind[]

export default function Competitions() {
  const [kind, setKind] = useState<EventKind | ''>('')

  const sorted = useMemo(
    () =>
      [...events]
        .filter((e) => !kind || e.kind === kind)
        .sort((a, b) => +new Date(a.date) - +new Date(b.date)),
    [kind],
  )

  return (
    <>
      <PageHeader
        eyebrow="Takmičenja"
        title="Kalendar takmičenja i događaja"
        subtitle="Takmičenja, seminari i kampovi u organizaciji BKS-a i partnera. Svaki događaj vodi ka propozicijama, prijavi i rezultatima."
      />

      <section className="container-bks py-10">
        {/* Filter po tipu */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setKind('')}
            className={`badge px-3 py-1.5 ${
              kind === '' ? 'bg-bks-blue text-white' : 'bg-bks-blue/10 text-bks-blue'
            }`}
          >
            Sve
          </button>
          {kinds.map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`badge px-3 py-1.5 ${
                kind === k ? 'bg-bks-blue text-white' : 'bg-bks-blue/10 text-bks-blue'
              }`}
            >
              {EVENT_KIND_LABELS[k]}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>

        <p className="mt-8 text-sm text-bks-ink/50">
          Napomena: u produkciji svaki događaj dobija svoju karticu sa propozicijama,
          žrebom, biltenom, rezultatima i fotografijama, uz opciju „Dodaj u Google Calendar”.
        </p>
      </section>
    </>
  )
}
