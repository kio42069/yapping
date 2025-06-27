import React, { useState } from 'react'

const Subscribe = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, just show a success message
    // In production, you'd integrate with Mailchimp, Buttondown, etc.
    if (email) {
      setStatus('Thank you for subscribing! ヽ(♡‿♡)ノ')
      setEmail('')
      setTimeout(() => setStatus(''), 3000)
    }
  }
  
  return (
    <div className="subscribe-section">
      <h3>📧 Subscribe to new posts!</h3>
      <p>Get notified when I post something new~ (´｡• ᵕ •｡`) ♡</p>
      
      {status && (
        <div style={{ color: '#006600', marginBottom: '15px', fontWeight: 'bold' }}>
          {status}
        </div>
      )}
      
      <form className="subscribe-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="subscribe-input"
          placeholder="your email address ✉️"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="subscribe-button">
          Subscribe! ♡
        </button>
      </form>
    </div>
  )
}

export default Subscribe
