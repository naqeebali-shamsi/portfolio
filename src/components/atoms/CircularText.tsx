import { useId, useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import './CircularText.css'

interface CircularTextProps {
  /** Text displayed along the circular path */
  text: string
  /** Width and height of the component in px. Default 150. */
  size?: number
  /** Seconds per full rotation. Default 20. */
  speed?: number
  className?: string
  /** Content rendered in the center of the circle (e.g., icons) */
  children?: ReactNode
}

/**
 * Continuously rotating circular text rendered on an SVG path.
 * Children are absolutely centered inside the circle.
 * Inspired by Blunar.cz's rotating footer element.
 */
export default function CircularText({
  text,
  size = 150,
  speed = 20,
  className = '',
  children,
}: CircularTextProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathId = useId()

  useGSAP(() => {
    if (!svgRef.current) return

    gsap.to(svgRef.current, {
      rotation: 360,
      repeat: -1,
      duration: speed,
      ease: 'none',
      transformOrigin: '50% 50%',
    })
  }, { dependencies: [speed] })

  return (
    <div
      className={`circular-text ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <svg
        ref={svgRef}
        className="circular-text__svg"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
            fill="none"
            stroke="none"
          />
        </defs>
        <text>
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {children && (
        <div className="circular-text__center">
          {children}
        </div>
      )}
    </div>
  )
}
