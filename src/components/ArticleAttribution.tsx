import { Link } from 'react-router-dom';
import { ATTRIBUTION, canaryRef } from '@/lib/attribution';

interface Props {
  /** Content slug — seeds the per-page canary ref. */
  slug: string;
  /** Absolute canonical URL of this article (shown as the origin). */
  url: string;
}

/**
 * Visible provenance line at the foot of every article. Visible text is the only
 * watermark that survives readability extraction and screenshots, so this is the
 * load-bearing attribution mark — not decoration. The `ref` token is a per-page
 * canary (trap-street string): any hit on it from a domain other than naqeebali.me
 * is a copy. See docs/anti-theft-runbook.md.
 */
export default function ArticleAttribution({ slug, url }: Props) {
  const shown = url.replace(/^https?:\/\//, '');
  return (
    <aside
      className="mt-16 pt-6 border-t font-mono text-xs leading-relaxed"
      style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
    >
      <p>
        Originally published by{' '}
        <a href={ATTRIBUTION.site} className="text-accent hover:underline">
          Naqeebali Shamsi
        </a>{' '}
        at{' '}
        <a href={url} className="text-accent hover:underline">
          {shown}
        </a>
        .
      </p>
      <p className="mt-1">
        {ATTRIBUTION.copyrightNotice}{' '}
        <Link to="/license" className="hover:underline">
          Terms &amp; attribution
        </Link>
        . <span style={{ opacity: 0.55 }}>ref {canaryRef(slug)}</span>
      </p>
    </aside>
  );
}
