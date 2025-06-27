import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Subscribe from '../components/Subscribe'
import { getRecentBlogPosts } from '../utils/blogUtils'

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const posts = await getRecentBlogPosts(3)
        setRecentPosts(posts)
      } catch (error) {
        console.error('Error loading recent posts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadRecentPosts()
  }, [])
  
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>HIIIIIII</h2>
        <div className="intro-text">
          <p>
            so yeah, i decided to make a blog instead of posting stories on instagram or whatever. 
            mainly because i'm tired of ai slop, ads, and bot accounts everywhere.
          </p>
        </div>
      </div>
      
      <div className="decorative-divider">
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      </div>
      
      <div className="interests-section">
        <h3>🤔 what to expect here</h3>
        <p>tbf nothing solid, but probably:</p>
        <ul style={{ textAlign: 'left', marginLeft: '20px' }}>
          <li>regular short thoughts / stories</li>
          <li>tech/electronics/games posting</li>
          <li>rants (definitely rants)</li>
          <li>picture dumps (rarely, when i actually have enough content lol)</li>
        </ul>
      </div>
      
      <div className="decorative-divider">
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      </div>
      
      <div className="recent-posts-section">
        <h3>� recent posts</h3>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#666' }}>loading recent posts...</p>
        ) : recentPosts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>no posts yet...</p>
        ) : (
          <div className="blog-posts">
            {recentPosts.map((post) => (
              <article key={post.slug} className="blog-post-card">
                <h4 className="blog-post-title">
                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.title}
                  </Link>
                </h4>
                <div className="blog-post-date">
                  {post.date}
                </div>
                <div className="blog-post-excerpt">
                  {post.excerpt}
                </div>
                <Link to={`/blog/${post.slug}`} className="read-more">
                  read more →
                </Link>
              </article>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/blog" className="read-more" style={{ fontSize: '1.1rem' }}>
            view all posts →
          </Link>
        </div>
      </div>
      
      <div className="decorative-divider">
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      </div>
      
      <Subscribe />
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#4a90e2' }}>
        <p>anyway, feel free to stick around and see what happens</p>
        <p><em>bye bye</em></p>
      </div>
    </div>
  )
}

export default Home
