import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GalleryGrid from '../components/GalleryGrid.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Tabs from '../components/Tabs.jsx'
import { getGalleryYears } from '../utils/galleryHelpers.js'
import { useLocalize } from '../utils/localize.js'
import './Gallery.css'

/*
 * PHOTO GALLERY
 * -------------
 * A wall of photos built from the years in src/data/gallery.js.
 *
 *   - The buttons at the top filter the wall to one year (newest first).
 *   - Clicking a photo opens the full-screen Lightbox viewer.
 *
 * Which year is selected is stored in App.jsx, so the navbar dropdown can
 * open a year.
 */
export default function Gallery({ selectedYear, onSelectYear }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  // Position of the photo open in the lightbox, or null when it is closed.
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const years = getGalleryYears()
  const yearTabs = [
    { id: 'all', label: t('gallery.allPhotos') },
    ...years.map(({ year }) => ({ id: String(year), label: String(year) })),
  ]

  const selected = years.find(({ year }) => String(year) === selectedYear)
  const visibleYears = selected ? [selected] : years

  /*
   * One flat list of photos. Each photo's texts are put into the visitor's
   * language here, so GalleryGrid and Lightbox can simply display them.
   */
  const visiblePhotos = visibleYears.flatMap(({ year, photos }) =>
    photos.map((photo) => ({
      src: photo.src,
      alt: localizeText(photo.alt),
      caption: localizeText(photo.title),
      albumTitle: String(year),
    })),
  )

  function selectYear(yearId) {
    setLightboxIndex(null)
    onSelectYear(yearId)
  }

  const activeId = selected ? String(selected.year) : 'all'

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
            tabs={yearTabs}
            activeId={activeId}
            onChange={selectYear}
            label={t('gallery.filterLabel')}
            idPrefix="gallery"
            mobileSelect
          />
        </Reveal>

        <div
          // "key" replays the fade animation whenever the year changes.
          key={activeId}
          role="tabpanel"
          id="gallery-panel"
          aria-labelledby={`gallery-tab-${activeId}`}
          className="fade-up"
        >
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
