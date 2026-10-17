import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalize } from '../utils/localize.js'
import { hasActions } from '../utils/resourceHelpers.js'
import Icon from './Icon.jsx'
import { ResourceActions, ResourceFacts } from './ResourceDetails.jsx'
import VerificationBadge from './VerificationBadge.jsx'
import './ResourceCard.css'

/*
 * RESOURCE CARD
 * -------------
 * One card in the Student Resources section, for every kind of resource
 * except emergency contacts (EmergencyCard.jsx) and places inside an
 * expandable section (ResourceListing.jsx).
 *
 * Props:
 *   resource      - one card from getVisibleCategories() in
 *                   src/utils/resourceHelpers.js (links already checked)
 *   categoryTitle - shown as an extra label in search results (optional)
 *
 * Reading order: labels, name, description, details (address, phone,
 * service information), then the action buttons.
 *
 * The card adapts to its layout (see resourceTypes in src/data/resources.js):
 *   place   - photo across the top, address first, map button first
 *   service - logo beside the name, website button first
 *   medical - logo beside the name, Directions, Call and Website buttons
 *   info    - text first, with a link to the official source
 *
 * Only the fields that exist are shown: no address means no address line,
 * no map link means no map button, and so on. Numbered steps and notes are
 * folded away behind the card title and open on click.
 */

export default function ResourceCard({ resource, categoryTitle }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const [isOpen, setIsOpen] = useState(false)
  // A unique id that connects the button to the content it opens.
  const detailsId = useId()

  const name = localizeText(resource.name)
  const description = localizeText(resource.description)
  const notes = localizeText(resource.notes)
  const steps = resource.steps ?? []
  const hasFoldedDetails = steps.length > 0 || Boolean(notes)
  const hasActionButtons = hasActions(resource)
  const isPlace = resource.layout === 'place'

  const labels = resource.labels.map((label) => localizeText(label)).filter(Boolean)
  const hasLabels =
    labels.length > 0 || categoryTitle || resource.featured === true

  const classNames = [
    'resource-card',
    `resource-card--${resource.layout}`,
    // The whole card opens the details only when it has nothing else to click.
    hasFoldedDetails && !hasActionButtons && 'resource-card--stretch',
    isOpen && 'is-open',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={classNames}>
      {isPlace && resource.image && (
        <div className="resource-card__photo">
          <img src={resource.image} alt={localizeText(resource.imageAlt)} loading="lazy" />
        </div>
      )}

      {hasLabels && (
        <div className="resource-card__labels">
          {resource.featured === true && (
            <span className="chip chip--red">{t('resources.recommended')}</span>
          )}
          {labels.map((label) => (
            <span key={label} className="chip">
              {label}
            </span>
          ))}
          {categoryTitle && <span className="chip chip--outline">{categoryTitle}</span>}
          <VerificationBadge show={resource.needsVerification} />
        </div>
      )}

      <div className="resource-card__header">
        {!isPlace && resource.image && (
          <div className="resource-card__logo">
            <img src={resource.image} alt={localizeText(resource.imageAlt)} loading="lazy" />
          </div>
        )}
        <h4 className="resource-card__name">
          {hasFoldedDetails ? (
            <button
              type="button"
              className="resource-card__button"
              aria-expanded={isOpen}
              aria-controls={detailsId}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{name}</span>
              <span className="resource-card__icon">
                <Icon name="chevronDown" size={18} />
              </span>
            </button>
          ) : (
            name
          )}
        </h4>
      </div>

      {description && <p className="resource-card__description">{description}</p>}

      <ResourceFacts resource={resource} />

      {hasFoldedDetails && (
        <div
          id={detailsId}
          className={`collapse ${isOpen ? 'is-open' : ''}`}
          inert={!isOpen}
        >
          <div className="collapse__inner">
            <div className="resource-card__details">
              {steps.length > 0 && (
                <ol className="resource-card__steps">
                  {steps.map((step, index) => (
                    <li key={index}>{localizeText(step)}</li>
                  ))}
                </ol>
              )}

              {notes && <p className="resource-card__notes">{notes}</p>}
            </div>
          </div>
        </div>
      )}

      <ResourceActions resource={resource} />
    </article>
  )
}
