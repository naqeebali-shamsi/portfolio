import { contactInfo } from '@/data/content';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { SocialLinks } from '@/components/SocialLinks';

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center py-section px-8 scroll-mt-20"
    >
      <p className="font-heading text-sm uppercase tracking-wide text-text-muted mb-8">
        GET IN TOUCH
      </p>

      <button
        type="button"
        onClick={() => copy(contactInfo.email)}
        className={`font-heading text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-colors cursor-pointer ${
          copied ? 'text-accent' : 'text-text hover:text-accent'
        }`}
      >
        {copied ? 'Copied!' : contactInfo.email}
      </button>

      <p className="text-sm text-text-muted mt-2">
        {copied ? 'Copied to clipboard' : 'Click to copy'}
      </p>

      <div className="mt-12">
        <SocialLinks />
      </div>
    </section>
  );
}
