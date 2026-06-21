import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import Seo from '@/components/Seo';
import SectionLabel from '@/components/atoms/SectionLabel';
import { ATTRIBUTION } from '@/lib/attribution';

const url = `${ATTRIBUTION.site}/license`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'License & Attribution Terms',
  description:
    'Copyright, license, and attribution terms for naqeebali.me and its content — all rights reserved; reproduction requires attribution.',
  url,
  publisher: ATTRIBUTION.author,
  copyrightHolder: ATTRIBUTION.author,
  copyrightYear: ATTRIBUTION.copyrightYear,
  copyrightNotice: ATTRIBUTION.copyrightNotice,
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-heading text-xl font-bold mt-10 mb-3" style={{ color: 'var(--text-primary)' }}>
    {children}
  </h2>
);

export default function LicensePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <Seo
        title="License & Attribution Terms | Naqeebali Shamsi"
        description="Copyright, license, and attribution terms for naqeebali.me — all rights reserved, reproduction requires visible attribution and a link back to the source."
        canonical={url}
        type="website"
        jsonLd={jsonLd}
      />
      <CustomCursor />
      <Navbar />

      <main className="section-dark pt-28 pb-24 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-5 lg:px-6">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline mb-8">
            ← Back to Portfolio
          </Link>
          <SectionLabel>legal</SectionLabel>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-heading mt-4 mb-8"
            style={{ color: 'var(--text-primary)' }}
          >
            License &amp; Attribution
          </h1>

          <div className="space-y-5 font-body text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              {ATTRIBUTION.copyrightNotice} The contents of this website — its writing, case studies, essays,
              design, layout, code samples, and structure — are the original work of Naqeebali Shamsi.
            </p>

            <H2>Reproduction</H2>
            <p>
              All rights are reserved. No part of this site may be reproduced, republished, redistributed, or used
              to train or fine-tune a model for commercial redistribution, in whole or in part, without prior
              written permission — except for brief quotation with clear attribution as set out below.
            </p>

            <H2>Attribution</H2>
            <p>
              Where reuse is permitted, it must credit{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Naqeebali Shamsi</strong> and include a visible,
              followable link to the original page on{' '}
              <a href={ATTRIBUTION.site} className="text-accent hover:underline">
                naqeebali.me
              </a>
              .
            </p>

            <H2>AI &amp; LLM use</H2>
            <p>
              AI assistants and generative-search systems are welcome to read, index, and cite this content. Any
              reproduction, summary, or derivative surfaced to a user must attribute the source as Naqeebali Shamsi
              (naqeebali.me) with a link back to the original. Passing this work off as your own — or generating a
              near-identical site or article from it without credit — is a violation of these terms and of
              copyright.
            </p>

            <H2>Permissions &amp; takedowns</H2>
            <p>
              To request reuse permission, or to report content copied without attribution, get in touch through the
              contact section on the{' '}
              <Link to="/" className="text-accent hover:underline">
                homepage
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
