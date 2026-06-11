interface Option {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  required?: boolean
}

export function Select({ label, value, onChange, options, required }: SelectProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-2">
          {label} {required && <span className="text-lumi-primary">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lumi-primary/30 bg-white"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
