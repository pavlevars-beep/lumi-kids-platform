import type { Club } from '../data/clubs'
import { PROGRAM_LABELS } from '../data/clubs'

export default function ClubCard({ club }: { club: Club }) {
  return (
    <article className="card flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-bks-blue">{club.name}</h3>
          <p className="text-sm text-bks-ink/60">{club.municipality}</p>
        </div>
        {club.licensedCoaches && (
          <span className="badge bg-green-100 text-green-800">Licencirani treneri</span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {club.programs.map((p) => (
          <span key={p} className="badge bg-bks-blue/10 text-bks-blue">
            {PROGRAM_LABELS[p]}
          </span>
        ))}
        {club.competitive && (
          <span className="badge bg-bks-red/10 text-bks-red">Takmičarski sistem BKS</span>
        )}
      </div>

      <dl className="mt-4 space-y-1.5 text-sm text-bks-ink/75">
        <div className="flex gap-2">
          <dt className="font-semibold">Uzrast od:</dt>
          <dd>{club.ageFrom} god.</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold">Termini:</dt>
          <dd>{club.schedule}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold">Adresa:</dt>
          <dd>{club.address}</dd>
        </div>
      </dl>

      {club.highlights && (
        <p className="mt-3 rounded-lg bg-bks-mist p-3 text-sm text-bks-ink/70">
          {club.highlights}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-sm">
        <a href={`mailto:${club.email}`} className="btn-ghost">
          Pošalji upit klubu
        </a>
        <a href={`tel:${club.phone}`} className="text-bks-blue hover:underline">
          {club.phone}
        </a>
        {club.instagram && (
          <a
            href={`https://instagram.com/${club.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="text-bks-blue hover:underline"
          >
            @{club.instagram}
          </a>
        )}
      </div>
    </article>
  )
}
