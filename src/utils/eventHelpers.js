import { languages } from '../i18n.js'
import { localize } from './localize.js'

/*
 * Small helper functions for working with the events in src/data/events.js.
 *
 * An event has a "date" and, optionally, "additionalDates" for events that
 * take place on several days. Every function here looks at ALL of an
 * event's dates, so the cards, featured event, detail window and archive
 * all agree. Dates are plain 'YYYY-MM-DD' text, compared with the visitor's
 * own local date, so time zones never shift an event by a day.
 */

/*
 * Today's date as 'YYYY-MM-DD' in the visitor's own time zone.
 * Also used for partnership dates (src/utils/partnerHelpers.js).
 */
export function getTodayString() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

/* True only for a real calendar date written as 'YYYY-MM-DD'. */
function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

/*
 * All of an event's dates ("date" plus "additionalDates"), sorted from
 * earliest to latest, without duplicates or mistyped dates. [] when the
 * event has no date yet.
 */
export function getEventDates(event) {
  const extra = Array.isArray(event.additionalDates) ? event.additionalDates : []
  return [...new Set([event.date, ...extra].filter(isValidDate))].sort()
}

/*
 * An event stays "upcoming" until its LAST date has passed, and moves to
 * the archive the day after. Events without a date are treated as upcoming
 * ("Date to be announced"). Dates in 'YYYY-MM-DD' form compare as text.
 */
export function isUpcoming(event, today = getTodayString()) {
  const dates = getEventDates(event)
  if (dates.length === 0) return true
  return dates[dates.length - 1] >= today
}

/*
 * True from the event's FIRST date onwards, so also while a multi-day event
 * is still going on. Registration closes then, and the event shows its
 * documentation button instead. Events without a date have not started.
 */
export function hasStarted(event, today = getTodayString()) {
  const dates = getEventDates(event)
  return dates.length > 0 && dates[0] <= today
}

/* The event's next date that is today or later, or '' if there is none. */
function getNextDate(event, today) {
  return getEventDates(event).find((date) => date >= today) ?? ''
}

/* Every year an event takes place in, e.g. [2026, 2027]. [] when undated. */
export function getEventYears(event) {
  return [...new Set(getEventDates(event).map((date) => Number(date.slice(0, 4))))]
}

/* The year of an event's first date as a number, or null when it has none. */
export function getEventYear(event) {
  return getEventYears(event)[0] ?? null
}

/* ---------- Writing dates in the visitor's language ---------- */

/* A 'YYYY-MM-DD' text as { year, month, day } numbers. */
const toParts = (text) => {
  const [year, month, day] = text.split('-').map(Number)
  return { year, month, day, text }
}

/* True when "next" is the day straight after "previous". */
function isNextDay(previous, next) {
  const date = new Date(previous.year, previous.month - 1, previous.day + 1)
  return (
    date.getFullYear() === next.year &&
    date.getMonth() === next.month - 1 &&
    date.getDate() === next.day
  )
}

/*
 * Sorted dates grouped into runs of consecutive days, e.g.
 * 14, 20, 21, 22 Nov -> [14–14], [20–22]. A run never crosses into a new
 * year, so each year can be written separately.
 */
function toRanges(dates) {
  const ranges = []
  for (const date of dates.map(toParts)) {
    const last = ranges[ranges.length - 1]
    if (last && isNextDay(last.end, date) && last.end.year === date.year) {
      last.end = date
    } else {
      ranges.push({ start: date, end: date })
    }
  }
  return ranges
}

/* The ranges of each year, in order: [{ year, ranges }]. */
function groupByYear(ranges) {
  const groups = []
  for (const range of ranges) {
    const last = groups[groups.length - 1]
    if (last && last.year === range.start.year) last.ranges.push(range)
    else groups.push({ year: range.start.year, ranges: [range] })
  }
  return groups
}

function monthName(month, locale) {
  return new Date(2000, month - 1, 1).toLocaleDateString(locale, { month: 'long' })
}

/*
 * One year's dates, month first: "November 14, 20–22, 2026".
 * The month is repeated only when it changes: "November 30 – December 2, 2026".
 */
