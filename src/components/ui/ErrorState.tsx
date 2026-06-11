import { AlertTriangle } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <AlertTriangle className="w-12 h-12 text-lumi-primary mx-auto mb-4" />
      <p className="text-gray-600 font-medium mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Pokušaj ponovo
        </button>
      )}
    </div>
  )
}
