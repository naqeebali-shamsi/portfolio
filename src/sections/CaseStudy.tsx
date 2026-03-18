import { caseStudy } from '@/data/content';
import { DeviceFrame } from '@/components/DeviceFrame';
import { Smartphone, ExternalLink } from 'lucide-react';

export function CaseStudy() {
  return (
    <section id="work" className="py-section scroll-mt-20">
      {/* 1. Contained intro */}
      <div className="max-w-container mx-auto px-8">
        <p className="text-sm uppercase tracking-wide text-text-muted font-heading">
          Case Study
        </p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold mt-3">
          {caseStudy.name}
        </h2>
        <p className="font-body text-lg text-text-muted max-w-3xl mt-6">
          {caseStudy.problem}
        </p>
      </div>

      {/* 2. Full-width breakout -- architecture + screenshots */}
      <div className="w-full bg-bg-feature mt-16 py-16">
        <div className="max-w-container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT column -- Architecture diagram */}
            <div>
              <p className="text-sm uppercase tracking-wide text-text-muted font-heading mb-8">
                Architecture
              </p>

              {/* Flow diagram */}
              <div className="flex flex-col items-center gap-0">
                <ArchBox label="React Native" sublabel="Mobile Client" />
                <Arrow />
                <ArchBox label="Go API" sublabel="REST + WebSockets" />
                <div className="flex gap-8 items-start">
                  <div className="flex flex-col items-center gap-0">
                    <Arrow />
                    <ArchBox label="PostgreSQL" sublabel="Relational Data" />
                  </div>
                  <div className="flex flex-col items-center gap-0">
                    <Arrow />
                    <ArchBox label="WebSockets" sublabel="Real-time Sync" />
                  </div>
                </div>
                <Arrow />
                <ArchBox label="AWS" sublabel="Cloud Infrastructure" accent />
              </div>

              {/* Tech decisions */}
              <ul className="mt-10 space-y-3">
                {caseStudy.techDecisions.map((decision, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-base text-text-muted">
                    <span className="mt-2 block h-2 w-2 shrink-0 rounded-full bg-accent" />
                    {decision}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT column -- Phone mockups */}
            <div>
              <div className="flex gap-6 justify-center">
                <DeviceFrame className="flex-shrink-0">
                  <div className="flex flex-col items-center justify-center h-full bg-bg text-text-muted text-sm gap-3">
                    <Smartphone className="w-8 h-8 opacity-40" />
                    <span>App Screenshot</span>
                  </div>
                </DeviceFrame>
                <DeviceFrame className="flex-shrink-0">
                  <div className="flex flex-col items-center justify-center h-full bg-bg text-text-muted text-sm gap-3">
                    <Smartphone className="w-8 h-8 opacity-40" />
                    <span>App Screenshot</span>
                  </div>
                </DeviceFrame>
              </div>

              {/* GitHub link */}
              {caseStudy.repoUrl && (
                <div className="mt-8 text-center">
                  <a
                    href={caseStudy.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline font-body text-base"
                  >
                    View on GitHub
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Contained outro -- approach */}
      <div className="max-w-container mx-auto px-8 mt-16">
        <p className="text-sm uppercase tracking-wide text-text-muted font-heading mb-4">
          Approach
        </p>
        <p className="font-body text-lg text-text-muted max-w-3xl">
          {caseStudy.approach}
        </p>
      </div>
    </section>
  );
}

/* ---- Architecture diagram helper components ---- */

function ArchBox({
  label,
  sublabel,
  accent,
}: {
  label: string;
  sublabel: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`border rounded-lg px-6 py-3 text-center w-52 ${
        accent
          ? 'border-accent/40 bg-accent/5'
          : 'border-accent/20 bg-white'
      }`}
    >
      <p className="font-heading text-sm font-semibold text-text">{label}</p>
      <p className="font-body text-xs text-text-muted mt-0.5">{sublabel}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex flex-col items-center text-accent/40 py-1">
      <div className="w-px h-6 bg-accent/30" />
      <span className="text-xs leading-none">&#9660;</span>
    </div>
  );
}
