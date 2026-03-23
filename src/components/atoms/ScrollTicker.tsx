import { useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import './ScrollTicker.css'

interface ScrollTickerProps {
  items: (string | ReactNode)[]
  /** Scroll sensitivity multiplier. Default 1. */
  speed?: number
  /** Scroll direction. Default 'left'. */
  direction?: 'left' | 'right'
  /** Character rendered between items. Default '—'. */
  separator?: string
  className?: string
}

/**
 * Horizontal auto-scrolling text strip driven by page scroll.
 * Content is duplicated 3x for seamless looping.
 * Inspired by Blunar.cz's ticker pattern.
 */
export default function ScrollTicker({
  items,
  speed = 1,
  direction = 'left',
  separator = '\u2014',
  className = '',
}: ScrollTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    // One "set" width = total width / 3 duplicates
    const setWidth = track.scrollWidth / 3
    const distance = setWidth * speed
    const xEnd = direction === 'left' ? -distance : distance

    // Start offset so right-direction begins shifted
    if (direction === 'right') {
      gsap.set(track, { x: -setWidth })
    }

    gsap.to(track, {
      x: xEnd,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, { scope: containerRef })

  const renderSet = (keyPrefix: string) =>
    items.map((item, i) => (
      <span className="scroll-ticker__item" key={`${keyPrefix}-${i}`}>
        {item}
        <span className="scroll-ticker__separator" aria-hidden="true">
          {separator}
        </span>
      </span>
    ))

  return (
    <div
      ref={containerRef}
      className={`scroll-ticker ${className}`.trim()}
    >
      <div ref={trackRef} className="scroll-ticker__track">
        {renderSet('a')}
        {renderSet('b')}
        {renderSet('c')}
      </div>
    </div>
  )
}
