import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { assetPath } from '../utils/assetPath.js'
import Icon from './Icon.jsx'
import Modal from './Modal.jsx'
import './Lightbox.css'

/*
 * LIGHTBOX
 * --------
 * The full-screen photo viewer that opens when a gallery photo is clicked.
 *
 * Controls:
 *   - Previous / Next buttons, or the Left / Right arrow keys
 *   - Close button, the Escape key, or a click on the dark background
 * After the last photo it loops back to the first.
 *
 * Props:
 *   photos        - the photos currently shown in the gallery
 *   index         - position of the photo to display
 *   onChangeIndex - called with the new position when moving between photos
 *   onClose       - closes the viewer
 */
export default function Lightbox({ photos, index, onChangeIndex, onClose }) {
  const { t } = useTranslation()
  const photo = photos[index]
  const hasSeveralPhotos = photos.length > 1

  // The % (remainder) maths makes the list wrap around at both ends.
  const previousIndex = (index - 1 + photos.length) % photos.length
  const nextIndex = (index + 1) % photos.length

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') onChangeIndex(previousIndex)
      if (event.key === 'ArrowRight') onChangeIndex(nextIndex)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previousIndex, nextIndex, onChangeIndex])

  return (
    <Modal onClose={onClose} label={t('gallery.lightbox.label')} variant="lightbox">
      <div className="lightbox">
        {hasSeveralPhotos && (
          <button
            type="button"
            className="lightbox__arrow"
            onClick={() => onChangeIndex(previousIndex)}
            aria-label={t('gallery.lightbox.previous')}
          >
            <Icon name="arrowLeft" size={24} />
          </button>
        )}

        {/* "key" replays the fade animation for each new photo. */}
        <figure key={photo.src} className="lightbox__figure fade-up">
          <img src={assetPath(photo.src)} alt={photo.alt} />
          <figcaption className="lightbox__caption">
            <span>
              {photo.caption && <strong>{photo.caption}</strong>}
              {photo.albumTitle}
            </span>
            {/* aria-live announces "2 / 7" style progress to screen readers. */}
            <span aria-live="polite">
              {index + 1} / {photos.length}
            </span>
          </figcaption>
        </figure>

        {hasSeveralPhotos && (
          <button
            type="button"
            className="lightbox__arrow"
            onClick={() => onChangeIndex(nextIndex)}
            aria-label={t('gallery.lightbox.next')}
          >
            <Icon name="arrowRight" size={24} />
          </button>
        )}
      </div>
    </Modal>
  )
}
