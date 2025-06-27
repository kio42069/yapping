import React from 'react'
import Subscribe from '../components/Subscribe'

const Home = () => {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>🌸 hi there, welcome! 🌸</h2>
        <div className="intro-text">
          <p>
            hii! this is my little corner of the internet where I share things I love and thoughts that pop into my head! 
            I'm passionate about cute things, gaming, art, and making friends ✨ (◕‿◕)♡
          </p>
          <p>
            feel free to look around and stay as long as you'd like! there's always something new to discover here~
          </p>
        </div>
      </div>
      
      <div className="decorative-divider">
        ⋆｡‧˚ʚ♡ɞ˚‧｡⋆ ⋆｡‧˚ʚ♡ɞ˚‧｡⋆ ⋆｡‧˚ʚ♡ɞ˚‧｡⋆
      </div>
      
      <div className="interests-section">
        <h3>💕 some things i love</h3>
        <p>
          ✨ cute aesthetics & kawaii culture<br/>
          🎮 cozy indie games & pixel art<br/>
          🎨 digital art & illustration<br/>
          📚 manga & light novels<br/>
          🌸 anything pink and sparkly!<br/>
          ☕ staying cozy at home with tea
        </p>
      </div>
      
      <div className="decorative-divider">
        ✧･ﾟ: *✧･ﾟ:* ♡ *:･ﾟ✧*:･ﾟ✧
      </div>
      
      <div className="updates-section">
        <h3>📋 recent updates</h3>
        <div className="update-item">
          <span className="update-date">2025-06-27:</span> 
          launched my new blog! everything is fresh and ready for content ✨
        </div>
        <div className="update-item">
          <span className="update-date">2025-06-26:</span> 
          working on the design and layout - so excited to share this space!
        </div>
        <div className="update-item">
          <span className="update-date">2025-06-25:</span> 
          decided to start my own blog after being inspired by amazing neocities sites
        </div>
      </div>
      
      <Subscribe />
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#ff69b4' }}>
        <p>thanks for visiting! come back soon~ (´｡• ω •｡`) ♡</p>
        <div style={{ fontSize: '2rem' }}>
          🌸✨🦋✨🌸
        </div>
      </div>
    </div>
  )
}

export default Home
