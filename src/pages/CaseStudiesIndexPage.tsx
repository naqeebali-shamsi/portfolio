import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import Seo from '@/components/Seo';
import SectionLabel from '@/components/atoms/SectionLabel';
import { caseStudyIndex } from '@/content/case-studies/index-data';

const SITE = 'https://naqeebali.me';

export default function CaseStudiesIndexPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const url = `${SITE}/case-studies`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Engineering Case Studies',
    description: 'In-depth technical case studies of systems built by Naqeebali Shamsi.',
    url,
    hasPart: caseStudyIndex.map((cs) => ({
      '@type': 'TechArticle',
      headline: cs.headline,
      url: `${SITE}${cs.href}`,
    })),
  };

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <Seo
        title="Case Studies: Engineering Deep Dives | Naqeebali Shamsi"
        description="In-depth engineering case studies: real-time systems in Go, agent-CLI observability, bilingual RTL frontends, multi-agent LLM pipelines, and byte-deterministic PDF generation."
        canonical={url}
        type="website"
        jsonLd={jsonLd}
      />
      <CustomCursor />
      <Navbar />

      <header className="section-dark pt-28 pb-16">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline mb-8">
              ← Back to Portfolio
            </Link>
            <SectionLabel>case studies</SectionLabel>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-heading mt-4 mb-6" style={{ color: 'var(--text-primary)' }}>
              Engineering Deep Dives
            </h1>
            <p className="font-body text-xl max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Long-form write-ups of the hard problems behind real, shipped systems: the constraints, the trade-offs, the bugs that cost a day, and the decisions that held up.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="py-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-6 space-y-5">
          {caseStudyIndex.map((cs) => (
            <Link
              key={cs.slug}
              to={cs.href}
              data-cursor="link"
              className="group block rounded-lg border p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold leading-snug mb-3 transition-colors group-hover:text-accent" style={{ color: 'var(--text-primary)' }}>
                {cs.headline}
              </h2>
              <p className="font-body text-base md:text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {cs.summary}
              </p>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {cs.tags.map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-0.5 rounded" style={{ color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.05)' }}>
                    {t}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
                Read case study <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="section-dark py-12">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline">
            ← Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
