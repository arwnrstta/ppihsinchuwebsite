import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CabinetLabel from '../components/CabinetLabel.jsx'
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
import { useLocalize } from '../utils/localize.js'
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

// The three status filters. Their text is in src/locales/, under "events" -> "filters".
const statusFilterIds = ['past', 'upcoming', 'all']

export default function Events({ openEventId, onOpenEvent, onCloseEvent, onShowAlbum }) {
  const { t } = useTranslation()
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

  const statusTabs = statusFilterIds.map((filterId) => ({
    id: filterId,
    label: t(`events.filters.${filterId}`),
  }))

  return (
    <section
      id="events"
      className="section section--cream-deep"
      aria-labelledby="events-title"
    >
      <div className="container">
        <SectionHeading
          number="02"
          label={t('events.label')}
          title={t('events.title')}
          description={t('events.description')}
          headingId="events-title"
        />

        {featuredEvent ? (
          <FeaturedEvent event={featuredEvent} onOpen={onOpenEvent} />
        ) : (
          <Reveal className="events__empty-featured">
            <p className="eyebrow">{t('events.upcoming')}</p>
            <p>{t('events.noUpcoming')}</p>
          </Reveal>
        )}

        <div id="events-archive" className="events__archive">
          <Reveal className="events__toolbar">
            <h3 className="events__archive-title">{t('events.archiveTitle')}</h3>
            <div className="events__filters">
              <Tabs
                tabs={statusTabs}
                activeId={statusFilter}
                onChange={setStatusFilter}
                label={t('events.filterStatusLabel')}
                idPrefix="events"
              />
              <label className="events__year">
                <span className="visually-hidden">{t('events.filterYearLabel')}</span>
                <select
                  className="select"
                  value={yearFilter}
                  onChange={(event) => setYearFilter(event.target.value)}
                >
                  <option value="all">{t('events.allYears')}</option>
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
              <p className="events__no-results">{t('events.noResults')}</p>
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
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()

  return (
    <Reveal as="article" className="featured-event on-dark">
      <div className="featured-event__poster">
        <EventPoster event={event} />
      </div>

      <div className="featured-event__body">
        <div className="featured-event__badges">
          <span className="chip chip--red">{t('events.nextEvent')}</span>
          <CabinetLabel name={event.cabinet} />
          {event.isSample && <PlaceholderBadge>{t('events.sample')}</PlaceholderBadge>}
        </div>

        <h3 className="featured-event__title">{localizeText(event.title)}</h3>

        <ul className="featured-event__facts">
          <li>
            <Icon name="calendar" size={18} />
            {formatEventDate(event, i18n.language) || t('events.dateTba')}
          </li>
          <li>
            <Icon name="mapPin" size={18} />
            {localizeText(event.venue) || t('events.venueTba')}
          </li>
          {/* The fee is shown only when one has been filled in. */}
          {localizeText(event.fee) && (
            <li>
              <Icon name="ticket" size={18} />
              {localizeText(event.fee)}
            </li>
          )}
        </ul>

        <p className="featured-event__summary">{localizeText(event.summary)}</p>

        <div className="featured-event__actions">
          {/*
            REGISTRATION BUTTON
            Opens the event's registration form (for example a Google Form)
            in a new tab. The link is the event's "registrationUrl" in
            src/data/events.js. Until a link is added, the button is shown
            greyed out so visitors can see that registration is coming.
          */}
          {event.registrationUrl ? (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              {t('events.registerNow')}
              <Icon name="externalLink" size={18} />
              <span className="visually-hidden">{t('common.opensNewTab')}</span>
            </a>
          ) : (
            <button type="button" className="button" disabled>
              {t('events.registrationOpensSoon')}
            </button>
          )}
          <button
            type="button"
            className="button button--outline"
            onClick={() => onOpen(event.id)}
          >
            {t('events.viewDetails')}
            <Icon name="arrowRight" size={18} />
          </button>
        </div>
      </div>
    </Reveal>
  )
}
