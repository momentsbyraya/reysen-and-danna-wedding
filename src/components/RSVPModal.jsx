import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { RSVP_MODAL_BG_IMAGE } from '../constants/shareMetadata'

const RSVP_FORM_EMBED_SRC =
  'https://docs.google.com/forms/d/e/1FAIpQLSc6SKj6zB3H-oukZgiKxpeHVVHJCItUxyVWqGEOe6Dm0FSySw/viewform?embedded=true'

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
      className="fixed inset-0 z-50 flex h-[100dvh] w-full max-w-none flex-col overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-modal-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${RSVP_MODAL_BG_IMAGE})` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-white/80 backdrop-blur-[3px]"
        aria-hidden
      />

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
        className="rsvp-modal-content relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 pt-2 sm:px-4 sm:pb-4"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <iframe
          title="RSVP — The Wedding of Dennis & Marvilyn"
          src={RSVP_FORM_EMBED_SRC}
          className="min-h-0 w-full flex-1 rounded-none border-0 bg-white"
          loading="lazy"
        />
        <p className="mt-2 flex-shrink-0 text-center text-xs text-gray-600 font-albert">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc6SKj6zB3H-oukZgiKxpeHVVHJCItUxyVWqGEOe6Dm0FSySw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-800"
          >
            Open form in a new tab
          </a>{' '}
          if it doesn’t load here.
        </p>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal
