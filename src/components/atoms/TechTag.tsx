import { techIcons } from '@/assets/icons/tech'

interface TechTagProps {
  children: React.ReactNode
  /** 'css' uses the .tech-tag class from Projects.css (monospace, bordered pill).
   *  'tw' uses Tailwind classes matching the Experience section style (accent pill). */
  variant?: 'css' | 'tw'
  /** Show icon alongside text. Defaults to true. */
  showIcon?: boolean
}

/**
 * Shared tech-stack pill used in Projects and Experience sections.
 * Automatically shows the tech logo icon when available.
 */
export default function TechTag({ children, variant = 'css', showIcon = true }: TechTagProps) {
  const label = typeof children === 'string' ? children : ''
  const iconSrc = showIcon ? techIcons[label] : undefined

  const icon = iconSrc ? (
    <img src={iconSrc} alt="" aria-hidden="true" className="tech-tag__icon" />
  ) : null

  if (variant === 'tw') {
    return (
      <span className="bg-accent/10 text-accent rounded-full px-2.5 py-1 text-xs font-body inline-flex items-center gap-1.5">
        {icon}
        {children}
      </span>
    )
  }

  return (
    <span className="tech-tag">
      {icon}
      {children}
    </span>
  )
}
