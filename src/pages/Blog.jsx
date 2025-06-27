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
        title: '✨ welcome to my blog! ✨',
        date: '2025-06-27',
        excerpt: 'hi everyone! i\'m so excited to finally launch my little blog space. this is where i\'ll be sharing my thoughts, art, and all the cute things that make me happy...',
        tags: ['intro', 'personal']
      },
      {
        slug: 'cozy-aesthetic-inspiration',
        title: '🌸 finding cozy aesthetic inspiration',
        date: '2025-06-26',
        excerpt: 'lately i\'ve been really drawn to soft, cozy aesthetics. there\'s something so comforting about pastels, warm lighting, and cute decorative elements...',
        tags: ['aesthetics', 'inspiration']
      },
      {
        slug: 'favorite-indie-games',
        title: '🎮 my current favorite indie games',
        date: '2025-06-25',
        excerpt: 'i wanted to share some of the indie games that have been making me happy lately! these are perfect for cozy gaming sessions...',
        tags: ['gaming', 'recommendations']
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
