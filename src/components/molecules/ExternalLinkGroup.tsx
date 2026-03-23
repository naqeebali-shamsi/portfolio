import ExternalLink from '@/components/atoms/ExternalLink'
import './ExternalLinkGroup.css'

interface ExternalLinkGroupProps {
  /** The links to render */
  links: Array<{ name: string; url: string }>
  /** Arrow character passed to each ExternalLink. Defaults to '↗'. Pass null to omit. */
  arrow?: string | null
  /** Layout direction (default 'horizontal') */
  direction?: 'horizontal' | 'vertical'
  /** Show a visual separator between links (default false) */
  separator?: boolean
  /** Wrapper className */
  className?: string
  /** className passed to each ExternalLink */
  linkClassName?: string
}

/**
 * Composes multiple ExternalLink atoms into a grouped layout.
 *
 * Usage:
 *   <ExternalLinkGroup
 *     links={[
 *       { name: 'GitHub', url: 'https://github.com/...' },
 *       { name: 'Live Demo', url: 'https://...' },
 *     ]}
 *     separator
 *   />
 *
 *   <ExternalLinkGroup links={certLinks} direction="vertical" arrow="→" />
 */
export default function ExternalLinkGroup({
  links,
  arrow = '↗',
  direction = 'horizontal',
  separator = false,
  className = '',
  linkClassName = '',
}: ExternalLinkGroupProps) {
  if (links.length === 0) return null

  return (
    <div
      className={`external-link-group external-link-group--${direction} ${className}`.trim()}
    >
      {links.map((link, index) => (
        <span key={index} className="external-link-group__item">
          <ExternalLink href={link.url} className={linkClassName || undefined} arrow={arrow}>
            {link.name}
          </ExternalLink>
          {separator && index < links.length - 1 && (
            <span className="external-link-group__separator" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