function formatMonthFirst({ year, ranges }, locale) {
  let currentMonth = null
  const withMonth = (part) => {
    const text = part.month === currentMonth ? `${part.day}` : `${monthName(part.month, locale)} ${part.day}`
    currentMonth = part.month
    return text
  }
  const parts = ranges.map(({ start, end }) => {
    if (start.text === end.text) return withMonth(start)
    if (start.month === end.month) return `${withMonth(start)}–${end.day}`
    return `${withMonth(start)} – ${withMonth(end)}`
  })
  return `${parts.join(', ')}, ${year}`
}

/*
 * One year's dates, day first: "14, 20–22 November 2026".
 * The month follows the last day of each month: "30 November – 2 Desember 2026".
 */
function formatDayFirst({ year, ranges }, locale) {
  // Split into runs that share a month, so each month name is written once.
  const parts = []
  ranges.forEach(({ start, end }, index) => {
    const next = ranges[index + 1]
    const sameMonth = start.month === end.month
    let text = sameMonth
      ? start.text === end.text
        ? `${start.day}`
        : `${start.day}–${end.day}`
      : `${start.day} ${monthName(start.month, locale)} – ${end.day}`
    // Write the month after this part unless the next part is in the same month.
    if (!next || next.start.month !== end.month) text += ` ${monthName(end.month, locale)}`
    parts.push(text)
  })
  return `${parts.join(', ')} ${year}`
}

/*
 * All dates in Chinese: "2026年11月14日、20日至22日".
 * The year and month are written only when they change.
 */
function formatChinese(yearGroups) {
  let currentYear = null
  let currentMonth = null
  const write = (part) => {
    let text = ''
    if (part.year !== currentYear) text += `${part.year}年`
    if (part.year !== currentYear || part.month !== currentMonth) text += `${part.month}月`
    currentYear = part.year
    currentMonth = part.month
    return `${text}${part.day}日`
  }
  return yearGroups
    .flatMap(({ ranges }) => ranges)
    .map(({ start, end }) => (start.text === end.text ? write(start) : `${write(start)}至${write(end)}`))
    .join('、')
}

/*
 * Writes an event's date(s) in the visitor's language.
 *
 * One date (no additionalDates) - exactly as before:
 *   '2027-03-14' -> '14 March 2027' (English), '14 Maret 2027' (Indonesian),
 *                   '2027年3月14日' (Chinese)
 *
 * Several dates - sorted, with consecutive days combined:
 *   English:    November 14, 20–22, 2026
 *   Indonesian: 14, 20–22 November 2026
 *   Chinese:    2026年11月14日、20日至22日
 * Dates in different years are separated by "; " (English, Indonesian).
 *
 * Returns '' when the event has no date yet, so the caller can show its own
 * "Date to be announced" text.
 */
