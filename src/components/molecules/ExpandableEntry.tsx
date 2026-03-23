import { useRef, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import './ExpandableEntry.css'

interface ExpandableEntryProps {
  /** The expandable content */
  children: ReactNode
  /** Controlled open state */
  isOpen: boolean
  /** Callback when toggled */
  onToggle?: () => void
  /** Clickable header/trigger element */
  trigger?: ReactNode
  /** Use GSAP height animation (default true) */
  animated?: boolean
  /** Animation duration in seconds */
  duration?: number
  /** GSAP easing function */
  ease?: string
  /** Additional class name on the root element */
  className?: string
}

/**
 * Reusable expand/collapse container with GSAP height animation.
 *
 * Content stays in the DOM at all times but is hidden via `overflow: hidden`
 * and `height: 0` when collapsed. Respects `prefers-reduced-motion`.
 *
 * Usage:
 *   const [open, setOpen] = useState(false)
 *
 *   <ExpandableEntry
 *     isOpen={open}
 *     onToggle={() => setOpen(!open)}
 *     trigger={<div>Click to expand</div>}
 *   >
 *     <p>Detailed content here...</p>
 *   </ExpandableEntry>
 */
export default function ExpandableEntry({
  children,
  isOpen,
  onToggle,
  trigger,
  animated = true,
  duration = 0.4,
  ease = 'power3.inOut',
  className = '',
}: ExpandableEntryProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<{ contextSafe: (fn: () => void) => () => void } | null>(null)
  const prefersReducedMotion = useRef(false)

  // Detect reduced motion preference
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  }, [])

  // Store contextSafe from GSAP scope
  useGSAP(
    (_, contextSafe) => {
      if (contextSafe) {
        contextRef.current = {
          contextSafe: contextSafe as (fn: () => void) => () => void,
        }
      }
    },
    { scope: rootRef }
  )

  // Animate on isOpen change
  const prevOpen = useRef(isOpen)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    // Skip if state hasn't actually changed (initial render handled below)
    if (prevOpen.current === isOpen) return
    prevOpen.current = isOpen

    // No animation: snap immediately
    if (!animated || prefersReducedMotion.current) {
      el.style.height = isOpen ? 'auto' : '0'
      el.style.opacity = isOpen ? '1' : '0'
      return
    }

    // GSAP animated transition
    const run = contextRef.current?.contextSafe
    if (!run) {
      // Fallback if context not ready
      el.style.height = isOpen ? 'auto' : '0'
      el.style.opacity = isOpen ? '1' : '0'
      return
    }

    if (isOpen) {
      run(() => {
        // Measure target height
        const scrollHeight = el.scrollHeight
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height: scrollHeight,
            opacity: 1,
            duration,
            ease,
            onComplete: () => {
              // Set to auto so content can reflow naturally
              el.style.height = 'auto'
            },
          }
        )
      })()
    } else {
      run(() => {
        // Capture current height before animating to 0
        const currentHeight = el.offsetHeight
        gsap.fromTo(
          el,
          { height: currentHeight, opacity: 1 },
          {
            height: 0,
            opacity: 0,
            duration,
            ease,
          }
        )
      })()
    }
  }, [isOpen, animated, duration, ease])

  const handleTriggerClick = useCallback(() => {
    onToggle?.()
  }, [onToggle])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onToggle?.()
      }
    },
    [onToggle]
  )

  return (
    <div
      ref={rootRef}
      className={`expandable-entry ${isOpen ? 'expandable-entry--open' : ''} ${className}`.trim()}
    >
      {trigger && (
        <div
          className="expandable-entry__trigger"
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          onClick={handleTriggerClick}
          onKeyDown={handleKeyDown}
        >
          {trigger}
        </div>
      )}

      <div
        ref={contentRef}
        className="expandable-entry__content"
        aria-hidden={!isOpen}
        style={{ height: 0, opacity: 0 }}
      >
        {children}
      </div>
    </div>
  )
}
