import { languages } from '../i18n.js'

/*
 * Small helper functions for working with the events in src/data/events.js.
 */

/* Today's date as 'YYYY-MM-DD' in the visitor's own time zone. */
function getTodayString() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

/*
 * An event is "past" only when it has a date and that date is before today.
 * Events without a date are treated as upcoming ("Date to be announced").
 * Dates in 'YYYY-MM-DD' form can be compared as plain text.
 */
export function isUpcoming(event) {
  if (!event.date) return true
  return event.date >= getTodayString()
}

/* The year of an event as a number, or null when the date is not set. */
export function getEventYear(event) {
  if (!event.date) return null
  return Number(event.date.slice(0, 4))
}

/*
 * Writes an event's date in the visitor's language:
 *   '2027-03-14' -> '14 March 2027' (English), '14 Maret 2027' (Indonesian),
 *                   '2027年3月14日' (Chinese)
 * Returns '' when the event has no date yet, so the caller can show its own
 * "Date to be announced" text.
 */
export function formatEventDate(event, languageCode) {
  if (!event.date) return ''
  const [year, month, day] = event.date.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const language = languages.find((item) => item.code === languageCode)
  return date.toLocaleDateString(language?.dateLocale ?? 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/* Upcoming events, soonest first. Events without a date go to the end. */
export function getUpcomingEvents(events) {
  return events.filter(isUpcoming).sort((first, second) => {
    if (!first.date) return 1
    if (!second.date) return -1
    return first.date.localeCompare(second.date)
  })
}

/* Past events, most recent first. */
export function getPastEvents(events) {
  return events
    .filter((event) => !isUpcoming(event))
    .sort((first, second) => second.date.localeCompare(first.date))
}
