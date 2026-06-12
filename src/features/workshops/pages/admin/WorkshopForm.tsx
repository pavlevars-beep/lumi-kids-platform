import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { workshopService } from '../../services/workshopService'
import { ImagePicker } from '../../../media/components/ImagePicker'
import { Button } from '../../../../components/ui/Button'
import type { Workshop, WorkshopInsert } from '../../types'

const CATEGORIES = [
  { value: 'Music', label: 'Muzika' },
  { value: 'Reading', label: 'Čitanje' },
  { value: 'Speech Therapy', label: 'Logopedija' },
  { value: 'Mini Science Kitchen', label: 'Mala naučna kuhinja' },
  { value: 'Photography', label: 'Fotografija' },
  { value: 'Architecture', label: 'Arhitektura' },
  { value: 'Dance', label: 'Ples' },
  { value: 'Acting', label: 'Gluma' },
  { value: 'Other', label: 'Ostalo' },
]

const AGE_OPTIONS = ['1.5–3', '3–6', '4–7', '7–10', 'tinejdžeri', 'odrasli', 'roditelji + deca']

const DURATION_OPTIONS = [
  { value: '30', label: '30 minuta' },
  { value: '45', label: '45 minuta' },
  { value: '60', label: '60 minuta' },
  { value: '90', label: '90 minuta' },
  { value: '120', label: '2 sata' },
]

