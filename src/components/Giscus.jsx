import React from 'react'

const Giscus = ({ repoId, categoryId }) => {
  React.useEffect(() => {
    // Create script element for Giscus
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'YOUR_USERNAME/YOUR_REPO') // Replace with actual repo
    script.setAttribute('data-repo-id', repoId || 'YOUR_REPO_ID')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', categoryId || 'YOUR_CATEGORY_ID')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'light_protanopia')
    script.setAttribute('data-lang', 'en')
    script.crossOrigin = 'anonymous'
    script.async = true
    
    // Add to comments container
    const commentsContainer = document.getElementById('giscus-container')
    if (commentsContainer) {
      // Clear existing comments
      commentsContainer.innerHTML = ''
      commentsContainer.appendChild(script)
    }
    
    return () => {
      // Cleanup
      if (commentsContainer) {
        commentsContainer.innerHTML = ''
      }
    }
  }, [repoId, categoryId])
  
  return (
    <div className="comments-section">
      <h3 style={{ color: '#ff69b4', textAlign: 'center', marginBottom: '20px' }}>
        💬 Comments
      </h3>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        Share your thoughts! Comments are powered by GitHub Discussions ✨
      </p>
      <div id="giscus-container"></div>
    </div>
  )
}

export default Giscus
