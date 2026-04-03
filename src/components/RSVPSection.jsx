import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail } from 'lucide-react'
import SecondaryButton from './SecondaryButton'
import { couple } from '../data'
import { themeConfig } from '../config/themeConfig'
import { PRENUP_HERO_SRC, HERO_IMAGE_OBJECT_POSITION } from '../constants/prenupImages'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const RSVPSection = ({ onOpenRSVP }) => {
  const rsvpSectionRef = useRef(null)
  const rsvpTitleRef = useRef(null)
  const rsvpContentRef = useRef(null)
  useEffect(() => {
    // RSVP Section animation
    if (rsvpSectionRef.current) {
      ScrollTrigger.create({
        trigger: rsvpSectionRef.current,
        start: "top 80%",
        animation: gsap.fromTo(rsvpSectionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Title animation
    if (rsvpTitleRef.current) {
      ScrollTrigger.create({
        trigger: rsvpTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(rsvpTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Content animation
    if (rsvpContentRef.current) {
      ScrollTrigger.create({
        trigger: rsvpContentRef.current,
        start: "top 80%",
        animation: gsap.fromTo(rsvpContentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === rsvpSectionRef.current ||
          trigger.vars.trigger === rsvpTitleRef.current ||
          trigger.vars.trigger === rsvpContentRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div
      ref={rsvpSectionRef}
      className="relative my-20 overflow-hidden sm:my-24 md:my-32 px-4 sm:px-6 md:px-8"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src={PRENUP_HERO_SRC}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: HERO_IMAGE_OBJECT_POSITION }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(148, 175, 195, 0.72) 0%, rgba(107, 143, 163, 0.78) 100%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex items-center justify-center py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-3xl rounded-xl border border-white/55 bg-white/55 px-6 py-8 shadow-lg backdrop-blur-sm sm:px-8 sm:py-10 md:px-12 md:py-12">
          <div className="mb-12 text-center sm:mb-16">
            {/* Single Flower 3 Image */}
        <div className="flex justify-center mb-4">
          <img 
                src="/assets/images/graphics/single-flower-3.png" 
            alt="Flower decoration" 
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
          />
        </div>
        <h3 ref={rsvpTitleRef} className="relative inline-block px-6 py-3">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none"
            style={{ fontStyle: 'italic', color: themeConfig.text.burntOrange }}
          >
            RSVP
          </span>
        </h3>
        <div className="w-full max-w-3xl mx-auto mb-4">
          <div className="h-px w-full bg-[#6B8FA3]"></div>
        </div>
        <div ref={rsvpContentRef}>
          <p className="text-sm sm:text-base font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed text-center mb-6">
                Kindly respond on or before<br /><strong className="!font-bold" style={{ fontWeight: 700 }}>{couple.rsvpDeadline ? `${couple.rsvpDeadline.month} ${couple.rsvpDeadline.day}, ${couple.rsvpDeadline.year}` : 'April 16, 2026'}</strong>.<br />
                After this date, arrangements are final.
          </p>
          {onOpenRSVP && (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={onOpenRSVP}
                    className="flex items-center gap-2 rounded-full bg-[#6BB7E5] px-6 py-3 font-albert text-white shadow-sm transition-colors duration-200 hover:bg-[#5aaee0] active:bg-[#4fa3d4]"
              >
                    Respond
                    <Mail size={18} />
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default RSVPSection
