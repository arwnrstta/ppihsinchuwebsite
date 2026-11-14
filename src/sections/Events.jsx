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
import YoutubeSpotlight from '../components/YoutubeSpotlight.jsx'
import { events } from '../data/events.js'
import {
  formatEventDate,
  getEventVenues,
  getEventYears,
  getPastEvents,
  getUpcomingEvents,
} from '../utils/eventHelpers.js'
import { useLocalize } from '../utils/localize.js'
import './Events.css'

/*
 * EVENTS
 * ------
 * 1. A large featured card for the nearest upcoming event.
 * 2. A video or live stream from our YouTube channel (YoutubeSpotlight),
 *    hidden while no video is set in src/config/site.js.
 * 3. A grid of event cards with two filters: status and year.
 * 4. A detail window that opens when an event is clicked.
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
const statusFilterIds = ['all', 'upcoming', 'past' ]

export default function Events({ openEventId, onOpenEvent, onCloseEvent }) {
  const { t } = useTranslation()
  const [statusFilter, setStatusFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')

  const upcomingEvents = getUpcomingEvents(events)
  const pastEvents = getPastEvents(events)
  const featuredEvent = upcomingEvents[0]

  // Every year that has at least one dated event, newest first. An event
  // on dates in two different years counts for both.
  const availableYears = [...new Set(events.flatMap(getEventYears))].sort(
    (first, second) => second - first,
  )

  const eventsByStatus = {
    past: pastEvents,
    upcoming: upcomingEvents,
    all: [...upcomingEvents, ...pastEvents],
  }
  const visibleEvents = eventsByStatus[statusFilter].filter(
    (event) => yearFilter === 'all' || getEventYears(event).includes(Number(yearFilter)),
  )

  const openEvent = events.find((event) => event.id === openEventId)

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

        {/* Our YouTube video or live stream ("youtubeSpotlight" in src/config/site.js). */}
        <YoutubeSpotlight />

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
          onClose={onCloseEvent}
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
  // The short venue ("venueShort"), or the full venue, or the venues list.
  const fullVenue =
    localizeText(event.venue) ||
    getEventVenues(event)
      .map((venue) => localizeText(venue.location))
      .join(' · ')
  const shortVenue = localizeText(event.venueShort) || fullVenue
  // The short fee ("feeShort"), or the full fee. Hidden when both are empty.
  const fullFee = localizeText(event.fee)
  const shortFee = localizeText(event.feeShort) || fullFee

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

        {/*
          Only the essentials, one per line: date, short venue and short fee.
          The full venue, time and ticket prices are in the details window
          ("View details").
        */}
        <ul className="featured-event__facts">
          <li>
            <Icon name="calendar" size={18} />
            <span>{formatEventDate(event, i18n.language) || t('events.dateTba')}</span>
          </li>
          <li title={fullVenue && fullVenue !== shortVenue ? fullVenue : undefined}>
            <Icon name="mapPin" size={18} />
            <span className="featured-event__fact-text">{shortVenue || t('events.venueTba')}</span>
          </li>
          {shortFee && (
            <li title={fullFee && fullFee !== shortFee ? fullFee : undefined}>
              <Icon name="ticket" size={18} />
              <span className="featured-event__fact-text">{shortFee}</span>
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
