import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { prenupImages } from '../data'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const galleryImages = prenupImages.gallery
  const galleryThumbObjectPosition = prenupImages.galleryThumbObjectPosition ?? []

  useEffect(() => {
    if (titleRef.current) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse',
      })
    }

    if (gridRef.current) {
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          gridRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse',
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const el = trigger.vars?.trigger
        if (el && sectionRef.current?.contains(el)) trigger.kill()
      })
    }
  }, [])

  useEffect(() => {
    if (!selectedImage) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [selectedImage])

  const openImage = (src, index) => {
    setSelectedImage(src)
    setSelectedImageIndex(index)
  }

  const closeImage = () => {
    setSelectedImage(null)
    setSelectedImageIndex(null)
  }

  const showPrevious = () => {
    if (selectedImageIndex === null || selectedImageIndex <= 0) return
    const next = selectedImageIndex - 1
    setSelectedImage(galleryImages[next])
    setSelectedImageIndex(next)
  }

  const showNext = () => {
    if (selectedImageIndex === null || selectedImageIndex >= galleryImages.length - 1) return
    const next = selectedImageIndex + 1
    setSelectedImage(galleryImages[next])
    setSelectedImageIndex(next)
  }

  return (
    <section ref={sectionRef} className="relative z-20 mt-6 sm:mt-8 md:mt-10 pb-8 sm:pb-12 md:pb-16">
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8">
        <h3 ref={titleRef} className="relative mb-8 inline-block w-full px-6 py-3 text-center sm:mb-10">
          <span className="font-foglihten inline-block text-3xl leading-none capitalize text-[#6685A4] sm:text-4xl md:text-5xl lg:text-6xl">
            Gallery
          </span>
        </h3>

        <div ref={gridRef} className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {galleryImages.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => openImage(src, index)}
              className="group relative aspect-square overflow-hidden rounded-lg border border-white/60 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
              aria-label={`Open gallery image ${index + 1}`}
            >
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ objectPosition: galleryThumbObjectPosition[index] || '50% 50%' }}
                loading={index < 6 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedImage &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={closeImage}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                closeImage()
              }}
              className="absolute left-4 top-4 z-10 rounded-full bg-white/15 p-2 transition-colors hover:bg-white/25"
              aria-label="Close image"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {selectedImageIndex !== null && selectedImageIndex > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  showPrevious()
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-3 transition-colors hover:bg-white/25"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </button>
            )}

            {selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  showNext()
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-3 transition-colors hover:bg-white/25"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </button>
            )}

            <img
              src={selectedImage}
              alt="Gallery full view"
              className="max-h-[90vh] max-w-[92vw] object-contain"
              style={{
                objectPosition: galleryThumbObjectPosition[selectedImageIndex] || '50% 50%',
              }}
              loading="eager"
              decoding="async"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </section>
  )
}

export default Gallery
