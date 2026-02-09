import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loveStory } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  // Split content into paragraphs
  const paragraphs = loveStory.content.split('\n\n').filter(p => p.trim())

  // Polaroid images - using prenup images in specific order
  const polaroidImages = [
    '/assets/images/prenup/Feb 14, 2022 akyat ng ligaw.jpg',  // 1. akyat ng ligaw
    '/assets/images/prenup/Ligawan stage 2.0.png',            // 2. ligawan stage 2.0
    '/assets/images/prenup/Ligawan stage 2.1.png',            // 3. ligawan stage 2.1
    '/assets/images/prenup/Ligawan stage 1.jpg',                // 4. ligawan stage 1
    '/assets/images/prenup/Proposal 1.jpg',                    // 5. rest of images
    '/assets/images/prenup/IMG_2628.png',                     // 6. moment 6 image
    '/assets/images/prenup/Proposal 3.jpg',
    '/assets/images/prenup/Proposal 4.jpg',
    '/assets/images/prenup/Proposal 5.jpg',
  ]

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Animate story items
    const storyItems = sectionRef.current?.querySelectorAll('.story-item')
    storyItems?.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        animation: gsap.fromTo(item,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: index * 0.1 }
        ),
        toggleActions: "play none none reverse"
      })
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === titleRef.current ||
          trigger.vars.trigger === sectionRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Function to format paragraph text with styled quote
  const formatParagraph = (text) => {
    // Match the quote pattern: "I found him whom my soul loveth" – Song of Solomon 3:4
    const quotePattern = /("I found him whom my soul loveth" – Song of Solomon 3:4)/
    const parts = text.split(quotePattern)
    
    return parts.map((part, i) => {
      if (quotePattern.test(part)) {
        return (
          <span key={i} className="font-bold italic">
            {part}
          </span>
        )
      }
      return part
    })
  }

  // Polaroid component
  const Polaroid = ({ image, rotation = 0, index, size = 'normal' }) => {
    const maxWidth = size === 'small' ? '150px' : '200px'
    return (
    <div 
      className="bg-white shadow-lg relative"
      style={{
        border: '4px solid white',
        borderBottom: '12px solid white',
        transform: `rotate(${rotation}deg)`,
        maxWidth: maxWidth,
        width: '100%',
        padding: '2px 2px 8px 2px'
      }}
    >
      <div className="relative">
        <img 
          src={image}
          alt={`Love story moment ${index + 1}`}
          className="w-full aspect-square object-cover"
          style={{
            border: '2px solid #f5f5f0',
            borderBottom: 'none',
            display: 'block'
          }}
        />
        {/* Stamp overlay */}
        <img 
          src="/assets/images/graphics/stamp.png"
          alt="Stamp"
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            top: '-8%',
            width: '20%',
            height: 'auto',
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
    )
  }

  return (
    <div ref={sectionRef} className="relative pb-8 sm:pb-12 md:pb-16">
      <div className="text-center mb-12 sm:mb-16">
        {/* Heart Image */}
        <div className="flex justify-center mb-4">
          <img 
            src="/assets/images/graphics/heart.png" 
            alt="Heart decoration" 
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
          />
        </div>
        <h3 ref={titleRef} className="relative inline-block px-6 py-3">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize"
            style={{ color: themeConfig.text.burntOrange }}
          >
            {loveStory.title}
          </span>
        </h3>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative">
          {/* Story content */}
          <div className="relative z-10 space-y-16 sm:space-y-20 md:space-y-24">
            {paragraphs.map((paragraph, index) => {
              const isEven = index % 2 === 0
              // Calculate image indices: even = 1 photo, odd = 2 photos
              // Pattern: index 0 (1 photo), index 1 (2 photos), index 2 (1 photo), index 3 (2 photos)...
              // Calculate starting image index based on previous items
              let startImageIndex
              if (index === 0) {
                startImageIndex = 0
              } else {
                // Count images used before this index
                // index 0 uses 1, index 1 uses 2, index 2 uses 1, index 3 uses 2...
                const pairs = Math.floor(index / 2)
                const imagesBefore = pairs * 3 + (index % 2 === 0 ? 0 : 1)
                startImageIndex = imagesBefore
              }
              
              const singleImageIndex = isEven ? startImageIndex : null
              const imageIndex1 = isEven ? null : startImageIndex
              const imageIndex2 = isEven ? null : startImageIndex + 1
              const isLast = index === paragraphs.length - 1

              return (
                <div key={index} className="story-item relative">
                  {/* Curved connecting line and dot */}
                  {!isLast && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none" style={{ 
                      bottom: '-4rem',
                      width: '120px',
                      height: '8rem',
                      zIndex: 0
                    }}>
                      {/* Curved SVG line - S shape */}
                      <svg 
                        width="120" 
                        height="100%" 
                        viewBox="0 0 120 100" 
                        preserveAspectRatio="none"
                        className="absolute inset-0"
                        style={{ overflow: 'visible' }}
                      >
                        <path
                          d="M 60 0 Q 40 25, 60 50 T 60 100"
                          stroke={themeConfig.text.burntOrange}
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4,4"
                          opacity="0.4"
                        />
                      </svg>
                      {/* Dot at bottom center */}
                      <div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: themeConfig.text.burntOrange,
                          opacity: 0.5
                        }}
                      />
                    </div>
                  )}

                  {isEven ? (
                    // Even rows (index 0, 2, 4...): 1 polaroid, then paragraph
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                      <div className="flex justify-center flex-1 order-1 sm:order-1">
                        {polaroidImages[singleImageIndex] && (
                          <Polaroid 
                            image={polaroidImages[singleImageIndex]} 
                            rotation={3}
                            index={singleImageIndex}
                            size="small"
                          />
                        )}
                      </div>
                      <div className="flex-1 text-center sm:text-left order-2 sm:order-2">
                        <p className="text-base sm:text-lg font-albert font-thin text-[#333333] leading-relaxed">
                          {formatParagraph(paragraph)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Odd rows (index 1, 3, 5...): 2 polaroids, then paragraph
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                      <div className="flex gap-4 sm:gap-6 justify-center flex-1">
                        {polaroidImages[imageIndex1] && (
                          <Polaroid 
                            image={polaroidImages[imageIndex1]} 
                            rotation={-5}
                            index={imageIndex1}
                          />
                        )}
                        {polaroidImages[imageIndex2] && (
                          <Polaroid 
                            image={polaroidImages[imageIndex2]} 
                            rotation={5}
                            index={imageIndex2}
                          />
                        )}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-base sm:text-lg font-albert font-thin text-[#333333] leading-relaxed">
                          {formatParagraph(paragraph)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoveStory
