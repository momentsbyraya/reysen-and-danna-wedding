import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      gsap.set(modalRef.current, { opacity: 0 })
      gsap.to(modalRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => onClose(),
    })
  }

  if (!isOpen) return null

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex h-[100dvh] w-full max-w-none flex-col overflow-hidden bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-modal-title"
    >
      <header
        className="relative z-10 flex flex-shrink-0 items-center justify-between border-b border-[#5a7390]/80 bg-[#6685A4] px-4 py-4 sm:px-6 sm:py-5"
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <h2 id="rsvp-modal-title" className="text-2xl font-leckerli font-light text-white">
          RSVP
        </h2>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-full p-2 text-white transition-colors duration-200 hover:bg-white/20"
          aria-label="Close RSVP"
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      <div
        className="rsvp-modal-content relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center overflow-auto px-4 py-8 sm:px-6"
        style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
      >
        <p className="text-center font-albert text-xl text-[#333333] sm:text-2xl md:text-3xl">
          To be added
        </p>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal
