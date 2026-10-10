import { assetPath } from '../utils/assetPath.js'
import './GalleryGrid.css'

/*
 * GALLERY GRID
 * ------------
 * A "masonry" wall of photos: columns of equal width where every photo
 * keeps its own shape, so landscape and portrait pictures mix naturally.
 *
 * Props:
 *   photos      - list of { src, alt, caption, albumTitle }
 *   onOpenPhoto - called with the photo's position in the list when clicked
 *
 * Photos load lazily: the browser only downloads a picture when the
 * visitor scrolls near it.
 */
export default function GalleryGrid({ photos, onOpenPhoto }) {
  return (
    <ul className="gallery-grid">
      {photos.map((photo, index) => (
        <li key={photo.src} className="gallery-grid__item">
          <button
            type="button"
            className="gallery-grid__button"
            onClick={() => onOpenPhoto(index)}
            aria-label={`Open photo: ${photo.alt}`}
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
