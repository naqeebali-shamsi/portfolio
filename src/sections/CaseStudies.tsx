import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionLabel from '@/components/atoms/SectionLabel';
import { caseStudyIndex } from '@/content/case-studies/index-data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/** Homepage "Case Studies" section — lists every study and links to the /case-studies hub. */
export function CaseStudies() {
  return (
    <section id="work" data-cursor="project" className="section-dark py-section scroll-mt-20">
      <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>case studies</SectionLabel>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-heading mt-4 mb-4" style={{ color: 'var(--text-primary)' }}>
            Engineering deep dives
          </h2>
          <p className="font-body text-lg max-w-2xl mb-12" style={{ color: 'var(--text-secondary)' }}>
            Long-form write-ups of the hard problems behind real, shipped systems: the constraints, the trade-offs, and the decisions that held up.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {caseStudyIndex.map((cs) => (
            <motion.div key={cs.slug} variants={fadeUp} transition={{ duration: 0.5 }}>
              <Link
                to={cs.href}
                data-cursor="link"
                className="group flex h-full flex-col rounded-lg border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent"
                style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
              >
                <h3 className="font-heading text-xl font-bold leading-snug mb-2 transition-colors group-hover:text-accent" style={{ color: 'var(--text-primary)' }}>
                  {cs.headline}
                </h3>
                <p className="font-body text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                  {cs.summary}
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-4 mt-auto">
                  {cs.tags.map((t) => (
                    <span key={t} className="font-mono text-[0.7rem] px-2 py-0.5 rounded" style={{ color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.06)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
                  Read case study <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10"
        >
          <Link to="/case-studies" data-cursor="link" className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide text-accent hover:underline">
            View all case studies <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
