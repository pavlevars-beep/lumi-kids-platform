import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <section className="bg-bks-mist">
      <div className="container-bks py-12 sm:py-16">
        {eyebrow && (
          <div className="mb-2 text-sm font-bold uppercase tracking-wide text-bks-red">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl font-extrabold text-bks-blue sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-bks-ink/70">{subtitle}</p>}
      </div>
    </section>
  )
}

export function SectionHeading({
  title,
  action,
}: {
  title: string
  action?: { to: string; label: string }
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="text-2xl font-extrabold text-bks-blue sm:text-3xl">{title}</h2>
      {action && (
        <Link to={action.to} className="text-sm font-semibold text-bks-red hover:underline">
          {action.label} →
        </Link>
      )}
    </div>
  )
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-extrabold text-bks-red">{value}</div>
      <div className="mt-1 text-sm text-white/80">{label}</div>
    </div>
  )
}

export function InfoCard({
  icon,
  title,
  children,
}: {
  icon: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="card p-6">
      <div className="mb-3 text-3xl" aria-hidden>
        {icon}
      </div>
      <h3 className="mb-1 text-lg font-bold text-bks-blue">{title}</h3>
      <p className="text-sm text-bks-ink/70">{children}</p>
    </div>
  )
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