function calcEndTime(start: string, minutes: string): string {
  if (!start || !minutes) return ''
  const [h, m] = start.split(':').map(Number)
  const total = h * 60 + m + parseInt(minutes)
  return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

interface Props { existing?: Workshop }

export function WorkshopForm({ existing }: Props) {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imageUrl, setImageUrl] = useState<string>(existing?.featured_image_url ?? '')

  const [form, setForm] = useState({
    title: existing?.title ?? '',
    topic_category: existing?.topic_category ?? 'Music',
    age_group: existing?.age_group ?? '4–7',
    date: existing?.date ?? '',
    start_time: existing?.start_time ?? '',
    duration: '60',
    price: existing?.price?.toString() ?? '',
    capacity: existing?.capacity?.toString() ?? '',
    short_summary: existing?.short_summary ?? '',
    full_description: existing?.full_description ?? '',
    learning_goals: existing?.learning_goals ?? '',
    location: existing?.location ?? '',
    registration_form_url: existing?.registration_form_url ?? '',
  })

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = 'Naziv je obavezan'
    if (!form.date) errs.date = 'Datum je obavezan'
    if (!form.start_time) errs.start_time = 'Vreme početka je obavezno'
    if (!form.short_summary.trim()) errs.short_summary = 'Kratki opis je obavezan'
    if (!form.full_description.trim()) errs.full_description = 'Puni opis je obavezan'
    return errs
  }

  const handleSubmit = async (status: 'draft' | 'published') => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSaving(true)
    try {
      const data: WorkshopInsert = {
        title: form.title,
        slug: '',
        topic_category: form.topic_category as WorkshopInsert['topic_category'],
        date: form.date,
        start_time: form.start_time,
        end_time: calcEndTime(form.start_time, form.duration) || null,
        age_group: form.age_group,
        short_summary: form.short_summary,
        full_description: form.full_description,
        learning_goals: form.learning_goals || null,
        location: form.location || null,
        capacity: form.capacity ? parseInt(form.capacity) : null,
        price: form.price ? parseFloat(form.price) : null,
        workshop_icon_url: null,
        featured_image_type: 'upload',
        featured_image_url: imageUrl || null,
        preset_image_key: null,
        video_explainer_url: null,
        registration_form_url: form.registration_form_url,
        status,
      }
      if (existing) await workshopService.update(existing.id, data)
      else await workshopService.create(data)
      navigate('/admin/workshops')
    } catch {
      setErrors({ submit: 'Greška pri čuvanju. Pokušajte ponovo.' })
    } finally {
      setSaving(false)
    }
  }

  const Field = ({ label, error, children, required = false }: { label: string; error?: string; children: React.ReactNode; required?: boolean }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-lumi-primary ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lumi-blue/30 bg-white'
  const textareaCls = `${inputCls} resize-none`

  return (
    <div className="max-w-3xl space-y-6">

      <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
        <h2 className="font-display text-lg text-gray-800 pb-3 border-b border-gray-100">Osnovno</h2>
        <Field label="Naziv radionice" error={errors.title} required>
          <input className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} placeholder="npr. Mala naučna kuhinja" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Kategorija" required>
            <select className={inputCls} value={form.topic_category} onChange={e => set('topic_category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Uzrast" required>
            <select className={inputCls} value={form.age_group} onChange={e => set('age_group', e.target.value)}>
              {AGE_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </Field>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
        <h2 className="font-display text-lg text-gray-800 pb-3 border-b border-gray-100">Termin</h2>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Datum" error={errors.date} required>
            <input type="date" className={inputCls} value={form.date} onChange={e => set('date', e.target.value)} />
          </Field>
          <Field label="Početak" error={errors.start_time} required>
            <input type="time" className={inputCls} value={form.start_time} onChange={e => set('start_time', e.target.value)} />
          </Field>
          <Field label="Trajanje">
            <select className={inputCls} value={form.duration} onChange={e => set('duration', e.target.value)}>
              {DURATION_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </Field>
        </div>
        {form.start_time && (
          <p className="text-xs text-gray-400">
            Radionica od <strong>{form.start_time}</strong> do <strong>{calcEndTime(form.start_time, form.duration)}</strong>
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
        <h2 className="font-display text-lg text-gray-800 pb-3 border-b border-gray-100">Cena i mesta</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Cena (RSD)">
            <div className="relative">
              <input type="number" className={inputCls} value={form.price} onChange={e => set('price', e.target.value)} placeholder="1500" min="0" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">RSD</span>
            </div>
          </Field>
          <Field label="Broj mesta">
            <input type="number" className={inputCls} value={form.capacity} onChange={e => set('capacity', e.target.value)} placeholder="12" min="1" max="100" />
          </Field>
        </div>
        <Field label="Lokacija">
          <input className={inputCls} value={form.location} onChange={e => set('location', e.target.value)} placeholder="LumiKids Studio, Kragujevac" />
        </Field>
        <Field label="Link za prijavu (Google Form ili drugi)">
          <input type="url" className={inputCls} value={form.registration_form_url} onChange={e => set('registration_form_url', e.target.value)} placeholder="https://forms.google.com/..." />
        </Field>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
        <h2 className="font-display text-lg text-gray-800 pb-3 border-b border-gray-100">Opis</h2>
        <Field label="Kratki opis (prikazuje se na kartici)" error={errors.short_summary} required>
          <textarea className={textareaCls} rows={2} value={form.short_summary} onChange={e => set('short_summary', e.target.value)} placeholder="Deca kroz igru i eksperiment otkrivaju..." />
        </Field>
        <Field label="Puni opis radionice" error={errors.full_description} required>
          <textarea className={textareaCls} rows={7} value={form.full_description} onChange={e => set('full_description', e.target.value)} placeholder="Detaljniji opis šta deca rade, kako izgleda susret..." />
        </Field>
        <Field label="Šta dete stiče (opciono)">
          <textarea className={textareaCls} rows={3} value={form.learning_goals} onChange={e => set('learning_goals', e.target.value)} placeholder="Razvoj kreativnosti, timski rad, logičko razmišljanje..." />
        </Field>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6">
        <h2 className="font-display text-lg text-gray-800 pb-3 border-b border-gray-100 mb-4">Fotografija radionice</h2>
        <ImagePicker label="" value={imageUrl} onChange={setImageUrl} />
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{errors.submit}</p>
        </div>
      )}

      <div className="flex items-center gap-3 pb-8">
        <Button onClick={() => handleSubmit('draft')} variant="secondary" loading={saving}>Sačuvaj nacrt</Button>
        <Button onClick={() => handleSubmit('published')} loading={saving}>Objavi</Button>
        <Button variant="ghost" onClick={() => navigate('/admin/workshops')}>Otkaži</Button>
      </div>
    </div>
  )
}
