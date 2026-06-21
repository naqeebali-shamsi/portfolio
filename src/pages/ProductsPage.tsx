import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import Seo from '@/components/Seo';
import SectionLabel from '@/components/atoms/SectionLabel';
import { products, productHref, followHref } from '@/content/products';

const SITE = 'https://naqeebali.me';

export default function ProductsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const url = `${SITE}/products`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tools & Guides | Naqeebali Shamsi',
    description: 'Practical kits and guides for developers, starting with the Claude Code power-user line.',
    url,
    hasPart: products
      .filter((p) => p.status === 'live' && p.url)
      .map((p) => ({ '@type': 'Product', name: p.name, description: p.pitch, url: p.url })),
  };

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <Seo
        title="Tools & Guides for Developers | Naqeebali Shamsi"
        description="Practical, no-fluff kits for developers. Start with the Claude Code Cleanup SOP: audit, de-bloat, and maintain your AI coding setup."
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
            <SectionLabel>shop</SectionLabel>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-heading mt-4 mb-6" style={{ color: 'var(--text-primary)' }}>
              Tools &amp; Guides
            </h1>
            <p className="font-body text-xl max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Practical, no-fluff kits built from real work. Start with the Claude Code power-user line: audit a bloated setup, set one up right, and keep it clean.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="py-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-6 grid sm:grid-cols-2 gap-5">
          {products.map((p) => {
            const isLive = p.status === 'live' && !!p.url;
            return (
              <div
                key={p.id}
                className="flex flex-col rounded-lg border p-6 sm:p-7"
                style={{ borderColor: isLive ? 'var(--accent)' : 'var(--border)', background: 'var(--surface)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">{p.eyebrow}</span>
                  {!isLive && (
                    <span className="font-mono text-[0.65rem] uppercase tracking-wide px-2 py-0.5 rounded" style={{ color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.05)' }}>
                      Coming soon
                    </span>
                  )}
                </div>
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {p.name}
                </h2>
                <p className="font-body text-base leading-relaxed mb-3 flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {p.pitch}
                </p>
                {p.roi && (
                  <p className="font-body text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>ROI:</strong> {p.roi}
                  </p>
                )}
                <a
                  href={isLive ? productHref(p, 'products-page') : followHref(p.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="mt-auto inline-flex items-center justify-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide px-5 py-3 rounded border border-accent text-accent hover:bg-accent hover:text-bg-dark transition-all"
                >
                  {p.cta} <span aria-hidden="true">→</span>
                </a>
              </div>
            );
          })}
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
