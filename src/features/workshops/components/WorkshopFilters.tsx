import type { WorkshopCategory } from '../types'

const AGE_GROUPS = ['Svi uzrasti', '1.5–3', '3–6', '4–7', '7–10', 'tinejdžeri', 'odrasli', 'roditelji + deca']

const CATEGORIES: { value: WorkshopCategory | ''; label: string }[] = [
  { value: '', label: 'Sve kategorije' },
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

interface WorkshopFiltersProps {
  selectedAge: string
  selectedCategory: WorkshopCategory | ''
  onAgeChange: (age: string) => void
  onCategoryChange: (cat: WorkshopCategory | '') => void
}

export function WorkshopFilters({ selectedAge, selectedCategory, onAgeChange, onCategoryChange }: WorkshopFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <select value={selectedAge} onChange={e => onAgeChange(e.target.value)} className="input-field w-auto">
        {AGE_GROUPS.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
      <select value={selectedCategory} onChange={e => onCategoryChange(e.target.value as WorkshopCategory | '')} className="input-field w-auto">
        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
    </div>
  )
}
