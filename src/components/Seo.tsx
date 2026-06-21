import { useEffect } from 'react';

/**
 * Dependency-free per-route <head> manager.
 *
 * Why this exists: the site is a client-rendered Vite SPA, so index.html ships a
 * single static <head>. Without this, every route (homepage, every case study)
 * reports the same title/description/canonical — and LLM/search crawlers that read
 * the raw HTML get nothing route-specific. This imperatively upserts the head tags
 * on mount, and the build-time prerender (scripts/prerender.mjs) snapshots the
 * resulting DOM into static HTML so crawlers actually see it.
 *
 * Tags are upserted (matched by selector, updated in place) rather than appended,
 * so the prerendered tags and the client re-render never duplicate.
 */

const SITE = 'https://naqeebali.me';
const DEFAULT_IMAGE = `${SITE}/og-image.png`;

type JsonLd = Record<string, unknown>;

interface SeoProps {
  title: string;
  description: string;
  /** Absolute canonical URL for this route. */
  canonical: string;
  /** Absolute image URL for OG/Twitter cards. */
  image?: string;
  type?: 'website' | 'article';
  /** Route-specific structured data (e.g. TechArticle). Object or array. */
  jsonLd?: JsonLd | JsonLd[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'article',
  jsonLd,
}: SeoProps) {
  const ld = jsonLd ? JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : '';

  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', canonical);

    // Open Graph
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    // Route-specific JSON-LD (stable id so we update, never duplicate)
    if (ld) {
      let script = document.getElementById('ld-json-route') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'ld-json-route';
        document.head.appendChild(script);
      }
      const parsed = JSON.parse(ld);
      script.textContent = JSON.stringify(parsed.length === 1 ? parsed[0] : parsed);
    }

    // Signal to the prerenderer that route head + content are ready to snapshot.
    document.documentElement.setAttribute('data-prerender-ready', 'true');
  }, [title, description, canonical, image, type, ld]);

  return null;
}
