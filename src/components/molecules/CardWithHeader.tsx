import React from 'react'
import './CardWithHeader.css'

interface CardWithHeaderProps {
  /** Card body content */
  children?: React.ReactNode
  /** Card title rendered inside the body */
  title?: string
  /** Card description text rendered below the title */
  description?: string
  /** Footer slot for links, tags, etc. */
  footer?: React.ReactNode
  /** Show colored terminal dots (red/yellow/green) in the header bar */
  terminalDots?: boolean
  /** Text in the header bar (e.g., a filename) */
  headerTitle?: string
  /** Right side of the header bar (e.g., badge or status indicator) */
  headerRight?: React.ReactNode
  /** Additional class name on the root element */
  className?: string
  /** Click handler on the card */
  onClick?: () => void
  /** If provided, wraps the card in an anchor element */
  href?: string
}

/**
 * Unified card molecule used across Projects, Blogs, and Achievements.
 *
 * Supports an optional terminal-style header bar with colored dots,
 * a body area with title/description/children, and a footer slot.
 *
 * Usage:
 *   <CardWithHeader terminalDots headerTitle="project.tsx" footer={<TechStackGrid />}>
 *     <p>A cloud-native application...</p>
 *   </CardWithHeader>
 *
 *   <CardWithHeader title="AWS Solutions Architect" description="Professional certification">
 *     <ExternalLinkGroup links={certLinks} />
 *   </CardWithHeader>
 */
export default function CardWithHeader({
  children,
  title,
  description,
  footer,
  terminalDots = false,
  headerTitle,
  headerRight,
  className = '',
  onClick,
  href,
}: CardWithHeaderProps) {
  const showHeader = terminalDots || headerTitle || headerRight

  const card = (
    <div
      className={`card ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {showHeader && (
        <div className="card__header">
          {terminalDots && (
            <div className="card__dots">
              <span className="card__dot card__dot--red" />
              <span className="card__dot card__dot--yellow" />
              <span className="card__dot card__dot--green" />
            </div>
          )}
          {headerTitle && <span className="card__header-title">{headerTitle}</span>}
          {headerRight && <div className="card__header-right">{headerRight}</div>}
        </div>
      )}

      <div className="card__body">
        {title && <h3 className="card__title">{title}</h3>}
        {description && <p className="card__description">{description}</p>}
        {children}
      </div>

      {footer && <div className="card__footer">{footer}</div>}
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card__anchor"
      >
        {card}
      </a>
    )
  }

  return card
}
