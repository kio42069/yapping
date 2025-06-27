import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Giscus from '../components/Giscus'
import { getBlogPost } from '../utils/blogUtils'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      try {
        const postData = await getBlogPost(slug)
        setPost(postData)
      } catch (error) {
        console.error('Error loading post:', error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }
    
    loadPost()
  }, [slug])
  
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#4a90e2' }}>
        <p>loading post...</p>
      </div>
    )
  }
  
  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#4a90e2' }}>post not found</h2>
        <p>sorry, that blog post doesn't exist!</p>
        <Link to="/blog" className="read-more">
          ← back to blog
        </Link>
      </div>
    )
  }
  
  return (
    <div className="blog-post-page">
      <div className="blog-post-header" style={{ marginBottom: '30px' }}>
        <Link to="/blog" style={{ color: '#4a90e2', textDecoration: 'none', fontSize: '0.9rem' }}>
          ← back to all posts
        </Link>
        <h1 style={{ color: '#2c5282', marginTop: '15px', marginBottom: '10px' }}>
          {post.title}
        </h1>
        <div style={{ color: '#666', marginBottom: '15px' }}>
          {post.date}
        </div>
        <div style={{ marginBottom: '30px' }}>
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
      </div>
      
      <article className="blog-post-content" style={{ 
        lineHeight: '1.7', 
        color: '#333',
        marginBottom: '50px'
      }}>
        <ReactMarkdown
          components={{
            h1: ({children}) => <h2 style={{ color: '#2c5282', marginTop: '40px', marginBottom: '20px' }}>{children}</h2>,
            h2: ({children}) => <h3 style={{ color: '#4a90e2', marginTop: '30px', marginBottom: '15px' }}>{children}</h3>,
            h3: ({children}) => <h4 style={{ color: '#4a90e2', marginTop: '25px', marginBottom: '10px' }}>{children}</h4>,
            p: ({children}) => <p style={{ marginBottom: '15px' }}>{children}</p>,
            ul: ({children}) => <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>{children}</ul>,
            strong: ({children}) => <strong style={{ color: '#2c5282' }}>{children}</strong>,
            em: ({children}) => <em style={{ color: '#4a90e2' }}>{children}</em>
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
      
      <div className="decorative-divider">
        ──────────────────────────────────────────────────────
      </div>
      
      <Giscus />
    </div>
  )
}

export default BlogPost
