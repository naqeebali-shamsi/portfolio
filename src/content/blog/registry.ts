import type { ComponentType } from 'react';
import { blogMetaEntries } from './_meta.generated';

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  headline?: string;
  deck?: string;
  datePublished: string;
  dateModified?: string;
  readingTime?: string;
  tags?: string[];
  faq?: { q: string; a: string }[];
}

export interface BlogPostModule {
  meta: BlogPostMeta;
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
}

// Code-splitting strategy:
//   - Post METADATA comes from `_meta.generated.ts` (a plain-data sidecar produced
//     by scripts/gen-content-meta.mjs). It's tiny (~6 KB gzip for all posts) and is
//     the only thing the homepage section and /blog index need.
//   - Post BODIES are lazy-imported below — a DYNAMIC-ONLY glob. Because nothing
//     statically imports the .mdx files, Rollup splits each post into its own chunk,
//     fetched only when that post's page opens. This keeps ~900 KB of MDX out of the
//     main bundle.
const bodyLoaders = import.meta.glob('./*.mdx') as Record<
  string,
  () => Promise<BlogPostModule>
>;

const slugToPath: Record<string, string> = {};

/** Metadata for every published post, keyed by slug. */
export const blogMeta: Record<string, BlogPostMeta> = {};
for (const { path, meta } of blogMetaEntries) {
  if (!meta?.slug) continue;
  blogMeta[meta.slug] = meta;
  slugToPath[meta.slug] = path;
}

export const blogSlugs = Object.keys(blogMeta);

/**
 * Posts newest-first, for listing on the homepage and the /blog index.
 * Shape is `{ meta }` to match existing list consumers — no post body is loaded.
 */
export const blogPostsByDate: { meta: BlogPostMeta }[] = Object.values(blogMeta)
  .sort((a, b) => (b.datePublished || '').localeCompare(a.datePublished || ''))
  .map((meta) => ({ meta }));

/**
 * React.lazy-compatible loader for a post's compiled MDX body, or undefined if
 * the slug is unknown. Only the individual post page calls this.
 */
export function loadBlogPost(slug: string): (() => Promise<BlogPostModule>) | undefined {
  const path = slugToPath[slug];
  return path ? bodyLoaders[path] : undefined;
}
