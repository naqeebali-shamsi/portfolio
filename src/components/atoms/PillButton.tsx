import './PillButton.css'

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  /** When provided the component renders as an <a> instead of <button> */
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

/**
 * Pill-shaped CTA button inspired by Blunar.cz.
 * Renders as an anchor when `href` is provided, otherwise a button.
 */
export default function PillButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: PillButtonProps) {
  const classes = `pill-button pill-button--${variant} pill-button--${size} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
