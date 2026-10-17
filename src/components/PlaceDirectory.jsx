import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { resourceTypes } from '../data/resources.js'
import { regions } from '../data/universities.js'
import { useLocalize } from '../utils/localize.js'
import {
  campusTagText,
  getLocationGroups,
  matchesDirectoryFilters,
} from '../utils/resourceHelpers.js'
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
 * A section with "filters" (see the Indonesian Food & Groceries section in
 * src/data/resources.js) also gets a small filter bar: business type as
 * tabs and location as a dropdown (Hsinchu City, Hsinchu County, Other
 * Areas). Sponsored places follow the same filters.
 *
 * Cards show a campus tag such as "Near NTHU / NYCU" only for the schools
 * listed in the place's nearbyUniversities; sponsorship never changes it.
 *
 * Props:
 *   section       - a section from src/utils/resourceHelpers.js whose
 *                   places use the 'place' layout
 *   categoryTitle - shown as an extra label in search results (optional)
 *   isSearch      - true in search results: shows every match at once
 *
 * The places come from files such as src/data/foodAndGroceries.js. Every field
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

const noFilters = { typeId: 'all', locationId: 'all' }

/*
 * Name, business type, campus tag, location and labels: the same on free
 * and featured cards.
 */
function PlaceHeading({ place, children }) {
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()
  const typeLabels = place.businessTypes
    .map((typeId) => localizeText(resourceTypes[typeId]?.itemLabel ?? resourceTypes[typeId]?.label))
    .filter(Boolean)
  const labels = place.labels.map((label) => localizeText(label)).filter(Boolean)
  const campuses = campusTagText(place, i18n.language)
  // The short area when there is one; otherwise the full address.
  const location = localizeText(place.area) || localizeText(place.address)
  const regionName = localizeText(regions.find((region) => region.id === place.region)?.name)

  return (
    <>
      {(typeLabels.length > 0 || labels.length > 0 || campuses || place.featured === true || children) && (
        <div className="place-card__labels">
          {children}
          {place.featured === true && (
            <span className="chip chip--red">{t('resources.recommended')}</span>
          )}
          {typeLabels.map((label) => (
            <span key={label} className="chip place-card__type">
              {label}
            </span>
          ))}
          {campuses && (
            <span className="chip place-card__campus">
              <Icon name="university" size={14} />
              {t('resources.directory.nearCampus', { campuses })}
            </span>
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
      {(location || regionName) && (
        <p className="place-card__location" title={localizeText(place.address) || undefined}>
          <Icon name="mapPin" size={16} />
          <span>
            {[location, regionName && !location.includes(regionName) ? regionName : '']
              .filter(Boolean)
              .join(' · ')}
          </span>
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

/* The filter bar: business type as tabs, location as one dropdown. */
function DirectoryFilters({ filters, value, onChange, onClear, resultCount, totalCount }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const locationFieldId = useId()
  const isFiltered = value.typeId !== 'all' || value.locationId !== 'all'

  return (
    <div className="directory-filters" role="group" aria-label={t('resources.directory.filtersLabel')}>
      <div className="directory-filters__row">
        {filters.businessTypes.length > 0 && (
          <div
            className="directory-filters__types"
            role="group"
            aria-label={t('resources.directory.businessType')}
          >
            {['all', ...filters.businessTypes].map((typeId) => (
              <button
                key={typeId}
                type="button"
                // Same pill buttons as the category type filter (Resources.css).
                className={`resources__type ${value.typeId === typeId ? 'is-active' : ''}`}
                aria-pressed={value.typeId === typeId}
                onClick={() => onChange({ ...value, typeId })}
              >
                {typeId === 'all'
                  ? t('resources.allTypes')
                  : localizeText(resourceTypes[typeId].label)}
              </button>
            ))}
          </div>
        )}

        {filters.location && (
          <div className="directory-filters__field">
            <label htmlFor={locationFieldId} className="visually-hidden">
              {t('resources.directory.location')}
            </label>
            <span className="directory-filters__icon" aria-hidden="true">
              <Icon name="mapPin" size={18} />
            </span>
            <select
              id={locationFieldId}
              className="select"
              value={value.locationId}
              onChange={(event) => onChange({ ...value, locationId: event.target.value })}
            >
              <option value="all">{t('resources.directory.allAreas')}</option>
              {getLocationGroups().map((group) => (
                <option key={group.id} value={group.id}>
                  {localizeText(group.name)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {isFiltered && (
        <div className="directory-filters__status" aria-live="polite">
          <span>{t('resources.directory.resultCount', { count: resultCount, total: totalCount })}</span>
          <button type="button" className="text-link directory-filters__clear" onClick={onClear}>
            <Icon name="close" size={16} />
            {t('resources.directory.clearFilters')}
          </button>
        </div>
      )}
    </div>
  )
}

export default function PlaceDirectory({ section, categoryTitle, isSearch = false }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const headingId = useId()
  const featuredHeadingId = useId()
  const [showAll, setShowAll] = useState(false)
  const [filterValue, setFilterValue] = useState(noFilters)

  // Filters are not shown in search results, which already narrow the list.
  const filters = isSearch ? null : section.filters
  const activeFilters = filters ? filterValue : noFilters
  const applyFilters = (places) =>
    places.filter((place) => matchesDirectoryFilters(place, activeFilters))
  const listings = applyFilters(section.listings)
  const sponsored = applyFilters(section.sponsored)

  const description = localizeText(section.description)
  const count = section.listings.length + section.sponsored.length
  const visibleListings = isSearch || showAll ? listings : listings.slice(0, initialCount)
  const isEmpty = listings.length + sponsored.length === 0

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

      {filters && (
        <DirectoryFilters
          filters={filters}
          value={filterValue}
          onChange={(next) => {
            setFilterValue(next)
            setShowAll(false)
          }}
          onClear={() => setFilterValue(noFilters)}
          resultCount={listings.length + sponsored.length}
          totalCount={count}
        />
      )}

      {sponsored.length > 0 && (
        <div className="place-directory__featured" role="group" aria-labelledby={featuredHeadingId}>
          <div className="place-directory__featured-heading">
            <p id={featuredHeadingId} className="place-directory__featured-title">
              {t('resources.sponsoredTitle')}
            </p>
            <p className="place-directory__featured-note">{t('resources.sponsoredNote')}</p>
          </div>
          <div className="place-directory__featured-list">
            {sponsored.map((place) => (
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

      {isEmpty && (
        <div className="place-directory__empty" role="status">
          <span className="place-directory__empty-icon">
            <Icon name="search" size={22} />
          </span>
          <div>
            <p className="place-directory__empty-title">{t('resources.directory.emptyTitle')}</p>
            <p className="place-directory__empty-text">
              {t('resources.directory.emptyText')}{' '}
              <a href="#connect" className="text-link place-directory__suggest">
                {t('resources.directory.suggestPlace')}
              </a>
            </p>
          </div>
          <button
            type="button"
            className="button button--outline place-directory__empty-clear"
            onClick={() => setFilterValue(noFilters)}
          >
            {t('resources.directory.clearFilters')}
          </button>
        </div>
      )}

      {!isSearch && listings.length > initialCount && (
        <button
          type="button"
          className="text-link place-directory__more"
          aria-expanded={showAll}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? t('resources.showFewer')
            : t('resources.showAllPlaces', { count: listings.length })}
          <Icon name="chevronDown" size={18} />
        </button>
      )}
    </section>
  )
}
