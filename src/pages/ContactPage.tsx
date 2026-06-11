import { useState } from 'react'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setSending(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Kontakt</h1>
        <p className="text-gray-500 text-lg">Pišite nam — rado ćemo odgovoriti</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-card p-8">
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-extrabold text-gray-800 mb-2">Poruka poslata!</h3>
              <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }} className="text-lumi-primary font-bold hover:underline mt-4">
                Pošalji novu poruku
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Vaše ime" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} required />
              <Input label="Email adresa" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} required />
              <Textarea label="Poruka" value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))} rows={5} required />
              <button type="submit" disabled={sending} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                <Send className="w-4 h-4" />
                {sending ? 'Slanje...' : 'Pošalji poruku'}
              </button>
            </form>
          )}
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-3xl shadow-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-lumi-primary-light rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-lumi-primary" />
            </div>
            <div>
              <p className="font-bold text-gray-700 mb-1">Adresa</p>
              <p className="text-gray-500 text-sm">Svetolika Rankovića 27/11, I sprat<br />Kragujevac, Srbija</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-lumi-secondary-light rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-lumi-secondary" />
            </div>
            <div>
              <p className="font-bold text-gray-700 mb-1">Telefon</p>
              <p className="text-gray-500 text-sm">+381 69 304 27 21</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-bold text-gray-700 mb-1">Email</p>
              <p className="text-gray-500 text-sm">studiolumikids@gmail.com</p>
            </div>
          </div>
          <div className="bg-lumi-warm rounded-3xl p-6">
            <h3 className="font-extrabold text-gray-800 mb-2">Grupne posete</h3>
            <p className="text-gray-500 text-sm">Za grupne posete molimo vas da se javite unapred kako bismo dogovorili termin i prilagodili radionice uzrastu.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
