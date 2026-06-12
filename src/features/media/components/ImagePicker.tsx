import { useRef, useState } from 'react'
import { Upload, Link, X } from 'lucide-react'

interface ImagePickerProps {
  label: string
  value: string
  onChange: (url: string) => void
}

export function ImagePicker({ label, value, onChange }: ImagePickerProps) {
  const [tab, setTab] = useState<'upload' | 'url'>('upload')
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>

      <div className="flex gap-2 mb-3">
        <button type="button" onClick={() => setTab('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${tab === 'upload' ? 'bg-lumi-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <Upload className="w-3.5 h-3.5" /> Upload slike
        </button>
        <button type="button" onClick={() => setTab('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${tab === 'url' ? 'bg-lumi-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <Link className="w-3.5 h-3.5" /> URL
        </button>
      </div>

      {tab === 'upload' ? (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            dragging ? 'border-lumi-blue bg-lumi-secondary-light' : 'border-gray-200 hover:border-lumi-blue hover:bg-gray-50'
          }`}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-600">Prevuci sliku ovde ili klikni da izabereš</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
        </div>
      ) : (
        <input
          type="url"
          value={value.startsWith('data:') ? '' : value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lumi-blue/30"
        />
      )}

      {value && (
        <div className="mt-3 relative rounded-2xl overflow-hidden h-40 bg-gray-100">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
