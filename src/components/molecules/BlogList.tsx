import './BlogList.css'

interface BlogListProps {
  blogs: Array<{ title: string; url: string; date: string; tag?: string }>
  className?: string
}

/**
 * Compact text-only list for blog posts.
 * Each row: date + title + arrow link.
 */
export default function BlogList({ blogs, className = '' }: BlogListProps) {
  return (
    <div className={`blog-list ${className}`.trim()}>
      {blogs.map((blog, index) => (
        <a
          key={index}
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-list__item"
        >
          <span className="blog-list__date">{blog.date}</span>
          <span className="blog-list__title">{blog.title}</span>
          <span className="blog-list__arrow">&rarr;</span>
        </a>
      ))}
    </div>
  )
}
