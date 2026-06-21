declare module '*.mdx' {
  import type { ComponentType } from 'react';

  /** Case-study front-matter exported from each .mdx file as `export const meta`. */
  export const meta: {
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
    [key: string]: unknown;
  };

  const MDXComponent: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
  export default MDXComponent;
}
