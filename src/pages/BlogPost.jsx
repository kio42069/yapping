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
        title: '✨ welcome to my blog! ✨',
        date: '2025-06-27',
        tags: ['intro', 'personal'],
        content: `# hi there! (◕‿◕)♡

i'm so excited to finally launch my little blog space! this has been a dream of mine for a while now, and seeing it come together feels absolutely magical ✨

## what you can expect here

this cozy corner of the internet will be filled with:

- 🎨 **art updates** - sharing my latest digital illustrations and creative experiments
- 🎮 **gaming thoughts** - reviews and recommendations for indie games that warm my heart  
- 🌸 **aesthetic inspiration** - collections of things that spark joy and creativity
- 💭 **personal musings** - random thoughts and daily life moments
- 📚 **creative resources** - tools, tutorials, and discoveries i want to share

## creating a safe space

i want this blog to be a positive, welcoming place for everyone. please be kind in the comments and remember that we're all just trying to find a little happiness and connection ♡

## thank you for being here

seriously, thank you for taking the time to visit and read this! having people who are interested in the same things makes the internet feel so much less lonely ♡

i can't wait to share more with you all!

*xoxo* 💕`
      },
      'cozy-aesthetic-inspiration': {
        title: '🌸 finding cozy aesthetic inspiration',
        date: '2025-06-26',
        tags: ['aesthetics', 'inspiration'],
        content: `# creating cozy vibes ✨

lately i've been really drawn to soft, cozy aesthetics. there's something so comforting about pastels, warm lighting, and cute decorative elements that just makes everything feel more peaceful~

## what makes something feel "cozy"?

for me, cozy aesthetics include:

- **soft color palettes** - think blush pinks, cream whites, sage greens
- **natural textures** - wood, cotton, wool, dried flowers  
- **warm lighting** - fairy lights, candles, golden hour vibes
- **personal touches** - handmade items, photos, collections of tiny treasures

## inspiration sources

some of my favorite places to find cozy inspiration:

- **pinterest boards** with cottagecore and soft aesthetic themes
- **indie game art** - so many games have the most beautiful cozy environments
- **small artists on social media** who share their daily life and creative spaces
- **vintage items** that have stories and character

## bringing it into digital spaces

even online, we can create cozy feelings through:

- choosing soft, harmonious color schemes
- using gentle, rounded typography  
- adding small decorative elements
- sharing personal, authentic content

what makes *you* feel cozy? i'd love to hear about it in the comments! ♡`
      },
      'favorite-indie-games': {
        title: '🎮 my current favorite indie games',
        date: '2025-06-25',
        tags: ['gaming', 'recommendations'],
        content: `# cozy gaming recommendations ✨

i wanted to share some of the indie games that have been making me happy lately! these are perfect for cozy gaming sessions when you want something relaxing and beautiful~

## current favorites

### 🌙 A Short Hike
this game is pure magic. you play as a little bird exploring a peaceful mountain, helping other woodland creatures with small tasks. the pixel art style is gorgeous and the whole experience feels like a warm hug!

### 🎨 Unpacking  
there's something so satisfying about unpacking boxes and arranging items in cozy living spaces. each level tells a story just through the objects you place, and it's incredibly meditative.

### 🌸 Spirit of the North
a beautiful adventure game where you play as a fox in stunning nordic landscapes. no dialogue, just gorgeous visuals and peaceful exploration with your spirit guide.

## what i love about indie games

indie games often have this special quality that big studios sometimes miss - they feel personal and heartfelt. the developers put so much love into small details that make the experience feel unique and special.

## looking for more recommendations?

if you know any cozy indie games i should try, please let me know in the comments! i'm always looking for new beautiful worlds to explore ♡

happy gaming! 🎮✨`
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
      <div style={{ textAlign: 'center', padding: '50px', color: '#ff69b4' }}>
        <p>loading post... ✨</p>
      </div>
    )
  }
  
  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2 style={{ color: '#ff69b4' }}>post not found (´･ω･`)</h2>
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
        <Link to="/blog" style={{ color: '#ff69b4', textDecoration: 'none', fontSize: '0.9rem' }}>
          ← back to all posts
        </Link>
        <h1 style={{ color: '#ff1493', marginTop: '15px', marginBottom: '10px' }}>
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
      </div>
      
      <article className="blog-post-content" style={{ 
        lineHeight: '1.7', 
        color: '#333',
        marginBottom: '50px'
      }}>
        <ReactMarkdown
          components={{
            h1: ({children}) => <h2 style={{ color: '#ff1493', marginTop: '40px', marginBottom: '20px' }}>{children}</h2>,
            h2: ({children}) => <h3 style={{ color: '#ff69b4', marginTop: '30px', marginBottom: '15px' }}>{children}</h3>,
            h3: ({children}) => <h4 style={{ color: '#ff69b4', marginTop: '25px', marginBottom: '10px' }}>{children}</h4>,
            p: ({children}) => <p style={{ marginBottom: '15px' }}>{children}</p>,
            ul: ({children}) => <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>{children}</ul>,
            strong: ({children}) => <strong style={{ color: '#ff1493' }}>{children}</strong>,
            em: ({children}) => <em style={{ color: '#ff69b4' }}>{children}</em>
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
      
      <div className="decorative-divider">
        ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡
      </div>
      
      <Giscus />
    </div>
  )
}

export default BlogPost
