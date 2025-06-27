import matter from 'gray-matter'

// Use Vite's import.meta.glob to dynamically import all markdown files
const postFiles = import.meta.glob('./blog/*.md', { eager: true, as: 'raw' })

// Parse a markdown file and extract frontmatter
const parseBlogPost = async (filepath, content) => {
  const { data, content: markdownContent } = matter(content)
  
  // Extract slug from filepath (e.g., "/blog/welcome-to-my-blog.md" -> "welcome-to-my-blog")
  const slug = filepath.split('/').pop().replace('.md', '')
  
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    tags: data.tags || [],
    excerpt: data.excerpt || markdownContent.substring(0, 150) + '...',
    content: markdownContent,
    ...data
  }
}

// Get all blog posts
export const getAllBlogPosts = async () => {
  try {
    console.log('Loading blog posts...')
    const posts = []
    
    for (const [filepath, content] of Object.entries(postFiles)) {
      console.log('Processing post:', filepath)
      const post = await parseBlogPost(filepath, content)
      console.log('Parsed post:', post)
      posts.push(post)
    }
    
    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    console.log('Final posts:', sortedPosts)
    return sortedPosts
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

// Get a single blog post by slug
export const getBlogPost = async (slug) => {
  try {
    console.log('Looking for post:', slug)
    
    for (const [filepath, content] of Object.entries(postFiles)) {
      const postSlug = filepath.split('/').pop().replace('.md', '')
      
      if (postSlug === slug) {
        console.log('Found content for', slug)
        return await parseBlogPost(filepath, content)
      }
    }
    
    console.log('No content found for slug:', slug)
    return null
  } catch (error) {
    console.error('Error loading blog post:', error)
    return null
  }
}

// Get recent blog posts (for home page)
export const getRecentBlogPosts = async (limit = 3) => {
  const allPosts = await getAllBlogPosts()
  return allPosts.slice(0, limit)
}
