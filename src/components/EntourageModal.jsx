import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { themeConfig } from '../config/themeConfig'
import Entourage from './pages/Entourage'

/**
 * Full entourage list in a fullscreen overlay (same content as the former /entourage page).
 */
const EntourageModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined

    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className={`entourage-modal-scroll fixed inset-0 z-[65] overflow-y-auto overflow-x-hidden ${themeConfig.paragraph.background}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding entourage"
    >
      <Entourage embedded onClose={onClose} />
    </div>,
    document.body
  )
}

export default EntourageModal
