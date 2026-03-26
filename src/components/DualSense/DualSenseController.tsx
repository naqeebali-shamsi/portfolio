import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { skillZones, keyToButton, type SkillZone } from './constants'
import DualSenseSVG from './DualSenseSVG'
import TechStackGrid from '@/components/molecules/TechStackGrid'
import { techIcons } from '@/assets/icons/tech'
import './DualSenseController.css'

interface ControllerState {
  activeZone: string | null
  activeButton: string | null
  source: 'click' | 'keyboard' | null
}

const initialState: ControllerState = {
  activeZone: null,
  activeButton: null,
  source: null,
}

export default function DualSenseController() {
  const [state, setState] = useState<ControllerState>(initialState)
  const activeButtonRef = useRef<string | null>(null)
  const sourceRef = useRef<'click' | 'keyboard' | null>(null)

  activeButtonRef.current = state.activeButton
  sourceRef.current = state.source

  const activeSkillZone: SkillZone | null = state.activeZone
    ? skillZones[state.activeZone] ?? null
    : null

  // Collect all skills for mobile grid and icon cycling
  const allSkills = useMemo(() => {
    const skills: string[] = []
    Object.values(skillZones).forEach((zone) => {
      zone.skills.forEach((s) => {
        if (!skills.includes(s.name)) skills.push(s.name)
      })
    })
    return skills
  }, [])

  // All skills that have icons — for the rotating display on the controller
  const allIconSkills = useMemo(
    () => allSkills.filter((name) => techIcons[name]),
    [allSkills]
  )

  // Cycle through icons on the controller trackpad area
  const [iconIndex, setIconIndex] = useState(0)
  useEffect(() => {
    if (allIconSkills.length === 0) return
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % allIconSkills.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [allIconSkills.length])

  // Keyboard: toggle on press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      const target = e.target as Element
      if (target.closest('[contenteditable], input, textarea, select')) return

      if (e.key === 'Escape') {
        setState(initialState)
        return
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const mapping = keyToButton[key]
      if (!mapping) return

      e.preventDefault()
      // Toggle: if same zone is already active, deactivate
      if (activeButtonRef.current === mapping.button) {
        setState(initialState)
      } else {
        setState({
          activeZone: mapping.zone,
          activeButton: mapping.button,
          source: 'keyboard',
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Mouse/touch: toggle on click
  const handleButtonDown = useCallback((zone: string, button: string) => {
    // Toggle: if same button is already active, deactivate
    if (activeButtonRef.current === button) {
      setState(initialState)
    } else {
      setState({ activeZone: zone, activeButton: button, source: 'click' })
    }
  }, [])

  return (
    <>
    {/* Mobile: static grid only */}
    <div className="skills-mobile-grid">
      {Object.values(skillZones).map((zone) => (
        <div key={zone.id} className="skills-mobile-group">
          <h3 className="skills-mobile-group__label">{zone.label}</h3>
          <div className="skills-mobile-group__tags">
            {zone.skills.map((s) => (
              <span key={s.name} className="skills-mobile-tag">
                {techIcons[s.name] && <img src={techIcons[s.name]} alt="" className="skills-mobile-tag__icon" />}
                {s.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Desktop: controller + monitor */}
    <div className="dualsense-wrapper">
      <div className="dualsense-layout">
        {/* Controller */}
        <div className="dualsense-controller">
          <div className="dualsense-controller__svg-container">
            <DualSenseSVG
              activeZone={state.activeZone}
              activeButton={state.activeButton}
              onButtonDown={handleButtonDown}
            />
            {/* Cycling tech icon on the trackpad area */}
            {allIconSkills.length > 0 && (
              <div className="dualsense-controller__icon-display">
                <img
                  key={iconIndex}
                  src={techIcons[allIconSkills[iconIndex]]}
                  alt={allIconSkills[iconIndex]}
                  className="dualsense-controller__cycling-icon"
                />
              </div>
            )}
          </div>

          <p className="dualsense-controller__hint">
            Click buttons or hold keys: <kbd>WASD</kbd> D-pad &middot;{' '}
            <kbd>↑↓←→</kbd> Face &middot; <kbd>Q</kbd>
            <kbd>E</kbd> Bumpers &middot; <kbd>Tab</kbd>
            <kbd>R</kbd> Triggers &middot; <kbd>Z</kbd>
            <kbd>C</kbd> Sticks
          </p>
        </div>

        {/* Monitor Display */}
        <div className="skill-monitor">
          <div className="skill-monitor__bezel">
            <div className="skill-monitor__top-bar">
              <div className="skill-monitor__dots">
                <span className="skill-monitor__dot skill-monitor__dot--red" />
                <span className="skill-monitor__dot skill-monitor__dot--yellow" />
                <span className="skill-monitor__dot skill-monitor__dot--green" />
              </div>
              <span className="skill-monitor__title">
                {activeSkillZone ? activeSkillZone.label.toLowerCase() + '.sys' : 'skills.sys'}
              </span>
            </div>
            <div className="skill-monitor__screen">
              {activeSkillZone ? (
                <div className="skill-monitor__content">
                  <div className="skill-monitor__header">
                    <div
                      className="skill-monitor__accent-line"
                      style={{ backgroundColor: activeSkillZone.color }}
                    />
                    <h3 className="skill-monitor__label">{activeSkillZone.label}</h3>
                    <div className="skill-monitor__keys">
                      {activeSkillZone.keys.map((k) => (
                        <kbd key={k} className="skill-monitor__kbd">{k}</kbd>
                      ))}
                    </div>
                  </div>
                  <p className="skill-monitor__description">
                    {activeSkillZone.description}
                  </p>
                  <TechStackGrid
                    className="skill-monitor__tags"
                    technologies={activeSkillZone.skills.map((s) => s.name)}
                    gap="sm"
                  />
                </div>
              ) : (
                <div className="skill-monitor__idle">
                  {allIconSkills.length > 0 && (
                    <img
                      key={iconIndex}
                      src={techIcons[allIconSkills[iconIndex]]}
                      alt=""
                      className="skill-monitor__idle-icon"
                    />
                  )}
                  <p className="skill-monitor__idle-text">
                    {allIconSkills[iconIndex] ?? 'Select a zone'}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="skill-monitor__stand" />
          <div className="skill-monitor__base" />
        </div>
      </div>
    </div>
    </>
  )
}
