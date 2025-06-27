import React, { useState, useEffect, useRef } from 'react'

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [tracks, setTracks] = useState([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioRef = useRef(null)

  // List of music files - update this array when you add new tracks
  const musicFiles = [
    '/music/track1.mp3',
    '/music/track2.mp3',
    '/music/track3.mp3',
    '/music/ambient1.mp3',
    '/music/chill1.mp3',    '/music/[1 hour version] wii party ~ nintendo lo-fi [GpkUkMWF-1g].mp3',
    
    // Add your actual music files here
  ]

  useEffect(() => {
    // Filter out files that don't exist (for development)
    const availableTracks = musicFiles.filter(track => {
      // In production, you might want to check if files exist
      return true // For now, assume all listed files exist
    })
    
    setTracks(availableTracks)
    if (availableTracks.length > 0) {
      playRandomTrack(availableTracks)
    }
  }, [])

  const playRandomTrack = (trackList = tracks) => {
    if (trackList.length === 0) return
    
    const randomIndex = Math.floor(Math.random() * trackList.length)
    const randomTrack = trackList[randomIndex]
    setCurrentTrack(randomTrack)
    setCurrentTrackIndex(randomIndex)
    
    if (audioRef.current) {
      audioRef.current.src = randomTrack
      audioRef.current.load()
      
      // Auto-play with user interaction handling
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch(error => {
            console.log('Auto-play prevented by browser. User interaction required.')
            setIsPlaying(false)
          })
      }
    }
  }

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleShuffle = () => {
    playRandomTrack()
  }

  const handleTrackEnd = () => {
    playRandomTrack() // Auto-play next random track when current ends
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch(error => {
              console.log('Play failed:', error)
            })
        }
      }
    }
  }

  // Auto-start music when user first interacts with the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (tracks.length > 0 && !isPlaying && !currentTrack) {
        playRandomTrack()
      }
      // Remove the listener after first interaction
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [tracks, isPlaying, currentTrack])

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        onEnded={handleTrackEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => console.log('Audio error:', e)}
        style={{ display: 'none' }}
        loop={false}
      />
      
      <div className="music-controls">
        <button 
          onClick={handleMuteToggle}
          className="music-btn"
          title={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        
        <button 
          onClick={handleShuffle}
          className="music-btn"
          title="Play next random track"
        >
          🔀
        </button>
        
        {currentTrack && (
          <span className="current-track">
            ♪ {currentTrack.split('/').pop().replace(/\.(mp3|wav|ogg)$/i, '')}
          </span>
        )}
      </div>
    </div>
  )
}

export default MusicPlayer
