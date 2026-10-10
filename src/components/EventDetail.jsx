import { formatEventDate, isUpcoming } from '../utils/eventHelpers.js'
import { EventPoster } from './EventCard.jsx'
import Icon from './Icon.jsx'
import Modal from './Modal.jsx'
import PlaceholderBadge from './PlaceholderBadge.jsx'
import './EventDetail.css'

/*
 * EVENT DETAIL
 * ------------
 * The pop-up window that opens when an event is clicked. It shows the full
 * poster and all the details of one event.
 *
 * Props:
 *   event       - the event to show (from src/data/events.js)
 *   album       - the photo album linked to this event, if there is one
 *   onClose     - closes the window
 *   onShowAlbum - called with the album id for the "View photos" button
 *
 * Buttons appear only when they have somewhere to go: "Register" needs a
 * registrationUrl, and "View photos" needs a linked album.
 */
export default function EventDetail({ event, album, onClose, onShowAlbum }) {
  const upcoming = isUpcoming(event)

  // Each row is shown only if the event has that information.
  const facts = [
    { icon: 'calendar', label: 'Date', value: formatEventDate(event) },
    { icon: 'clock', label: 'Time', value: event.time },
    { icon: 'mapPin', label: 'Venue', value: event.venue },
    { icon: 'users', label: 'Organizer', value: event.organizer },
  ].filter((fact) => fact.value)

  return (
    <Modal onClose={onClose} label={`Event details: ${event.title}`}>
      <div className="event-detail">
        <div className="event-detail__poster">
          <EventPoster event={event} />
        </div>

        <div className="event-detail__body">
          <div className="event-detail__badges">
            <span className={`chip ${upcoming ? 'chip--red' : ''}`}>
              {upcoming ? 'Upcoming' : 'Past event'}
            </span>
            {event.isSample && <PlaceholderBadge>Sample event</PlaceholderBadge>}
          </div>

          <h3 className="event-detail__title">{event.title}</h3>

          <dl className="event-detail__facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>
                  <Icon name={fact.icon} size={18} />
                  {fact.label}
                </dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="event-detail__description">
            {event.description || event.summary}
          </p>

          <div className="event-detail__actions">
            {upcoming && event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--primary"
              >
                Register
                <Icon name="externalLink" size={18} />
                <span className="visually-hidden">(opens in a new tab)</span>
              </a>
            )}
            {upcoming && !event.registrationUrl && (
              <p className="event-detail__note">Registration details coming soon.</p>
            )}
            {album && (
              <button
                type="button"
                className="button button--outline"
                onClick={() => onShowAlbum(album.id)}
              >
                <Icon name="image" size={18} />
                View photos
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
