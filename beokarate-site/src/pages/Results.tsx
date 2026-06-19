import { PageHeader } from '../components/ui'

const medalTable = [
  { club: 'KK Zmaj', gold: 12, silver: 8, bronze: 9 },
  { club: 'KK Bushido', gold: 9, silver: 11, bronze: 7 },
  { club: 'KK Feniks', gold: 7, silver: 6, bronze: 10 },
  { club: 'KK Samuraj', gold: 6, silver: 5, bronze: 8 },
  { club: 'KK Vitez', gold: 4, silver: 7, bronze: 6 },
]

export default function Results() {
  return (
    <>
      <PageHeader
        eyebrow="Rezultati"
        title="Rezultati i rang liste"
        subtitle="Pregled rezultata po takmičenjima, klubovima i uzrastima, sa medaljnom tabelom i istorijom BKS selekcija."
      />

      <section className="container-bks py-10">
        <div className="mb-8 flex flex-wrap gap-3 text-sm">
          {['Po godinama', 'Po klubovima', 'Po uzrastu', 'Kate', 'Borbe', 'BKS selekcija'].map(
            (f) => (
              <span key={f} className="badge bg-bks-blue/10 px-3 py-1.5 text-bks-blue">
                {f}
              </span>
            ),
          )}
        </div>

        <h2 className="mb-4 text-2xl font-extrabold text-bks-blue">
          Medaljna tabela klubova (sezona 2025/26)
        </h2>
        <div className="card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-bks-mist text-bks-ink/70">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Klub</th>
                <th className="px-4 py-3 text-center font-semibold">🥇</th>
                <th className="px-4 py-3 text-center font-semibold">🥈</th>
                <th className="px-4 py-3 text-center font-semibold">🥉</th>
                <th className="px-4 py-3 text-center font-semibold">Ukupno</th>
              </tr>
            </thead>
            <tbody>
              {medalTable.map((r, i) => (
                <tr key={r.club} className="border-t border-black/5">
                  <td className="px-4 py-3 text-bks-ink/50">{i + 1}</td>
                  <td className="px-4 py-3 font-semibold text-bks-blue">{r.club}</td>
                  <td className="px-4 py-3 text-center">{r.gold}</td>
                  <td className="px-4 py-3 text-center">{r.silver}</td>
                  <td className="px-4 py-3 text-center">{r.bronze}</td>
                  <td className="px-4 py-3 text-center font-bold">
                    {r.gold + r.silver + r.bronze}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-bks-ink/50">
          Ilustrativni podaci. U produkciji se rezultati učitavaju iz baze i mogu se
          filtrirati po takmičenju, godini, klubu, uzrastu i disciplini, sa profilima
          reprezentativaca BKS-a.
        </p>
      </section>
    </>
  )
}
