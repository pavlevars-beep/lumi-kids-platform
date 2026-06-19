import { PageHeader } from '../components/ui'

const people = [
  { name: 'Marko Jovanović', club: 'KK Zmaj', role: 'Trener', license: 'A', valid: '2027' },
  { name: 'Ana Petrović', club: 'KK Samuraj', role: 'Trener', license: 'B', valid: '2026' },
  { name: 'Nikola Stanković', club: 'KK Bushido', role: 'Sudija', license: 'Nacionalni', valid: '2027' },
  { name: 'Jelena Nikolić', club: 'KK Feniks', role: 'Sudija', license: 'Regionalni', valid: '2026' },
  { name: 'Stefan Marković', club: 'KK Vitez', role: 'Ispitivač', license: 'Majstorski', valid: '2028' },
]

const resources = [
  { icon: '📅', t: 'Seminari', d: 'Termini i prijave za seminare za trenere i sudije.' },
  { icon: '🥋', t: 'Polaganja', d: 'Raspored polaganja za učenička i majstorska zvanja.' },
  { icon: '📘', t: 'Pravilnici', d: 'Sudijska pravila i pravilnici takmičenja.' },
  { icon: '🎥', t: 'Video biblioteka', d: 'Edukativni materijali, kate i analize borbi.' },
]

export default function Coaches() {
  return (
    <>
      <PageHeader
        eyebrow="Treneri i sudije"
        title="Treneri, sudije i edukacija"
        subtitle="Standardi, licence i edukacija koji garantuju kvalitet rada sa decom i mladima u klubovima članovima BKS-a."
      />

      <section className="container-bks py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((r) => (
            <div key={r.t} className="card p-6">
              <div className="mb-3 text-3xl">{r.icon}</div>
              <h3 className="font-bold text-bks-blue">{r.t}</h3>
              <p className="mt-1 text-sm text-bks-ink/70">{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bks-mist py-12">
        <div className="container-bks">
          <h2 className="mb-6 text-2xl font-extrabold text-bks-blue">
            Registar licenciranih trenera i sudija
          </h2>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white text-bks-ink/70">
                <tr>
                  <th className="px-4 py-3 font-semibold">Ime i prezime</th>
                  <th className="px-4 py-3 font-semibold">Klub</th>
                  <th className="px-4 py-3 font-semibold">Uloga</th>
                  <th className="px-4 py-3 font-semibold">Licenca</th>
                  <th className="px-4 py-3 font-semibold">Važi do</th>
                </tr>
              </thead>
              <tbody>
                {people.map((p) => (
                  <tr key={p.name} className="border-t border-black/5 bg-white">
                    <td className="px-4 py-3 font-semibold text-bks-blue">{p.name}</td>
                    <td className="px-4 py-3">{p.club}</td>
                    <td className="px-4 py-3">{p.role}</td>
                    <td className="px-4 py-3">{p.license}</td>
                    <td className="px-4 py-3">{p.valid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-bks-ink/50">
            Ilustrativni podaci — registar omogućava roditeljima i klubovima proveru licenci.
          </p>
        </div>
      </section>
    </>
  )
}
