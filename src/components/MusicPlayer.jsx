import React, { useState, useEffect, useRef } from 'react'

const MusicPlayer = ({ customTrack }) => {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [tracks, setTracks] = useState([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioRef = useRef(null)
  const [isCustomTrack, setIsCustomTrack] = useState(false)

  // List of music files - update this array when you add new tracks
    const musicFiles = [
    '/music/bbno$ & Y2K - lalala.mp3',
    '/music/Bury the Light.mp3',
    '/music/cavetown ?? devil town.mp3',
    '/music/Clairo - Pretty Girl [mngtcfcaVrI].mp3',
    '/music/Clarx & Harddope - Castle [NCS Release].mp3',
    '/music/clich�.mp3',
    '/music/Come Inside Of My Heart.mp3',
    '/music/creep by radiohead [sTaamHdDVQE].mp3',
    '/music/Devil Town V.2.mp3',
    '/music/feelings are fatal.mp3',
    '/music/Get Lucky [Original Version] - Daft Punk.mp3',
    '/music/heather - Conan Gray ?? cover acoustic version ?? [7NL9b054Fek].mp3',
    '/music/Here With Me.mp3',
    '/music/Just the Two of Us [kinUc7TVBNg].mp3',
    '/music/Kavinsky - Nightcall.mp3',
    '/music/lain sings u duvet [ATd59_wqSJA].mp3',
    '/music/Lovefool - The Cardigans.mp3',
    '/music/LUM!X - Monster.mp3',
    '/music/Marvin Gaye ft. Wale [Remix].mp3',
    '/music/NEFFEX - Grateful [Copyright Free].mp3',
    '/music/Neon Genesis Evangelion OP - A Cruel Angel\'s Thesis.mp3',
    '/music/Ocean Eyes.mp3',
    '/music/ONLY.mp3',
    '/music/Renai Circulation ???????????????????*?????.mp3',
    '/music/rises the moon.mp3',
    '/music/Romantic Homicide COVER [ArdfAdDWN1Q].mp3',
    '/music/Summertime - Cinnamons X Evening Cinema.mp3',
    '/music/Summertime Cinnamons.mp3',
    '/music/Tek It.mp3',
    '/music/Tip Toe - HYBS.mp3',
    '/music/Vicetone - Nevada - Ft - Cozi - Zuehlsdorff- 22.mp3',
    '/music/We Don\'t Talk Anymore Edit.mp3',
    '/music/Wiz Khalifa - See You Again ft. Charlie Puth Furious 7 Soundtrack.mp3',
    '/music/[1 hour version] wii party ~ nintendo lo-fi [GpkUkMWF-1g].mp3',
  ]

  useEffect(() => {
    // Filter out files that don't exist (for development)
    const availableTracks = musicFiles.filter(track => {
      // In production, you might want to check if files exist
      return true // For now, assume all listed files exist
    })
    
    setTracks(availableTracks)
    
    // If a custom track is specified, use it instead of a random track
    if (customTrack) {
      const trackPath = `/music/${customTrack}`;
      console.log('Using custom track for this post:', trackPath);
      setCurrentTrack(trackPath);
      setIsCustomTrack(true);
      
      if (audioRef.current) {
        audioRef.current.src = trackPath;
        audioRef.current.load();
        
        // Auto-play with user interaction handling
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.log('Auto-play prevented by browser. User interaction required.');
              setIsPlaying(false);
            });
        }
      }
    } else if (availableTracks.length > 0) {
      playRandomTrack(availableTracks);
    }
  }, [customTrack])

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
    setIsCustomTrack(false) // Exit custom track mode
    playRandomTrack()
  }

  const handleTrackEnd = () => {
    if (isCustomTrack) {
      // If it was a custom track that ended, just replay it
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else {
      playRandomTrack() // Auto-play next random track when current ends
    }
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


