import './MissionBriefing.css'

interface MissionBriefingProps {
  /** Mission number (1, 2, 3...) */
  number: number
  /** The philosophy statement */
  statement: string
  /** Optional longer description */
  description?: string
  /** 0-100, percentage (default 100) */
  progress?: number
  /** Visual status indicator (default 'active') */
  status?: 'active' | 'complete' | 'locked'
  /** Additional class name on the root element */
  className?: string
}

const STATUS_LABEL: Record<string, string> = {
  active: '[ACTIVE]',
  complete: '[COMPLETE]',
  locked: '[LOCKED]',
}

/**
 * Game-style "mission briefing" card that presents a philosophy statement
 * as a mission objective with a visual progress bar.
 *
 * This is a pure presentational component — scroll-triggered animations
 * should be handled by wrapping with SectionWithReveal.
 *
 * Usage:
 *   <MissionBriefing
 *     number={1}
 *     statement="Ship simple, iterate fast."
 *     description="The best code is the code that works today."
 *     progress={87}
 *     status="active"
 *   />
 */
export default function MissionBriefing({
  number,
  statement,
  description,
  progress = 100,
  status = 'active',
  className = '',
}: MissionBriefingProps) {
  const missionId = `MISSION ${String(number).padStart(2, '0')}`
  const clampedProgress = Math.max(0, Math.min(100, progress))

  return (
    <div className={`mission-briefing ${className}`.trim()}>
      <div className="mission-briefing__header">
        <span className="mission-briefing__id">{missionId}</span>
        <span className="mission-briefing__divider" aria-hidden="true">
          ─────────────
        </span>
        <span className={`mission-briefing__status mission-briefing__status--${status}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>

      <div className="mission-briefing__body">
        <p className="mission-briefing__statement">{statement}</p>
        {description && <p className="mission-briefing__desc">{description}</p>}
      </div>

      <div className="mission-briefing__progress" role="progressbar" aria-valuenow={clampedProgress} aria-valuemin={0} aria-valuemax={100}>
        <div className="mission-briefing__bar-track">
          <div
            className="mission-briefing__bar"
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
        <span className="mission-briefing__percent">{clampedProgress}%</span>
      </div>
    </div>
  )
}
