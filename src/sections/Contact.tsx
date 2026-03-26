import { contactInfo } from '@/data/content';
import { SectionWithReveal } from '@/components/molecules/SectionWithReveal';
import HeaderWithLabel from '@/components/molecules/HeaderWithLabel';
import RevealEmail from '@/components/atoms/RevealEmail';
import { SocialLinks } from '@/components/SocialLinks';

export function Contact() {
  return (
    <section
      id="contact"
      className="section-dark min-h-[60vh] flex flex-col items-center justify-center py-section px-4 sm:px-5 lg:px-6 scroll-mt-20"
    >
      <SectionWithReveal className="flex flex-col items-center">
        <HeaderWithLabel label="contact" align="center" className="mb-8" />

        <RevealEmail email={contactInfo.email} />

        <div className="mt-12">
          <SocialLinks />
        </div>
      </SectionWithReveal>
    </section>
  );
}
