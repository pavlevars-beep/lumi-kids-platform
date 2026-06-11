import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { articleService } from '../../services/articleService'
import { ImagePicker } from '../../../media/components/ImagePicker'
import { Button } from '../../../../components/ui/Button'
import type { Article, ArticleInsert } from '../../types'

const CATEGORIES = [
  { value: 'Parenting', label: 'Roditeljstvo' },
  { value: 'Child Development', label: 'Razvoj deteta' },
  { value: 'Emotions & Behavior', label: 'Emocije i ponašanje' },
  { value: 'Creativity', label: 'Kreativnost' },
  { value: 'Talent Exploration', label: 'Otkrivanje talenata' },
  { value: 'Studio News', label: 'Vesti studija' },
  { value: 'Other', label: 'Ostalo' },
]

interface Props { existing?: Article }

export function ArticleForm({ existing }: Props) {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    title: existing?.title ?? '',
    category: existing?.category ?? 'Parenting',
    excerpt: existing?.excerpt ?? '',
    body: existing?.body ?? '',
    author: existing?.author ?? 'LumiKids Studio',
    publish_date: existing?.publish_date ?? new Date().toISOString().split('T')[0],
    tags: existing?.tags?.join(', ') ?? '',
  })

  const [imageUrl, setImageUrl] = useState<string>(existing?.featured_image_url ?? '')

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = 'Naslov je obavezan'
    if (!form.excerpt.trim()) errs.excerpt = 'Kratki opis je obavezan'
    if (!form.body.trim()) errs.body = 'Sadržaj teksta je obavezan'
    return errs
  }

  const handleSubmit = async (status: 'draft' | 'published') => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSaving(true)
    try {
      const data: ArticleInsert = {
        title: form.title,
        slug: '',
        category: form.category as ArticleInsert['category'],
        featured_image_type: 'upload',
        featured_image_url: imageUrl || null,
        preset_image_key: null,
        excerpt: form.excerpt,
        body: form.body,
        author: form.author || 'LumiKids Studio',
        publish_date: status === 'published' ? (form.publish_date || new Date().toISOString().split('T')[0]) : form.publish_date,
        status,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        is_premium: false,
      }
      if (existing) await articleService.update(existing.id, data)
      else await articleService.create(data)
      navigate('/admin/articles')
    } catch {
      setErrors({ submit: 'Greška pri čuvanju. Pokušajte ponovo.' })
    } finally {
      setSaving(false)
    }
  }

  const Field = ({ label, error, children, required = false }: { label: string; error?: string; children: React.ReactNode; required?: boolean }) => (
    <div>
      <label className="block text-sm font-semibold text-lumi-dark mb-1.5">
        {label}{required && <span className="text-lumi-primary ml-1">*</span>}
      </label>
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
        <Field label="Naslov" error={errors.title} required>
          <input className="input-field" value={form.title} onChange={e => set('title', e.target.value)} placeholder="npr. Kako da podržimo dete bez pritiska" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Kategorija" required>
            <select className="input-field" value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Datum objavljivanja">
            <input type="date" className="input-field" value={form.publish_date} onChange={e => set('publish_date', e.target.value)} />
          </Field>
        </div>
        <Field label="Autor">
          <input className="input-field" value={form.author} onChange={e => set('author', e.target.value)} placeholder="LumiKids Studio" />
        </Field>
      </Section>

      <Section title="Sadržaj">
        <Field label="Kratki opis" error={errors.excerpt} required>
          <textarea className="input-field" rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Jedna rečenica koja opisuje tekst..." />
        </Field>
        <Field label="Sadržaj teksta" error={errors.body} required>
          <textarea className="input-field font-mono text-sm" rows={16} value={form.body} onChange={e => set('body', e.target.value)} placeholder="Napišite tekst ovde. Koristite prazne redove za odvajanje odeljaka." />
        </Field>
        <Field label="Tagovi (razdvojite zarezom, opciono)">
          <input className="input-field" value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="roditeljstvo, razvoj, emocije" />
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
        <Button variant="ghost" onClick={() => navigate('/admin/articles')}>Otkaži</Button>
      </div>
    </div>
  )
}
