import { Link } from 'react-router-dom'
import { PageHeader, Stat } from '../components/ui'

const sponsorPackages = [
  { t: 'Prijatelj BKS-a', d: 'Logo na sajtu i zahvalnica saveza.', highlight: false },
  { t: 'Partner događaja', d: 'Brendiranje na takmičenjima i u promotivnim materijalima.', highlight: true },
  { t: 'Generalni partner', d: 'Sveobuhvatna saradnja, CSR program i medijska vidljivost.', highlight: false },
]

export default function Media() {
  return (
    <>
      <PageHeader
        eyebrow="Media i partneri"
        title="Media centar i partnerstva"
        subtitle="Resursi za medije i prilika za institucije i kompanije da podrže razvoj karatea u Beogradu."
      />

      {/* Media centar */}
      <section className="container-bks py-12">
        <h2 className="mb-6 text-2xl font-extrabold text-bks-blue">Za medije</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: '📰', t: 'Saopštenja', d: 'Najnovija saopštenja i vesti za medije.' },
            { icon: '🖼️', t: 'Media kit', d: 'Logo BKS-a, fotografije i osnovne informacije za preuzimanje.' },
            { icon: '📞', t: 'Kontakt za medije', d: 'Direktna linija za novinarska pitanja i izjave.' },
          ].map((m) => (
            <div key={m.t} className="card p-6">
              <div className="mb-3 text-3xl">{m.icon}</div>
              <h3 className="font-bold text-bks-blue">{m.t}</h3>
              <p className="mt-1 text-sm text-bks-ink/70">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BKS u brojkama */}
      <section className="bg-bks-blue-dark py-12 text-white">
        <div className="container-bks">
          <h2 className="mb-8 text-center text-2xl font-extrabold">BKS u brojkama</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <Stat value="60+" label="klubova" />
            <Stat value="4.500+" label="takmičara" />
            <Stat value="40+" label="događaja godišnje" />
            <Stat value="500+" label="medalja godišnje" />
          </div>
        </div>
      </section>

      {/* Postanite partner */}
      <section className="container-bks py-12">
        <h2 className="mb-3 text-2xl font-extrabold text-bks-blue">Postanite partner BKS-a</h2>
        <p className="mb-8 max-w-2xl text-bks-ink/70">
          Podrška BKS-u znači ulaganje u decu i mlade, zdravlje, inkluziju i školski sport.
          Vaš brend dostiže angažovanu zajednicu roditelja, klubova i sportista širom Beograda.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {sponsorPackages.map((p) => (
            <div
              key={p.t}
              className={`card p-6 ${p.highlight ? 'ring-2 ring-bks-red' : ''}`}
            >
              {p.highlight && (
                <span className="badge mb-2 bg-bks-red/10 text-bks-red">Najpopularnije</span>
              )}
              <h3 className="font-bold text-bks-blue">{p.t}</h3>
              <p className="mt-1 text-sm text-bks-ink/70">{p.d}</p>
            </div>
          ))}
        </div>
        <Link to="/kontakt" className="btn-primary mt-8">
          Kontakt za partnerstva
        </Link>
      </section>
    </>
  )
}
