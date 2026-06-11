interface BadgeProps {
  label: string
  color?: 'primary' | 'secondary' | 'accent' | 'sage' | 'lavender'
}

const colors = {
  primary: 'bg-lumi-primary-light text-lumi-primary',
  secondary: 'bg-lumi-secondary-light text-teal-700',
  accent: 'bg-lumi-accent/30 text-yellow-700',
  sage: 'bg-lumi-sage/20 text-green-700',
  lavender: 'bg-lumi-lavender/20 text-purple-700',
}

export function Badge({ label, color = 'primary' }: BadgeProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colors[color]}`}>
      {label}
    </span>
  )
}
