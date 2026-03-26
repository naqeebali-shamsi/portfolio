import { useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import clsx from 'clsx';

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const;

const RESUME_URL =
  'https://www.dropbox.com/scl/fi/8bqjawyqh8vdkfz3nbyyn/Naqeebali_Shamsi_Resume.pdf?rlkey=h9dbrtmc3cf8q4030s9zyoz46&dl=0';

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
          !isAtTop && 'bg-bg-dark/70 backdrop-blur-md border-b border-white/10 text-white',
        )}
      >
        <div className="max-w-container mx-auto h-full px-4 sm:px-5 lg:px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            data-cursor="link"
            className={clsx('font-heading text-lg font-bold tracking-heading transition-colors', isAtTop ? 'text-text' : 'text-white')}
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
                className={clsx('nav-link relative font-body text-sm transition-colors', isAtTop ? 'text-text-muted hover:text-accent' : 'text-white/70 hover:text-white')}
              >
                {link.label}
              </a>
            ))}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className={clsx('font-mono text-xs font-semibold tracking-wide uppercase px-4 py-2 border rounded transition-all duration-200', isAtTop ? 'border-accent text-accent hover:bg-accent hover:text-white' : 'border-white/40 text-white hover:bg-white hover:text-bg-dark')}
            >
              Resume
            </a>
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
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="min-h-11 flex items-center font-mono text-lg font-semibold tracking-wide uppercase px-6 py-3 border-2 border-accent text-accent rounded hover:bg-accent hover:text-white transition-all duration-200 mt-4"
            >
              Resume
            </a>
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
          background-color: currentColor;
          transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}
