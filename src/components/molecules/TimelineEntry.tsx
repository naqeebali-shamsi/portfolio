import { useState, useCallback } from 'react'
import TechStackGrid from '@/components/molecules/TechStackGrid'
import './TimelineEntry.css'

interface TimelineEntryProps {
  /** Role or position title */
  title: string
  /** Company name or institution */
  subtitle: string
  /** Date range (e.g., "2022 - Present") */
  period: string
  /** Main description text */
  description?: string
  /** List of bullet points */
  bullets?: string[]
  /** Tech stack rendered via TechStackGrid */
  technologies?: string[]
  /** Highlight or achievement text */
  achievement?: string
  /** Shows a visual "current" indicator on the marker dot */
  isActive?: boolean
  /** If true, the body section is collapsible */
  expandable?: boolean
  /** Initial expanded state when expandable is true */
  defaultExpanded?: boolean
  /** Additional class name on the root element */
  className?: string
}

/**
 * Timeline entry molecule used in Experience and Journey sections.
 *
 * Renders a marker (dot + vertical connector line) alongside structured
 * content: title, subtitle, period, expandable body with description,
 * bullet points, achievement text, and a tech stack grid.
 *
 * Usage:
 *   <TimelineEntry
 *     title="Senior Cloud Engineer"
 *     subtitle="Acme Corp"
 *     period="2023 - Present"
 *     description="Led cloud infrastructure modernization..."
 *     technologies={['AWS', 'Terraform', 'Go']}
 *     isActive
 *     expandable
 *     defaultExpanded
 *   />
 */
export default function TimelineEntry({
  title,
  subtitle,
  period,
  description,
  bullets,
  technologies,
  achievement,
  isActive = false,
  expandable = false,
  defaultExpanded = false,
  className = '',
}: TimelineEntryProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const toggleExpanded = useCallback(() => {
    if (expandable) {
      setExpanded((prev) => !prev)
    }
  }, [expandable])

  const hasBody = description || bullets?.length || achievement || technologies?.length

  const rootClasses = [
    'timeline-entry',
    isActive && 'timeline-entry--active',
    expandable && 'timeline-entry--expandable',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const bodyClasses = expandable
    ? [
        'timeline-entry__body',
        'timeline-entry__body--collapsible',
        expanded ? 'timeline-entry__body--expanded' : 'timeline-entry__body--collapsed',
      ].join(' ')
    : 'timeline-entry__body'

  return (
    <div className={rootClasses}>
      <div className="timeline-entry__marker" />

      <div className="timeline-entry__content">
        <div
          className="timeline-entry__header"
          onClick={expandable ? toggleExpanded : undefined}
          onKeyDown={
            expandable
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleExpanded()
                  }
                }
              : undefined
          }
          role={expandable ? 'button' : undefined}
          tabIndex={expandable ? 0 : undefined}
          aria-expanded={expandable ? expanded : undefined}
        >
          <h3 className="timeline-entry__title">{title}</h3>
          <span className="timeline-entry__period">{period}</span>
          {expandable && (
            <span
              className={`timeline-entry__toggle-icon${expanded ? ' timeline-entry__toggle-icon--expanded' : ''}`}
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.5 5.25L7 8.75L10.5 5.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>

        <div className="timeline-entry__subtitle">{subtitle}</div>

        {hasBody && (
          <div className={bodyClasses}>
            {description && (
              <p className="timeline-entry__description">{description}</p>
            )}

            {bullets && bullets.length > 0 && (
              <ul className="timeline-entry__bullets">
                {bullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {achievement && (
              <p className="timeline-entry__achievement">{achievement}</p>
            )}

            {technologies && technologies.length > 0 && (
              <div className="timeline-entry__tech">
                <TechStackGrid technologies={technologies} variant="css" gap="sm" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
