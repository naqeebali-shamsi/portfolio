import DualSenseController from '@/components/DualSense/DualSenseController'
import SectionLabel from '@/components/atoms/SectionLabel'
import { SectionWithReveal } from '@/components/molecules/SectionWithReveal'
import WatermarkText from '@/components/atoms/WatermarkText'
import './Skills.css'

export function Skills() {
  return (
    <section id="skills" className="skills-section">
      <WatermarkText text="SKILLS" />

      <div className="skills-content">
        <SectionWithReveal>
          <SectionLabel>skills</SectionLabel>
          <h2 className="skills-heading">What I Play With</h2>
          <p className="skills-subtitle">
            Hover the controller to explore my toolkit
          </p>
        </SectionWithReveal>

        <div className="skills-controller-wrapper">
          <DualSenseController />
        </div>
      </div>
    </section>
  )
}
