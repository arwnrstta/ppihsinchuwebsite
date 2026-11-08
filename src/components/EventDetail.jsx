import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { assetPath } from '../utils/assetPath.js'
import {
  buildFeeTable,
  formatEventDate,
  getEventFees,
  getEventVenues,
  isUpcoming,
} from '../utils/eventHelpers.js'
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
 *   onClose     - closes the window
 *
 * Buttons:
 *   "Register"            upcoming events with a registrationUrl
 *   "View documentation"  past events; opens documentationUrl (Google Drive).
 *                         Greyed out until a link is added.
 */
export default function EventDetail({ event, onClose }) {
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()
  const upcoming = isUpcoming(event)
  const title = localizeText(event.title)

  // Events in several places list each activity and its location ("venues");
  // other events show their full "venue" text.
  const venues = getEventVenues(event)
  const venueValue =
    venues.length > 0 ? (
      <ul className="event-detail__venues">
        {venues.map((venue, index) => (
          <li key={index}>
            {localizeText(venue.activity) && (
              <span className="event-detail__venue-activity">{localizeText(venue.activity)}</span>
            )}
            <span>{localizeText(venue.location)}</span>
          </li>
        ))}
      </ul>
    ) : (
      localizeText(event.venue)
    )

  // Several ticket categories ("fees") get their own "Registration Fees"
  // block below; otherwise the full "fee" text is one of the rows. Fees with
  // Early Bird and Regular prices become a compact comparison table.
  const fees = getEventFees(event)
  const feeTable = buildFeeTable(event, i18n.language)
  const unitLabel = (unit) => (unit ? t(`events.detail.feeUnits.${unit}`) : '')

  // Each row is shown only if the event has that information.
  const facts = [
    {
      icon: 'calendar',
      label: t('events.detail.date'),
      value: formatEventDate(event, i18n.language) || t('events.dateTba'),
    },
    { icon: 'clock', label: t('events.detail.time'), value: localizeText(event.time) },
    { icon: 'mapPin', label: t('events.detail.venue'), value: venueValue },
    {
      icon: 'ticket',
      label: t('events.detail.fee'),
      value: fees.length > 0 ? '' : localizeText(event.fee),
    },
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

          {fees.length > 0 && (
            <section className="event-detail__fees" aria-labelledby={`${event.id}-fees`}>
              <h4 id={`${event.id}-fees`} className="event-detail__fees-title">
                <Icon name="ticket" size={18} />
                {t('events.detail.registrationFees')}
              </h4>
              {feeTable ? (
                <>
                  {/* The Early Bird deadline, once, when all prices share it. */}
                  {feeTable.sharedEarlyBirdNote && (
                    <p className="event-detail__fee-deadline">
                      {t('events.detail.earlyBird')}: {feeTable.sharedEarlyBirdNote}
                    </p>
                  )}
                  <table className="event-detail__fee-table">
                    <thead>
                      <tr>
                        <th scope="col">{t('events.detail.competition')}</th>
                        <th scope="col">{t('events.detail.earlyBird')}</th>
                        <th scope="col">{t('events.detail.regular')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeTable.rows.map((row) => (
                        <tr key={row.key}>
                          <th scope="row">
                            {row.label}
                            {row.unit && (
                              <span className="event-detail__fee-unit"> ({unitLabel(row.unit)})</span>
                            )}
                          </th>
                          {['earlyBird', 'regular'].map((tier) => (
                            <td key={tier}>
                              {row[tier] ? row[tier].price : '–'}
                              {row[tier]?.note && (
                                <span className="event-detail__fee-notes">{row[tier].note}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                // Other kinds of tickets: a compact list, one line each.
                <ul className="event-detail__fee-list">
                  {fees.map((fee, index) => (
                    <li key={index}>
                      <span className="event-detail__fee-category">
                        {localizeText(fee.category)}
                      </span>
                      <span className="event-detail__fee-price">{localizeText(fee.price)}</span>
                      {localizeText(fee.notes) && (
                        <span className="event-detail__fee-notes">{localizeText(fee.notes)}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <p className="event-detail__description">
            {localizeText(event.description) || localizeText(event.summary)}
          </p>

          {/* Sponsors and media partners, as two separate groups of logos. */}
          <EventLogos
            id={`${event.id}-sponsors`}
            title={t('events.detail.sponsors')}
            logos={event.sponsors}
          />
          <EventLogos
            id={`${event.id}-media-partners`}
            title={t('events.detail.mediaPartners')}
            logos={event.mediaPartners}
          />

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
          </div>
        </div>
      </div>
    </Modal>
  )
}

/*
 * A titled row of logos ("sponsors" or "mediaPartners" in src/data/events.js).
 * Each logo sits on its own white tile so logos with and without a
 * background look alike. Wide logos (long wordmarks) get a double-width
 * tile so they stay readable. Nothing is shown when the list is empty.
 */
function EventLogos({ id, title, logos = [] }) {
  if (logos.length === 0) return null

  return (
    <section className="event-detail__logos" aria-labelledby={id}>
      <h4 id={id} className="event-detail__logos-title">
        {title}
      </h4>
      <ul className="event-detail__logo-list">
        {logos.map((logo) => (
          <LogoTile key={logo.name} logo={logo} />
        ))}
      </ul>
    </section>
  )
}

// Logos more than this many times wider than tall span two tiles, or the
// whole row for very long wordmarks.
const WIDE_LOGO_RATIO = 2.5
const FULL_ROW_LOGO_RATIO = 5

function LogoTile({ logo }) {
  const [shape, setShape] = useState('')

  const handleLoad = (e) => {
    const ratio = e.target.naturalWidth / e.target.naturalHeight
    if (ratio > FULL_ROW_LOGO_RATIO) setShape('event-detail__logo--full')
    else if (ratio > WIDE_LOGO_RATIO) setShape('event-detail__logo--wide')
  }

  return (
    <li className={`event-detail__logo ${shape}`} title={logo.name}>
      <img
        src={assetPath(logo.logo)}
        alt={logo.name}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
      />
    </li>
  )
}
