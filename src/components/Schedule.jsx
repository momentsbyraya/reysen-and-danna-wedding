import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { schedule as scheduleData } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const iconClass = 'w-7 h-7 sm:w-8 sm:h-8 text-[#f8f4ec]'

function eventIconKey(description) {
  const d = description.toLowerCase()
  if (d.includes('ceremony')) return 'ceremony'
  if (d.includes('photo') || d.includes('video')) return 'media'
  if (d.includes('reception')) return 'reception'
  if (d.includes('dinner')) return 'dinner'
  if (d.includes('party')) return 'party'
  return 'default'
}

function TimelineEventIcon({ description }) {
  const key = eventIconKey(description)
  const svgProps = {
    className: iconClass,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  }
  const stroke = { stroke: 'currentColor', strokeWidth: 1.35, strokeLinecap: 'round', strokeLinejoin: 'round' }

  switch (key) {
    case 'ceremony':
      return (
        <svg {...svgProps}>
          <circle cx="9" cy="12" r="4.25" {...stroke} />
          <circle cx="15" cy="12" r="4.25" {...stroke} />
        </svg>
      )
    case 'media':
      return (
        <svg {...svgProps}>
          <rect x="3" y="7" width="18" height="12" rx="2" {...stroke} />
          <circle cx="12" cy="13" r="3" {...stroke} />
          <path d="M8 7V6a1 1 0 011-1h6a1 1 0 011 1v1" {...stroke} />
        </svg>
      )
    case 'reception':
      return (
        <svg {...svgProps}>
          <path d="M4 20h16M6 20V10l6-4 6 4v10" {...stroke} />
          <path d="M9 20v-6h6v6" {...stroke} />
        </svg>
      )
    case 'dinner':
      return (
        <svg {...svgProps}>
          <path d="M7.5 21V9m0 0L5.5 5.5M7.5 9L7.5 5.5M7.5 9L9.5 5.5" {...stroke} />
          <path d="M17 4v17M17 4c2.2 0 3.5 1.6 3.5 4v6.5c0 1.4-1 2.5-2.5 2.5" {...stroke} />
        </svg>
      )
    case 'party':
      return (
        <svg {...svgProps}>
          <path d="M11 17V5h5.5v9.5" {...stroke} />
          <ellipse cx="7.5" cy="17.5" rx="2.4" ry="3" transform="rotate(-18 7.5 17.5)" {...stroke} />
        </svg>
      )
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="4" {...stroke} />
        </svg>
      )
  }
}

const Schedule = () => {
  const navigate = useNavigate()
  const scheduleTitleRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)

  useEffect(() => {
    // Schedule title animation
    if (scheduleTitleRef.current) {
      ScrollTrigger.create({
        trigger: scheduleTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(scheduleTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Timeline line expansion from top to bottom
    if (lineRef.current) {
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 70%",
        animation: gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.5, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Events animate in with stagger
    if (eventsRef.current) {
      const eventItems = eventsRef.current.querySelectorAll('div.flex.items-center')
      if (eventItems.length > 0) {
        gsap.set(eventItems, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: eventsRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(eventItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.2
            })
          }
        })
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === scheduleTitleRef.current ||
          trigger.vars.trigger === timelineRef.current ||
          trigger.vars.trigger === eventsRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      <div className="relative program-section schedule-moody overflow-hidden">
        <div className="schedule-bokeh" aria-hidden="true">
          <div className="schedule-bokeh-vignette" />
          <div className="schedule-bokeh-glow" />
          <div className="schedule-bokeh-orb schedule-bokeh-orb--1" />
          <div className="schedule-bokeh-orb schedule-bokeh-orb--2" />
          <div className="schedule-bokeh-orb schedule-bokeh-orb--3" />
          <div className="schedule-bokeh-orb schedule-bokeh-orb--4" />
        </div>

        {/* Program Title */}
        <div ref={scheduleTitleRef} className="relative z-10 mb-12 sm:mb-16 program-title-container schedule-moody-title">
          <h3 className="px-6 py-3">
            <span 
              className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none capitalize program-title-text"
            >
              Order of Events
            </span>
          </h3>
          <p className="text-sm sm:text-base md:text-lg font-albert text-center mt-4 mx-auto px-4 program-description schedule-moody-lede">
            Join us as we celebrate this special day together
          </p>
        </div>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto z-10 timeline-container schedule-moody-timeline">
          <div ref={lineRef} className="schedule-timeline-line absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2" />

          {/* Timeline Events */}
          <div ref={eventsRef} className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
             {scheduleData.events.map((event, index) => {
               const isLeft = event.position === 'left'
               return (
                 <div key={index} className="flex items-center relative min-h-[60px]">
                   {isLeft ? (
                     <>
              <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time schedule-moody-time">
                           {event.time}
                </div>
                <div className="border-b border-dashed schedule-moody-dash mb-1"></div>
                <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description schedule-moody-desc">
                           {event.description}
                </div>
              </div>
              <div
                className="schedule-timeline-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                aria-hidden="true"
              >
                <TimelineEventIcon description={event.description} />
              </div>
                       <div className="w-1/2 pl-6 text-left"></div>
                     </>
                   ) : (
                     <>
                       <div className="w-1/2 pr-6 text-right"></div>
              <div
                className="schedule-timeline-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                aria-hidden="true"
              >
                <TimelineEventIcon description={event.description} />
              </div>
              <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time schedule-moody-time">
                           {event.time}
                </div>
                <div className="border-b border-dashed schedule-moody-dash mb-1"></div>
                <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description schedule-moody-desc">
                           {event.description}
                </div>
              </div>
                     </>
                   )}
            </div>
               )
             })}
          </div>
        </div>
      </div>

      {/* Entourage CTA - directly below Order of Events */}
      <div className="bg-white pb-14 sm:pb-16">
        <div className="max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto px-4">
          <div className="border-t border-gray-300/50 pt-10 sm:pt-12 text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/images/graphics/single-flower-1.png"
                alt=""
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                aria-hidden={true}
              />
            </div>
            <div className="font-foglihten text-2xl sm:text-3xl md:text-4xl leading-none capitalize text-[#333333]">
              Entourage
            </div>
            <p className="text-sm sm:text-base md:text-lg font-albert text-[#333333] mt-3">
              View the full list of our wedding entourage
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => navigate('/entourage')}
                className="px-6 py-3 rounded-full bg-[#6685A4] text-white font-albert font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                View Entourage
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Schedule
