import { howIBuildStatements } from '@/data/content';
import { SectionWithReveal } from '@/components/molecules/SectionWithReveal';
import FirmwarePanel from '@/components/molecules/FirmwarePanel';
import SectionLabel from '@/components/atoms/SectionLabel';
import WatermarkText from '@/components/atoms/WatermarkText';

export function HowIBuild() {
  return (
    <section id="how-i-build" className="relative overflow-hidden bg-bg-feature py-section scroll-mt-20">
      <WatermarkText text="ENGINEER" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-5 lg:px-6">
        <SectionWithReveal className="mb-10 sm:mb-14">
          <SectionLabel>philosophy</SectionLabel>
        </SectionWithReveal>

        <SectionWithReveal className="mb-8 sm:mb-10">
          <h2 className="font-heading text-xl font-semibold text-text">
            Engineering Principles
          </h2>
          <p className="mt-2 text-sm text-text-muted font-body">
            Hardwired into every system I build
          </p>
        </SectionWithReveal>

        <SectionWithReveal>
          <FirmwarePanel statements={howIBuildStatements} />
        </SectionWithReveal>
      </div>
    </section>
  );
}
