import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalize } from '../utils/localize.js'
import Icon from './Icon.jsx'
import Lightbox from './Lightbox.jsx'
import { ResourceActions } from './ResourceDetails.jsx'
import VerificationBadge from './VerificationBadge.jsx'
import './PlaceDirectory.css'

/*
 * PLACE DIRECTORY
 * ---------------
 * A section of places people visit (restaurants, grocery stores, shops),
 * drawn as an always-open directory instead of a fold-out list:
 *
 *   Featured Partners - active sponsored places (src/data/localBusinesses.js),
 *                       as wider cards with optional logo, photo gallery,
 *                       longer description and promotion. Hidden entirely
 *                       when there is no active sponsor.
 *   Directory grid    - every other place as a compact photo card.
 *
 * Props:
 *   section       - a section from src/utils/resourceHelpers.js whose
 *                   places use the 'place' layout
 *   categoryTitle - shown as an extra label in search results (optional)
 *   isSearch      - true in search results: shows every match at once
 *
 * The places come from files such as src/data/restaurants.js. Every field
 * is optional except the name; a place without a photo gets a neutral
 * drawn placeholder, never a stock photo.
 */

// How many places are shown before the "Show all" button.
const initialCount = 6

/* Section and placeholder icon for each kind of place. */
const placeIcons = {
  restaurant: 'utensils',
  grocery: 'basket',
  shop: 'store',
}

const placeIconOf = (typeId) => placeIcons[typeId] ?? 'mapPin'

/*
 * The main photo, or a drawn placeholder when there is none. A photo that
 * fails to load is replaced by the placeholder too, so a broken image icon
 * never appears.
 */
function PlacePhoto({ src, alt, icon, onOpen, openLabel }) {
  const [failedSrc, setFailedSrc] = useState('')

  if (!src || failedSrc === src) {
    return (
      <div className="place-photo place-photo--empty" aria-hidden="true">
        <span className="place-photo__icon">
          <Icon name={icon} size={28} />
        </span>
      </div>
    )
  }

  const image = <img src={src} alt={alt} loading="lazy" onError={() => setFailedSrc(src)} />

  return onOpen ? (
    <button type="button" className="place-photo place-photo--button" onClick={onOpen} aria-label={openLabel}>
      {image}
    </button>
  ) : (
    <div className="place-photo">{image}</div>
  )
}

/* Name, short location and labels: the same on free and featured cards. */
function PlaceHeading({ place, children }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const labels = place.labels.map((label) => localizeText(label)).filter(Boolean)
  // The short area when there is one; otherwise the full address.
  const location = localizeText(place.area) || localizeText(place.address)

  return (
    <>
      {(labels.length > 0 || place.featured === true || children) && (
        <div className="place-card__labels">
          {children}
          {place.featured === true && (
            <span className="chip chip--red">{t('resources.recommended')}</span>
          )}
          {labels.map((label) => (
            <span key={label} className="chip">
              {label}
            </span>
          ))}
          <VerificationBadge show={place.needsVerification} />
        </div>
      )}
      <h5 className="place-card__name">{localizeText(place.name)}</h5>
      {location && (
        <p className="place-card__location" title={localizeText(place.address) || undefined}>
          <Icon name="mapPin" size={16} />
          <span>{location}</span>
        </p>
      )}
    </>
  )
}

/* A free community listing: one photo, the essentials and its buttons. */
function PlaceCard({ place }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const name = localizeText(place.name)
  const description = localizeText(place.description)

  return (
    <article className="place-card">
      <PlacePhoto
        key={place.image}
        src={place.image}
        alt={localizeText(place.imageAlt) || t('resources.photoOf', { name })}
        icon={placeIconOf(place.type)}
      />
      <div className="place-card__body">
        <PlaceHeading place={place} />
        {description && <p className="place-card__description">{description}</p>}
        <ResourceActions resource={place} />
      </div>
    </article>
  )
}

/*
 * A sponsored place: wider, with optional logo, gallery and promotion.
 * Labelled "Sponsored"; it is never shown as a quality recommendation.
 */
