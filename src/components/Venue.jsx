import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { venues as venuesData, schedule as scheduleData } from '../data'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function orderOfEventsTime(events, label) {
  const key = label.toLowerCase()
  if (key === 'ceremony') {
    const wedding = events.find(
      (ev) => ev.description.trim().toLowerCase() === 'wedding'
    )
    if (wedding) return wedding.time
  }
  if (key === 'reception') {
    const reception = events.find((ev) =>
      ev.description.toLowerCase().includes('reception')
    )
    if (reception) return reception.time
  }
  const match = events.find((ev) => ev.description.trim().toLowerCase() === key)
  return match?.time ?? null
}

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venueRef = useRef(null)
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception

  const ceremonyTime =
    orderOfEventsTime(scheduleData.events, 'Ceremony') ?? ceremony.time
  const receptionTime =
    orderOfEventsTime(scheduleData.events, 'Reception') ?? reception.time

  const venueSlides = [
    {
      src: ceremony.image || '/assets/images/venues/ceremony.JPG',
      alt: `Wedding ceremony — ${ceremony.name}`,
      label: 'Ceremony',
      name: ceremony.name,
      ceremonyTime,
      receptionTime: null,
      googleMapsUrl: ceremony.googleMapsUrl || null,
    },
    {
      src: reception.image || '/assets/images/venues/reception.JPG',
      alt: `Wedding reception — ${reception.name}`,
      label: 'Reception',
      name: reception.name,
      ceremonyTime: null,
      receptionTime,
      googleMapsUrl: reception.googleMapsUrl || null,
    },
  ]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % venueSlides.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + venueSlides.length) % venueSlides.length)
  }

  // Auto-cycle between Ceremony and Reception (mobile carousel)
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % venueSlides.length)
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [venueSlides.length])

  useEffect(() => {
    if (venueTitleRef.current) {
      ScrollTrigger.create({
        trigger: venueTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(venueTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    if (venueRef.current) {
      const venueContainer = venueRef.current
      const flexContainer = venueContainer.querySelector('.flex')
      if (flexContainer) {
        const venueImage = flexContainer.querySelector('.venue-image-container')
        const venueContent = Array.from(flexContainer.children).find(child =>
          (child.classList.contains('w-full') || child.classList.contains('md:w-1/2')) && child.querySelector('.font-boska')
        )
        if (venueImage) gsap.set(venueImage, { opacity: 0, x: -30 })
        if (venueContent) gsap.set(venueContent, { opacity: 0, x: 30 })
        ScrollTrigger.create({
          trigger: venueRef.current,
          start: "top 75%",
          onEnter: () => {
            if (venueImage) gsap.to(venueImage, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
            if (venueContent) gsap.to(venueContent, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 })
          }
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === venueTitleRef.current ||
          trigger.vars.trigger === venueRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Single location block: show ceremony and/or reception time depending on slide
  const LocationBlock = ({ name, ceremonyTime, receptionTime, googleMapsUrl }) => (
    <div className="flex flex-col gap-2 text-center">
      <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333]">
        {name}
      </div>
      <div className="text-sm sm:text-base font-albert font-thin text-[#333333] space-y-1">
        {ceremonyTime && <p>Ceremony: {ceremonyTime}</p>}
        {receptionTime && <p>Reception: {receptionTime}</p>}
      </div>
      {googleMapsUrl ? (
        <div className="flex justify-center items-center pt-1">
          <SecondaryButton
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={ArrowRight}
          >
            Get Direction
          </SecondaryButton>
        </div>
      ) : null}
    </div>
  )

  return (
    <>
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize venue-title-text">
            WHERE TO GO
          </span>
        </h3>
      </div>

      <div className="relative overflow-visible">
        <div className="relative overflow-hidden">
          <div ref={venueRef} className="text-center transition-opacity duration-500 ease-in-out">
            <div className="flex flex-col gap-6 md:gap-8 items-center">

              {/* ---------- MOBILE: One circular image + dynamic content ---------- */}
              <div className="w-full md:hidden flex flex-col items-center gap-6">
                <div className="w-full flex justify-center items-center gap-2">
                  <button
                    onClick={prevImage}
                    className="flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-8 h-8 text-[#6685A4]" />
                  </button>

                  <div className="w-full max-w-[220px] sm:max-w-[240px] aspect-square relative venue-image-container overflow-hidden">
                    <div
                      ref={carouselRef}
                      className="flex transition-transform duration-500 ease-in-out h-full"
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                      {venueSlides.map((slide, index) => (
                        <div key={index} className="min-w-full aspect-square flex-shrink-0">
                          <div className="h-full w-full overflow-hidden rounded-full bg-[#94AFC3] ring-1 ring-black/10">
                            <img
                              src={slide.src}
                              alt={slide.alt}
                              className="h-full w-full object-cover"
                              style={{ objectPosition: 'center' }}
                              loading={index === 0 ? 'eager' : 'lazy'}
                              decoding="async"
                              draggable={false}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {venueSlides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`h-2 rounded-full transition-all duration-200 ${
                            index === currentIndex ? 'bg-[#6685A4] w-6' : 'bg-white/60 w-2'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={nextImage}
                    className="flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-8 h-8 text-[#6685A4]" />
                  </button>
                </div>

                {/* Dynamic content: updates with current slide */}
                <div key={currentIndex} className="w-full px-4 transition-opacity duration-300">
                  <LocationBlock
                    name={venueSlides[currentIndex].name}
                    ceremonyTime={venueSlides[currentIndex].ceremonyTime}
                    receptionTime={venueSlides[currentIndex].receptionTime}
                    googleMapsUrl={venueSlides[currentIndex].googleMapsUrl}
                  />
                </div>
              </div>

              {/* ---------- TABLET/DESKTOP: Two circular images side by side, each with its own info ---------- */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:gap-8 md:w-full md:max-w-4xl mx-auto">
                {venueSlides.map((slide, index) => (
                  <div key={index} className="flex flex-col items-center gap-4">
                    <div className="venue-image-container relative aspect-square w-full max-w-[220px] flex-shrink-0 sm:max-w-[260px] lg:max-w-[280px]">
                      <div className="h-full w-full overflow-hidden rounded-full bg-[#94AFC3] ring-1 ring-black/10">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="h-full w-full object-cover"
                          style={{ objectPosition: 'center' }}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <LocationBlock
                      name={slide.name}
                      ceremonyTime={slide.ceremonyTime}
                      receptionTime={slide.receptionTime}
                      googleMapsUrl={slide.googleMapsUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venue
