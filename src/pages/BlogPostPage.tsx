import { useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '@/content/blog/registry';
import BlogPostLayout from '@/components/Blog/BlogPostLayout';

/** Renders any MDX blog post by slug. Mirrors CaseStudyMdxPage. */
export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const mod = blogPosts[slug];
  if (!mod) return <Navigate to="/" replace />;
  return <BlogPostLayout meta={mod.meta} Content={mod.default} />;
}
