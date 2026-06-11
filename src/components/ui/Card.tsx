import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card p-6 ${onClick ? 'cursor-pointer hover:shadow-warm hover:-translate-y-1 transition-all duration-300' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
