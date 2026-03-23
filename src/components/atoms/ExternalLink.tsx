interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  /** Arrow character appended after children. Defaults to '↗'.
   *  Projects uses '↗' inside a .link-arrow span.
   *  Blogs uses '→' with a translateX hover effect.
   *  Pass null to omit the arrow entirely. */
  arrow?: string | null
}

/**
 * Shared external-link atom matching the pattern used in Projects, Blogs,
 * and Achievements sections: an anchor with target="_blank", rel safety
 * attributes, and an optional trailing arrow character.
 *
 * Projects.css `.project-link` — monospace, flex, gap, hover color change
 * Blogs.css   `.blog-link`    — monospace, flex, gap, arrow translateX hover
 * Achievements `.cert-links a` — monospace, primary color, bold
 */
export default function ExternalLink({
  href,
  children,
  className = '',
  arrow = '↗',
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className || undefined}
    >
      {children}
      {arrow !== null && <span className="link-arrow">{arrow}</span>}
    </a>
  )
}