function FeaturedPlaceCard({ place }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const [photoIndex, setPhotoIndex] = useState(null)
  const name = localizeText(place.name)
  const description = localizeText(place.description)
  const promotion = localizeText(place.promotion)

  // Main photo first, then the gallery, all viewable full screen.
  const photos = [
    ...(place.imageSource ? [{ src: place.imageSource, alt: localizeText(place.imageAlt) }] : []),
    ...place.gallery.map((photo) => ({ src: photo.src, alt: localizeText(photo.alt) })),
  ].map((photo, index) => ({
    ...photo,
    alt: photo.alt || t('resources.photoNumber', { name, number: index + 1 }),
    caption: name,
  }))
  const galleryOffset = place.imageSource ? 1 : 0
  const thumbnails = place.gallery.slice(0, 4)
  const hiddenCount = place.gallery.length - thumbnails.length

  return (
    <article className="featured-place">
      <div className="featured-place__media">
        <PlacePhoto
          key={place.image}
          src={place.image}
          alt={photos[0]?.alt ?? ''}
          icon={placeIconOf(place.type)}
          onOpen={photos.length > 1 ? () => setPhotoIndex(0) : undefined}
          openLabel={t('resources.openPhotos', { name })}
        />
        {thumbnails.length > 0 && (
          <ul className="featured-place__thumbs">
            {thumbnails.map((photo, index) => (
              <li key={photo.src}>
                <button
                  type="button"
                  onClick={() => setPhotoIndex(galleryOffset + index)}
                  aria-label={t('resources.photoNumber', { name, number: galleryOffset + index + 1 })}
                >
                  <img src={photo.url} alt="" loading="lazy" />
                  {index === thumbnails.length - 1 && hiddenCount > 0 && (
                    <span className="featured-place__more" aria-hidden="true">
                      +{hiddenCount}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="featured-place__body">
        <div className="featured-place__top">
          {place.logo && (
            <img
              className="featured-place__logo"
              src={place.logo}
              alt={t('resources.logoOf', { name })}
              loading="lazy"
            />
          )}
          <div className="featured-place__title">
            <PlaceHeading place={place}>
              <span className="chip place-card__sponsored">{t('resources.sponsored')}</span>
            </PlaceHeading>
          </div>
        </div>
        {description && <p className="featured-place__description">{description}</p>}
        {promotion && (
          <p className="featured-place__promotion">
            <Icon name="ticket" size={18} />
            <span>
              <span className="visually-hidden">{t('resources.promotion')}: </span>
              {promotion}
            </span>
          </p>
        )}
        <ResourceActions resource={place} />
      </div>

      {photoIndex !== null && (
        <Lightbox
          photos={photos}
          index={photoIndex}
          onChangeIndex={setPhotoIndex}
          onClose={() => setPhotoIndex(null)}
        />
      )}
    </article>
  )
}

export default function PlaceDirectory({ section, categoryTitle, isSearch = false }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const headingId = useId()
  const featuredHeadingId = useId()
  const [showAll, setShowAll] = useState(false)

  const description = localizeText(section.description)
  const count = section.listings.length + section.sponsored.length
  const visibleListings =
    isSearch || showAll ? section.listings : section.listings.slice(0, initialCount)

  return (
    <section className="place-directory" aria-labelledby={headingId}>
      <header className="place-directory__header">
        <span className="place-directory__icon">
          <Icon name={placeIconOf(section.listingType)} size={22} />
        </span>
        <div className="place-directory__heading">
          <h4 id={headingId} className="place-directory__title">
            {localizeText(section.name)}
          </h4>
          {description && <p className="place-directory__description">{description}</p>}
        </div>
        <div className="place-directory__meta">
          {categoryTitle && <span className="chip chip--outline">{categoryTitle}</span>}
          <span className="place-directory__count">{t('resources.listingCount', { count })}</span>
        </div>
      </header>

      {section.sponsored.length > 0 && (
        <div className="place-directory__featured" role="group" aria-labelledby={featuredHeadingId}>
          <div className="place-directory__featured-heading">
            <p id={featuredHeadingId} className="place-directory__featured-title">
              {t('resources.sponsoredTitle')}
            </p>
            <p className="place-directory__featured-note">{t('resources.sponsoredNote')}</p>
          </div>
          <div className="place-directory__featured-list">
            {section.sponsored.map((place) => (
              <FeaturedPlaceCard key={place.key} place={place} />
            ))}
          </div>
        </div>
      )}

      {visibleListings.length > 0 && (
        <ul className="place-directory__grid">
          {visibleListings.map((place) => (
            <li key={place.key}>
              <PlaceCard place={place} />
            </li>
          ))}
        </ul>
      )}

      {!isSearch && section.listings.length > initialCount && (
        <button
          type="button"
          className="text-link place-directory__more"
          aria-expanded={showAll}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? t('resources.showFewer')
            : t('resources.showAllPlaces', { count: section.listings.length })}
          <Icon name="chevronDown" size={18} />
        </button>
      )}
    </section>
  )
}
