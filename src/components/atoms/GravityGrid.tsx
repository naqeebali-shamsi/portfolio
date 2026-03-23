import { useRef, useEffect } from 'react'
import './GravityGrid.css'

interface GravityGridProps {
  /** Grid cell size in px */
  cellSize?: number
  /** Mouse attraction strength */
  strength?: number
  /** Effect radius in px */
  radius?: number
  /** Spring stiffness (restoring force) */
  stiffness?: number
  /** Velocity damping (0-1, lower = more friction) */
  damping?: number
  /** Grid line color */
  color?: string
  /** Glow dot color near cursor (set to '' to disable dots) */
  dotColor?: string
  className?: string
}

/**
 * Canvas grid with spring-based spacetime distortion following the mouse.
 * Points are attracted toward the cursor and spring back to origin with damping.
 *
 * Place inside a `position: relative; overflow: hidden` parent.
 * Content should sit above it with `position: relative; z-index: 1`.
 */
export default function GravityGrid({
  cellSize = 40,
  strength = 0.5,
  radius = 150,
  stiffness = 0.05,
  damping = 0.92,
  color = 'rgba(50, 41, 47, 0.06)',
  dotColor = 'rgba(112, 171, 175, 0.4)',
  className = '',
}: GravityGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const pointsRef = useRef<Float32Array | null>(null)
  const gridRef = useRef({ cols: 0, rows: 0 })

  // Mouse state in a ref to avoid re-renders
  const mouse = useRef({ x: -1000, y: -1000, active: false })

  // Canvas/size state
  const meta = useRef({ width: 0, height: 0, dpr: 1 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // --- Resize handling ---
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      meta.current.width = rect.width
      meta.current.height = rect.height
      meta.current.dpr = dpr

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      // Rebuild points array
      const cols = Math.ceil(rect.width / cellSize) + 1
      const rows = Math.ceil(rect.height / cellSize) + 1
      gridRef.current = { cols, rows }

      // Each point: x, y, originX, originY, vx, vy (6 floats per point)
      const count = rows * cols
      const arr = new Float32Array(count * 6)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = (row * cols + col) * 6
          const px = col * cellSize
          const py = row * cellSize
          arr[i] = px       // x
          arr[i + 1] = py   // y
          arr[i + 2] = px   // originX
          arr[i + 3] = py   // originY
          arr[i + 4] = 0    // vx
          arr[i + 5] = 0    // vy
        }
      }

      pointsRef.current = arr
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement!)
    resize()

    // --- Input handlers ---
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
      mouse.current.active = true
    }

    const onMouseLeave = () => {
      mouse.current.x = -1000
      mouse.current.y = -1000
      mouse.current.active = false
    }

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = touch.clientX - rect.left
      mouse.current.y = touch.clientY - rect.top
      mouse.current.active = true
    }

    const onTouchEnd = () => {
      mouse.current.x = -1000
      mouse.current.y = -1000
      mouse.current.active = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    // --- Animation loop ---
    const render = () => {
      const points = pointsRef.current
      if (!points) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const { width: w, height: h, dpr } = meta.current
      const { cols, rows } = gridRef.current
      const mx = mouse.current.x
      const my = mouse.current.y
      const count = rows * cols

      // Update physics for each point
      for (let i = 0; i < count; i++) {
        const base = i * 6
        const x = points[base]
        const y = points[base + 1]
        const ox = points[base + 2]
        const oy = points[base + 3]
        let vx = points[base + 4]
        let vy = points[base + 5]

        // Attractive force toward mouse
        const dx = mx - x
        const dy = my - y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < radius && dist > 0.1) {
          const force = (radius - dist) / radius
          const angle = Math.atan2(dy, dx)
          vx += Math.cos(angle) * force * strength
          vy += Math.sin(angle) * force * strength
        }

        // Spring restoring force to origin
        vx += (ox - x) * stiffness
        vy += (oy - y) * stiffness

        // Damping
        vx *= damping
        vy *= damping

        // Update position
        points[base] = x + vx
        points[base + 1] = y + vy
        points[base + 4] = vx
        points[base + 5] = vy
      }

      // Draw
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Grid lines
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5

      // Horizontal
      ctx.beginPath()
      for (let row = 0; row < rows; row++) {
        const b = row * cols * 6
        ctx.moveTo(points[b], points[b + 1])
        for (let col = 1; col < cols; col++) {
          const i = (row * cols + col) * 6
          ctx.lineTo(points[i], points[i + 1])
        }
      }
      ctx.stroke()

      // Vertical
      ctx.beginPath()
      for (let col = 0; col < cols; col++) {
        const b = col * 6
        ctx.moveTo(points[b], points[b + 1])
        for (let row = 1; row < rows; row++) {
          const i = (row * cols + col) * 6
          ctx.lineTo(points[i], points[i + 1])
        }
      }
      ctx.stroke()

      // Glowing dots at intersections near cursor
      if (dotColor) {
        for (let i = 0; i < count; i++) {
          const base = i * 6
          const px = points[base]
          const py = points[base + 1]
          const dx = mx - px
          const dy = my - py
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < radius) {
            const alpha = (1 - dist / radius) * 0.5
            ctx.fillStyle = dotColor.replace(/[\d.]+\)$/, `${alpha})`)
            ctx.beginPath()
            ctx.arc(px, py, 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [cellSize, strength, radius, stiffness, damping, color, dotColor])

  return (
    <div className={`gravity-grid ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
