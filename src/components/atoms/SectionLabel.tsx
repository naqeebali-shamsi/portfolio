import './SectionLabel.css'

interface SectionLabelProps {
  /** Label text — the forward-slash prefix is prepended automatically */
  children: string
  className?: string
}

/**
 * Slash-prefixed section waypoint label inspired by Blunar.cz.
 * Renders text like `/about` or `/experiments`.
 */
export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span className={`section-label ${className}`.trim()}>
      /{children}
    </span>
  )
}
