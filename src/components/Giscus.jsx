import React from 'react'
import Giscus from '@giscus/react'

const GiscusComments = () => {
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
