import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import MusicPlayer from './components/MusicPlayer'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import { MusicProvider, useMusic } from './utils/MusicContext.jsx'

function App() {
  return (
    <Router>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </Router>
  )
}

function AppContent() {
  const { customTrack } = useMusic();
  
  return (
    <div className="App">
      <MusicPlayer customTrack={customTrack} />
      <Header />
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
