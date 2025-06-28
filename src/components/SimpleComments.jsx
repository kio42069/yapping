import React, { useState } from 'react'

const SimpleComments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Anonymous',
      content: 'Great post! Love the personal touch.',
      date: '2024-01-15'
    }
  ])
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim() && authorName.trim()) {
      const comment = {
        id: Date.now(),
        author: authorName,
        content: newComment,
        date: new Date().toISOString().split('T')[0]
      }
      setComments([...comments, comment])
      setNewComment('')
      setAuthorName('')
    }
  }

  return (
    <div className="comments-section">
      <h3 style={{ color: '#4a90e2', textAlign: 'center', marginBottom: '20px' }}>
        💬 Comments
      </h3>
      
      {/* Comment Form */}
      <div style={{ 
        background: '#f7fafc', 
        padding: '20px', 
        borderRadius: '10px', 
        border: '2px solid #4a90e2',
        marginBottom: '20px'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4a5568' }}>
              Name:
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #e2e8f0',
                borderRadius: '5px',
                fontFamily: 'GeneraleStation, Courier New, monospace'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4a5568' }}>
              Comment:
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #e2e8f0',
                borderRadius: '5px',
                minHeight: '80px',
                resize: 'vertical',
                fontFamily: 'GeneraleStation, Courier New, monospace'
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              background: '#4a90e2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: 'GeneraleStation, Courier New, monospace'
            }}
          >
            Post Comment
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div>
        {comments.map(comment => (
          <div
            key={comment.id}
            style={{
              background: 'white',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              marginBottom: '10px'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <strong style={{ color: '#2c5282' }}>{comment.author}</strong>
              <span style={{ color: '#718096', fontSize: '0.8rem' }}>{comment.date}</span>
            </div>
            <p style={{ color: '#4a5568', margin: 0 }}>{comment.content}</p>
          </div>
        ))}
      </div>

      <p style={{ 
        textAlign: 'center', 
        color: '#718096', 
        fontSize: '0.8rem', 
        marginTop: '20px',
        fontStyle: 'italic'
      }}>
        Note: Comments are stored locally and will reset on page refresh
      </p>
    </div>
  )
}

export default SimpleComments 