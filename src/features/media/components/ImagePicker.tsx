import { useState } from 'react'
import { Image, Link } from 'lucide-react'
import { WORKSHOP_IMAGE_PRESETS } from '../presets'

interface ImagePickerProps {
  label: string
  value: string
  onChange: (url: string) => void
}

export function ImagePicker({ label, value, onChange }: ImagePickerProps) {
  const [tab, setTab] = useState<'url' | 'presets'>('url')

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setTab('url')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${
            tab === 'url' ? 'bg-lumi-primary text-white' : 'bg-lumi-primary-light text-lumi-primary'
          }`}
        >
          <Link className="w-3 h-3" /> URL
        </button>
        <button
          type="button"
          onClick={() => setTab('presets')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${
            tab === 'presets' ? 'bg-lumi-primary text-white' : 'bg-lumi-primary-light text-lumi-primary'
          }`}
        >
          <Image className="w-3 h-3" /> Presets
        </button>
      </div>
      {tab === 'url' ? (
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lumi-primary/30"
        />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {WORKSHOP_IMAGE_PRESETS.map(preset => (
            <button
              type="button"
              key={preset.url}
              onClick={() => onChange(preset.url)}
              className={`rounded-xl overflow-hidden border-2 transition-all ${
                value === preset.url ? 'border-lumi-primary' : 'border-transparent'
              }`}
            >
              <img src={preset.url} alt={preset.label} className="w-full h-16 object-cover" />
              <p className="text-xs font-bold text-center py-1 bg-white">{preset.label}</p>
            </button>
          ))}
        </div>
      )}
      {value && (
        <div className="mt-3 rounded-xl overflow-hidden h-24">
          <img src={value} alt="Preview" className="w-full h-full object-cover" onError={() => {}} />
        </div>
      )}
    </div>
  )
}
