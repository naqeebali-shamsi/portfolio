import React, { useState } from 'react';
import useMediumBlogs from '@/hooks/useMediumBlogs';
import SectionLabel from '@/components/atoms/SectionLabel';
import ExternalLink from '@/components/atoms/ExternalLink';
import ExpandableEntry from '@/components/molecules/ExpandableEntry';
import BlogList from '@/components/molecules/BlogList';
import './Blogs.css';

const Blogs = ({ blogData }) => {
    const [expanded, setExpanded] = useState(false);
    const { blogs, isLoading, error } = useMediumBlogs(
        blogData.displayMediumBlogs === "true" ? 'naqeebali-shamsi' : null
    );

    if (!blogData.display) return null;

    const displayBlogs = blogData.displayMediumBlogs === "true"
        ? (isLoading ? blogData.blogs : blogs)
        : blogData.blogs;

    const featured = displayBlogs.slice(0, 2);
    const rest = displayBlogs.slice(2);

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
                        <ExternalLink
                            href={blog.url}
                            className="blog-link"
                            arrow="→"
                        >
                            Read More
                        </ExternalLink>
                    </div>
                ))}
            </div>

            {rest.length > 0 && (
                <div className="blogs-archive">
                    <ExpandableEntry
                        isOpen={expanded}
                        onToggle={() => setExpanded(!expanded)}
                        trigger={
                            <button className="blogs-archive__toggle" type="button">
                                <span>View all posts ({displayBlogs.length})</span>
                                <span className={`blogs-archive__chevron ${expanded ? 'blogs-archive__chevron--open' : ''}`}>
                                    &#9660;
                                </span>
                            </button>
                        }
                    >
                        <BlogList blogs={rest} />
                    </ExpandableEntry>
                </div>
            )}
        </section>
    );
};

export default Blogs;
