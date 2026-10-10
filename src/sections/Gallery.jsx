import { useState } from 'react'
import GalleryGrid from '../components/GalleryGrid.jsx'
import Icon from '../components/Icon.jsx'
import Lightbox from '../components/Lightbox.jsx'
import PlaceholderBadge from '../components/PlaceholderBadge.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Tabs from '../components/Tabs.jsx'
import { events } from '../data/events.js'
import { albums } from '../data/gallery.js'
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
  // Position of the photo open in the lightbox, or null when it is closed.
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const albumTabs = [
    { id: 'all', label: 'All photos' },
    ...albums.map((album) => ({
      id: album.id,
      label: `${album.title} · ${album.year}`,
    })),
  ]

  const selectedAlbum = albums.find((album) => album.id === selectedAlbumId)
  const visibleAlbums = selectedAlbum ? [selectedAlbum] : albums

  // One flat list of photos, each remembering which album it belongs to.
  const visiblePhotos = visibleAlbums.flatMap((album) =>
    album.photos.map((photo) => ({ ...photo, albumTitle: album.title })),
  )

  const linkedEvent = selectedAlbum
    ? events.find((event) => event.id === selectedAlbum.eventId)
    : null
  const hasSamplePhotos = visibleAlbums.some((album) => album.isSample)

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
          label="Photo gallery"
          title="The moments in between."
          description="A collection of the faces, places, and little memories that make this community ours."
          headingId="gallery-title"
        />

        <Reveal className="gallery__toolbar">
          <Tabs
            tabs={albumTabs}
            activeId={selectedAlbum ? selectedAlbum.id : 'all'}
            onChange={selectAlbum}
            label="Filter photos by album"
            idPrefix="gallery"
            mobileSelect
          />
          {hasSamplePhotos && <PlaceholderBadge>Placeholder stock photos</PlaceholderBadge>}
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
                <h3 className="gallery__album-title">{selectedAlbum.title}</h3>
                <p className="gallery__album-description">
                  {selectedAlbum.year}
                  {selectedAlbum.description && ` · ${selectedAlbum.description}`}
                </p>
              </div>
              {linkedEvent && (
                <button
                  type="button"
                  className="button button--outline"
                  onClick={() => onOpenEvent(linkedEvent.id)}
                >
                  <Icon name="calendar" size={18} />
                  View event: {linkedEvent.title}
                </button>
              )}
            </div>
          )}

          {visiblePhotos.length > 0 ? (
            <GalleryGrid photos={visiblePhotos} onOpenPhoto={setLightboxIndex} />
          ) : (
            <p className="gallery__empty">Photos will be added here soon.</p>
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
