import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalize } from '../utils/localize.js'
import Icon from './Icon.jsx'
import ResourceListing from './ResourceListing.jsx'
import './ResourceCard.css'
import './ResourceSection.css'

/*
 * RESOURCE SECTION
 * ----------------
 * One expandable card that holds many places, e.g. "Indonesian
 * restaurants". Closed, it shows an icon, the title, how many places it
 * holds and a short description. Open, it lists every place as a compact
 * row (ResourceListing.jsx).
 *
 * Props:
 *   section       - a section from src/utils/resourceHelpers.js
 *   categoryTitle - shown as an extra label in search results (optional)
 *   defaultOpen   - true starts the section open (used for search results)
 *
 * Active sponsored places come first, under a small "Featured Partners"
 * heading. That heading only exists while there is a sponsored place.
 *
 * The sections themselves come from items with "listings" in
 * src/data/resources.js; the places from files such as restaurants.js.
 */

/* The section icon: its "icon" field, or one that suits its listing type. */
const sectionIcons = {
  restaurant: 'utensils',
  grocery: 'basket',
  shop: 'store',
  service: 'mapPin',
  medical: 'medical',
  hospital: 'medical',
  clinic: 'medical',
  pharmacy: 'medical',
  university: 'university',
}

export default function ResourceSection({ section, categoryTitle, defaultOpen = false }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const listId = useId()
  const sponsoredHeadingId = useId()

  const description = localizeText(section.description)
  const labels = section.labels.map((label) => localizeText(label)).filter(Boolean)
  const count = section.listings.length + section.sponsored.length
  const icon = sectionIcons[section.icon] ?? sectionIcons[section.listingType] ?? 'mapPin'

  return (
    <article className={`resource-card resource-section ${isOpen ? 'is-open' : ''}`}>
      {(labels.length > 0 || categoryTitle) && (
        <div className="resource-card__labels">
          {labels.map((label) => (
            <span key={label} className="chip">
              {label}
            </span>
          ))}
          {categoryTitle && <span className="chip chip--outline">{categoryTitle}</span>}
        </div>
      )}

      <h4 className="resource-card__name">
        <button
          type="button"
          className="resource-card__button resource-section__toggle"
          aria-expanded={isOpen}
          aria-controls={listId}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="resource-section__icon">
            <Icon name={icon} size={20} />
          </span>
          <span className="resource-section__title">
            <span>{localizeText(section.name)}</span>
            <span className="resource-section__count">
              {t('resources.listingCount', { count })}
            </span>
          </span>
          <span className="resource-card__icon">
            <Icon name="chevronDown" size={18} />
          </span>
        </button>
      </h4>

      {description && <p className="resource-card__description">{description}</p>}

      <div id={listId} className={`collapse ${isOpen ? 'is-open' : ''}`} inert={!isOpen}>
        <div className="collapse__inner">
          <div className="resource-section__content">
            {section.sponsored.length > 0 && (
              <div className="resource-section__group" aria-labelledby={sponsoredHeadingId} role="group">
                <p id={sponsoredHeadingId} className="resource-section__group-title">
                  {t('resources.sponsoredTitle')}
                </p>
                <p className="resource-section__group-note">{t('resources.sponsoredNote')}</p>
                <ul className="resource-section__list">
                  {section.sponsored.map((listing) => (
                    <ResourceListing key={listing.key} listing={listing} />
                  ))}
                </ul>
              </div>
            )}

            {section.listings.length > 0 && (
              <ul className="resource-section__list">
                {section.listings.map((listing) => (
                  <ResourceListing key={listing.key} listing={listing} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
