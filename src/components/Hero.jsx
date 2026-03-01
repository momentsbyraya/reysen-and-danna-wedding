import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Play, Pause } from 'lucide-react'
import { couple } from '../data'
import { venues } from '../data'
import { themeConfig } from '../config/themeConfig'

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  
  // Refs for animated elements
  const groomFirstNameRef = useRef(null)
  const groomLastNameRef = useRef(null)
  const andRef = useRef(null)
  const brideFirstNameRef = useRef(null)
  const brideLastNameRef = useRef(null)
  const dateRef = useRef(null)
  const venueRef = useRef(null)
  const playButtonRef = useRef(null)

  const formatDate = () => {
    const { day, year, month } = couple.wedding
    // Format as MONTH.DD.YYYY (APRIL.07.2026)
    const monthUpper = month.toUpperCase() // Get month name in uppercase (APRIL)
    const dayFormatted = String(day).padStart(2, '0') // Ensure 2 digits (07)
    return `${monthUpper}.${dayFormatted}.${year}`
  }

  const venueName = venues.ceremony.name

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    // Set initial hidden states
    gsap.set(groomFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(groomLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(andRef.current, { opacity: 0, y: 20 })
    gsap.set(brideFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(brideLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(dateRef.current, { opacity: 0, y: 20 })
    gsap.set(venueRef.current, { opacity: 0, y: 20 })
    gsap.set(playButtonRef.current, { opacity: 0, scale: 0.8 })

    // Create timeline for sequential animations
    const tl = gsap.timeline({ delay: 0.3 })

    // 1. Groom's name
    if (groomFirstNameRef.current && groomLastNameRef.current) {
      tl.to(groomFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(groomLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 2. "AND"
    if (andRef.current) {
      tl.to(andRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 3. Bride's name
    if (brideFirstNameRef.current && brideLastNameRef.current) {
      tl.to(brideFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(brideLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 4. Date
    if (dateRef.current) {
      tl.to(dateRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 5. Venue
    if (venueRef.current) {
      tl.to(venueRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
    }

    // 6. Play button
    if (playButtonRef.current) {
      tl.to(playButtonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.2")
    }
  }, [])

  return (
    <div className="relative w-full" style={{ height: '100vh' }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/music/PALAGI - TJxKZ  LIVE SESSIONS.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      <img 
        src="/assets/images/prenup/prenup3.JPG" 
        alt="Hero"
        className="w-full h-full object-cover"
      />
      
      {/* Top gradient: short strip so it stays in header only; no overlap below */}
      <svg 
        className="absolute top-0 z-10 pointer-events-none h-24 sm:h-28 md:h-32 lg:h-36"
        style={{ left: '-2.5%', width: '105%' }}
        preserveAspectRatio="none" 
        viewBox="0 0 1200 400" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
          </filter>
          <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
            <stop offset="40%" stopColor="rgba(255, 255, 255, 0.7)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#topGradient)" filter="url(#blur)" />
      </svg>
      
      {/* Couple Names - Centered with radial glow and soft blend */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 z-20 pointer-events-none">
        {/* Radial gradient glow: transparent edges → soft dark center behind text */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.12) 45%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center justify-center text-center max-w-4xl">
          {/* Groom's Name */}
          <div>
            <p
              ref={groomFirstNameRef}
              className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight"
              style={{
                color: '#FFFFFF',
                textShadow: '0 0 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              {couple.groom.firstName}
            </p>
            <p
              ref={groomLastNameRef}
              className="font-ballet text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight -mt-2 sm:-mt-3"
              style={{
                color: '#FFFFFF',
                textShadow: '0 0 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              {couple.groom.lastName}
            </p>
          </div>
          <p
            ref={andRef}
            className="caudex-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase leading-tight my-2 sm:my-3"
            style={{
              color: '#FFFFFF',
              textShadow: '0 0 24px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            AND
          </p>
          {/* Bride's Name */}
          <div>
            <p
              ref={brideFirstNameRef}
              className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight"
              style={{
                color: '#FFFFFF',
                textShadow: '0 0 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              {couple.bride.firstName}
            </p>
            <p
              ref={brideLastNameRef}
              className="font-ballet text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight -mt-2 sm:-mt-3"
              style={{
                color: '#FFFFFF',
                textShadow: '0 0 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              {couple.bride.lastName}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient: short strip so it ends above the floral banner; no overlap on flowers */}
      <svg 
        className="absolute bottom-0 z-10 pointer-events-none h-24 sm:h-28 md:h-32 lg:h-36"
        style={{ left: '-2.5%', width: '105%' }}
        preserveAspectRatio="none" 
        viewBox="0 0 1200 400" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blurBottom">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
          </filter>
          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="30%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.7)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.95)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bottomGradient)" filter="url(#blurBottom)" />
      </svg>

      {/* Play/Pause Button - Bottom Right */}
      <button 
        ref={playButtonRef}
        onClick={togglePlayPause}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-30 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 flex items-center justify-center shadow-lg cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {isPlaying ? (
          <Pause size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#5BAED9]" fill="#5BAED9" />
        ) : (
          <Play size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#5BAED9] ml-1" fill="#5BAED9" />
        )}
      </button>

      {/* Date and Venue at Bottom Center */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <p ref={dateRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-foglihten" style={{ color: '#ffffff' }}>
              {formatDate()}
            </p>
          {/* Venue - Plain Text */}
          <p ref={venueRef} className="text-xs sm:text-sm md:text-base font-albert mt-2 sm:mt-3" style={{ color: themeConfig.text.lightBlack }}>
              {venueName}
            </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
