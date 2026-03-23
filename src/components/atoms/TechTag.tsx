interface TechTagProps {
  children: React.ReactNode
  /** 'css' uses the .tech-tag class from Projects.css (monospace, bordered pill).
   *  'tw' uses Tailwind classes matching the Experience section style (accent pill). */
  variant?: 'css' | 'tw'
}

/**
 * Shared tech-stack pill used in Projects and Experience sections.
 *
 * Projects.tsx uses the CSS-class variant (.tech-tag from Projects.css):
 *   font: JetBrains Mono 0.7rem, muted text, subtle border, 4px radius
 *
 * Experience.tsx uses inline Tailwind:
 *   bg-accent/10 text-accent rounded-full px-2 py-0.5 text-xs font-body
 */
export default function TechTag({ children, variant = 'css' }: TechTagProps) {
  if (variant === 'tw') {
    return (
      <span className="bg-accent/10 text-accent rounded-full px-2 py-0.5 text-xs font-body">
        {children}
      </span>
    )
  }

  return (
    <span className="tech-tag">
      {children}
    </span>
  )
}
