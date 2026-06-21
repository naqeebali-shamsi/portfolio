// Product registry — single source of truth for the Gumroad funnel.
// Add a product = add an entry here. The blog CTA (ProductCTA), the /products
// shop, and contextual selection all read from this list.

export interface Product {
  id: string;
  name: string;
  /** Short qualifier shown as the CTA eyebrow, e.g. "If you use Claude Code". */
  eyebrow: string;
  /** One or two sentences of value prop. */
  pitch: string;
  /** Optional concrete benefit / ROI line. */
  roi?: string;
  /** Gumroad product URL. null while a product is still coming soon. */
  url: string | null;
  status: 'live' | 'coming-soon';
  /** Audience bucket, for grouping/affinity. */
  audience: 'claude-code' | 'system-design';
  /** Content tags this product is relevant to (drives the contextual CTA). */
  tags: string[];
  /** Button label. */
  cta: string;
}

/** Gumroad creator page — used as the "notify me" follow target for coming-soon items. */
export const CREATOR_URL = 'https://naqeebali7.gumroad.com';

export const products: Product[] = [
  {
    id: 'cc-cleanup-sop',
    name: 'Claude Code Cleanup SOP',
    eyebrow: 'If you use Claude Code',
    pitch:
      'Installed every plugin, MCP server, hook, and skill, and now Claude Code is slow, bloated, and fighting itself? This is the 8-phase SOP that cleans it up: copy-paste audit prompts, fill-in templates, and a monthly checklist to keep it that way.',
    roi: 'Cut startup context 40-60% and stop burning $2 to $5 a day on tokens feeding tools that overlap or do nothing.',
    url: 'https://naqeebali7.gumroad.com/l/cc-cleanup-sop',
    status: 'live',
    audience: 'claude-code',
    tags: ['claude-code', 'ai-agents', 'mcp', 'tooling', 'productivity', 'cleanup'],
    cta: 'Get the SOP',
  },
  {
    id: 'cc-power-setup',
    name: 'Claude Code Power Setup Kit',
    eyebrow: 'Setting up Claude Code?',
    pitch:
      "The opinionated starter the cleanup SOP wishes you'd had. Battle-tested CLAUDE.md templates, hook recipes, a curated MCP shortlist, and the skills actually worth installing, so your setup is fast and coherent from the first session.",
    roi: 'Skip the bloat phase entirely: one memory strategy, one orchestration approach, and tools that earn the context they cost.',
    url: null,
    status: 'coming-soon',
    audience: 'claude-code',
    tags: ['claude-code', 'ai-agents', 'mcp', 'tooling', 'setup'],
    cta: 'Notify me',
  },
  {
    id: 'cc-lifecycle-bundle',
    name: 'Claude Code Lifecycle Bundle',
    eyebrow: 'The full lifecycle',
    pitch:
      'The Power Setup Kit and the Cleanup SOP together: the complete lifecycle of a Claude Code environment, from first install to monthly maintenance, at a bundle price.',
    url: null,
    status: 'coming-soon',
    audience: 'claude-code',
    tags: ['claude-code', 'ai-agents', 'tooling'],
    cta: 'Notify me',
  },
];

export const liveProducts = products.filter((p) => p.status === 'live');

/** UTM-tagged Gumroad link for a live product, attributed to a source (post slug / page id). */
export function productHref(product: Product, source: string): string {
  if (!product.url) return '/products';
  const params = new URLSearchParams({
    utm_source: 'naqeebali.me',
    utm_medium: 'cta',
    utm_campaign: product.id,
    utm_content: source || 'site',
  });
  return `${product.url}?${params.toString()}`;
}

/** Follow-the-creator link for coming-soon items (Gumroad emails followers on new releases). */
export function followHref(source: string): string {
  const params = new URLSearchParams({
    utm_source: 'naqeebali.me',
    utm_medium: 'cta',
    utm_campaign: 'creator-follow',
    utm_content: source || 'site',
  });
  return `${CREATOR_URL}?${params.toString()}`;
}

/** Pick the best live product for content by tag overlap; falls back to the first live product. */
export function pickProduct(tags: string[] = []): Product | null {
  if (!liveProducts.length) return null;
  let best = liveProducts[0];
  let bestScore = -1;
  for (const p of liveProducts) {
    const score = p.tags.filter((t) => tags.includes(t)).length;
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }
  return best;
}
