import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Subscribe from '../components/Subscribe'
import { getAllBlogPosts } from '../utils/blogUtils'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllBlogPosts()
        setPosts(allPosts)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadPosts()
  }, [])
  
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#4a90e2' }}>
        <p>loading posts...</p>
      </div>
    )
  }
  
  return (
    <div className="blog-page">
      <div className="welcome-section">
        <h2>📝 my blog posts</h2>
        <p style={{ color: '#666', textAlign: 'center' }}>
          slowly going insane :3
        </p>
      </div>
      
      <div className="blog-posts">
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
            <p>no posts yet... check back soon!</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="blog-post-card">
              <h3 className="blog-post-title">
                <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {post.title}
                </Link>
              </h3>
              <div className="blog-post-date">{post.date}</div>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <div style={{ marginTop: '15px' }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-block',
                      background: '#b3d4f7',
                      color: '#2c5282',
                      padding: '4px 8px',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      marginRight: '8px',
                      marginBottom: '5px'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link to={`/blog/${post.slug}`} className="read-more">
                read more ♡
              </Link>
            </article>
          ))
        )}
      </div>
      
      <div className="decorative-divider" style={{ marginTop: '50px' }}>
        ──────────────────────────────────────────────────────
      </div>
      
      <Subscribe />
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#4a90e2' }}>
        <p>more posts coming soon!</p>
      </div>
    </div>
  )
}

export default Blog


