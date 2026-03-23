import SectionLabel from '@/components/atoms/SectionLabel'
import SectionTitle from '@/components/atoms/SectionTitle'
import './HeaderWithLabel.css'

interface HeaderWithLabelProps {
  /** Label text -- the slash prefix is added by SectionLabel */
  label: string
  /** Optional heading rendered below the label */
  title?: string
  /** Pass-through className for SectionTitle */
  titleClassName?: string
  /** Wrapper className */
  className?: string
  /** Horizontal alignment (default 'left') */
  align?: 'left' | 'center'
}

/**
 * Composes SectionLabel + SectionTitle into a standardized section header.
 *
 * Usage:
 *   <HeaderWithLabel label="case study" title="EVENTRON" />
 *   <HeaderWithLabel label="contact" title="GET IN TOUCH" align="center" />
 */
export default function HeaderWithLabel({
  label,
  title,
  titleClassName = '',
  className = '',
  align = 'left',
}: HeaderWithLabelProps) {
  const centerClass = align === 'center' ? 'header-with-label--center' : ''

  return (
    <div className={`header-with-label ${centerClass} ${className}`.trim()}>
      <SectionLabel>{label}</SectionLabel>
      {title && <SectionTitle className={titleClassName}>{title}</SectionTitle>}
    </div>
  )
}
