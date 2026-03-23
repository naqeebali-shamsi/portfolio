import { useRef, useState, useCallback, useEffect } from 'react'
import { skillZones, keyToButton, type SkillZone } from './constants'
import DualSenseSVG from './DualSenseSVG'
import TrackpadWaveform from './TrackpadWaveform'
import TechStackGrid from '@/components/molecules/TechStackGrid'
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

  // Keyboard: press-and-hold
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
      setState({
        activeZone: mapping.zone,
        activeButton: mapping.button,
        source: 'keyboard',
      })
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const mapping = keyToButton[key]
      if (!mapping) return

      if (mapping.button === activeButtonRef.current) {
        setState(initialState)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Mouse: press-and-hold
  const handleButtonDown = useCallback((zone: string, button: string) => {
    if (sourceRef.current === 'keyboard') return
    setState({ activeZone: zone, activeButton: button, source: 'click' })
  }, [])

  useEffect(() => {
    const handleMouseUp = () => {
      if (sourceRef.current === 'click') {
        setState(initialState)
      }
    }

    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchend', handleMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [])

  return (
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
            <div className="dualsense-controller__waveform-overlay">
              <TrackpadWaveform
                isHovered={state.activeZone === 'trackpad'}
              />
            </div>
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
                  <div className="skill-monitor__cursor">_</div>
                  <p className="skill-monitor__idle-text">
                    Press a button to load skills...
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
  )
}
