import { motion } from 'framer-motion';
import { caseStudy } from '@/data/content';
import HeaderWithLabel from '@/components/molecules/HeaderWithLabel';
import SectionLabel from '@/components/atoms/SectionLabel';
import AnimatedArchitecture from '@/components/CaseStudy/AnimatedArchitecture';
import ExternalLink from '@/components/atoms/ExternalLink';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export function CaseStudy() {
  return (
    <section id="work" data-cursor="project" className="section-dark py-section scroll-mt-20">
      {/* 1. Intro */}
      <motion.div
        className="max-w-container mx-auto px-4 sm:px-5 lg:px-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeaderWithLabel label="case study" title={caseStudy.name} />
        <p className="font-body text-lg text-text-muted max-w-3xl mt-6">
          {caseStudy.problem}
        </p>
      </motion.div>

      {/* 2. Full-width architecture + phone mockups */}
      <motion.div
        className="w-full bg-white/5 mt-10 py-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT -- Architecture diagram */}
            <div>
              <SectionLabel className="mb-8 block">architecture</SectionLabel>

              <AnimatedArchitecture />

              {/* Tech decisions */}
              <motion.ul
                className="mt-10 space-y-3"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {caseStudy.techDecisions.map((decision, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 font-body text-base text-text-muted"
                    variants={fadeUp}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="mt-2 block h-2 w-2 shrink-0 rounded-full bg-accent" />
                    {decision}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* RIGHT -- Real app screenshots */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex gap-6 justify-center items-center">
                <div className="app-screen-frame app-screen-frame--left">
                  <img src="/nomadcrew-screens/trip-list.png" alt="NomadCrew trip list showing active trips with planning status" />
                </div>
                <div className="app-screen-frame app-screen-frame--right hidden sm:block">
                  <img src="/nomadcrew-screens/live-map.png" alt="NomadCrew live location sharing map view" />
                </div>
              </div>

              {/* GitHub link */}
              {caseStudy.repoUrl && (
                <div className="mt-8 text-center">
                  <ExternalLink
                    href={caseStudy.repoUrl}
                    className="inline-flex items-center gap-2 text-accent hover:underline font-body text-base"
                  >
                    View on GitHub
                  </ExternalLink>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 3. Approach */}
      <motion.div
        className="max-w-container mx-auto px-4 sm:px-5 lg:px-6 mt-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionLabel className="mb-4 block">approach</SectionLabel>
        <p className="font-body text-lg text-text-muted max-w-3xl">
          {caseStudy.approach}
        </p>
      </motion.div>
    </section>
  );
}
