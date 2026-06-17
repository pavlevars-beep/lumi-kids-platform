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

function renderBody(text: string) {
  return text.split(/\n\n+/).map((para, i) => (
    <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
  ))
}

interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
  required?: boolean
}
function Field({ label, error, children, required = false }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-lumi-primary ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

interface Props { existing?: Article }

export function ArticleForm({ existing }: Props) {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imageUrl, setImageUrl] = useState<string>(existing?.featured_image_url ?? '')
  const [bodyTab, setBodyTab] = useState<'write' | 'preview'>('write')

  const [form, setForm] = useState({
    title: existing?.title ?? '',
    category: existing?.category ?? 'Parenting',
    excerpt: existing?.excerpt ?? '',
    body: existing?.body ?? '',
    author: existing?.author ?? 'LumiKids Studio',
    publish_date: existing?.publish_date ?? new Date().toISOString().split('T')[0],
    tags: existing?.tags?.join(', ') ?? '',
  })

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
        publish_date: form.publish_date || new Date().toISOString().split('T')[0],
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

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lumi-blue/30 bg-white'

  return (
    <div className="max-w-3xl space-y-6">

      {/* Naslovna slika — na vrhu kao u pravom blog CMS-u */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h2 className="font-display text-lg text-gray-800 pb-3 border-b border-gray-100 mb-4">Naslovna fotografija</h2>
        <ImagePicker label="" value={imageUrl} onChange={setImageUrl} />
      </div>

      {/* Osnovne informacije */}
      <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
        <h2 className="font-display text-lg text-gray-800 pb-3 border-b border-gray-100">O tekstu</h2>
        <Field label="Naslov" error={errors.title} required>
          <input className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} placeholder="npr. Kako da podržimo dete bez pritiska" />
        </Field>
        <Field label="Kratki opis (prikazuje se kao uvod)" error={errors.excerpt} required>
          <textarea className={`${inputCls} resize-none`} rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Jedna ili dve rečenice koje opisuju tekst..." />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Kategorija" required>
            <select className={inputCls} value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Autor">
            <input className={inputCls} value={form.author} onChange={e => set('author', e.target.value)} placeholder="LumiKids Studio" />
          </Field>
          <Field label="Datum">
            <input type="date" className={inputCls} value={form.publish_date} onChange={e => set('publish_date', e.target.value)} />
          </Field>
        </div>
        <Field label="Tagovi (razdvojite zarezom)">
          <input className={inputCls} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="roditeljstvo, razvoj, emocije" />
        </Field>
      </div>

      {/* Tekst / blog editor */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <h2 className="font-display text-lg text-gray-800">Sadržaj teksta</h2>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            <button type="button" onClick={() => setBodyTab('write')}
              className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${bodyTab === 'write' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              ✏️ Piši
            </button>
            <button type="button" onClick={() => setBodyTab('preview')}
              className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${bodyTab === 'preview' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              👁 Pregled
            </button>
          </div>
        </div>

        {errors.body && <p className="text-red-500 text-xs mb-2">{errors.body}</p>}

        {bodyTab === 'write' ? (
          <div>
            <p className="text-xs text-gray-400 mb-2">Razdvajajte pasuse sa praznim redom (Enter + Enter)</p>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-lumi-blue/30 bg-white resize-none"
              rows={20}
              value={form.body}
              onChange={e => set('body', e.target.value)}
              placeholder={`Napišite tekst ovde...\n\nPrazan red između pasusa ih automatski razdvaja pri prikazu.\n\nPišite slobodno, bez ograničenja dužine.`}
            />
          </div>
        ) : (
          <div className="min-h-64 border border-gray-100 rounded-xl p-6 bg-gray-50">
            {form.body.trim() ? (
              <article className="prose max-w-none">
                <h1 className="font-display text-2xl text-gray-800 mb-2">{form.title || 'Naslov teksta'}</h1>
                {form.excerpt && <p className="text-gray-500 italic mb-6 text-sm">{form.excerpt}</p>}
                {renderBody(form.body)}
              </article>
            ) : (
              <p className="text-gray-400 text-sm text-center mt-8">Nema sadržaja za prikaz</p>
            )}
          </div>
        )}
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{errors.submit}</p>
        </div>
      )}

      <div className="flex items-center gap-3 pb-8">
        <Button onClick={() => handleSubmit('draft')} variant="secondary" loading={saving}>Sačuvaj nacrt</Button>
        <Button onClick={() => handleSubmit('published')} loading={saving}>Objavi</Button>
        <Button variant="ghost" onClick={() => navigate('/admin/articles')}>Otkaži</Button>
      </div>
    </div>
  )
}