export function formatEventDate(event, languageCode) {
  const dates = getEventDates(event)
  if (dates.length === 0) return ''
  const language = languages.find((item) => item.code === languageCode)
  const locale = language?.dateLocale ?? 'en-GB'

  if (dates.length === 1) {
    const { year, month, day } = toParts(dates[0])
    return new Date(year, month - 1, day).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const yearGroups = groupByYear(toRanges(dates))
  if (languageCode === 'zh-TW') return formatChinese(yearGroups)
  const formatYear = languageCode === 'en' ? formatMonthFirst : formatDayFirst
  return yearGroups.map((group) => formatYear(group, locale)).join('; ')
}

/* ---------- Venues ---------- */

/*
 * The structured "venues" of a multi-location event, as
 * [{ activity, location }] (texts not yet translated). Entries without a
 * location are left out. [] when the event has no "venues" list.
 */
export function getEventVenues(event) {
  if (!Array.isArray(event.venues)) return []
  return event.venues.filter((venue) => venue && venue.location)
}

/*
 * The structured "fees" of an event with several ticket categories, as
 * [{ category, price, notes }] (texts not yet translated). Entries without
 * a price are left out. [] when the event has no "fees" list.
 */
export function getEventFees(event) {
  if (!Array.isArray(event.fees)) return []
  return event.fees.filter((fee) => fee && fee.price)
}

/*
 * PRICE TABLE
 * Turns an event's "fees" into a compact Early Bird / Regular table, one row
 * per competition or activity, with texts in the visitor's language:
 *
 *   {
 *     sharedEarlyBirdNote,   // e.g. "Until October 26, 2026" when every
 *                            // Early Bird price has the same note, else ''
 *     rows: [{ key, label, unit, earlyBird: { price, note }, regular: { price, note } }],
 *   }
 *
 * A fee belongs to a row and a column through its optional "group" and
 * "tier" ('earlyBird' or 'regular') fields, or, without them, through a
 * category written as "Name - Early Bird" / "Name - Regular" (the English
 * text decides the column; each language's text before " - " is the name).
 * A price ending in a shared unit such as "/team" moves the unit next to
 * the name ("E-Sports (per team)") so the price columns stay short.
 *
 * Returns null when any fee cannot be placed in Early Bird or Regular, so
 * the caller shows its simple list instead and nothing is lost.
 */
const tierSuffix = /\s+[-–—]\s+(early\s*bird|regular)\s*$/i
const nameSeparator = /\s+[-–—]\s+[^-–—]*$/

function getFeeTier(fee) {
  if (fee.tier === 'earlyBird' || fee.tier === 'regular') return fee.tier
  const match = localize(fee.category, 'en').match(tierSuffix)
  if (!match) return ''
  return /early/i.test(match[1]) ? 'earlyBird' : 'regular'
}

// Known units after a "/" in a price, e.g. "NT$450/team".
const priceUnits = ['team', 'person', 'pax', 'pair']

function splitPrice(price) {
  const match = price.match(/^(.*?)\s*\/\s*([a-z]+)\s*$/i)
  if (match && priceUnits.includes(match[2].toLowerCase())) {
    return { amount: match[1], unit: match[2].toLowerCase() }
  }
  return { amount: price, unit: '' }
}

export function buildFeeTable(event, languageCode) {
  const fees = getEventFees(event)
  if (fees.length === 0) return null
  const tiers = fees.map(getFeeTier)
  if (tiers.some((tier) => !tier)) return null

  const rows = []
  fees.forEach((fee, index) => {
    const englishName = fee.group
      ? localize(fee.group, 'en')
      : localize(fee.category, 'en').replace(nameSeparator, '')
    const label = fee.group
      ? localize(fee.group, languageCode)
      : localize(fee.category, languageCode).replace(nameSeparator, '')
    let row = rows.find((item) => item.key === englishName)
    if (!row) {
      row = { key: englishName, label, units: new Set(), earlyBird: null, regular: null }
      rows.push(row)
    }
    const { amount, unit } = splitPrice(localize(fee.price, languageCode))
    row.units.add(unit)
    row[tiers[index]] = { amount, unit, note: localize(fee.notes, languageCode) }
  })

  // A unit shared by both prices of a row moves next to the name.
  const finalRows = rows.map(({ units, ...row }) => {
    const shared = units.size === 1 ? [...units][0] : ''
    const cell = (entry) =>
      entry && { price: shared || !entry.unit ? entry.amount : `${entry.amount}/${entry.unit}`, note: entry.note }
    return { ...row, unit: shared, earlyBird: cell(row.earlyBird), regular: cell(row.regular) }
  })

  // One Early Bird note (the deadline) for everyone, if they all agree.
  const earlyNotes = finalRows.filter((row) => row.earlyBird).map((row) => row.earlyBird.note)
  const sharedEarlyBirdNote =
    earlyNotes.length > 0 && earlyNotes.every((note) => note && note === earlyNotes[0])
      ? earlyNotes[0]
      : ''
  if (sharedEarlyBirdNote) {
    finalRows.forEach((row) => {
      if (row.earlyBird) row.earlyBird.note = ''
    })
  }

  return { sharedEarlyBirdNote, rows: finalRows }
}

/* ---------- Lists ---------- */

/*
 * Upcoming events, the one happening soonest first. A multi-day event is
 * placed by its NEXT date, so an event whose first day has passed but which
 * has more days ahead still counts (and can be the featured event).
 * Events without a date go to the end.
 */
export function getUpcomingEvents(events) {
  const today = getTodayString()
  return events
    .filter((event) => isUpcoming(event, today))
    .map((event) => ({ event, next: getNextDate(event, today) }))
    .sort((first, second) => {
      if (!first.next) return 1
      if (!second.next) return -1
      return first.next.localeCompare(second.next)
    })
    .map(({ event }) => event)
}

/* Past events, the one that ended most recently first. */
export function getPastEvents(events) {
  const today = getTodayString()
  const lastDate = (event) => getEventDates(event).at(-1)
  return events
    .filter((event) => !isUpcoming(event, today))
    .sort((first, second) => lastDate(second).localeCompare(lastDate(first)))
}
