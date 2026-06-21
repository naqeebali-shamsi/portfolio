import { useEffect } from 'react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import Seo from '@/components/Seo';
import SectionLabel from '@/components/atoms/SectionLabel';
// Reuse the case-study MDX component map — it is generic prose styling
// (headings, lists, tables, code, callouts) with no case-study-specific logic.
import { makeMdxComponents } from '@/components/CaseStudy/mdx-components';
import type { BlogPostMeta } from '@/content/blog/registry';
import ProductCTA from '@/components/Blog/ProductCTA';
import ArticleAttribution from '@/components/ArticleAttribution';
import CanaryPixel from '@/components/CanaryPixel';
import { withArticleAttribution } from '@/lib/attribution';

const SITE = 'https://naqeebali.me';

interface Props {
  meta: BlogPostMeta;
  Content: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostLayout({ meta, Content }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const url = `${SITE}/blog/${meta.slug}`;
  const components = makeMdxComponents({ slug: meta.slug, faq: meta.faq });

  const blogPosting = withArticleAttribution({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.headline || meta.title,
    description: meta.description,
    image: `${SITE}/og-image.png`,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified || meta.datePublished,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    keywords: meta.tags,
  });
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
  const jsonLd = faqLd ? [blogPosting, faqLd] : [blogPosting];

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <Seo title={meta.title} description={meta.description} canonical={url} type="article" jsonLd={jsonLd} />
      <CanaryPixel />
      <CustomCursor />
      <Navbar />

      {/* HERO */}
      <header className="section-dark pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline mb-8">
              ← Back to Portfolio
            </Link>
            <SectionLabel>writing</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-heading mt-4 mb-6" style={{ color: 'var(--text-primary)' }}>
              {meta.headline || meta.title}
            </h1>
            {meta.deck && (
              <p className="font-body text-xl md:text-2xl max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {meta.deck}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-8 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
              {meta.datePublished && <time dateTime={meta.datePublished}>{formatDate(meta.datePublished)}</time>}
              {meta.readingTime && <span>· {meta.readingTime} read</span>}
              {meta.tags?.length ? <span>· {meta.tags.join(' / ')}</span> : null}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ARTICLE BODY */}
      <article className="py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-5 lg:px-6">
          <Content components={components} />
          <ProductCTA source={meta.slug} tags={meta.tags} />
          <ArticleAttribution slug={meta.slug} url={url} />
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
