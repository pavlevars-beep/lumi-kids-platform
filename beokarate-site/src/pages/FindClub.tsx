import { useMemo, useState } from 'react'
import { PageHeader } from '../components/ui'
import ClubCard from '../components/ClubCard'
import { clubs, MUNICIPALITIES, PROGRAM_LABELS } from '../data/clubs'
import type { ClubProgram } from '../data/clubs'

const programOptions = Object.keys(PROGRAM_LABELS) as ClubProgram[]

export default function FindClub() {
  const [query, setQuery] = useState('')
  const [municipality, setMunicipality] = useState('')
  const [program, setProgram] = useState<ClubProgram | ''>('')

  const filtered = useMemo(() => {
    return clubs.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.municipality.toLowerCase().includes(query.toLowerCase()) ||
        c.address.toLowerCase().includes(query.toLowerCase())
      const matchesMun = !municipality || c.municipality === municipality
      const matchesProg = !program || c.programs.includes(program)
      return matchesQuery && matchesMun && matchesProg
    })
  }, [query, municipality, program])

  return (
    <>
      <PageHeader
        eyebrow="Pronađi klub"
        title="Direktorijum klubova BKS-a"
        subtitle="Unesite opštinu ili naselje i pronađite najbliži karate klub član BKS-a. Filtrirajte po programu i uzrastu."
      />

      <section className="container-bks py-10">
        {/* Filteri */}
        <div className="card mb-8 grid gap-4 p-5 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-bks-ink/70">
              Pretraga
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Naziv kluba, opština ili adresa…"
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-bks-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-bks-ink/70">
              Opština
            </label>
            <select
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value)}
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-bks-blue"
            >
              <option value="">Sve opštine</option>
              {MUNICIPALITIES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-bks-ink/70">
              Program
            </label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value as ClubProgram | '')}
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-bks-blue"
            >
              <option value="">Svi programi</option>
              {programOptions.map((p) => (
                <option key={p} value={p}>
                  {PROGRAM_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Placeholder za mapu */}
        <div className="mb-8 grid h-56 place-items-center rounded-2xl border border-dashed border-bks-blue/30 bg-bks-mist text-center text-bks-ink/50">
          <div>
            <div className="text-2xl">🗺️</div>
            <p className="mt-1 text-sm">
              Ovde dolazi interaktivna mapa Beograda sa lokacijama klubova.
            </p>
          </div>
        </div>

        <div className="mb-4 text-sm text-bks-ink/60">
          Pronađeno klubova: <strong>{filtered.length}</strong>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <ClubCard key={c.id} club={c} />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center text-bks-ink/60">
            Nema klubova za izabrane filtere. Pokušajte da promenite kriterijume.
          </div>
        )}
      </section>
    </>
  )
}
