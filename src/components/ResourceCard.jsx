import { useId, useState } from 'react'
import Icon from './Icon.jsx'
import PlaceholderBadge from './PlaceholderBadge.jsx'
import './ResourceCard.css'

/*
 * RESOURCE CARD
 * -------------
 * One expandable card in the Student Resources section.
 * The name, tag and description are always visible. Clicking the card
 * title reveals the rest: location, numbered steps, notes and a link.
 *
 * Props:
 *   resource      - one item from src/data/resources.js
 *   categoryTitle - shown as an extra label in search results (optional)
 *
 * Only the fields that exist on the item are shown, so a simple link card
 * and a long step-by-step guide can both use this component.
 */
export default function ResourceCard({ resource, categoryTitle }) {
  const [isOpen, setIsOpen] = useState(false)
  // A unique id that connects the button to the content it opens.
  const detailsId = useId()

  const hasSteps = Boolean(resource.steps?.length)
  const hasDetails =
    hasSteps || Boolean(resource.location || resource.notes || resource.url)

  return (
    <article className={`resource-card ${isOpen ? 'is-open' : ''}`}>
      <div className="resource-card__labels">
        <span className="chip">{resource.tag}</span>
        {categoryTitle && <span className="chip chip--outline">{categoryTitle}</span>}
        {resource.needsVerification && (
          <PlaceholderBadge className="resource-card__verify">
            <Icon name="alert" size={14} />
            Needs verification
          </PlaceholderBadge>
        )}
      </div>

      <h4 className="resource-card__name">
        {hasDetails ? (
          <button
            type="button"
            className="resource-card__button"
            aria-expanded={isOpen}
            aria-controls={detailsId}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{resource.name}</span>
            <span className="resource-card__icon">
              <Icon name="chevronDown" size={18} />
            </span>
          </button>
        ) : (
          resource.name
        )}
      </h4>

      <p className="resource-card__description">{resource.description}</p>

      {hasDetails && (
        <div
          id={detailsId}
          className={`collapse ${isOpen ? 'is-open' : ''}`}
          inert={!isOpen}
        >
          <div className="collapse__inner">
            <div className="resource-card__details">
              {resource.location && (
                <p className="resource-card__location">
                  <Icon name="mapPin" size={18} />
                  {resource.location}
                </p>
              )}

              {hasSteps && (
                <ol className="resource-card__steps">
                  {resource.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}

              {resource.notes && <p className="resource-card__notes">{resource.notes}</p>}

              {resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link resource-card__link"
                >
                  {resource.urlLabel || 'Visit website'}
                  <Icon name="externalLink" size={16} />
                  <span className="visually-hidden">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
