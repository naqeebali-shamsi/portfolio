import { pickProduct, productHref } from '@/content/products';

/**
 * End-of-content product CTA. Picks the most relevant LIVE product by the
 * content's tags (falls back to the primary live product), and UTM-tags the
 * link with `source` (post slug / page id) so Gumroad analytics attribute it.
 * Reads everything from the product registry — no copy hardcoded here.
 */
export default function ProductCTA({ source = 'blog', tags = [] }: { source?: string; tags?: string[] }) {
  const product = pickProduct(tags);
  if (!product) return null;

  return (
    <aside className="my-12 rounded-xl border p-6 sm:p-8" style={{ borderColor: 'var(--accent)', background: 'var(--surface)' }}>
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent mb-3">
        {product.eyebrow}
      </p>
      <h3 className="font-heading text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
        {product.name}
      </h3>
      <p className="font-body text-base leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
        {product.pitch}
      </p>
      {product.roi && (
        <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>ROI:</strong> {product.roi}
        </p>
      )}
      <a
        href={productHref(product, source)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded border border-accent text-accent hover:bg-accent hover:text-bg-dark transition-all"
      >
        {product.cta} <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
