import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import GiscusComments from '../components/Giscus'
import SimpleComments from '../components/SimpleComments'
import { getBlogPost } from '../utils/blogUtils'
import { useMusic } from '../utils/MusicContext.jsx'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [useSimpleComments, setUseSimpleComments] = useState(false)
  const { setCustomTrack } = useMusic()
  
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      try {
        const postData = await getBlogPost(slug)
        setPost(postData)
        
        // If the post has a custom music track specified, set it
        if (postData?.music) {
          console.log(`Setting custom music track: ${postData.music}`)
          setCustomTrack(postData.music)
        } else {
          // Reset to random music if no custom track
          setCustomTrack(null)
        }
      } catch (error) {
        console.error('Error loading post:', error)
        setPost(null)
        setCustomTrack(null)
      } finally {
        setLoading(false)
      }
    }
    
    loadPost()
    
    // Reset custom track when unmounting
    return () => setCustomTrack(null)
  }, [slug, setCustomTrack])
  
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
            h1: ({children}) => {
              const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              return <h2 id={id} style={{ color: '#2c5282', marginTop: '40px', marginBottom: '20px' }}>{children}</h2>
            },
            h2: ({children}) => {
              const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              return <h3 id={id} style={{ color: '#4a90e2', marginTop: '30px', marginBottom: '15px' }}>{children}</h3>
            },
            h3: ({children}) => {
              const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              return <h4 id={id} style={{ color: '#4a90e2', marginTop: '25px', marginBottom: '10px' }}>{children}</h4>
            },
            p: ({children}) => <p style={{ marginBottom: '15px' }}>{children}</p>,
            ul: ({children}) => <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>{children}</ul>,
            ol: ({children}) => <ol style={{ paddingLeft: '20px', marginBottom: '15px' }}>{children}</ol>,
            li: ({children}) => <li style={{ marginBottom: '5px' }}>{children}</li>,
            strong: ({children}) => <strong style={{ color: '#2c5282' }}>{children}</strong>,
            em: ({children}) => <em style={{ color: '#4a90e2' }}>{children}</em>,
            blockquote: ({children}) => (
              <blockquote style={{
                borderLeft: '4px solid #4a90e2',
                paddingLeft: '20px',
                margin: '20px 0',
                fontStyle: 'italic',
                color: '#666'
              }}>
                {children}
              </blockquote>
            ),
            code: ({children, className}) => {
              if (className) {
                // Code block
                return (
                  <pre style={{
                    background: '#f7fafc',
                    padding: '15px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    border: '1px solid #e2e8f0',
                    margin: '20px 0'
                  }}>
                    <code>{children}</code>
                  </pre>
                )
              }
              // Inline code
              return (
                <code style={{
                  background: '#f7fafc',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'RufScript, Courier New, monospace',
                  fontSize: '0.9em'
                }}>
                  {children}
                </code>
              )
            },
            img: ({src, alt}) => (
              <img 
                src={src} 
                alt={alt || 'Blog image'} 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  margin: '20px 0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  display: 'block'
                }}
                onError={(e) => {
                  console.error('Failed to load image:', src)
                  e.target.style.display = 'none'
                }}
              />
            ),
            a: ({href, children}) => {
              // Check if it's an internal navigation link (starts with #)
              const isInternalLink = href && href.startsWith('#')
              
              if (isInternalLink) {
                // Handle internal navigation - scroll to the element
                const handleClick = (e) => {
                  e.preventDefault()
                  const targetId = href.substring(1) // Remove the # from href
                  const targetElement = document.getElementById(targetId)
                  if (targetElement) {
                    targetElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                }
                
                return (
                  <a 
                    href={href} 
                    onClick={handleClick}
                    style={{
                      color: '#4a90e2',
                      textDecoration: 'none',
                      borderBottom: '1px solid #4a90e2',
                      cursor: 'pointer'
                    }}
                  >
                    {children}
                  </a>
                )
              }
              
              // External links - open in new tab
              return (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#4a90e2',
                    textDecoration: 'none',
                    borderBottom: '1px solid #4a90e2'
                  }}
                >
                  {children}
                </a>
              )
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
      
      <div className="decorative-divider">
        ──────────────────────────────────────────────────────
      </div>
      
      {useSimpleComments ? (
        <SimpleComments />
      ) : (
        <GiscusComments />
      )}
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => setUseSimpleComments(!useSimpleComments)}
          style={{
            background: 'none',
            border: '1px solid #4a90e2',
            color: '#4a90e2',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontFamily: 'RufScript, Courier New, monospace'
          }}
        >
          {useSimpleComments ? 'Switch to Giscus Comments' : 'Switch to Simple Comments'}
        </button>
      </div>
    </div>
  )
}

export default BlogPost
