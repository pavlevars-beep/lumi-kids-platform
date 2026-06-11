interface InputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

export function Input({ label, value, onChange, placeholder, type = 'text', required, disabled, error }: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-2">
          {label} {required && <span className="text-lumi-primary">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lumi-primary/30 transition-all ${
          error ? 'border-red-400' : 'border-gray-200'
        } disabled:bg-gray-50 disabled:cursor-not-allowed`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
