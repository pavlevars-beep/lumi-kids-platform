import { useState } from 'react'
import { PageHeader } from '../components/ui'

const audiences = ['Roditelj', 'Klub', 'Trener', 'Sudija', 'Medij', 'Partner']

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Kontakt i prijave"
        subtitle="Pošaljite upit, prijavite se za obaveštenja ili nas kontaktirajte direktno — za roditelje, klubove, medije i partnere."
      />

      <section className="container-bks grid gap-10 py-12 lg:grid-cols-2">
        {/* Forma za upit */}
        <div>
          <h2 className="mb-4 text-2xl font-extrabold text-bks-blue">Pošaljite upit</h2>
          {sent ? (
            <div className="card border-green-200 bg-green-50 p-6 text-green-800">
              Hvala! Vaš upit je zabeležen (demonstracija). Javljamo se u najkraćem roku.
            </div>
          ) : (
            <form
              className="card space-y-4 p-6"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <div>
                <label className="mb-1 block text-sm font-semibold text-bks-ink/70">
                  Vi ste
                </label>
                <select className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-bks-blue">
                  {audiences.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-bks-ink/70">
                  Ime i prezime
                </label>
                <input
                  required
                  className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-bks-blue"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-bks-ink/70">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-bks-blue"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-bks-ink/70">Poruka</label>
                <textarea
                  rows={4}
                  required
                  className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-bks-blue"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Pošalji upit
              </button>
            </form>
          )}
        </div>

        {/* Kontakt podaci + newsletter */}
        <div className="space-y-8">
          <div className="card p-6">
            <h2 className="mb-4 text-xl font-extrabold text-bks-blue">Kontakt podaci</h2>
            <ul className="space-y-3 text-sm text-bks-ink/75">
              <li>
                <span className="font-semibold">Opšti kontakt:</span>{' '}
                <a href="mailto:info@beokarate.rs" className="text-bks-blue hover:underline">
                  info@beokarate.rs
                </a>
              </li>
              <li>
                <span className="font-semibold">Za roditelje:</span> roditelji@beokarate.rs
              </li>
              <li>
                <span className="font-semibold">Za klubove:</span> klubovi@beokarate.rs
              </li>
              <li>
                <span className="font-semibold">Za medije:</span> media@beokarate.rs
              </li>
              <li>
                <span className="font-semibold">Za partnere:</span> partneri@beokarate.rs
              </li>
              <li>
                <span className="font-semibold">Adresa:</span> Beograd, Srbija
              </li>
            </ul>
          </div>

          <div className="card bg-bks-mist p-6">
            <h2 className="mb-2 text-xl font-extrabold text-bks-blue">Newsletter</h2>
            <p className="mb-4 text-sm text-bks-ink/70">
              Prijavite se za BKS obaveštenja: kalendar, takmičenja, seminari, kampovi i vesti.
            </p>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Vaš email"
                className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-bks-blue"
              />
              <button type="submit" className="btn-secondary">
                Prijavi se
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
