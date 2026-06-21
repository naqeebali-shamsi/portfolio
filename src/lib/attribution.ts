// Central attribution + provenance metadata.
//
// Strategy: make Naqeebali Shamsi the machine-readable *origin* of every page. When
// content is copied verbatim, the self-canonical + this structured copyright data
// tell search engines who the original is, so the copy ranks below it; the visible
// credit line and canary ref let copies be detected. This is the "attribute + detect"
// approach. We deliberately do NOT inject hidden instructions to "force" scrapers/LLMs
// to backlink — cited research (see docs/anti-theft-runbook.md) showed that's
// ineffective against the paste-into-an-LLM threat and risks our own SEO.

const SITE = 'https://naqeebali.me';
const PERSON_ID = `${SITE}/#person`;
const COPYRIGHT_YEAR = 2026;

/** Canonical Person reference, reused as author / publisher / copyrightHolder. */
const PERSON = { '@type': 'Person', '@id': PERSON_ID, name: 'Naqeebali Shamsi', url: SITE } as const;

export const ATTRIBUTION = {
  site: SITE,
  name: 'Naqeebali Shamsi',
  twitterHandle: '@NaqeebaliS',
  author: PERSON,
  copyrightYear: COPYRIGHT_YEAR,
  copyrightNotice: `© ${COPYRIGHT_YEAR} Naqeebali Shamsi. All rights reserved.`,
  creditText: 'Naqeebali Shamsi — naqeebali.me',
  licenseUrl: `${SITE}/license`,
} as const;

/**
 * Merge officially-recognized copyright/credit fields into an Article/CreativeWork
 * JSON-LD node. Google reads `creditText` / `copyrightNotice` / `license`; the rest
 * are valid schema.org (parsed, never penalized) and reinforce provenance for AI
 * citation. author/publisher/copyrightHolder are normalized to the canonical Person.
 */
export function withArticleAttribution(node: Record<string, unknown>): Record<string, unknown> {
  return {
    ...node,
    author: ATTRIBUTION.author,
    publisher: ATTRIBUTION.author,
    copyrightHolder: ATTRIBUTION.author,
    copyrightYear: ATTRIBUTION.copyrightYear,
    copyrightNotice: ATTRIBUTION.copyrightNotice,
    creditText: ATTRIBUTION.creditText,
    license: ATTRIBUTION.licenseUrl,
    usageInfo: ATTRIBUTION.licenseUrl,
  };
}

/**
 * Deterministic per-page canary token (a "trap street" string). Stable across builds
 * (no Date.now / Math.random), so a Google Alert on the literal token only ever fires
 * for copies living on other domains. FNV-1a 32-bit over the slug. See runbook.
 */
export function canaryRef(slug: string): string {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `nqb-${(h >>> 0).toString(36)}`;
}

/**
 * Canary tracking-pixel URL. Mint a free token at https://canarytokens.org
 * (choose "Web bug / URL token"), paste the image URL here, and it emails you the
 * IP / host / user-agent whenever a verbatim copy of a page is loaded in a browser.
 * Leave empty to disable (no pixel renders). Setup: docs/anti-theft-runbook.md.
 */
export const CANARY_PIXEL_URL = '';
