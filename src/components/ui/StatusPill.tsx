interface StatusPillProps {
  status: 'published' | 'draft'
}

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
      status === 'published'
        ? 'bg-green-100 text-green-700'
        : 'bg-gray-100 text-gray-500'
    }`}>
      {status === 'published' ? 'Objavljeno' : 'Nacrt'}
    </span>
  )
}
