/*
 * EVENTS
 * ------
 * Every event on the website comes from this list. The order does not matter:
 * the website sorts events by date automatically.
 *
 * UPCOMING OR PAST?
 * The website decides this by itself from the "date":
 *   - date is today or later -> Upcoming
 *   - date is before today   -> Past (it moves to the archive automatically)
 *   - date is ''             -> Upcoming, shown as "Date to be announced"
 * The upcoming event with the nearest date becomes the large featured event.
 *
 * FIELDS
 *   id              - a short unique name with no spaces, e.g. 'halal-bihalal-2027'
 *   title           - event name
 *   date            - 'YYYY-MM-DD', e.g. '2027-03-14' (or '' if not confirmed)
 *   time            - free text, e.g. '18:00 - 21:00' (or '')
 *   venue           - where it takes place (or '')
 *   organizer       - who runs it
 *   summary         - one sentence shown on the event card
 *   description     - longer text shown when the event is opened
 *   poster          - poster image saved in public/images/events/
 *                     (portrait, about 1080 x 1350). Leave '' for a placeholder.
 *   registrationUrl - full link starting with https:// (or '' to hide the button)
 *   isSample        - true marks placeholder content with a "Sample" label.
 *                     Remove this line for real events.
 *
 * To link an event to a photo album, set "eventId" on the album in
 * src/data/gallery.js. Nothing needs to change in this file.
 *
 * TODO: Replace the sample events below with verified event details.
 * The sample dates are NOT real event dates.
 */

export const events = [
  {
    id: 'sample-upcoming-gathering',
    title: 'Welcome Gathering',
    date: '',
    time: '',
    venue: '',
    organizer: 'PPI Hsinchu',
    summary: 'New faces, familiar food, and the start of new friendships.',
    description:
      'This is a sample upcoming event. Replace it with the next confirmed PPI Hsinchu event, including the date, venue, and registration link.',
    poster: '',
    registrationUrl: '',
    isSample: true,
  },
  {
    id: 'sample-culture-night',
    title: 'Culture, Shared',
    date: '2025-11-15',
    time: '',
    venue: '',
    organizer: 'PPI Hsinchu',
    summary: 'A space to keep our traditions alive and share them proudly.',
    description:
      'This is a sample past event. Replace it with a real event: what happened, who joined, and what made it memorable.',
    poster: '',
    registrationUrl: '',
    isSample: true,
  },
  {
    id: 'sample-explore-hsinchu',
    title: 'Out in Hsinchu',
    date: '2025-05-10',
    time: '',
    venue: '',
    organizer: 'PPI Hsinchu',
    summary: 'Discovering the city together, one little adventure at a time.',
    description:
      'This is a sample past event. Replace it with a real event: what happened, who joined, and what made it memorable.',
    poster: '',
    registrationUrl: '',
    isSample: true,
  },
  {
    id: 'sample-sharing-session',
    title: 'Academic Sharing Session',
    date: '2024-10-05',
    time: '',
    venue: '',
    organizer: 'PPI Hsinchu',
    summary: 'Seniors sharing what they wish they had known in their first year.',
    description:
      'This is a sample past event. Replace it with a real event: what happened, who joined, and what made it memorable.',
    poster: '',
    registrationUrl: '',
    isSample: true,
  },
]
