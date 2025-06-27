import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Subscribe from '../components/Subscribe'

const Blog = () => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    // For now, we'll use mock data
    // In a real app, you'd fetch from your markdown files
    const mockPosts = [
      {
        slug: 'welcome-to-my-blog',
        title: 'Hello bacchon',
        date: '2025-06-26',
        excerpt: 'Why this goofy ass blog and not any well developed social media like oh maybe instagram or twitter...',
        tags: ['welcome', 'hi']
      },
      {
        slug: 'on-why-i-hate-tracking',
        title: 'on why i hate tracking',
        date: '2025-06-25',
        excerpt: 'A rant about tracking and privacy (content coming soon)',
        tags: ['rant']
      }
    ]
    
    setPosts(mockPosts)
  }, [])
  
  return (
    <div className="blog-page">
      <div className="welcome-section">
        <h2>📝 my blog posts</h2>
        <p style={{ color: '#666', textAlign: 'center' }}>
          welcome to my little writing corner! ♡
        </p>
      </div>
      
      <div className="blog-posts">
        {posts.map((post) => (
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
                    background: '#ffb3e6',
                    color: '#ff1493',
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
        ))}
      </div>
      
      <div className="decorative-divider" style={{ marginTop: '50px' }}>
        ✧･ﾟ: *✧･ﾟ:* ♡ *:･ﾟ✧*:･ﾟ✧
      </div>
      
      <Subscribe />
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#ff69b4' }}>
        <p>more posts coming soon! ♡ (◕‿◕)♡</p>
      </div>
    </div>
  )
}

export default Blog
