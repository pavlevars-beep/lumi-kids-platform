import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  message?: string
  title?: string
  description?: string
  icon?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ message, title, description, icon, action }: EmptyStateProps) {
  const heading = title ?? message ?? 'Nema podataka'
  const sub = description ?? ''

  return (
    <div className="text-center py-16">
      {icon ? (
        <div className="text-5xl mb-4">{icon}</div>
      ) : (
        <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      )}
      <p className="text-gray-500 font-semibold text-lg mb-1">{heading}</p>
      {sub && <p className="text-gray-400 text-sm mb-4">{sub}</p>}
      {action && (
        <button onClick={action.onClick} className="mt-4 btn-primary">
          {action.label}
        </button>
      )}
    </div>
  )
}
