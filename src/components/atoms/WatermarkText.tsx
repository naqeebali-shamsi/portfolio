import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import './WatermarkText.css'

interface WatermarkTextProps {
  /** The watermark text to render */
  text: string
  className?: string
  /** Pixels of horizontal movement on scroll. Default 100. */
  speed?: number
  /** Scroll direction the text drifts toward. Default 'left'. */
  direction?: 'left' | 'right'
}

/**
 * Oversized background text that drifts horizontally on scroll,
 * inspired by Blunar.cz's giant watermark typography.
 *
 * Place inside a `position: relative; overflow: hidden` parent.
 * Content should sit above it with `position: relative; z-index: 1`.
 */
export default function WatermarkText({
  text,
  className = '',
  speed = 100,
  direction = 'left',
}: WatermarkTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!textRef.current) return

    const xValue = direction === 'left' ? -speed : speed

    gsap.fromTo(
      textRef.current,
      { x: 0 },
      {
        x: xValue,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef.current.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  }, { dependencies: [speed, direction] })

  return (
    <div
      ref={textRef}
      className={`watermark ${className}`.trim()}
      aria-hidden="true"
    >
      {text}
    </div>
  )
}
