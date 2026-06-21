import { Link } from 'react-router-dom';
import useMediumBlogs from '@/hooks/useMediumBlogs';
import SectionLabel from '@/components/atoms/SectionLabel';
import ExternalLink from '@/components/atoms/ExternalLink';
import { blogPostsByDate } from '@/content/blog/registry';
import './Blogs.css';

function formatPostDate(iso) {
    if (!iso) return 'LATEST';
    const d = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// On-domain MDX posts surfaced ahead of the Medium feed so the canonical
// (naqeebali.me) versions are what readers and crawlers land on.
const onDomainPosts = blogPostsByDate.map((m) => ({
    title: m.meta.title,
    description: m.meta.description,
    url: `/blog/${m.meta.slug}`,
    date: formatPostDate(m.meta.datePublished),
    internal: true,
}));

const Blogs = ({ blogData }) => {
    const { blogs, isLoading, error } = useMediumBlogs(
        blogData.displayMediumBlogs === "true" ? 'naqeebali-shamsi' : null
    );

    if (!blogData.display) return null;

    const mediumPosts = blogData.displayMediumBlogs === "true"
        ? (isLoading ? blogData.blogs : blogs)
        : blogData.blogs;
    const displayBlogs = [...onDomainPosts, ...mediumPosts];

    const featured = displayBlogs.slice(0, 2);

    return (
        <section className="blogs" id="blogs">
            <SectionLabel className="blogs-section-label">posts</SectionLabel>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading tracking-heading" style={{ color: 'var(--text-primary)' }}>
                Latest Writing
            </h2>

            {isLoading && blogData.displayMediumBlogs === "true" ? (
                <div className="blogs-status">
                    <span className="terminal-loader">Fetching latest posts...</span>
                </div>
            ) : error && blogData.displayMediumBlogs === "true" ? (
                <div className="blogs-status error">
                    <span>Error loading dynamic posts. Falling back to cached data.</span>
                </div>
            ) : null}

            <div className="blogs-featured">
                {featured.map((blog, index) => (
                    <div key={index} className="blog-card">
                        <div className="blog-header">
                            <span className="blog-tag">POST</span>
                            <span className="blog-date">{blog.date || 'LATEST'}</span>
                        </div>
                        <h3>{blog.title}</h3>
                        <p>{blog.description}</p>
                        {blog.internal ? (
                            <Link to={blog.url} className="blog-link">
                                Read More<span className="link-arrow">→</span>
                            </Link>
                        ) : (
                            <ExternalLink
                                href={blog.url}
                                className="blog-link"
                                arrow="→"
                            >
                                Read More
                            </ExternalLink>
                        )}
                    </div>
                ))}
            </div>

            <div className="blogs-archive">
                <Link to="/blog" className="blogs-archive__toggle">
                    <span>View all posts</span>
                    <span className="link-arrow">→</span>
                </Link>
            </div>
        </section>
    );
};

export default Blogs;
