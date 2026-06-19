import { PageHeader } from '../components/ui'

const values = [
  { t: 'Disciplina', d: 'Red, istrajnost i posvećenost kao temelj rada.' },
  { t: 'Poštovanje', d: 'Prema protivnicima, trenerima, sudijama i pravilima.' },
  { t: 'Razvoj', d: 'Kontinuirano unapređenje sportista, trenera i klubova.' },
  { t: 'Bezbednost', d: 'Zaštita dece i mladih u svakom trenutku.' },
  { t: 'Zajedništvo', d: 'Snaga mreže klubova širom Beograda.' },
  { t: 'Inkluzija', d: 'Karate dostupan svima — uključujući para-karate.' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="O BKS-u"
        title="O Beogradskom karate savezu"
        subtitle="Krovna organizacija beogradskog karatea — zajednica klubova posvećena razvoju sporta, dece i mladih."
      />

      <section className="container-bks grid gap-10 py-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-2xl font-extrabold text-bks-blue">Misija</h2>
          <p className="text-bks-ink/75">
            Razvoj karatea u Beogradu kroz podršku klubovima, edukaciju trenera i sudija,
            organizaciju takmičenja i promociju vrednosti sporta među decom i mladima.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-extrabold text-bks-blue">Vizija</h2>
          <p className="text-bks-ink/75">
            Beograd kao prepoznatljiv centar kvalitetnog, bezbednog i inkluzivnog karatea,
            sa snažnom mrežom klubova i vrhunskim takmičarskim rezultatima.
          </p>
        </div>
      </section>

      <section className="bg-bks-mist py-12">
        <div className="container-bks">
          <h2 className="mb-6 text-2xl font-extrabold text-bks-blue">Vrednosti</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.t} className="card p-6">
                <h3 className="font-bold text-bks-red">{v.t}</h3>
                <p className="mt-1 text-sm text-bks-ink/70">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-bks py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: 'Rukovodstvo', d: 'Predsednik, upravni odbor i nadzorni odbor saveza.' },
            { t: 'Komisije', d: 'Stručna, sudijska, takmičarska i komisija za razvoj.' },
            { t: 'Dokumenta', d: 'Statut, pravilnici, strateški plan i godišnji izveštaji.' },
          ].map((c) => (
            <div key={c.t} className="card p-6">
              <h3 className="font-bold text-bks-blue">{c.t}</h3>
              <p className="mt-1 text-sm text-bks-ink/70">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
