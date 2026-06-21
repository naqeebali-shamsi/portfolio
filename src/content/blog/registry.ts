import type { ComponentType } from 'react';

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

// Auto-discover every .mdx post in this folder at build time. Adding a new post
// is just dropping in a `<slug>.mdx` file with an `export const meta`.
// Files prefixed with `_` (drafts/fixtures) are ignored.
const modules = import.meta.glob('./*.mdx', { eager: true }) as Record<string, BlogPostModule>;

export const blogPosts: Record<string, BlogPostModule> = {};
for (const path in modules) {
  if (path.replace('./', '').startsWith('_')) continue;
  const mod = modules[path];
  if (mod?.meta?.slug) blogPosts[mod.meta.slug] = mod;
}

export const blogSlugs = Object.keys(blogPosts);

/** Posts newest-first, for listing on the homepage. */
export const blogPostsByDate = Object.values(blogPosts).sort((a, b) =>
  (b.meta.datePublished || '').localeCompare(a.meta.datePublished || '')
);
