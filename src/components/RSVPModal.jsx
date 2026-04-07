import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { weddingConfig } from '../config/weddingConfig'

const { website: rsvpFormUrl, embedUrl } = weddingConfig.rsvp

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
        className="rsvp-modal-content relative z-10 flex min-h-0 flex-1 flex-col overflow-auto"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        {embedUrl ? (
          <iframe
            title="RSVP — Google Form"
            src={embedUrl}
            className="block min-h-[min(70dvh,560px)] w-full flex-1 border-0 bg-white"
          />
        ) : (
          <p className="px-4 py-8 text-center font-albert text-lg text-[#333333]">
            RSVP form link is not configured.
          </p>
        )}
        {rsvpFormUrl && (
          <p className="flex-shrink-0 px-4 py-3 text-center font-albert text-sm text-[#5a7390]">
            <a
              href={rsvpFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#6685A4]/60 underline-offset-2 transition-colors hover:text-[#6685A4]"
            >
              Open RSVP form in a new tab
            </a>
          </p>
        )}
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal
