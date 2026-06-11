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

interface Props {
  existing?: Workshop
}

export function WorkshopForm({ existing }: Props) {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    title: existing?.title ?? '',
    topic_category: existing?.topic_category ?? 'Music',
    date: existing?.date ?? '',
    start_time: existing?.start_time ?? '',
    end_time: existing?.end_time ?? '',
    age_group: existing?.age_group ?? '4–7',
    short_summary: existing?.short_summary ?? '',
    full_description: existing?.full_description ?? '',
    learning_goals: existing?.learning_goals ?? '',
    location: existing?.location ?? '',
    capacity: existing?.capacity?.toString() ?? '',
    registration_form_url: existing?.registration_form_url ?? '',
    video_explainer_url: existing?.video_explainer_url ?? '',
    status: existing?.status ?? 'draft' as 'draft' | 'published',
  })

  const [imageUrl, setImageUrl] = useState<string>(existing?.featured_image_url ?? '')

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = 'Naziv je obavezan'
    if (!form.date) errs.date = 'Datum je obavezan'
    if (!form.start_time) errs.start_time = 'Vreme početka je obavezno'
    if (!form.registration_form_url.trim()) errs.registration_form_url = 'Link za prijavu je obavezan'
    else {
      try { new URL(form.registration_form_url) } catch { errs.registration_form_url = 'Unesite validan URL' }
    }
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
        end_time: form.end_time || null,
        age_group: form.age_group,
        short_summary: form.short_summary,
        full_description: form.full_description,
        learning_goals: form.learning_goals || null,
        location: form.location || null,
        capacity: form.capacity ? parseInt(form.capacity) : null,
        workshop_icon_url: null,
        featured_image_type: 'upload',
        featured_image_url: imageUrl || null,
        preset_image_key: null,
        video_explainer_url: form.video_explainer_url || null,
        registration_form_url: form.registration_form_url,
        status,
      }

      if (existing) {
        await workshopService.update(existing.id, data)
      } else {
        await workshopService.create(data)
      }
      navigate('/admin/workshops')
    } catch (e) {
      setErrors({ submit: 'Greška pri čuvanju. Pokušajte ponovo.' })
    } finally {
      setSaving(false)
    }
  }

  const Field = ({ label, error, children, required = false }: { label: string; error?: string; children: React.ReactNode; required?: boolean }) => (
    <div>
      <label className="block text-sm font-semibold text-lumi-dark mb-1.5">{label}{required && <span className="text-lumi-primary ml-1">*</span>}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="card p-6 mb-6">
      <h2 className="text-lg font-bold text-lumi-dark mb-5 pb-3 border-b border-gray-100">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )

  return (
    <div className="max-w-3xl">
      <Section title="Osnovne informacije">
        <Field label="Naziv radionice" error={errors.title} required>
          <input className="input-field" value={form.title} onChange={e => set('title', e.target.value)} placeholder="npr. Mala naučna kuhinja" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Kategorija" required>
            <select className="input-field" value={form.topic_category} onChange={e => set('topic_category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Uzrast / Za koga" required>
            <select className="input-field" value={form.age_group} onChange={e => set('age_group', e.target.value)}>
              {AGE_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Datum" error={errors.date} required>
            <input type="date" className="input-field" value={form.date} onChange={e => set('date', e.target.value)} />
          </Field>
          <Field label="Početak" error={errors.start_time} required>
            <input type="time" className="input-field" value={form.start_time} onChange={e => set('start_time', e.target.value)} />
          </Field>
          <Field label="Kraj (opciono)">
            <input type="time" className="input-field" value={form.end_time} onChange={e => set('end_time', e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Opis radionice">
        <Field label="Kratki opis (1–2 rečenice)" error={errors.short_summary} required>
          <textarea className="input-field" rows={2} value={form.short_summary} onChange={e => set('short_summary', e.target.value)} placeholder="Deca kroz igru i eksperiment otkrivaju..." />
        </Field>
        <Field label="Puni opis" error={errors.full_description} required>
          <textarea className="input-field" rows={6} value={form.full_description} onChange={e => set('full_description', e.target.value)} placeholder="Detaljniji opis radionice, šta deca rade, kako izgleda susret..." />
        </Field>
        <Field label="Šta dete stiče (opciono)">
          <textarea className="input-field" rows={3} value={form.learning_goals} onChange={e => set('learning_goals', e.target.value)} placeholder="Razvoj kreativnosti, timski rad, logičko razmišljanje..." />
        </Field>
      </Section>

      <Section title="Logistika">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Lokacija (opciono)">
            <input className="input-field" value={form.location} onChange={e => set('location', e.target.value)} placeholder="LumiKids Studio, Beograd" />
          </Field>
          <Field label="Kapacitet (opciono)">
            <input type="number" className="input-field" value={form.capacity} onChange={e => set('capacity', e.target.value)} placeholder="12" min="1" />
          </Field>
        </div>
        <Field label="Link za prijavu (Google Form)" error={errors.registration_form_url} required>
          <input type="url" className="input-field" value={form.registration_form_url} onChange={e => set('registration_form_url', e.target.value)} placeholder="https://forms.google.com/..." />
        </Field>
        <Field label="Video link (YouTube/Vimeo, opciono)">
          <input type="url" className="input-field" value={form.video_explainer_url} onChange={e => set('video_explainer_url', e.target.value)} placeholder="https://youtube.com/..." />
        </Field>
      </Section>

      <Section title="Naslovna slika">
        <ImagePicker label="Naslovna slika" value={imageUrl} onChange={setImageUrl} />
      </Section>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
          <p className="text-red-700 text-sm">{errors.submit}</p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button onClick={() => handleSubmit('draft')} variant="secondary" loading={saving}>Sačuvaj nacrt</Button>
        <Button onClick={() => handleSubmit('published')} loading={saving}>Objavi</Button>
        <Button variant="ghost" onClick={() => navigate('/admin/workshops')}>Otkaži</Button>
      </div>
    </div>
  )
}
