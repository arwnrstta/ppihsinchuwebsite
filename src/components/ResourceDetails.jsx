import { useTranslation } from 'react-i18next'
import { useLocalize } from '../utils/localize.js'
import Icon from './Icon.jsx'
import './ResourceDetails.css'

/*
 * RESOURCE DETAILS
 * ----------------
 * The address/phone lines and the action buttons of a resource, shared by
 * the full resource cards (ResourceCard.jsx) and the compact places inside
 * expandable sections (ResourceListing.jsx).
 *
 * Both draw nothing at all when the resource has nothing to show, so no
 * empty space is ever reserved.
 */

/* Which buttons a layout shows, in order. Missing links are skipped. */
const actionOrder = {
  place: ['maps', 'website', 'instagram', 'phone'],
  service: ['website', 'phone', 'instagram', 'maps'],
  medical: ['maps', 'phone', 'website', 'instagram'],
  info: ['website', 'maps', 'phone', 'instagram'],
}

/* Address, phone number and (medical only) verified service details. */
export function ResourceFacts({ resource }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const address = localizeText(resource.address)
  const serviceInfo = resource.layout === 'medical' ? localizeText(resource.serviceInfo) : ''

  if (!address && !resource.phone && !serviceInfo) return null

  return (
    <ul className={`resource-facts resource-facts--${resource.layout}`}>
      {address && (
        <li>
          <Icon name="mapPin" size={18} />
          <span className="visually-hidden">{t('resources.address')}: </span>
          <span>{address}</span>
        </li>
      )}
      {resource.phone && (
        <li>
          <Icon name="phone" size={18} />
          <span className="visually-hidden">{t('resources.phone')}: </span>
          <span>{resource.phone.display}</span>
        </li>
      )}
      {serviceInfo && (
        <li>
          <Icon name="medical" size={18} />
          <span className="visually-hidden">{t('resources.serviceInfo')}: </span>
          <span>{serviceInfo}</span>
        </li>
      )}
    </ul>
  )
}

/*
 * One button per link that exists: Google Maps, website, Instagram, phone.
 * Every button is its own destination; the card around it is never a link.
 */
export function ResourceActions({ resource }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const name = localizeText(resource.name)
  const layout = actionOrder[resource.layout] ? resource.layout : 'info'

  const available = {
    maps: resource.googleMapsUrl && {
      href: resource.googleMapsUrl,
      icon: 'mapPin',
      label:
        layout === 'medical' ? t('resources.actions.directions') : t('resources.actions.openInMaps'),
      external: true,
    },
    website: resource.websiteUrl && {
      href: resource.websiteUrl,
      icon: 'globe',
      label: localizeText(resource.websiteLabel) || t('resources.actions.visitWebsite'),
      external: true,
    },
    instagram: resource.instagramUrl && {
      href: resource.instagramUrl,
      icon: 'instagram',
      label: t('resources.actions.instagram'),
      external: true,
    },
    phone: resource.phone && {
      href: resource.phone.href,
      icon: 'phone',
      label: t('resources.actions.call'),
      external: false,
    },
  }
  const actions = actionOrder[layout].filter((key) => available[key])

  if (actions.length === 0) return null

  return (
    <div className="resource-actions">
      {actions.map((key) => {
        const action = available[key]
        return (
          <a
            key={key}
            href={action.href}
            className="button button--outline resource-action"
            {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon name={action.icon} size={18} />
            {action.label}
            <span className="visually-hidden">
              {`: ${name}`}
              {action.external && ` ${t('common.opensNewTab')}`}
            </span>
          </a>
        )
      })}
    </div>
  )
}
