import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'
import Line from './Line'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const SPONSOR_IMAGES = [
  '/assets/images/dresscode/spon1.png',
  '/assets/images/dresscode/spon2.png',
]

const SPONSOR_SWATCHES = [
  { hex: '#E8A89A', name: 'Peach' },
  { hex: '#DCC8B0', name: 'Beige' },
]

// Swatch index → illustration index (peach gown = spon2, cream barong = spon1)
const SPONSOR_IMAGE_BY_SWATCH = [1, 0]

const DressCode = () => {
  const dressCodeTitleRef = useRef(null)
  const dressCodeContentRef = useRef(null)
  const principalSponsorRef = useRef(null)
  const category2Ref = useRef(null)
  
  // State for tooltip visibility
  const [activeTooltip, setActiveTooltip] = useState(null)
  const [activeDressImageIndex, setActiveDressImageIndex] = useState(0)
  const [activeSponsorImageIndex, setActiveSponsorImageIndex] = useState(0)
  
  // Color swatches for Guests (blue palette + neutrals)
  const guestColors = [
    '#94AFC3',                      // Muted Steel Blue
    '#6685A4',                      // Dusty Slate Blue
    '#2F4869',                      // Deep Navy
    '#7092BE',                      // Medium Denim
    '#6BB7E5'                       // Sky Blue
  ]

  // Dress illustrations to match swatches
  const guestDressImages = [
    '/assets/images/dresscode/1.png',
    '/assets/images/dresscode/2.png',
    '/assets/images/dresscode/3.png',
    '/assets/images/dresscode/4.png',
    '/assets/images/dresscode/5.png',
  ]
  
  // Color name mappings
  const colorNames = {
    '#94AFC3': 'Muted Steel Blue',
    '#6685A4': 'Dusty Slate Blue',
    '#2F4869': 'Deep Navy',
    '#7092BE': 'Medium Denim',
    '#6BB7E5': 'Sky Blue',
  }

  useEffect(() => {
    const guestIntervalId = window.setInterval(() => {
      setActiveDressImageIndex((prev) => (prev + 1) % guestDressImages.length)
    }, 3500)

    // Dress Code Title animation
    if (dressCodeTitleRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(dressCodeTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Principal Sponsors block
    if (principalSponsorRef.current) {
      const root = principalSponsorRef.current
      const imgWrap = root.querySelector('.dresscode-principal-image-container')
      const details = root.querySelector('.dresscode-principal-details')
      if (imgWrap) gsap.set(imgWrap, { opacity: 0, y: 24 })
      if (details) gsap.set(details, { opacity: 0, y: 16 })
      ScrollTrigger.create({
        trigger: principalSponsorRef.current,
        start: 'top 78%',
        onEnter: () => {
          if (imgWrap) {
            gsap.to(imgWrap, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' })
          }
          if (details) {
            gsap.to(details, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.12 })
          }
        },
      })
    }

    // Category 2 animation - animate image and content separately
    if (category2Ref.current) {
      const category2Container = category2Ref.current
      const category2Image = category2Container.querySelector('.dresscode-image-container')
      const category2Content = category2Container.querySelector('.dresscode-details-container')

      if (category2Image) {
        gsap.set(category2Image, { opacity: 0, x: 30 })
      }
      if (category2Content) {
        gsap.set(category2Content, { opacity: 0, x: -30 })
      }

      ScrollTrigger.create({
        trigger: category2Ref.current,
        start: "top 75%",
        onEnter: () => {
          if (category2Content) {
            gsap.to(category2Content, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out"
            })
          }
          if (category2Image) {
            gsap.to(category2Image, {
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

    // Cleanup function
    return () => {
      window.clearInterval(guestIntervalId)
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === dressCodeTitleRef.current ||
          trigger.vars.trigger === principalSponsorRef.current ||
          trigger.vars.trigger === category2Ref.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Principal sponsor illustrations: auto crossfade while the block is on screen
  useLayoutEffect(() => {
    const root = principalSponsorRef.current
    if (!root) return undefined

    let intervalId = null
    const SPONSOR_ROTATE_MS = 4800

    const clear = () => {
      if (intervalId != null) {
        window.clearInterval(intervalId)
        intervalId = null
      }
    }

    const start = () => {
      clear()
      intervalId = window.setInterval(() => {
        setActiveSponsorImageIndex((prev) => (prev + 1) % SPONSOR_IMAGES.length)
      }, SPONSOR_ROTATE_MS)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) start()
        else clear()
      },
      { threshold: 0.18, rootMargin: '0px 0px -5% 0px' }
    )

    observer.observe(root)

    return () => {
      clear()
      observer.disconnect()
    }
  }, [])

  return (
    <div className="relative">
      {/* Dress Code Title */}
      <div ref={dressCodeTitleRef} className="text-center mb-6 sm:mb-8">
        <div>
          {/* Single Flower 2 Image */}
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/images/graphics/single-flower-2.png" 
              alt="Flower decoration" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          <h3 className="relative inline-block px-6 py-3">
            <span 
              className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize dress-code-title-text"
            >
              Dress Code
            </span>
          </h3>
          {/* General Dress Code Description */}
          <p className="text-base sm:text-lg font-albert font-thin italic dress-code-description">
            {dresscode.mainDressCode?.description || "Formal attire with these colors on our special day."}
          </p>
        </div>
      </div>

      {/* Dress Code Content */}
      <div ref={dressCodeContentRef} className="flex flex-col gap-10 sm:gap-12 lg-custom:gap-14 items-stretch">
        {/* Principal Sponsors */}
        {dresscode.sections?.find((s) => s.type === 'principalSponsors') && (() => {
          const section = dresscode.sections.find((s) => s.type === 'principalSponsors')
          return (
            <div ref={principalSponsorRef} className="relative overflow-visible flex-1">
              <div className="flex flex-col gap-4 md:gap-5 items-stretch">
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-[520px] relative overflow-hidden rounded aspect-[4/3] dresscode-principal-image-container transform scale-[1.12] origin-top bg-white/40">
                    {SPONSOR_IMAGES.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt={index === 0 ? 'Principal sponsors attire illustration' : 'Principal sponsors attire illustration alternate'}
                        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-[1200ms] ease-in-out"
                        style={{ opacity: index === activeSponsorImageIndex ? 1 : 0 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full dresscode-principal-details flex flex-col text-left">
                  <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-2 text-center">
                    {section.title}
                  </div>
                  <p className="text-sm sm:text-base font-albert font-thin text-[#333333] text-center max-w-xl mx-auto mb-4 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {SPONSOR_SWATCHES.map((swatch, index) => (
                      <div
                        key={swatch.hex}
                        className="relative"
                        onMouseEnter={() => {
                          setActiveTooltip(`sponsor-${index}`)
                          setActiveSponsorImageIndex(SPONSOR_IMAGE_BY_SWATCH[index])
                        }}
                        onMouseLeave={() => setActiveTooltip(null)}
                        onClick={() => {
                          setActiveSponsorImageIndex(SPONSOR_IMAGE_BY_SWATCH[index])
                          setActiveTooltip(activeTooltip === `sponsor-${index}` ? null : `sponsor-${index}`)
                        }}
                      >
                        <div
                          className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 rounded-full cursor-pointer ring-offset-2 ring-offset-white transition-shadow hover:ring-2 hover:ring-[#6685A4]/40"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        {activeTooltip === `sponsor-${index}` && (
                          <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#333333] text-white text-xs rounded whitespace-nowrap z-[9999] pointer-events-none color-swatch-tooltip"
                          >
                            {swatch.name}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#333333]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* Guests */}
        {dresscode.sections?.find((s) => s.type === 'guests') && (() => {
          const section = dresscode.sections.find((s) => s.type === 'guests')
          return (
            <div className="relative overflow-visible flex-1">
              <div className="relative overflow-visible">
                <div
                  ref={category2Ref}
                  className="text-center transition-opacity duration-500 ease-in-out"
                >
                  <div className="flex flex-col gap-4 md:gap-5 items-stretch">
                    <div className="w-full flex justify-center">
                      <div className="w-full max-w-[520px] relative overflow-hidden rounded aspect-[4/3] dresscode-image-container transform scale-[1.12] origin-top">
                        {guestDressImages.map((src, index) => (
                          <img
                            key={src}
                            src={src}
                            alt="Dress illustration"
                            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-[3500ms] ease-in-out"
                            style={{
                              opacity: index === activeDressImageIndex ? 1 : 0,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="w-full dresscode-details-container flex flex-col justify-between text-left lg-custom:text-left">
                      <div>
                        <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-2 text-center">
                          {section.title}
                        </div>

                        <div className="flex justify-center lg-custom:justify-center gap-2 sm:gap-3">
                          {guestColors.map((color, index) => (
                            <div
                              key={index}
                              className="relative group"
                              onMouseEnter={() => {
                                setActiveTooltip(`guests-${index}`)
                                setActiveDressImageIndex(index)
                              }}
                              onMouseLeave={() => setActiveTooltip(null)}
                              onClick={() => {
                                setActiveDressImageIndex(index)
                                setActiveTooltip(activeTooltip === `guests-${index}` ? null : `guests-${index}`)
                              }}
                            >
                              <div
                                className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 rounded cursor-pointer"
                                style={{ backgroundColor: color }}
                              ></div>

                              {activeTooltip === `guests-${index}` && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#333333] text-white text-xs rounded whitespace-nowrap z-[9999] pointer-events-none color-swatch-tooltip" style={{ position: 'absolute' }}>
                                  {colorNames[color]}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#333333]"></div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

export default DressCode
