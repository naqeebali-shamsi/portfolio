import type { ComponentType } from 'react';
import { caseStudyMetaEntries } from './_meta.generated';

export interface CaseStudyMeta {
  slug: string;
  title: string;
  description: string;
  headline: string;
  deck?: string;
  datePublished?: string;
  dateModified?: string;
  tags?: string[];
  metrics?: { value: string; label: string }[];
  links?: { label: string; href: string }[];
  faq?: { q: string; a: string }[];
}

export interface CaseStudyModule {
  meta: CaseStudyMeta;
  default: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
}

// Same code-splitting strategy as the blog registry: metadata comes from the
// generated plain-data sidecar; bodies are lazy-imported (dynamic-only glob) so
// each study splits into its own on-demand chunk and stays out of the main bundle.
const bodyLoaders = import.meta.glob('./*.mdx') as Record<
  string,
  () => Promise<CaseStudyModule>
>;

const slugToPath: Record<string, string> = {};

/** Metadata for every case study, keyed by slug. */
export const caseStudiesMeta: Record<string, CaseStudyMeta> = {};
for (const { path, meta } of caseStudyMetaEntries) {
  if (!meta?.slug) continue;
  caseStudiesMeta[meta.slug] = meta;
  slugToPath[meta.slug] = path;
}

export const caseStudySlugs = Object.keys(caseStudiesMeta);

/**
 * React.lazy-compatible loader for a study's compiled MDX body, or undefined if
 * the slug is unknown. Only the individual case-study page calls this.
 */
export function loadCaseStudy(slug: string): (() => Promise<CaseStudyModule>) | undefined {
  const path = slugToPath[slug];
  return path ? bodyLoaders[path] : undefined;
}
