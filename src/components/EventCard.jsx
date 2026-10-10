import { assetPath } from '../utils/assetPath.js'
import { formatEventDate, isUpcoming } from '../utils/eventHelpers.js'
import PlaceholderBadge from './PlaceholderBadge.jsx'
import './EventCard.css'

/*
 * EVENT POSTER
 * Shows an event's poster image. If the event has no poster yet, a simple
 * branded placeholder with the event title is drawn instead.
 */
export function EventPoster({ event }) {
  if (event.poster) {
    return (
      <img
        className="event-poster"
        src={assetPath(event.poster)}
        alt={`Poster for ${event.title}`}
        loading="lazy"
      />
    )
  }

  return (
    <div className="event-poster event-poster--placeholder" aria-hidden="true">
      <span className="event-poster__brand">PPI Hsinchu</span>
      <span className="event-poster__title">{event.title}</span>
      <span className="event-poster__note">Poster coming soon</span>
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
 */
export default function EventCard({ event, onOpen }) {
  return (
    <article className="event-card">
      <div className="event-card__poster">
        <EventPoster event={event} />
        {isUpcoming(event) && (
          <span className="chip chip--red event-card__status">Upcoming</span>
        )}
      </div>

      <div className="event-card__body">
        <p className="event-card__date">{formatEventDate(event)}</p>
        <h4 className="event-card__title">
          {/* The button's clickable area is stretched over the whole card in CSS. */}
          <button
            type="button"
            className="event-card__button"
            onClick={() => onOpen(event.id)}
          >
            {event.title}
          </button>
        </h4>
        <p className="event-card__summary">{event.summary}</p>
        {event.isSample && <PlaceholderBadge>Sample event</PlaceholderBadge>}
      </div>
    </article>
  )
}
