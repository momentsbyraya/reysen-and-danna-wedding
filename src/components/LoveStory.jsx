import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { loveStory } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  // Gallery images for Our Moments
  const polaroidImages = [
    '/assets/images/prenup/DSC6186.jpg',
    '/assets/images/prenup/DSC6203.jpg',
    '/assets/images/prenup/DSC6233.jpg',
    '/assets/images/prenup/DSC6243.jpg',
    '/assets/images/prenup/DSC6279.jpg',
    '/assets/images/prenup/DSC6290.jpg',
    '/assets/images/prenup/DSC6335.jpg',
    '/assets/images/prenup/DSC6361.jpg',
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

  // Handle image click to open modal
  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  // Modal navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % polaroidImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + polaroidImages.length) % polaroidImages.length)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + polaroidImages.length) % polaroidImages.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % polaroidImages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, polaroidImages.length])

  // Modal animations
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      if (overlayRef.current && contentRef.current) {
        gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
        gsap.set(contentRef.current, { scale: 0.9 })

        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isModalOpen])

  // Gallery item component
  const Polaroid = ({ image, index, altLabel }) => {
    const alt = altLabel || `Gallery image ${index + 1}`
    return (
      <button
        type="button"
        className="relative w-full overflow-hidden rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        onClick={() => handleImageClick(index)}
        aria-label={`Open gallery image ${index + 1}`}
      >
        <div className="w-full aspect-square flex items-center justify-center bg-[#94AFC3] text-[#333333]">
          <span className="font-albert text-sm sm:text-base">TO BE ADDED</span>
        </div>
      </button>
    )
  }

  return (
    <div ref={sectionRef} className="relative pb-8 sm:pb-12 md:pb-16">
      <div className="text-center mb-12 sm:mb-16">
        {/* Heart Placeholder */}
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

        {/* Thread design divider */}
        <div className="relative w-full flex justify-center mt-6 mb-8 sm:mt-8 sm:mb-10">
          <svg
            className="w-full max-w-md h-12 sm:h-14 md:h-16 px-8"
            viewBox="0 0 400 60"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0,30 Q100,10 200,30 T400,30"
              fill="none"
              stroke={themeConfig.text.burntOrange}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M0,35 Q100,15 200,35 T400,35"
              fill="none"
              stroke={themeConfig.text.sageGreen}
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="4 6"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative z-10">
          <div className="story-item grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
            {polaroidImages.map((image, index) => (
              <Polaroid
                key={image}
                image={image}
                index={index}
                altLabel={`gallery-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {isModalOpen && createPortal(
        <div 
          ref={modalRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Container */}
          <div
            ref={contentRef}
            className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            <div className="w-full h-full min-h-[200px] bg-[#94AFC3] flex items-center justify-center">
              <div className="px-6 text-center">
                <div className="font-foglihten text-[#333333] text-2xl sm:text-3xl">TO BE ADDED</div>
                <div className="font-albert text-[#333333] opacity-80 text-sm mt-2">
                  Gallery image {currentImageIndex + 1} / {polaroidImages.length}
                </div>
              </div>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
            <span className="text-white text-sm font-albert">
              {currentImageIndex + 1} / {polaroidImages.length}
            </span>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default LoveStory
