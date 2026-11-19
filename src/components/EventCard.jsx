import { useTranslation } from 'react-i18next'
import { assetPath } from '../utils/assetPath.js'
import { formatEventDate, hasStarted, isUpcoming } from '../utils/eventHelpers.js'
import { useLocalize } from '../utils/localize.js'
import CabinetLabel from './CabinetLabel.jsx'
import Icon from './Icon.jsx'
import PlaceholderBadge from './PlaceholderBadge.jsx'
import './EventCard.css'

/*
 * EVENT POSTER
 * Shows an event's poster image. If the event has no poster yet, a simple
 * branded placeholder with the event title is drawn instead.
 */
export function EventPoster({ event }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const title = localizeText(event.title)

  if (event.poster) {
    return (
      <img
        className="event-poster"
        src={assetPath(event.poster)}
        alt={t('events.posterAlt', { title })}
        loading="lazy"
      />
    )
  }

  return (
    <div className="event-poster event-poster--placeholder" aria-hidden="true">
      <span className="event-poster__brand">PPI Hsinchu</span>
      <span className="event-poster__title">{title}</span>
      <span className="event-poster__note">{t('events.posterSoon')}</span>
    </div>
  )
}

/*
 * EVENT CARD
 * ----------
 * A small poster card used in the events grid. Clicking anywhere on the
 * card opens the event's detail window.
 *
 * Props:
 *   event  - one event from src/data/events.js
 *   onOpen - called with the event id when the card is clicked
 *
 * The title and summary are shown in the visitor's language, and the date
 * is written the way that language writes dates.
 *
 * Past events also get a "View documentation" button (see below).
 */
export default function EventCard({ event, onOpen }) {
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()

  return (
    <article className="event-card">
      <div className="event-card__poster">
        <EventPoster event={event} />
        {isUpcoming(event) && (
          <span className="chip chip--red event-card__status">{t('events.upcoming')}</span>
        )}
      </div>

      <div className="event-card__body">
        {/* The cabinet that ran the event ("cabinet" in src/data/events.js). */}
        <CabinetLabel name={event.cabinet} />
        <p className="event-card__date">
          {formatEventDate(event, i18n.language) || t('events.dateTba')}
        </p>
        {/* The event fee ("fee" in src/data/events.js), if one is filled in. */}
        {localizeText(event.fee) && (
          <p className="event-card__fee">
            <Icon name="ticket" size={15} />
            {localizeText(event.fee)}
          </p>
        )}
        <h4 className="event-card__title">
          {/* The button's clickable area is stretched over the whole card in CSS. */}
          <button
            type="button"
            className="event-card__button"
            onClick={() => onOpen(event.id)}
          >
            {localizeText(event.title)}
          </button>
        </h4>
        <p className="event-card__summary">{localizeText(event.summary)}</p>

        {/*
          DOCUMENTATION BUTTON (ongoing and past events)
          Opens the event's photo and video folder (for example Google Drive)
          in a new tab. The link is "documentationUrl" in src/data/events.js.
          Until a link is added, a greyed-out note is shown instead.
        */}
        {hasStarted(event) &&
          (event.documentationUrl ? (
            <a
              href={event.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="event-card__documentation"
            >
              <Icon name="image" size={16} />
              {t('events.viewDocumentation')}
              <Icon name="externalLink" size={14} />
              <span className="visually-hidden">{t('common.opensNewTab')}</span>
            </a>
          ) : (
            <span className="event-card__documentation is-unavailable">
              <Icon name="image" size={16} />
              {t('events.documentationSoon')}
            </span>
          ))}
        {event.isSample && <PlaceholderBadge>{t('events.sample')}</PlaceholderBadge>}
      </div>
    </article>
  )
}
