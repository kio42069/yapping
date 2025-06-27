import React, { useState } from 'react'

const Subscribe = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Submit to Netlify Forms
      const formData = new FormData()
      formData.append('form-name', 'newsletter-subscribe')
      formData.append('email', email)
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      
      if (response.ok) {
        setStatus('🎉 Thanks for subscribing! You\'ll hear from me when I post something new.')
        setEmail('')
      } else {
        setStatus('❌ Oops, something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('❌ Network error. Please check your connection and try again.')
    }
    
    setIsSubmitting(false)
    setTimeout(() => setStatus(''), 5000)
  }
  
  return (
    <div className="subscribe-section">
      <h3>📧 Subscribe to updates</h3>
      <p>Get notified when I post something new (no spam, just the good stuff)</p>
      
      {status && (
        <div style={{ 
          color: status.includes('🎉') ? '#38a169' : '#e53e3e', 
          marginBottom: '15px', 
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: status.includes('🎉') ? '#f0fff4' : '#fed7d7'
        }}>
          {status}
        </div>
      )}
      
      <form 
        className="subscribe-form" 
        onSubmit={handleSubmit}
        name="newsletter-subscribe"
        method="POST"
        data-netlify="true"
      >
        {/* Hidden input for Netlify Forms */}
        <input type="hidden" name="form-name" value="newsletter-subscribe" />
        
        <input
          type="email"
          className="subscribe-input"
          name="email"
          placeholder="your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          className="subscribe-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      <p style={{ fontSize: '0.8rem', color: '#718096', marginTop: '10px' }}>
        No spam ever. Unsubscribe anytime by emailing me.
      </p>
    </div>
  )
}

export default Subscribe
