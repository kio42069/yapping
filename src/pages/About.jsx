import React from 'react'

const About = () => {
  return (
    <div className="about-page">
      <div className="welcome-section">
        <h2>🌟 about me 🌟</h2>
      </div>
      
      <div className="intro-text">
        <p>
          hello hello! ✨ thanks for stopping by my about page~
        </p>
        <p>
          i'm a creative soul who loves all things cute and colorful! when i'm not busy 
          with daily life, you can find me drawing, playing cozy games, or browsing the 
          internet for cute aesthetics and inspiration.
        </p>
      </div>
      
      <div className="interests-section">
        <h3>💫 a bit more about me</h3>
        <p>
          <strong>age:</strong> early 20s ✨<br/>
          <strong>location:</strong> somewhere cozy<br/>
          <strong>favorite colors:</strong> pink, purple, soft blues<br/>
          <strong>hobbies:</strong> digital art, reading, gaming, collecting cute things<br/>
          <strong>current obsession:</strong> making this website perfect! (｡◕‿◕｡)
        </p>
      </div>
      
      <div className="decorative-divider">
        ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡ ♡
      </div>
      
      <div className="interests-section" style={{ background: 'rgba(255, 179, 230, 0.2)', borderColor: '#ff69b4' }}>
        <h3>🎨 creative stuff</h3>
        <p>
          i love making art! mostly digital illustrations with lots of pink and sparkles ✨
          i'm always experimenting with new styles and trying to capture that dreamy, 
          kawaii aesthetic that makes my heart happy.
        </p>
        <p>
          sometimes i share my art here on the blog, and i'm always open to connecting 
          with other creative people!
        </p>
      </div>
      
      <div className="updates-section">
        <h3>📮 want to chat?</h3>
        <p>
          i'd love to make new friends who share similar interests! feel free to leave 
          comments on my blog posts or just say hi ♡
        </p>
        <p>
          please keep things kind and positive - this is meant to be a safe, cozy space 
          for everyone (´｡• ᵕ •｡`) ♡
        </p>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#ff69b4' }}>
        <p>thanks for getting to know me a little better! (◡ ‿ ◡) ♡</p>
      </div>
    </div>
  )
}

export default About
