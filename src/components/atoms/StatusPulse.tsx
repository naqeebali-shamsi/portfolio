import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import './StatusPulse.css'

interface StatusPulseProps {
  /** Text label displayed next to the dot */
  label?: string
  /** Dot color — accepts any CSS color value. Defaults to `var(--primary)` (#70ABAF) */
  color?: string
  /** Dot size preset */
  size?: 'sm' | 'md' | 'lg'
  /** Additional class names */
  className?: string
}

/**
 * Pulsing status indicator inspired by Blunar.cz's "Available for work" dot.
 *
 * Uses GSAP for the repeating scale animation on the outer ring.
 */
export default function StatusPulse({
  label,
  color = 'var(--primary)',
  size = 'md',
  className = '',
}: StatusPulseProps) {
  const ringRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!ringRef.current) return

    gsap.to(ringRef.current, {
      scale: 1,
      duration: 1.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Set initial scale
    gsap.set(ringRef.current, { scale: 0.85 })
  }, [])

  return (
    <span
      className={`status-pulse status-pulse--${size} ${className}`.trim()}
    >
      <span className="status-pulse__dot">
        <span
          ref={ringRef}
          className="status-pulse__ring"
          style={{ backgroundColor: color }}
        />
        <span
          className="status-pulse__core"
          style={{ backgroundColor: color }}
        />
      </span>
      {label && <span className="status-pulse__label">{label}</span>}
    </span>
  )
}
