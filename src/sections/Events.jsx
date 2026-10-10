import { useState } from 'react'
import EventCard, { EventPoster } from '../components/EventCard.jsx'
import EventDetail from '../components/EventDetail.jsx'
import Icon from '../components/Icon.jsx'
import PlaceholderBadge from '../components/PlaceholderBadge.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Tabs from '../components/Tabs.jsx'
import { events } from '../data/events.js'
import { albums } from '../data/gallery.js'
import {
  formatEventDate,
  getEventYear,
  getPastEvents,
  getUpcomingEvents,
} from '../utils/eventHelpers.js'
import './Events.css'

/*
 * EVENTS
 * ------
 * 1. A large featured card for the nearest upcoming event.
 * 2. A grid of event cards with two filters: status and year.
 * 3. A detail window that opens when an event is clicked.
 *
 * All events come from src/data/events.js. Whether an event is upcoming or
 * past is worked out from its date (see src/utils/eventHelpers.js), so past
 * events move to the archive by themselves.
 *
 * HOW THE FILTERS WORK
 *   statusFilter - 'past', 'upcoming' or 'all'
 *   yearFilter   - 'all' or a year such as '2025'
 * The grid first picks the list that matches statusFilter, then keeps only
 * the events from the chosen year.
 *
 * The id of the open event is kept in App.jsx so the Gallery can open an
 * event too.
 */

const statusTabs = [
  { id: 'past', label: 'Past events' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'all', label: 'All events' },
]

export default function Events({ openEventId, onOpenEvent, onCloseEvent, onShowAlbum }) {
  const [statusFilter, setStatusFilter] = useState('past')
  const [yearFilter, setYearFilter] = useState('all')

  const upcomingEvents = getUpcomingEvents(events)
  const pastEvents = getPastEvents(events)
  const featuredEvent = upcomingEvents[0]

  // Every year that has at least one dated event, newest first.
  const availableYears = [
    ...new Set(events.map(getEventYear).filter((year) => year !== null)),
  ].sort((first, second) => second - first)

  const eventsByStatus = {
    past: pastEvents,
    upcoming: upcomingEvents,
    all: [...upcomingEvents, ...pastEvents],
  }
  const visibleEvents = eventsByStatus[statusFilter].filter(
    (event) => yearFilter === 'all' || getEventYear(event) === Number(yearFilter),
  )

  const openEvent = events.find((event) => event.id === openEventId)
  // An album is linked to an event through the album's "eventId" field.
  const albumForOpenEvent = openEvent
    ? albums.find((album) => album.eventId === openEvent.id)
    : null

  return (
    <section
      id="events"
      className="section section--cream-deep"
      aria-labelledby="events-title"
    >
      <div className="container">
        <SectionHeading
          number="02"
          label="What’s happening"
          title="Good things happen together."
          description="From shared meals to new traditions, there’s always a reason to come together."
          headingId="events-title"
        />

        {featuredEvent ? (
          <FeaturedEvent event={featuredEvent} onOpen={onOpenEvent} />
        ) : (
          <Reveal className="events__empty-featured">
            <p className="eyebrow">Upcoming</p>
            <p>No upcoming events right now. New dates will be announced here.</p>
          </Reveal>
        )}

        <div id="events-archive" className="events__archive">
          <Reveal className="events__toolbar">
            <h3 className="events__archive-title">Event archive</h3>
            <div className="events__filters">
              <Tabs
                tabs={statusTabs}
                activeId={statusFilter}
                onChange={setStatusFilter}
                label="Filter events by status"
                idPrefix="events"
              />
              <label className="events__year">
                <span className="visually-hidden">Filter events by year</span>
                <select
                  className="select"
                  value={yearFilter}
                  onChange={(event) => setYearFilter(event.target.value)}
                >
                  <option value="all">All years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </Reveal>

          <div
            role="tabpanel"
            id="events-panel"
            aria-labelledby={`events-tab-${statusFilter}`}
          >
            {visibleEvents.length > 0 ? (
              // "key" replays the fade animation whenever a filter changes.
              <ul key={`${statusFilter}-${yearFilter}`} className="events__grid fade-up">
                {visibleEvents.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} onOpen={onOpenEvent} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="events__no-results">
                No events match these filters yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {openEvent && (
        <EventDetail
          event={openEvent}
          album={albumForOpenEvent}
          onClose={onCloseEvent}
          onShowAlbum={onShowAlbum}
        />
      )}
    </section>
  )
}

/*
 * The large card for the nearest upcoming event: poster on one side,
 * details and a button on the other.
 */
function FeaturedEvent({ event, onOpen }) {
  return (
    <Reveal as="article" className="featured-event on-dark">
      <div className="featured-event__poster">
        <EventPoster event={event} />
      </div>

      <div className="featured-event__body">
        <div className="featured-event__badges">
          <span className="chip chip--red">Next event</span>
          {event.isSample && <PlaceholderBadge>Sample event</PlaceholderBadge>}
        </div>

        <h3 className="featured-event__title">{event.title}</h3>

        <ul className="featured-event__facts">
          <li>
            <Icon name="calendar" size={18} />
            {formatEventDate(event)}
          </li>
          <li>
            <Icon name="mapPin" size={18} />
            {event.venue || 'Venue to be announced'}
          </li>
        </ul>

        <p className="featured-event__summary">{event.summary}</p>

        <div className="featured-event__actions">
          <button
            type="button"
            className="button button--light"
            onClick={() => onOpen(event.id)}
          >
            View details
            <Icon name="arrowRight" size={18} />
          </button>
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline"
            >
              Register
              <Icon name="externalLink" size={18} />
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}
