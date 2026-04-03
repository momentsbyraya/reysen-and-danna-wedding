import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react'
import { audio } from '../data'

const AudioContext = createContext(null)

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Initialize audio - handle special characters in filename
    // Create a proper URL that handles emoji and special characters
    try {
      const baseUrl = window.location.origin
      const raw = audio.background.startsWith('/') ? audio.background : `/${audio.background}`
      const pathOnly = raw.startsWith('/') ? raw.slice(1) : raw
      const encodedPath = pathOnly.split('/').map(encodeURIComponent).join('/')
      const audioUrl = `${baseUrl}/${encodedPath}`
      audioRef.current = new Audio(audioUrl)
    } catch (error) {
      console.warn('Failed to create URL for audio, using direct path:', error)
      audioRef.current = new Audio(audio.background)
    }
    const loopEnd = typeof audio.loopEnd === 'number' ? audio.loopEnd : null
    // Full-track loop when loop:true and no A–B loop window; otherwise segment loop uses loopStart/loopEnd
    audioRef.current.loop = loopEnd == null && audio.loop === true
    audioRef.current.volume = audio.volume

    const loopStart = typeof audio.loopStart === 'number' ? audio.loopStart : 0

    const handleTimeUpdate = () => {
      if (!audioRef.current || loopEnd == null) return

      // When reaching the loop end (e.g. 2:39), jump back to loopStart (e.g. 0:02)
      if (audioRef.current.currentTime >= loopEnd) {
        audioRef.current.currentTime = loopStart
        // keep playing seamlessly if already playing
        if (!audioRef.current.paused) {
          // no await; best-effort
          audioRef.current.play().catch(() => {})
        }
      }
    }
    
    // Update playing state
    audioRef.current.addEventListener('play', () => setIsPlaying(true))
    audioRef.current.addEventListener('pause', () => setIsPlaying(false))
    audioRef.current.addEventListener('ended', () => setIsPlaying(false))
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
    
    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        const loopStart = typeof audio.loopStart === 'number' ? audio.loopStart : 0
        audioRef.current.currentTime = loopStart
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.warn('Could not play music:', error)
      }
    }
  }, [])

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const value = {
    audioRef,
    isPlaying,
    play,
    pause
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

