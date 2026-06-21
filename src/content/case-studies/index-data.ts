import { caseStudies } from './registry';

/** Flat shape used by the homepage section and the /case-studies index page. */
export interface CaseStudyIndexEntry {
  slug: string;
  href: string;
  headline: string;
  summary: string;
  tags: string[];
}

// NomadCrew is the bespoke /case-study/nomadcrew page (not MDX), so it's listed by hand.
const nomadcrew: CaseStudyIndexEntry = {
  slug: 'nomadcrew',
  href: '/case-study/nomadcrew',
  headline: 'NomadCrew: Real-Time Group Travel Coordination, Built in Go',
  summary:
    'A real-time platform for the messy reality of group travel: a fine-grained WebSocket hub, matrix-based authorization, penny-perfect expense splitting, and database-enforced location privacy.',
  tags: ['Go', 'React Native', 'WebSockets', 'PostgreSQL'],
};

// Curated display order — flagship first.
const ORDER = ['nomadcrew', 'aladeen', 'mecanum', 'audex', 'intellifill'];

const registryEntries: CaseStudyIndexEntry[] = Object.values(caseStudies).map((mod) => ({
  slug: mod.meta.slug,
  href: `/case-study/${mod.meta.slug}`,
  headline: mod.meta.headline,
  summary: mod.meta.deck || mod.meta.description,
  tags: (mod.meta.tags || []).slice(0, 4),
}));

const all = [nomadcrew, ...registryEntries];

export const caseStudyIndex: CaseStudyIndexEntry[] = ORDER.map((slug) =>
  all.find((e) => e.slug === slug)
).filter((e): e is CaseStudyIndexEntry => Boolean(e));
