import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { caseStudy } from '@/data/content';
import SectionLabel from '@/components/atoms/SectionLabel';
import { SectionWithReveal } from '@/components/molecules/SectionWithReveal';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function CaseStudyTeaser() {
  return (
    <section id="work" className="section-dark py-section scroll-mt-20">
      <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
        <SectionWithReveal>
          <SectionLabel>case study</SectionLabel>
        </SectionWithReveal>

        <motion.div
          className="mt-8 grid lg:grid-cols-[1fr_400px] gap-12 items-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left — text */}
          <div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-heading mb-6 break-words"
              style={{ color: 'var(--text-primary)' }}
            >
              {caseStudy.name}
            </h2>
            <p className="font-body text-base sm:text-lg max-w-2xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              {caseStudy.problem}
            </p>
            <Link
              to="/case-study/nomadcrew"
              data-cursor="link"
              className="inline-flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded border border-accent text-accent hover:bg-accent hover:text-bg-dark transition-all duration-200"
            >
              Read Case Study
              <span className="text-lg">→</span>
            </Link>
          </div>

          {/* Right — screenshot preview */}
          <div className="flex gap-4 justify-center items-center">
            <div className="app-screen-frame app-screen-frame--left" style={{ width: 180 }}>
              <img
                src="/nomadcrew-screens/trip-list.png"
                alt="NomadCrew trip list"
                loading="lazy"
              />
            </div>
            <div className="app-screen-frame app-screen-frame--right hidden sm:block" style={{ width: 180 }}>
              <img
                src="/nomadcrew-screens/live-map.png"
                alt="NomadCrew live map"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
