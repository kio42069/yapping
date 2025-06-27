import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Giscus from '../components/Giscus'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Mock post data - in a real app, you'd fetch the markdown file
    const mockPosts = {
      'welcome-to-my-blog': {
        title: 'Hello bacchon',
        date: '2025-06-26',
        tags: ['welcome', 'hi'],
        content: `# why

Why this goofy ass blog and not any well developed social media like oh maybe instagram or twitter

- because of the fken ai generated low quality slop
- because of the bombardment of personalised ads
- because of the absolute shithousery of bot accounts

dead internet theory be looking pretty real rn

## but i do wanna keep yapping publicly

i dont want to lose connection with the 20 ppl i broadcast my shitposting and thoughts to now do i

a blog would be pretty epic considering now my "stories" are now not limited to 24 hours, and hence anyone who did not have the time to check it out within that specific period would not miss out on the absolute fire my brain cooks every now and then

## any plans?
tbf nothing solid, atm i can think of 
1. just regular short thought / stories
2. tech/electronics/games posting
3. rants
4. picture dumps (like rarely, monthly or semesterly dunno whenever i got enough for a spam lol)

and yea thats pretty much it feel free to drop by sometimes to check out whats new

---

*bye bye*`
      },
      'on-why-i-hate-tracking': {
        title: 'on why i hate tracking',
        date: '2025-06-25',
        tags: ['rant'],
        content: `# on why i hate tracking

*[Content appears to be placeholder in the original - this post was created but not filled out yet]*

Coming soon... when I actually finish writing this rant about tracking and privacy invasion.

For now, just know that I really, really hate being tracked online. More thoughts to follow when I'm less lazy about finishing this post.`
      }
    }
    
    // Simulate loading
    setTimeout(() => {
      setPost(mockPosts[slug] || null)
      setLoading(false)
    }, 500)
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
