import matter from 'gray-matter'

// Get all blog post filenames
const getBlogPostFilenames = () => {
  // In a real Vite app, we need to import all markdown files
  // This uses Vite's import.meta.glob feature
  const modules = import.meta.glob('/blog/*.md', { query: '?raw', import: 'default' })
  return Object.keys(modules)
}

// Parse a markdown file and extract frontmatter
const parseBlogPost = async (filename, content) => {
  const { data, content: markdownContent } = matter(content)
  const slug = filename.replace('/blog/', '').replace('.md', '')
  
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
    const modules = import.meta.glob('/blog/*.md', { query: '?raw', import: 'default' })
    const posts = []
    
    for (const [filename, moduleLoader] of Object.entries(modules)) {
      const content = await moduleLoader()
      const post = await parseBlogPost(filename, content)
      posts.push(post)
    }
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

// Get a single blog post by slug
export const getBlogPost = async (slug) => {
  try {
    const modules = import.meta.glob('/blog/*.md', { query: '?raw', import: 'default' })
    const filename = `/blog/${slug}.md`
    
    if (modules[filename]) {
      const content = await modules[filename]()
      return await parseBlogPost(filename, content)
    }
    
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
