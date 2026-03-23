/**
 * Robinson projection utilities for mapping lat/lng to the Simplemaps world-map
 * SVG coordinate space (viewBox 0 0 2000 857).
 *
 * The Simplemaps SVG uses Robinson projection — NOT Mercator.
 * Robinson is defined by a lookup table of X/Y factors per 5-degree latitude.
 *
 * Calibration: least-squares fit against 29 small-country SVG centroids
 * (AE, AL, AM, AT, BE, BG, CH, CZ, EE, EG, HR, HU, IE, IL, IS, JO, KW,
 *  LB, LT, LV, NL, PL, PT, QA, RO, RS, SI, SK, SY).
 * Mean error: ~1.3 px X, ~0.7 px Y.
 */

// Robinson projection lookup table: [latitude, X-factor, Y-factor]
// Source: Arthur H. Robinson, 1974
const ROBINSON_TABLE: [number, number, number][] = [
  [0, 1.0000, 0.0000],
  [5, 0.9986, 0.0620],
  [10, 0.9954, 0.1240],
  [15, 0.9900, 0.1860],
  [20, 0.9822, 0.2480],
  [25, 0.9730, 0.3100],
  [30, 0.9600, 0.3720],
  [35, 0.9427, 0.4340],
  [40, 0.9216, 0.4958],
  [45, 0.8962, 0.5571],
  [50, 0.8679, 0.6176],
  [55, 0.8350, 0.6769],
  [60, 0.7986, 0.7346],
  [65, 0.7597, 0.7903],
  [70, 0.7186, 0.8435],
  [75, 0.6732, 0.8936],
  [80, 0.6213, 0.9394],
  [85, 0.5722, 0.9761],
  [90, 0.5322, 1.0000],
]

function robinsonInterpolate(absLat: number): { xFactor: number; yFactor: number } {
  const clamped = Math.min(Math.abs(absLat), 90)
  const idx = Math.floor(clamped / 5)
  const frac = (clamped - idx * 5) / 5

  const lo = ROBINSON_TABLE[Math.min(idx, 18)]
  const hi = ROBINSON_TABLE[Math.min(idx + 1, 18)]

  return {
    xFactor: lo[1] + (hi[1] - lo[1]) * frac,
    yFactor: lo[2] + (hi[2] - lo[2]) * frac,
  }
}

// Calibration constants derived via least-squares regression of Robinson-projected
// coordinates against actual SVG centroid positions of 29 small countries.
//
// Formula: svg_x = CENTER_X + SCALE_X * xFactor * lngRad
//          svg_y = CENTER_Y - SCALE_Y * yFactor * sign(lat)
const SCALE_X = 326.44
const SCALE_Y = 515.99
const CENTER_X = 985.92
const CENTER_Y = 500.60

/** Convert lat/lng to SVG x/y using Robinson projection calibrated for Simplemaps. */
export function geoToSvg(lat: number, lng: number): { x: number; y: number } {
  const { xFactor, yFactor } = robinsonInterpolate(lat)

  const lngRad = (lng * Math.PI) / 180
  const x = CENTER_X + SCALE_X * xFactor * lngRad
  const y = CENTER_Y - SCALE_Y * yFactor * (lat < 0 ? -1 : 1)

  return { x, y }
}

/** Full viewBox matching the Simplemaps world SVG. */
export const MAP_VIEWBOX = '0 0 2000 857'

/** Generate a curved SVG quadratic bezier path between two points (flight arc). */
export function flightPath(
  from: { x: number; y: number },
  to: { x: number; y: number }
): string {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  const dist = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2)
  const arcHeight = Math.min(dist * 0.3, 80)
  const controlY = midY - arcHeight

  return `M ${from.x} ${from.y} Q ${midX} ${controlY} ${to.x} ${to.y}`
}
