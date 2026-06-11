interface TextareaProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  required?: boolean
}

export function Textarea({ label, value, onChange, placeholder, rows = 4, required }: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-2">
          {label} {required && <span className="text-lumi-primary">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lumi-primary/30 resize-y"
      />
    </div>
  )
}
