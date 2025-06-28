import React, { useState, useEffect } from 'react'
import Giscus from '@giscus/react'

const GiscusComments = () => {
  const [giscusError, setGiscusError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if Giscus is properly configured after a delay
    const timer = setTimeout(() => {
      const giscusFrame = document.querySelector('iframe[src*="giscus.app"]')
      if (!giscusFrame) {
        setGiscusError(true)
      }
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="comments-section">
        <h3 style={{ color: '#4a90e2', textAlign: 'center', marginBottom: '20px' }}>
          💬 Comments
        </h3>
        <p style={{ textAlign: 'center', color: '#718096', marginBottom: '20px' }}>
          Loading comments...
        </p>
      </div>
    )
  }

  if (giscusError) {
    return (
      <div className="comments-section">
        <h3 style={{ color: '#4a90e2', textAlign: 'center', marginBottom: '20px' }}>
          💬 Comments
        </h3>
        <div style={{ 
          background: '#f7fafc', 
          padding: '20px', 
          borderRadius: '10px', 
          border: '2px dashed #4a90e2',
          textAlign: 'center'
        }}>
          <p style={{ color: '#718096', marginBottom: '15px' }}>
            Comments are temporarily unavailable.
          </p>
          <p style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '15px' }}>
            To enable comments, please:
          </p>
          <ol style={{ 
            textAlign: 'left', 
            display: 'inline-block', 
            color: '#4a5568', 
            fontSize: '0.9rem',
            marginBottom: '15px'
          }}>
            <li>Install the <a href="https://github.com/apps/giscus" target="_blank" rel="noopener noreferrer" style={{ color: '#4a90e2' }}>Giscus app</a> on your GitHub repository</li>
            <li>Make sure the repository is public or you have proper permissions</li>
            <li>Check that the repository name and ID are correctly configured</li>
          </ol>
          <p style={{ color: '#718096', fontSize: '0.8rem' }}>
            Comments are powered by GitHub Discussions
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="comments-section">
      <h3 style={{ color: '#4a90e2', textAlign: 'center', marginBottom: '20px' }}>
        💬 Comments
      </h3>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: '20px' }}>
        Share your thoughts! Comments are powered by GitHub Discussions
      </p>
      <Giscus
        id="comments"
        repo="kio42069/yapping"
        repoId="R_kgDOLqQAAA"
        category="General"
        categoryId="DIC_kwDOLqQAAc4CbQ"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  )
}

export default GiscusComments
