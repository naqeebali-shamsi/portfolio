interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

/**
 * Shared section heading used across About, Blogs, Achievements,
 * Education, Figma, and Journey sections.
 *
 * Default classes match the existing pattern:
 *   text-4xl md:text-5xl font-bold mb-8 text-neutral-100 font-sans tracking-tight
 */
export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`text-4xl md:text-5xl font-bold mb-8 font-heading tracking-heading ${className}`.trim()}
      style={{ color: 'var(--text-primary)' }}
    >
      {children}
    </h2>
  )
}
