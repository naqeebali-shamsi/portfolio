import { useRef, useState, useCallback, useMemo } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import worldMapSvg from '@/assets/world-map.svg'
import { geoToSvg, flightPath, MAP_VIEWBOX } from './utils'
import './CareerMap.css'

/* ---------------------------------------------------------------------- */
/* Types                                                                   */
/* ---------------------------------------------------------------------- */

export interface CareerLocation {
  city: string
  country: string
  role: string
  company: string
  period: string
  type: 'work' | 'education'
  lat: number
  lng: number
  techStack?: string[]
}

interface CareerMapProps {
  locations: CareerLocation[]
  className?: string
}

/* ---------------------------------------------------------------------- */
/* Helpers                                                                 */
/* ---------------------------------------------------------------------- */

/**
 * Compute label position for each pin to avoid overlaps.
 * Uses fixed directional slots (above/below/left/right) distributed
 * among clustered pins so labels never stack on top of each other.
 */
interface LabelPos { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }

// Directional slots in priority order — spread labels around the pin
// For Y-sorted clusters: top pin → above, middle pin → right, bottom pin → below
const LABEL_SLOTS: LabelPos[] = [
  { dx: 0, dy: -18, anchor: 'middle' },   // above (assigned to topmost)
  { dx: 22, dy: 5, anchor: 'start' },     // right (assigned to middle)
  { dx: 0, dy: 30, anchor: 'middle' },    // below (assigned to bottommost)
  { dx: -22, dy: 5, anchor: 'end' },      // left
  { dx: 18, dy: -14, anchor: 'start' },   // top-right
  { dx: -18, dy: -14, anchor: 'end' },    // top-left
  { dx: 18, dy: 22, anchor: 'start' },    // bottom-right
  { dx: -18, dy: 22, anchor: 'end' },     // bottom-left
]

function computeLabelPositions(
  pins: { x: number; y: number; city: string }[]
): LabelPos[] {
  const PROXIMITY = 100 // SVG px threshold
  const positions: LabelPos[] = pins.map(() => ({
    dx: 0, dy: 24, anchor: 'middle' as const,
  }))

  // Find clusters: groups of pins within PROXIMITY of each other
  const visited = new Set<number>()

  for (let i = 0; i < pins.length; i++) {
    if (visited.has(i)) continue

    // Collect cluster members
    const cluster: number[] = [i]
    for (let j = i + 1; j < pins.length; j++) {
      const dx = Math.abs(pins[i].x - pins[j].x)
      const dy = Math.abs(pins[i].y - pins[j].y)
      if (dx < PROXIMITY && dy < PROXIMITY) {
        cluster.push(j)
      }
    }

    if (cluster.length <= 1) continue

    // Sort cluster members by Y coordinate (top-to-bottom) so labels
    // are assigned spatially: topmost pin gets "above", etc.
    cluster.sort((a, b) => pins[a].y - pins[b].y)

    // Assign each cluster member a unique slot
    cluster.forEach((pinIdx, slotIdx) => {
      positions[pinIdx] = LABEL_SLOTS[slotIdx % LABEL_SLOTS.length]
      visited.add(pinIdx)
    })
  }

  return positions
}

// Unique color per pin for visual distinction
const PIN_COLORS = [
  '#e76f51', // Surat — burnt peach
  '#2a9d8f', // Changa — verdigris
  '#264653', // Ahmedabad — charcoal blue
  '#e9c46a', // Halifax — tuscan sun
  '#f4a261', // Toronto — sandy brown
  '#e76f51', // Dubai — burnt peach
]

/* ---------------------------------------------------------------------- */
/* Component                                                               */
/* ---------------------------------------------------------------------- */

