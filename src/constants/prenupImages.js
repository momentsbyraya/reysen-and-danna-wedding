/**
 * Prenup assets under /public/assets/images/prenup/
 * objectPosition values tune face framing for object-fit: cover crops.
 */
export const PRENUP_HERO_SRC = '/assets/images/prenup/hero.jpg'

/** Hero full-viewport crop (portrait photo in a tall viewport) */
export const HERO_IMAGE_OBJECT_POSITION = '52% 46%'

const gallery = [
  { src: '/assets/images/prenup/1.jpg', objectPosition: '53% 52%' },
  { src: '/assets/images/prenup/2.jpg', objectPosition: '57% 50%' },
  { src: '/assets/images/prenup/3.jpg', objectPosition: '50% 48%' },
  { src: '/assets/images/prenup/4.jpg', objectPosition: '50% 58%' },
  { src: '/assets/images/prenup/5.jpg', objectPosition: '48% 38%' },
  { src: '/assets/images/prenup/6.jpg', objectPosition: '52% 47%' },
  { src: '/assets/images/prenup/7.jpg', objectPosition: '35% 42%' },
  { src: '/assets/images/prenup/8.jpg', objectPosition: '50% 52%' },
  { src: '/assets/images/prenup/9.jpg', objectPosition: '50% 58%' },
  { src: '/assets/images/prenup/10.jpg', objectPosition: '68% 42%' },
  { src: '/assets/images/prenup/11.jpg', objectPosition: '53% 45%' },
  { src: '/assets/images/prenup/12.jpg', objectPosition: '50% 50%' },
  { src: '/assets/images/prenup/13.jpg', objectPosition: '50% 48%' },
  { src: '/assets/images/prenup/14.jpg', objectPosition: '45% 55%' },
]

export const PRENUP_GALLERY = gallery

export const PRENUP_GALLERY_SRCS = gallery.map((item) => item.src)

export function getPrenupObjectPosition(src) {
  const found = gallery.find((item) => item.src === src)
  return found?.objectPosition ?? '50% 50%'
}

/** Inline story photos (Moments page) — first three gallery images */
export const PRENUP_STORY_PHOTO_1 = gallery[0].src
export const PRENUP_STORY_PHOTO_2 = gallery[1].src
export const PRENUP_STORY_PHOTO_3 = gallery[2].src

/** Cover for the Moments “Our Story” video strip (same as site hero) */
export const MOMENTS_VIDEO_COVER_SRC = PRENUP_HERO_SRC

/** Full-bleed background for the Save The Date section (Home) */
export const SAVE_THE_DATE_BACKGROUND_SRC = '/assets/images/prenup/9.jpg'
