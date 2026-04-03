import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const GUEST_DRESS_ILLUSTRATION_SRC = '/assets/images/dresscode/4.png'

const DressCode = () => {
  const dressCodeTitleRef = useRef(null)
  const dressCodeContentRef = useRef(null)

  const [activeTooltip, setActiveTooltip] = useState(null)

  // Color swatches for Guests (no navy / light sky blue)
  const guestColors = [
    '#94AFC3', // Muted Steel Blue
    '#6685A4', // Dusty Slate Blue
    '#7092BE', // Medium Denim
  ]

  const colorNames = {
    '#94AFC3': 'Muted Steel Blue',
    '#6685A4': 'Dusty Slate Blue',
    '#7092BE': 'Medium Denim',
  }

  useEffect(() => {
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === dressCodeTitleRef.current) {
          trigger.kill()
        }
      })
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
        {/* Guests */}
        {dresscode.sections?.find((s) => s.type === 'guests') && (() => {
          const section = dresscode.sections.find((s) => s.type === 'guests')
          return (
            <div className="relative overflow-visible flex-1">
              <div className="relative overflow-visible">
                <div className="text-center">
                  <div className="flex flex-col gap-4 md:gap-5 items-stretch">
                    <div className="w-full flex justify-center">
                      <div className="dresscode-image-container relative aspect-[4/3] w-full max-w-[520px] origin-top scale-[1.12] transform overflow-hidden rounded">
                        <img
                          src={GUEST_DRESS_ILLUSTRATION_SRC}
                          alt="Guest dress code — formal attire in the wedding palette"
                          className="block h-full w-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className="dresscode-details-container flex w-full flex-col justify-between text-left lg-custom:text-left">
                      <div>
                        <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-2 text-center">
                          {section.title}
                        </div>

                        <div className="flex justify-center lg-custom:justify-center gap-2 sm:gap-3">
                          {guestColors.map((color, index) => (
                            <div
                              key={index}
                              className="relative group"
                              onMouseEnter={() => setActiveTooltip(`guests-${index}`)}
                              onMouseLeave={() => setActiveTooltip(null)}
                              onClick={() =>
                                setActiveTooltip(activeTooltip === `guests-${index}` ? null : `guests-${index}`)
                              }
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