export default function CareerMap({ locations, className = '' }: CareerMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const pinGroupRefs = useRef<(SVGGElement | null)[]>([])
  const [activePin, setActivePin] = useState<number | null>(null)

  // Convert locations to SVG coordinates
  const pins = useMemo(
    () => locations.map((loc) => ({ ...loc, ...geoToSvg(loc.lat, loc.lng) })),
    [locations]
  )

  // Compute non-overlapping label positions
  const labelPositions = useMemo(() => computeLabelPositions(pins), [pins])

  // Generate flight paths between consecutive pins
  const paths = useMemo(
    () =>
      pins.slice(0, -1).map((pin, i) => ({
        d: flightPath(pin, pins[i + 1]),
        from: pin,
        to: pins[i + 1],
      })),
    [pins]
  )

  // GSAP scroll-triggered entrance animations
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Animate each flight path with dash-offset draw-on effect
        pathRefs.current.forEach((pathEl, i) => {
          if (!pathEl) return
          const length = pathEl.getTotalLength()
          gsap.set(pathEl, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
          gsap.to(pathEl, {
            strokeDashoffset: 0,
            duration: 1.4,
            delay: i * 0.35,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true,
            },
          })
        })

        // Animate each pin group (scale in + fade)
        pinGroupRefs.current.forEach((g, i) => {
          if (!g) return
          gsap.set(g, { scale: 0, opacity: 0, transformOrigin: 'center center' })
          gsap.to(g, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.35 + 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true,
            },
          })
        })
      })
    },
    { scope: containerRef, dependencies: [paths.length, pins.length] }
  )

  // Card positioning: convert SVG coords to percentage offsets
  const getCardStyle = useCallback(
    (pinIndex: number): React.CSSProperties => {
      if (pinIndex < 0 || pinIndex >= pins.length) return {}
      const pin = pins[pinIndex]
      const leftPct = (pin.x / 2000) * 100
      const topPct = (pin.y / 857) * 100
      const nudgeX = leftPct < 50 ? 12 : -112
      return {
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(${nudgeX}%, -50%)`,
      }
    },
    [pins]
  )

  const handlePinEnter = useCallback((i: number) => setActivePin(i), [])
  const handlePinLeave = useCallback(() => setActivePin(null), [])
  const handlePinClick = useCallback(
    (i: number) => setActivePin((prev) => (prev === i ? null : i)),
    []
  )

  return (
    <div ref={containerRef} className={`career-map ${className}`.trim()}>
      <div className="career-map__inner">
      {/* World map background */}
      <img
        src={worldMapSvg}
        className="career-map__bg"
        alt=""
        aria-hidden="true"
        draggable={false}
      />

      {/* Interactive overlay */}
      <svg
        viewBox={MAP_VIEWBOX}
        className="career-map__overlay"
        role="img"
        aria-label="Career journey map showing work and education locations connected by flight paths"
      >
        {/* Flight path arcs — colored by destination */}
        {paths.map((path, i) => (
          <path
            key={`path-${i}`}
            ref={(el) => {
              pathRefs.current[i] = el
            }}
            d={path.d}
            fill="none"
            stroke={PIN_COLORS[(i + 1) % PIN_COLORS.length]}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
        ))}

        {/* Location pins */}
        {pins.map((pin, i) => (
          <g
            key={`pin-${i}`}
            ref={(el) => {
              pinGroupRefs.current[i] = el
            }}
          >
            {/* Animated pulse ring (CSS animation) */}
            <circle
              className="career-map__pulse"
              cx={pin.x}
              cy={pin.y}
              r="12"
              fill="none"
              stroke={PIN_COLORS[i % PIN_COLORS.length]}
              strokeWidth="1.5"
            />

            {/* Static outer ring */}
            <circle
              cx={pin.x}
              cy={pin.y}
              r="10"
              fill="none"
              stroke={PIN_COLORS[i % PIN_COLORS.length]}
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Pin dot */}
            <circle
              className="career-map__pin"
              cx={pin.x}
              cy={pin.y}
              r="5"
              fill={PIN_COLORS[i % PIN_COLORS.length]}
              onMouseEnter={() => handlePinEnter(i)}
              onMouseLeave={handlePinLeave}
              onClick={() => handlePinClick(i)}
            />

            {/* City label — positioned to avoid overlap */}
            <text
              x={pin.x + labelPositions[i].dx}
              y={pin.y + labelPositions[i].dy}
              textAnchor={labelPositions[i].anchor}
              className="career-map__city-label"
            >
              {pin.city}
            </text>
          </g>
        ))}
      </svg>

      {/* Experience card overlay */}
      {activePin !== null && (
        <div
          className={`career-map__card ${activePin !== null ? 'career-map__card--visible' : ''}`}
          style={getCardStyle(activePin)}
        >
          <div className="career-map__card-type">
            {locations[activePin].type === 'education' ? 'Education' : 'Work'}
          </div>
          <h4 className="career-map__card-role">{locations[activePin].role}</h4>
          <p className="career-map__card-company">{locations[activePin].company}</p>
          <p className="career-map__card-period">{locations[activePin].period}</p>
          <p className="career-map__card-location">
            {locations[activePin].city}, {locations[activePin].country}
          </p>
        </div>
      )}
      </div>
    </div>
  )
}
