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
 *   - Photos appear in a random order (shuffled once per visit). Only the
 *     first 10 are shown; "See more" reveals 10 more at a time.
 *   - Clicking a photo opens the full-screen Lightbox viewer.
 *
 * Which year is selected is stored in App.jsx, so the navbar dropdown can
 * open a year.
 */
// How many photos are shown at first, and added by each "See more".
const pageSize = 10

/* Every photo path in the gallery, used to give each one a random position. */
const allGalleryPhotos = () =>
  getGalleryYears().flatMap(({ photos }) => photos.map((photo) => photo.src))

export default function Gallery({ selectedYear, onSelectYear }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  // Position of the photo open in the lightbox, or null when it is closed.
  const [lightboxIndex, setLightboxIndex] = useState(null)
  // How many photos are shown, remembered per year tab.
  const [shown, setShown] = useState({ count: pageSize, yearId: selectedYear })
  // A random number per photo, picked once per visit, to shuffle the order.
  const [randomOrder] = useState(() => new Map(allGalleryPhotos().map((src) => [src, Math.random()])))

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
  const allPhotos = visibleYears
    .flatMap(({ year, photos }) =>
      photos.map((photo) => ({
        src: photo.src,
        alt: localizeText(photo.alt),
        caption: localizeText(photo.title),
        albumTitle: String(year),
      })),
    )
    .sort((a, b) => (randomOrder.get(a.src) ?? 0) - (randomOrder.get(b.src) ?? 0))

  const activeId = selected ? String(selected.year) : 'all'
  // Choosing another year starts again from the first 10.
  const shownCount = shown.yearId === selectedYear ? shown.count : pageSize
  const visiblePhotos = allPhotos.slice(0, shownCount)
  const hiddenCount = allPhotos.length - visiblePhotos.length

  function selectYear(yearId) {
    setLightboxIndex(null)
    onSelectYear(yearId)
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

          {hiddenCount > 0 && (
            <div className="gallery__more">
              <button
                type="button"
                className="button button--outline"
                onClick={() => setShown({ count: shownCount + pageSize, yearId: selectedYear })}
              >
                {t('gallery.seeMore')}
              </button>
            </div>
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
