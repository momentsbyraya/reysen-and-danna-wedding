import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { couple, venues } from '../data'

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

  const formatDate = () => {
    const { day, year, month } = couple.wedding
    // Format as MONTH.DD.YYYY (APRIL.07.2026)
    const monthUpper = month.toUpperCase() // Get month name in uppercase (APRIL)
    const dayFormatted = String(day).padStart(2, '0') // Ensure 2 digits (07)
    return `${monthUpper}.${dayFormatted}.${year}`
  }

  /** First letter capital, rest lowercase (per word) */
  const formatHeroName = (name) => {
    if (!name || typeof name !== 'string') return ''
    return name
      .trim()
      .split(/\s+/)
      .map((word) =>
        word.length === 0 ? '' : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ')
  }

  const groomDisplayName = formatHeroName(couple.groom.firstName)
  const brideDisplayName = formatHeroName(couple.bride.firstName)

  const receptionVenueShortName =
    venues.reception.heroName ??
    venues.reception.name.split(',')[0]?.trim() ??
    venues.reception.name

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
    if (groomFirstNameRef.current) gsap.set(groomFirstNameRef.current, { opacity: 0, y: 30 })
    if (groomLastNameRef.current) gsap.set(groomLastNameRef.current, { opacity: 0, y: 30 })
    if (andRef.current) gsap.set(andRef.current, { opacity: 0, y: 20 })
    if (brideFirstNameRef.current) gsap.set(brideFirstNameRef.current, { opacity: 0, y: 30 })
    if (brideLastNameRef.current) gsap.set(brideLastNameRef.current, { opacity: 0, y: 30 })
    if (dateRef.current) gsap.set(dateRef.current, { opacity: 0, y: 20 })
    if (venueRef.current) gsap.set(venueRef.current, { opacity: 0, y: 20 })

    // Create timeline for sequential animations
    const tl = gsap.timeline({ delay: 0.3 })

    // 1. Groom's name
    if (groomFirstNameRef.current) {
      tl.to(groomFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
    }
    if (groomLastNameRef.current) {
      tl.to(groomLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 2. "and"
    if (andRef.current) {
      tl.to(andRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 3. Bride's name
    if (brideFirstNameRef.current) {
      tl.to(brideFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
    }
    if (brideLastNameRef.current) {
      tl.to(brideLastNameRef.current, {
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

    // 5. Reception venue name (under date, short — no address)
    if (venueRef.current) {
      tl.to(venueRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
    }

  }, [])

  const groomLastName = couple.groom.lastName?.trim()
  const brideLastName = couple.bride.lastName?.trim()

  return (
    <div className="relative w-full" style={{ height: '100vh' }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/music/PALAGI - TJxKZ  LIVE SESSIONS.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Use a high-resolution image (e.g. 1920px+ wide) so it doesn't upscale and look blurry at full viewport */}
      <div className="w-full h-full bg-[#94AFC3] flex items-center justify-center">
        <div className="px-6 text-center font-albert" style={{ color: '#333333' }}>
          <div style={{ fontSize: 'clamp(18px, 2vw, 28px)', fontWeight: 600 }}>TO BE ADDED</div>
          <div className="text-xs sm:text-sm mt-2 opacity-80">Hero image</div>
        </div>
      </div>
      
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
      
      {/* Couple names at top */}
      <div className="absolute inset-0 flex items-start justify-center px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 z-20 pointer-events-none">
        {/* Soft glow behind top names for readability */}
        <div
          className="absolute top-0 left-0 right-0 h-64 sm:h-72 md:h-80"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 22%, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.12) 45%, transparent 80%)',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto flex justify-center">
          <div
            className="text-center"
            role="group"
            aria-label={`${groomDisplayName} and ${brideDisplayName}`}
            style={{
              color: '#FFFFFF',
              textShadow: '0 0 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.2)',
            }}
          >
            <span
              ref={groomFirstNameRef}
              className="font-foglihten uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none block w-full text-center"
            >
              {groomDisplayName}
            </span>
            <br />
            <span
              ref={andRef}
              className="caudex-bold inline-block text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-none my-1 sm:my-1.5"
            >
              and
            </span>
            <br />
            <span
              ref={brideFirstNameRef}
              className="font-foglihten uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none block w-full text-center"
            >
              {brideDisplayName}
            </span>
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

      {/* Date and reception venue (name only) at bottom center */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <p ref={dateRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-foglihten" style={{ color: '#ffffff' }}>
              {formatDate()}
            </p>
          <p
            ref={venueRef}
            className="text-sm sm:text-base md:text-lg font-albert mt-2 sm:mt-3 px-1"
            style={{ color: '#FFFFFF' }}
          >
            Reception to be added
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
