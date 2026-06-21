import type { ComponentType } from 'react';

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

// Auto-discover every .mdx study in this folder at build time. Adding a new study
// is just dropping in a `<slug>.mdx` file with an `export const meta`.
const modules = import.meta.glob('./*.mdx', { eager: true }) as Record<string, CaseStudyModule>;

export const caseStudies: Record<string, CaseStudyModule> = {};
for (const path in modules) {
  const mod = modules[path];
  if (mod?.meta?.slug) caseStudies[mod.meta.slug] = mod;
}

export const caseStudySlugs = Object.keys(caseStudies);
