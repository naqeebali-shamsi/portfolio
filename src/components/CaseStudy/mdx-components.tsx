import type { ComponentType, ReactNode } from 'react';
import ExternalLink from '@/components/atoms/ExternalLink';

/**
 * The MDX component map for case studies. Built per-study via makeMdxComponents()
 * so body components like <FAQ/> and <Figure/> can close over the study's meta
 * (faq list, slug) without React context. Styling tracks the design tokens in
 * src/styles/theme.css (Cal Sans headings, SUSE body, JetBrains Mono code, #63D2FF accent).
 */

interface MakeOpts {
  slug: string;
  faq?: { q: string; a: string }[];
}

function toText(node: ReactNode): string {
  if (node == null || node === false || node === true) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toText).join('');
  // @ts-expect-error — React element props
  if (typeof node === 'object' && node.props) return toText(node.props.children);
  return '';
}

function slugify(node: ReactNode): string {
  return toText(node)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const TEXT = 'var(--text-primary)';
const MUTED = 'var(--text-secondary)';

export function makeMdxComponents(opts: MakeOpts): Record<string, ComponentType<any>> {
  const components = {
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 id={slugify(children)} className="font-heading text-3xl md:text-4xl font-bold tracking-heading mt-16 mb-5 scroll-mt-24" style={{ color: TEXT }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 id={slugify(children)} className="font-heading text-xl md:text-2xl font-bold mt-12 mb-4 scroll-mt-24" style={{ color: TEXT }}>
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: ReactNode }) => (
      <h4 className="font-heading text-lg font-bold mt-8 mb-3" style={{ color: TEXT }}>{children}</h4>
    ),
    p: ({ children }: { children?: ReactNode }) => (
      <p className="font-body text-lg leading-relaxed my-5" style={{ color: MUTED }}>{children}</p>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
      <ul className="my-5 space-y-2.5 pl-1">{children}</ul>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ol className="my-5 space-y-2.5 list-decimal pl-6 marker:text-accent marker:font-mono">{children}</ol>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <li className="font-body text-lg leading-relaxed flex items-start gap-3" style={{ color: MUTED }}>
        <span className="mt-[0.7em] block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span>{children}</span>
      </li>
    ),
    a: ({ href = '', children }: { href?: string; children?: ReactNode }) => {
      const external = /^https?:\/\//.test(href);
      if (external) {
        return (
          <ExternalLink href={href} className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent transition">
            {children}
          </ExternalLink>
        );
      }
      return (
        <a href={href} className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent transition">
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: ReactNode }) => (
      <strong className="font-semibold" style={{ color: TEXT }}>{children}</strong>
    ),
    em: ({ children }: { children?: ReactNode }) => <em className="italic">{children}</em>,
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="my-8 border-l-2 border-accent pl-6 font-heading text-xl md:text-2xl leading-snug" style={{ color: TEXT }}>
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-12 border-0 h-px" style={{ background: 'var(--border)' }} />,
    code: ({ children }: { children?: ReactNode }) => (
      <code className="font-mono text-[0.88em] px-1.5 py-0.5 rounded" style={{ background: 'rgba(23,18,25,0.06)', color: TEXT }}>
        {children}
      </code>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre className="my-6 rounded-lg overflow-x-auto p-4 text-sm leading-relaxed font-mono [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit" style={{ background: '#171219', color: '#FFFAFF' }}>
        {children}
      </pre>
    ),
    table: ({ children }: { children?: ReactNode }) => (
      <div className="my-7 overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border)' }}>
        <table className="w-full text-left border-collapse text-base">{children}</table>
      </div>
    ),
    th: ({ children }: { children?: ReactNode }) => (
      <th className="font-mono text-xs uppercase tracking-wide px-4 py-3 border-b" style={{ color: TEXT, borderColor: 'var(--border)', background: 'var(--surface)' }}>
        {children}
      </th>
    ),
    td: ({ children }: { children?: ReactNode }) => (
      <td className="font-body px-4 py-3 border-b align-top" style={{ color: MUTED, borderColor: 'var(--border)' }}>{children}</td>
    ),
    img: ({ src = '', alt = '' }: { src?: string; alt?: string }) => (
      <img src={src} alt={alt} loading="lazy" className="my-6 w-full rounded-lg border" style={{ borderColor: 'var(--border)' }} />
    ),

    // ── Custom kit ───────────────────────────────────────────────
    KeyTakeaways: ({ items = [] }: { items?: string[] }) => (
      <aside className="my-8 rounded-lg border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent mb-4">Key takeaways</p>
        <ul className="space-y-2.5">
          {items.map((it, i) => (
            <li key={i} className="font-body text-base leading-relaxed flex items-start gap-3" style={{ color: TEXT }}>
              <span className="mt-[0.6em] block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </aside>
    ),

    Callout: ({ type = 'insight', title, children }: { type?: 'insight' | 'tradeoff' | 'warning'; title?: string; children?: ReactNode }) => {
      const map: Record<string, { color: string; label: string }> = {
        insight: { color: '#63D2FF', label: 'Insight' },
        tradeoff: { color: '#E8A33D', label: 'Trade-off' },
        warning: { color: '#E5484D', label: 'Watch out' },
      };
      const c = map[type] ?? map.insight;
      return (
        <div className="my-7 rounded-r-lg border-l-2 pl-5 pr-4 py-4" style={{ borderColor: c.color, background: 'var(--surface)' }}>
          <p className="font-mono text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: c.color }}>{title ?? c.label}</p>
          <div className="font-body text-base leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0" style={{ color: MUTED }}>
            {children}
          </div>
        </div>
      );
    },

    TechStack: ({ rows = [] }: { rows?: { layer: string; tech: string; why: string }[] }) => (
      <div className="my-7 space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="p-4 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">{r.layer}</span>
              <span className="font-heading text-sm font-bold" style={{ color: TEXT }}>{r.tech}</span>
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: MUTED }}>{r.why}</p>
          </div>
        ))}
      </div>
    ),

    Figure: ({ src = '', alt = '', caption }: { src?: string; alt?: string; caption?: string }) => (
      <figure className="my-8">
        <img src={src} alt={alt} loading="lazy" className="w-full rounded-lg border" style={{ borderColor: 'var(--border)' }} />
        {caption && <figcaption className="mt-3 text-center font-mono text-xs" style={{ color: MUTED }}>{caption}</figcaption>}
      </figure>
    ),

    Metrics: ({ items = [] }: { items?: { value: string; label: string }[] }) => (
      <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((m, i) => (
          <div key={i} className="text-center rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <p className="font-heading text-2xl md:text-3xl font-bold text-accent">{m.value}</p>
            <p className="font-mono text-xs mt-1" style={{ color: MUTED }}>{m.label}</p>
          </div>
        ))}
      </div>
    ),

    FAQ: () => {
      const items = opts.faq ?? [];
      if (!items.length) return null;
      return (
        <div className="my-8 divide-y" style={{ borderColor: 'var(--border)' }}>
          {items.map((f, i) => (
            <div key={i} className="py-5 first:pt-0">
              <h3 className="font-heading text-lg font-bold mb-2" style={{ color: TEXT }}>{f.q}</h3>
              <p className="font-body text-base leading-relaxed" style={{ color: MUTED }}>{f.a}</p>
            </div>
          ))}
        </div>
      );
    },
  };

  return components as Record<string, ComponentType<any>>;
}
