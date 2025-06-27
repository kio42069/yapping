import React from 'react'
import Subscribe from '../components/Subscribe'

const Home = () => {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>HIIIIIII</h2>
        <div className="intro-text">
          <p>
            so yeah, i decided to make a blog instead of posting stories on instagram or whatever. 
            mainly because i'm tired of ai slop, ads, and bot accounts everywhere.
          </p>
        </div>
      </div>
      
      <div className="decorative-divider">
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      </div>
      
      <div className="interests-section">
        <h3>🤔 what to expect here</h3>
        <p>tbf nothing solid, but probably:</p>
        <ul style={{ textAlign: 'left', marginLeft: '20px' }}>
          <li>regular short thoughts / stories</li>
          <li>tech/electronics/games posting</li>
          <li>rants (definitely rants)</li>
          <li>picture dumps (rarely, when i actually have enough content lol)</li>
        </ul>
      </div>
      
      <div className="decorative-divider">
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      </div>
      
      <div className="updates-section">
        <h3>📋 recent updates</h3>
        <div className="update-item">
          <span className="update-date">2025-06-26:</span> 
          posted "Hello bacchon" - explained why i'm doing this blog thing
        </div>
        <div className="update-item">
          <span className="update-date">2025-06-25:</span> 
          started working on that tracking rant (still not finished lol)
        </div>
        <div className="update-item">
          <span className="update-date">2025-06-25:</span> 
          set up this whole blog thing - pretty proud of myself ngl
        </div>
      </div>
      
      <Subscribe />
      
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#4a90e2' }}>
        <p>anyway, feel free to stick around and see what happens</p>
        <p><em>bye bye</em></p>
      </div>
    </div>
  )
}

export default Home
