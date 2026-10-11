import { useTranslation } from 'react-i18next'
import { assetPath } from '../utils/assetPath.js'
import './GalleryGrid.css'

/*
 * GALLERY GRID
 * ------------
 * A "masonry" wall of photos: columns of equal width where every photo
 * keeps its own shape, so landscape and portrait pictures mix naturally.
 *
 * Props:
 *   photos      - list of { src, alt, caption, albumTitle }. The texts have
 *                 already been put into the visitor's language by Gallery.jsx.
 *   onOpenPhoto - called with the photo's position in the list when clicked
 *
 * Photos load lazily: the browser only downloads a picture when the
 * visitor scrolls near it.
 */
export default function GalleryGrid({ photos, onOpenPhoto }) {
  const { t } = useTranslation()

  return (
    <ul className="gallery-grid">
      {photos.map((photo, index) => (
        <li key={photo.src} className="gallery-grid__item">
          <button
            type="button"
            className="gallery-grid__button"
            onClick={() => onOpenPhoto(index)}
            aria-label={t('gallery.openPhoto', { description: photo.alt })}
          >
            <img src={assetPath(photo.src)} alt={photo.alt} loading="lazy" />
            <span className="gallery-grid__caption">
              {photo.caption && <strong>{photo.caption}</strong>}
              <span>{photo.albumTitle}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
