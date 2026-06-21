import { useParams, Navigate } from 'react-router-dom';
import { caseStudies } from '@/content/case-studies/registry';
import CaseStudyLayout from '@/components/CaseStudy/CaseStudyLayout';

/** Renders any MDX case study by slug. NomadCrew keeps its bespoke /case-study/nomadcrew route. */
export default function CaseStudyMdxPage() {
  const { slug = '' } = useParams();
  const mod = caseStudies[slug];
  if (!mod) return <Navigate to="/" replace />;
  return <CaseStudyLayout meta={mod.meta} Content={mod.default} />;
}
