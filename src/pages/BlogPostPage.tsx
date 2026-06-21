import { lazy, Suspense, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { blogMeta, loadBlogPost } from '@/content/blog/registry';
import BlogPostLayout from '@/components/Blog/BlogPostLayout';

/** Renders any MDX blog post by slug. The post body is its own lazy chunk so it
 *  stays out of the main bundle. Mirrors CaseStudyMdxPage. */
export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const meta = blogMeta[slug];
  const Content = useMemo(() => {
    const loader = loadBlogPost(slug);
    return loader ? lazy(loader) : null;
  }, [slug]);

  if (!meta || !Content) return <Navigate to="/" replace />;

  return (
    <Suspense fallback={null}>
      <BlogPostLayout meta={meta} Content={Content} />
    </Suspense>
  );
}
