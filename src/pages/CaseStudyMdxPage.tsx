import { lazy, Suspense, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { caseStudiesMeta, loadCaseStudy } from '@/content/case-studies/registry';
import CaseStudyLayout from '@/components/CaseStudy/CaseStudyLayout';

/** Renders any MDX case study by slug. The study body is its own lazy chunk so it
 *  stays out of the main bundle. NomadCrew keeps its bespoke /case-study/nomadcrew route. */
export default function CaseStudyMdxPage() {
  const { slug = '' } = useParams();
  const meta = caseStudiesMeta[slug];
  const Content = useMemo(() => {
    const loader = loadCaseStudy(slug);
    return loader ? lazy(loader) : null;
  }, [slug]);

  if (!meta || !Content) return <Navigate to="/" replace />;

  return (
    <Suspense fallback={null}>
      <CaseStudyLayout meta={meta} Content={Content} />
    </Suspense>
  );
}
