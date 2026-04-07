import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { couple, venues } from '../data'
import { HERO_IMAGE_OBJECT_POSITION, PRENUP_HERO_SRC } from '../constants/prenupImages'

const heroTextColor = '#FFFFFF'
const heroTextShadow =
  '0 0 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.2)'

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  
  // Refs for animated elements
  const groomFirstNameRef = useRef(null)
  const andRef = useRef(null)
  const brideFirstNameRef = useRef(null)
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
    if (andRef.current) gsap.set(andRef.current, { opacity: 0, y: 20 })
    if (brideFirstNameRef.current) gsap.set(brideFirstNameRef.current, { opacity: 0, y: 30 })
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

  return (
    <div className="relative w-full" style={{ height: '100vh' }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/music/Man I Need - Olivia Dean (Harp and Violin Instrumental Cover) [bNg-aZjw7fU].mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="absolute inset-0 z-0 bg-[#94AFC3]">
        <img
          src={PRENUP_HERO_SRC}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: HERO_IMAGE_OBJECT_POSITION }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
        />
      </div>
      
      {/* Couple names at top — mobile: stacked; md+: one row, spread to edges so faces stay clear */}
      <div className="absolute inset-0 flex items-start justify-center px-4 sm:px-6 md:px-10 lg:px-14 pt-16 sm:pt-20 md:pt-14 lg:pt-16 z-20 pointer-events-none">
        {/* Soft glow behind top names for readability */}
        <div
          className="absolute top-0 left-0 right-0 h-64 sm:h-72 md:h-28 lg:h-32"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 22%, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.12) 45%, transparent 80%)',
          }}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-6xl mx-auto flex justify-center">
          <div
            className="flex w-full flex-col items-center text-center md:flex-row md:items-baseline md:justify-between md:gap-6 lg:gap-10 md:text-left"
            role="group"
            aria-label={`${groomDisplayName} and ${brideDisplayName}`}
            style={{
              color: heroTextColor,
              textShadow: heroTextShadow,
            }}
          >
            <span
              ref={groomFirstNameRef}
              className="font-foglihten uppercase text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl leading-none md:flex-1 md:min-w-0 md:text-right md:pr-2"
            >
              {groomDisplayName}
            </span>
            <span
              ref={andRef}
              className="caudex-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-none my-1 sm:my-1.5 md:my-0 md:shrink-0 md:px-2"
            >
              and
            </span>
            <span
              ref={brideFirstNameRef}
              className="font-foglihten uppercase text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl leading-none md:flex-1 md:min-w-0 md:text-left md:pl-2"
            >
              {brideDisplayName}
            </span>
          </div>
        </div>
      </div>

      {/* Date and reception venue (name only) at bottom center */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <p
            ref={dateRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-foglihten"
            style={{ color: heroTextColor, textShadow: heroTextShadow }}
          >
              {formatDate()}
            </p>
          <p
            ref={venueRef}
            className="text-sm sm:text-base md:text-lg font-albert mt-2 sm:mt-3 px-1"
            style={{ color: heroTextColor, textShadow: heroTextShadow }}
          >
            {receptionVenueShortName}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
