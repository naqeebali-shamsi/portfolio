import { useEffect } from 'react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import Seo from '@/components/Seo';
import SectionLabel from '@/components/atoms/SectionLabel';
import ExternalLink from '@/components/atoms/ExternalLink';
import { makeMdxComponents } from './mdx-components';
import type { CaseStudyMeta } from '@/content/case-studies/registry';

const SITE = 'https://naqeebali.me';

interface Props {
  meta: CaseStudyMeta;
  Content: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
}

export default function CaseStudyLayout({ meta, Content }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const url = `${SITE}/case-study/${meta.slug}`;
  const components = makeMdxComponents({ slug: meta.slug, faq: meta.faq });

  const techArticle: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: meta.headline || meta.title,
    description: meta.description,
    image: `${SITE}/og-image.png`,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified || meta.datePublished,
    author: { '@type': 'Person', name: 'Naqeebali Shamsi', url: SITE },
    publisher: { '@type': 'Person', name: 'Naqeebali Shamsi', url: SITE },
    mainEntityOfPage: url,
    url,
    keywords: meta.tags,
  };
  const faqLd =
    meta.faq && meta.faq.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: meta.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;
  const jsonLd = faqLd ? [techArticle, faqLd] : [techArticle];

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <Seo title={meta.title} description={meta.description} canonical={url} type="article" jsonLd={jsonLd} />
      <CustomCursor />
      <Navbar />

      {/* HERO */}
      <header className="section-dark pt-28 pb-20">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline mb-8">
              ← Back to Portfolio
            </Link>
            <SectionLabel>case study</SectionLabel>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading tracking-heading mt-4 mb-6" style={{ color: 'var(--text-primary)' }}>
              {meta.headline}
            </h1>
            {meta.deck && (
              <p className="font-body text-xl md:text-2xl max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {meta.deck}
              </p>
            )}
            {meta.links?.length ? (
              <div className="flex flex-wrap gap-4 mt-10">
                {meta.links.map((l) => (
                  <ExternalLink
                    key={l.href}
                    href={l.href}
                    className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded border border-accent text-accent hover:bg-accent hover:text-bg-dark transition-all"
                  >
                    {l.label}
                  </ExternalLink>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </header>

      {/* METRICS BAR */}
      {meta.metrics?.length ? (
        <section className="section-dark py-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
              {meta.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <p className="font-heading text-2xl md:text-3xl font-bold text-accent">{m.value}</p>
                  <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ARTICLE BODY */}
      <article className="py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-5 lg:px-6">
          <Content components={components} />
        </div>
      </article>

      {/* FOOTER */}
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
