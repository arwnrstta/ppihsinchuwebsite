import { useTranslation } from 'react-i18next'
import { useLocalize } from '../utils/localize.js'
import { ResourceActions, ResourceFacts } from './ResourceDetails.jsx'
import VerificationBadge from './VerificationBadge.jsx'

/*
 * RESOURCE LISTING
 * ----------------
 * One place (restaurant, shop, service, hospital...) drawn as a compact row
 * inside an expandable section (ResourceSection.jsx).
 *
 * Props:
 *   listing - one place from src/utils/resourceHelpers.js (links checked)
 *
 * Order: logo, name and labels, description, address/phone, buttons.
 * Every part is optional: a place with only a name and a map link shows
 * exactly that. The row itself is never a link; each button is.
 * Styles: ResourceSection.css
 */
export default function ResourceListing({ listing }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const description = localizeText(listing.description)
  const labels = listing.labels.map((label) => localizeText(label)).filter(Boolean)

  return (
    <li className={`resource-listing ${listing.sponsored ? 'resource-listing--sponsored' : ''}`}>
      {listing.image && (
        <div className="resource-listing__logo">
          <img src={listing.image} alt={localizeText(listing.imageAlt)} loading="lazy" />
        </div>
      )}

      <div className="resource-listing__body">
        <div className="resource-listing__heading">
          <h5 className="resource-listing__name">{localizeText(listing.name)}</h5>
          {listing.sponsored && (
            <span className="chip resource-listing__sponsored">{t('resources.sponsored')}</span>
          )}
          {listing.featured === true && (
            <span className="chip chip--red">{t('resources.recommended')}</span>
          )}
          {labels.map((label) => (
            <span key={label} className="chip">
              {label}
            </span>
          ))}
          <VerificationBadge show={listing.needsVerification} />
        </div>

        {description && <p className="resource-listing__description">{description}</p>}
        <ResourceFacts resource={listing} />
        <ResourceActions resource={listing} />
      </div>
    </li>
  )
}
