import { PRENUP_GALLERY } from '../constants/prenupImages'

const gallery = PRENUP_GALLERY.map((item) => item.src)
const galleryThumbObjectPosition = PRENUP_GALLERY.map((item) => item.objectPosition)

export const prenupImages = {
  gallery,
  galleryThumbObjectPosition,
}

export default prenupImages
