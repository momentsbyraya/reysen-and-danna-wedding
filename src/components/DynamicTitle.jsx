import React from 'react'
import { Helmet } from 'react-helmet-async'
import { couple } from '../data'
import { HERO_IMAGE_PATH } from '../constants/shareMetadata'

const DynamicTitle = () => {
  const weddingDate = new Date(couple.wedding.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const title = `${couple.nickname}'s Wedding - ${weddingDate}`
  const description = `Join us for ${couple.nickname}'s special day on ${weddingDate}`
  const ogImage =
    typeof globalThis !== 'undefined' && globalThis.location?.origin
      ? `${globalThis.location.origin}${HERO_IMAGE_PATH}`
      : HERO_IMAGE_PATH

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={`${couple.nickname}'s Wedding - Beautiful digital wedding invitation for ${weddingDate}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${couple.nickname}'s Wedding`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:alt" content={`${couple.nickname} — wedding invitation`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${couple.nickname}'s Wedding`} />
      <meta name="twitter:description" content={`Beautiful digital wedding invitation for ${weddingDate}`} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${couple.nickname} — wedding invitation`} />
    </Helmet>
  )
}

export default DynamicTitle 