import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venueRef = useRef(null)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception
  // Since both ceremony and reception are at the same venue, use ceremony data
  const venue = ceremony

  useEffect(() => {
    // Venue Title animation
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

    // Venue animation - animate image and content separately
    if (venueRef.current) {
      const venueContainer = venueRef.current
      const flexContainer = venueContainer.querySelector('.flex')
      if (flexContainer) {
        const venueImage = flexContainer.querySelector('.venue-image-container')
        const venueContent = Array.from(flexContainer.children).find(child => 
          (child.classList.contains('w-full') || child.classList.contains('md:w-1/2')) && child.querySelector('.font-boska')
        )
        
        if (venueImage) {
          gsap.set(venueImage, { opacity: 0, x: -30 })
        }
        if (venueContent) {
          gsap.set(venueContent, { opacity: 0, x: 30 })
        }
        
        ScrollTrigger.create({
          trigger: venueRef.current,
          start: "top 75%",
          onEnter: () => {
            if (venueImage) {
              gsap.to(venueImage, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (venueContent) {
              gsap.to(venueContent, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              })
            }
          }
        })
      }
    }

    // Cleanup function
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

  return (
    <>
      {/* Venue Title */}
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize venue-title-text"
          >
            WHERE TO GO
          </span>
        </h3>
      </div>

      {/* Venue Container */}
      <div className="relative overflow-visible">
        <div className="relative overflow-hidden">
          <div 
            ref={venueRef} 
            className="text-center transition-opacity duration-500 ease-in-out"
          >
            {/* Venue Image and Details - Stacked on mobile, side by side on 768px+ */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Venue Image */}
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] aspect-square relative venue-image-container">
                  <img 
                    src="/assets/images/venues/ceremony.JPG" 
                    alt={venue.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Venue Details */}
              <div className="w-full md:w-3/5 flex flex-col justify-between text-center md:text-left">
                {/* Venue Name and Location Container */}
                <div>
                  {/* Venue Name */}
                  <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-2 text-center md:text-left">
                    {venue.name}
                  </div>
                  
                  {/* Address */}
                  <p className="text-sm sm:text-base font-albert font-thin text-[#333333] mb-2 text-center md:text-left">
                    {venue.address && `${venue.address}, `}
                    {venue.city}
                    {venue.state && `, ${venue.state}`}
                    {venue.zip && `, ${venue.zip}`}
                  </p>

                  {/* Schedule Times */}
                  <div className="text-sm sm:text-base font-albert font-thin text-[#333333] mb-4 text-center md:text-left space-y-1">
                    <p>Ceremony: {ceremony.time}</p>
                    <p>Reception: {reception.time} onwards</p>
                  </div>
                </div>

                {/* Google Maps Link Button */}
                <div className="flex justify-center md:justify-start items-center">
                  <SecondaryButton
                    href={venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={ArrowRight}
                  >
                    Get Direction
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venue
