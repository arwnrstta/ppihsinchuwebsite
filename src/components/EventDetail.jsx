import { useTranslation } from 'react-i18next'
import { formatEventDate, isUpcoming } from '../utils/eventHelpers.js'
import { useLocalize } from '../utils/localize.js'
import CabinetLabel from './CabinetLabel.jsx'
import { EventPoster } from './EventCard.jsx'
import Icon from './Icon.jsx'
import Modal from './Modal.jsx'
import PlaceholderBadge from './PlaceholderBadge.jsx'
import './EventDetail.css'

/*
 * EVENT DETAIL
 * ------------
 * The pop-up window that opens when an event is clicked. It shows the full
 * poster and all the details of one event, in the visitor's language.
 *
 * Props:
 *   event       - the event to show (from src/data/events.js)
 *   album       - the photo album linked to this event, if there is one
 *   onClose     - closes the window
 *   onShowAlbum - called with the album id for the "View photos" button
 *
 * Buttons:
 *   "Register"            upcoming events with a registrationUrl
 *   "View documentation"  past events; opens documentationUrl (Google Drive).
 *                         Greyed out until a link is added.
 *   "View photos"         events with a linked album in the on-site gallery
 */
export default function EventDetail({ event, album, onClose, onShowAlbum }) {
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()
  const upcoming = isUpcoming(event)
  const title = localizeText(event.title)

  // Each row is shown only if the event has that information.
  const facts = [
    {
      icon: 'calendar',
      label: t('events.detail.date'),
      value: formatEventDate(event, i18n.language) || t('events.dateTba'),
    },
    { icon: 'clock', label: t('events.detail.time'), value: localizeText(event.time) },
    { icon: 'mapPin', label: t('events.detail.venue'), value: localizeText(event.venue) },
    { icon: 'ticket', label: t('events.detail.fee'), value: localizeText(event.fee) },
    {
      icon: 'users',
      label: t('events.detail.organizer'),
      value: localizeText(event.organizer),
    },
  ].filter((fact) => fact.value)

  return (
    <Modal onClose={onClose} label={t('events.detail.label', { title })}>
      <div className="event-detail">
        <div className="event-detail__poster">
          <EventPoster event={event} />
        </div>

        <div className="event-detail__body">
          <div className="event-detail__badges">
            <span className={`chip ${upcoming ? 'chip--red' : ''}`}>
              {upcoming ? t('events.upcoming') : t('events.detail.past')}
            </span>
            {/* The cabinet that ran the event ("cabinet" in src/data/events.js). */}
            <CabinetLabel name={event.cabinet} />
            {event.isSample && <PlaceholderBadge>{t('events.sample')}</PlaceholderBadge>}
          </div>

          <h3 className="event-detail__title">{title}</h3>

          <dl className="event-detail__facts">
            {facts.map((fact) => (
              <div key={fact.icon}>
                <dt>
                  <Icon name={fact.icon} size={18} />
                  {fact.label}
                </dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="event-detail__description">
            {localizeText(event.description) || localizeText(event.summary)}
          </p>

          <div className="event-detail__actions">
            {upcoming && event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--primary"
              >
                {t('events.register')}
                <Icon name="externalLink" size={18} />
                <span className="visually-hidden">{t('common.opensNewTab')}</span>
              </a>
            )}
            {upcoming && !event.registrationUrl && (
              <p className="event-detail__note">{t('events.detail.registrationSoon')}</p>
            )}
            {/* Past events: link to the documentation folder (e.g. Google Drive). */}
            {!upcoming &&
              (event.documentationUrl ? (
                <a
                  href={event.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--primary"
                >
                  {t('events.viewDocumentation')}
                  <Icon name="externalLink" size={18} />
                  <span className="visually-hidden">{t('common.opensNewTab')}</span>
                </a>
              ) : (
                <button type="button" className="button" disabled>
                  {t('events.documentationSoon')}
                </button>
              ))}
            {album && (
              <button
                type="button"
                className="button button--outline"
                onClick={() => onShowAlbum(album.id)}
              >
                <Icon name="image" size={18} />
                {t('events.detail.viewPhotos')}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
