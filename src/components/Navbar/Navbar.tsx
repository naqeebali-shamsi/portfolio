import { useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import clsx from 'clsx';

const NAV_LINKS = [
  { label: 'How I Build', href: '#how-i-build' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Navbar() {
  const { direction, isAtTop } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHidden = direction === 'down' && !isAtTop && !mobileOpen;

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 h-16 transition-transform duration-300 ease-smooth',
          isHidden && '-translate-y-full',
          !isAtTop && 'bg-bg/80 backdrop-blur-md border-b border-accent-light/20',
        )}
      >
        <div className="max-w-container mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            data-cursor="link"
            className="font-heading text-lg font-bold tracking-heading text-text"
          >
            NS
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="link"
                className="nav-link relative font-body text-sm text-text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger button (mobile) */}
          <button
            className="md:hidden relative w-6 h-5 flex flex-col justify-between p-3 -m-3 box-content"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={clsx(
                'block w-full h-0.5 bg-text transition-all duration-300 origin-center',
                mobileOpen && 'translate-y-[9px] rotate-45',
              )}
            />
            <span
              className={clsx(
                'block w-full h-0.5 bg-text transition-opacity duration-300',
                mobileOpen && 'opacity-0',
              )}
            />
            <span
              className={clsx(
                'block w-full h-0.5 bg-text transition-all duration-300 origin-center',
                mobileOpen && '-translate-y-[9px] -rotate-45',
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="min-h-11 flex items-center font-heading text-4xl font-bold uppercase tracking-heading text-text hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Nav link underline animation styles */}
      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: var(--color-accent);
          transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}
