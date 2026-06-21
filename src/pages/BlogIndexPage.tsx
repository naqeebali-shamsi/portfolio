import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import Seo from '@/components/Seo';
import SectionLabel from '@/components/atoms/SectionLabel';
import { blogPostsByDate } from '@/content/blog/registry';
import ProductCTA from '@/components/Blog/ProductCTA';

const SITE = 'https://naqeebali.me';

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogIndexPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const url = `${SITE}/blog`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Engineering Notes | Naqeebali Shamsi',
    description:
      'Essays on backend systems design: authorization, idempotency, consistency, and the trade-offs that only surface in production.',
    url,
    blogPost: blogPostsByDate.map((m) => ({
      '@type': 'BlogPosting',
      headline: m.meta.headline || m.meta.title,
      url: `${SITE}/blog/${m.meta.slug}`,
      datePublished: m.meta.datePublished,
    })),
  };

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <Seo
        title="Writing: Engineering Notes | Naqeebali Shamsi"
        description="Essays on backend systems design: authorization, idempotency, consistency, real-time, and the trade-offs that only surface in production."
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
            <SectionLabel>writing</SectionLabel>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-heading mt-4 mb-6" style={{ color: 'var(--text-primary)' }}>
              Engineering Notes
            </h1>
            <p className="font-body text-xl max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Essays on the backend problems worth getting right: authorization, idempotency, consistency, and the trade-offs that only show up in production.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="py-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-6 space-y-5">
          {blogPostsByDate.map((m) => (
            <Link
              key={m.meta.slug}
              to={`/blog/${m.meta.slug}`}
              data-cursor="link"
              className="group block rounded-lg border p-6 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                {m.meta.datePublished && <time dateTime={m.meta.datePublished}>{formatDate(m.meta.datePublished)}</time>}
                {m.meta.readingTime && <span>· {m.meta.readingTime} read</span>}
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold leading-snug mb-3 transition-colors group-hover:text-accent" style={{ color: 'var(--text-primary)' }}>
                {m.meta.headline || m.meta.title}
              </h2>
              <p className="font-body text-base md:text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {m.meta.deck || m.meta.description}
              </p>
              {m.meta.tags?.length ? (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {m.meta.tags.map((t) => (
                    <span key={t} className="font-mono text-xs px-2 py-0.5 rounded" style={{ color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.05)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
                Read post <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </main>

      <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-6">
        <ProductCTA source="blog-index" />
      </div>

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
