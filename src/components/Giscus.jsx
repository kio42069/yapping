import React, { useEffect, useRef } from 'react'

const GiscusComments = () => {
  const commentsRef = useRef(null)
  const scriptLoaded = useRef(false)
  
  useEffect(() => {
    if (commentsRef.current && !scriptLoaded.current) {
      // Remove any existing script to avoid duplicates
      const existingScript = document.querySelector('script[src="https://giscus.app/client.js"]')
      if (existingScript) {
        existingScript.remove()
      }
      
      console.log('Creating new Giscus script...')
      
      // Create and insert the script
      const script = document.createElement('script')
      script.src = "https://giscus.app/client.js"
      script.setAttribute('data-repo', "kio42069/yapping")
      script.setAttribute('data-repo-id', "R_kgDOPC7QwA")
      script.setAttribute('data-category', "General")
      script.setAttribute('data-category-id', "DIC_kwDOPC7QwM4CsKXr")
      script.setAttribute('data-mapping', "pathname")
      script.setAttribute('data-strict', "0")
      script.setAttribute('data-reactions-enabled', "1")
      script.setAttribute('data-emit-metadata', "0")
      script.setAttribute('data-input-position', "bottom")
      script.setAttribute('data-theme', "catppuccin_frappe")
      script.setAttribute('data-lang', "en")
      script.setAttribute('crossorigin', "anonymous")
      script.async = true
      
      // Add event listeners for script loading events
      script.onload = () => {
        console.log('Giscus script loaded successfully!')
        scriptLoaded.current = true
      }
      
      script.onerror = (error) => {
        console.error('Error loading Giscus script:', error)
      }
      
      commentsRef.current.appendChild(script)
    }
  }, [])



  return (
    <div className="comments-section">
      <h3 style={{ color: '#4a90e2', textAlign: 'center', marginBottom: '20px' }}>
        💬 Comments
      </h3>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: '20px' }}>
        Share your thoughts! Comments are powered by GitHub Discussions
      </p>
      
      {/* Container for Giscus script */}
      <div ref={commentsRef} className="giscus-container"></div>
    </div>
  )
}

export default GiscusComments
