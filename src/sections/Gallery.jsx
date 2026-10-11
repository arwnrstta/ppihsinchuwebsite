import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GalleryGrid from '../components/GalleryGrid.jsx'
import Icon from '../components/Icon.jsx'
import Lightbox from '../components/Lightbox.jsx'
import PlaceholderBadge from '../components/PlaceholderBadge.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Tabs from '../components/Tabs.jsx'
import { events } from '../data/events.js'
import { albums } from '../data/gallery.js'
import { useLocalize } from '../utils/localize.js'
import './Gallery.css'

/*
 * PHOTO GALLERY
 * -------------
 * A wall of photos built from the albums in src/data/gallery.js.
 *
 *   - The buttons at the top filter the wall to one album.
 *   - Clicking a photo opens the full-screen Lightbox viewer.
 *   - If the chosen album has an "eventId", a button links back to that
 *     event. (The event's "View photos" button links here the same way.)
 *
 * Which album is selected is stored in App.jsx, so an event can jump
 * straight to its album.
 */
export default function Gallery({ selectedAlbumId, onSelectAlbum, onOpenEvent }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  // Position of the photo open in the lightbox, or null when it is closed.
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const albumTabs = [
    { id: 'all', label: t('gallery.allPhotos') },
    ...albums.map((album) => ({
      id: album.id,
      label: `${localizeText(album.title)} · ${album.year}`,
    })),
  ]

  const selectedAlbum = albums.find((album) => album.id === selectedAlbumId)
  const visibleAlbums = selectedAlbum ? [selectedAlbum] : albums

  /*
   * One flat list of photos. Each photo's texts are put into the visitor's
   * language here, so GalleryGrid and Lightbox can simply display them.
   */
  const visiblePhotos = visibleAlbums.flatMap((album) =>
    album.photos.map((photo) => ({
      src: photo.src,
      alt: localizeText(photo.alt),
      caption: localizeText(photo.caption),
      albumTitle: localizeText(album.title),
    })),
  )

  const linkedEvent = selectedAlbum
    ? events.find((event) => event.id === selectedAlbum.eventId)
    : null
  const hasSamplePhotos = visibleAlbums.some((album) => album.isSample)
  const albumDescription = selectedAlbum ? localizeText(selectedAlbum.description) : ''

  function selectAlbum(albumId) {
    setLightboxIndex(null)
    onSelectAlbum(albumId)
  }

  return (
    <section
      id="gallery"
      className="section section--dark on-dark gallery"
      aria-labelledby="gallery-title"
    >
      <div className="container">
        <SectionHeading
          number="04"
          label={t('gallery.label')}
          title={t('gallery.title')}
          description={t('gallery.description')}
          headingId="gallery-title"
        />

        <Reveal className="gallery__toolbar">
          <Tabs
            tabs={albumTabs}
            activeId={selectedAlbum ? selectedAlbum.id : 'all'}
            onChange={selectAlbum}
            label={t('gallery.filterLabel')}
            idPrefix="gallery"
            mobileSelect
          />
          {hasSamplePhotos && (
            <PlaceholderBadge>{t('gallery.placeholderPhotos')}</PlaceholderBadge>
          )}
        </Reveal>

        <div
          // "key" replays the fade animation whenever the album changes.
          key={selectedAlbum ? selectedAlbum.id : 'all'}
          role="tabpanel"
          id="gallery-panel"
          aria-labelledby={`gallery-tab-${selectedAlbum ? selectedAlbum.id : 'all'}`}
          className="fade-up"
        >
          {selectedAlbum && (
            <div className="gallery__album">
              <div>
                <h3 className="gallery__album-title">{localizeText(selectedAlbum.title)}</h3>
                <p className="gallery__album-description">
                  {selectedAlbum.year}
                  {albumDescription && ` · ${albumDescription}`}
                </p>
              </div>
              {linkedEvent && (
                <button
                  type="button"
                  className="button button--outline"
                  onClick={() => onOpenEvent(linkedEvent.id)}
                >
                  <Icon name="calendar" size={18} />
                  {t('gallery.viewEvent', { title: localizeText(linkedEvent.title) })}
                </button>
              )}
            </div>
          )}

          {visiblePhotos.length > 0 ? (
            <GalleryGrid photos={visiblePhotos} onOpenPhoto={setLightboxIndex} />
          ) : (
            <p className="gallery__empty">{t('gallery.empty')}</p>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={visiblePhotos}
          index={lightboxIndex}
          onChangeIndex={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
