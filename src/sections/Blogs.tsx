import React from 'react';
import useMediumBlogs from '../hooks/useMediumBlogs';
import './Blogs.css';

const Blogs = ({ blogData }) => {
    const { blogs, isLoading, error } = useMediumBlogs(blogData.displayMediumBlogs === "true" ? 'naqeebali-shamsi' : null);

    if (!blogData.display) return null;

    const displayBlogs = blogData.displayMediumBlogs === "true" ? blogs : blogData.blogs;

    return (
        <section className="blogs" id="blogs">
            <div className="section-header">
                <span className="terminal-prompt">~/naqeebali/blog$</span>
                <span className="terminal-command">cat latest_posts.json</span>
            </div>

            {isLoading && blogData.displayMediumBlogs === "true" ? (
                <div className="blogs-status">
                    <span className="terminal-loader">Fetching latest posts...</span>
                </div>
            ) : error && blogData.displayMediumBlogs === "true" ? (
                <div className="blogs-status error">
                    <span>Error loading dynamic posts. Falling back to cached data.</span>
                </div>
            ) : null}

            <div className="blogs-grid">
                {(isLoading && blogData.displayMediumBlogs === "true" ? blogData.blogs : displayBlogs).map((blog, index) => (
                    <div key={index} className="blog-card">
                        <div className="blog-header">
                            <span className="blog-tag">POST</span>
                            <span className="blog-date">{blog.date || 'LATEST'}</span>
                        </div>
                        <h3>{blog.title}</h3>
                        <p>{blog.description}</p>
                        <a href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-link">
                            Read More <span>→</span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blogs;
