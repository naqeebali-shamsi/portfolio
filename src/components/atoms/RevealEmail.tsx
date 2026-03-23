import { useRef, useState, useCallback } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import './RevealEmail.css'

interface RevealEmailProps {
  /** The email address to reveal */
  email: string
  /** Button label before reveal. Default: "Reveal email address" */
  label?: string
  /** Additional class names */
  className?: string
}

/**
 * Pill-shaped button that reveals an email address on click,
 * inspired by Blunar.cz's "Reveal email address" interaction.
 *
 * Uses a GSAP timeline: label fades out -> container expands -> email fades in.
 */
export default function RevealEmail({
  email,
  label = 'Reveal email address',
  className = '',
}: RevealEmailProps) {
  const [revealed, setRevealed] = useState(false)

  const containerRef = useRef<HTMLButtonElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)

  const handleReveal = useCallback(() => {
    if (revealed) return
    if (!containerRef.current || !labelRef.current || !emailRef.current) return

    setRevealed(true)

    // Measure the email text width to calculate target container width
    const emailEl = emailRef.current
    emailEl.style.position = 'static'
    emailEl.style.opacity = '0'
    const emailWidth = emailEl.offsetWidth
    emailEl.style.position = ''
    emailEl.style.opacity = ''

    // Target width = arrow (40px) + gap (0.75rem=12px) + email width + padding (0.5rem + 1.5rem = 32px)
    const targetWidth = 40 + 12 + emailWidth + 32

    const tl = gsap.timeline()

    // 1. Label fades out
    tl.to(labelRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
    })

    // 2. Container expands to fit email
    tl.to(containerRef.current, {
      width: targetWidth,
      duration: 0.4,
      ease: 'power3.inOut',
    })

    // 3. Email fades in
    tl.to(emailRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [revealed])

  // Set initial email state (invisible, shifted down)
  useGSAP(() => {
    if (!emailRef.current) return
    gsap.set(emailRef.current, { opacity: 0, y: 10 })
  }, [])

  return (
    <button
      ref={containerRef}
      type="button"
      className={`reveal-email ${revealed ? 'reveal-email--revealed' : ''} ${className}`.trim()}
      onClick={handleReveal}
      aria-label={revealed ? email : label}
    >
      <span className="reveal-email__arrow" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>

      <span ref={labelRef} className="reveal-email__label">
        {label}
      </span>

      <a
        ref={emailRef}
        href={`mailto:${email}`}
        className="reveal-email__email"
        onClick={(e) => e.stopPropagation()}
        tabIndex={revealed ? 0 : -1}
      >
        {email}
      </a>
    </button>
  )
}
