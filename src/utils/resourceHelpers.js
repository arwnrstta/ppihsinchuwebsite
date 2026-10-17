import { sponsoredListings } from '../data/localBusinesses.js'
import { resourceCategories, resourceTypes } from '../data/resources.js'
import { locationGroups, regions, universities } from '../data/universities.js'
import { assetPath } from './assetPath.js'
import { getTodayString } from './eventHelpers.js'
import { localize } from './localize.js'
import { isWithinDates } from './partnerHelpers.js'

/*
 * Helper functions for the Resources section.
 * They turn src/data/resources.js, the listing files it imports
 * (foodAndGroceries.js, localServices.js...) and the sponsored listings in
 * src/data/localBusinesses.js into ready-to-draw entries: links are
 * checked, phone numbers turned into "tel:" links, items sorted, and empty
 * sections and categories left out. The components only draw what is here,
 * so the rules about what is shown live in one place.
 *
 * Each category gets a list of "entries", each one of:
 *   { kind: 'card', ... }     - a single resource (guide, link, hotline)
 *   { kind: 'section', ... }  - one expandable card holding many places:
 *        listings  - the community's own places, sorted
 *        sponsored - active sponsored places, shown above the others
 */

const defaultType = 'information'

// Only businesses can be sponsored: never emergency, medical or official
// information (see localBusinesses.js).
const sponsorableLayouts = ['place', 'service']

/* Logs a problem in the data while developing ("npm run dev") only. */
function warn(message) {
  if (import.meta.env.DEV) console.warn(`[resources] ${message}`)
}

/* The URL object for a full http(s) link, or null for anything else. */
function parseWebUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null
  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' || url.protocol === 'http:' ? url : null
  } catch {
    return null
  }
}

/* Any full http(s) link (already checked by parseWebUrl). */
const isWebUrl = () => true

/* Links copied from Google Maps (google.com/maps, maps.google.com, maps.app.goo.gl...). */
function isGoogleMapsUrl(url) {
  const host = url.hostname.toLowerCase()
  if (host === 'maps.app.goo.gl') return true
  if (host === 'goo.gl') return url.pathname.startsWith('/maps')
  if (/^maps\.google\.[a-z.]+$/.test(host)) return true
  return /^(www\.)?google\.[a-z.]+$/.test(host) && url.pathname.startsWith('/maps')
}

function isInstagramUrl(url) {
  return /^(www\.)?instagram\.com$/.test(url.hostname.toLowerCase())
}

/*
 * Returns the link when it is valid for its purpose, or '' (with a warning
 * while developing) so a broken or wrong link is never drawn.
 */
function checkLink(value, isAllowed, fieldName, itemName) {
  if (!value) return ''
  const url = parseWebUrl(value)
  if (url && isAllowed(url)) return url.href
  warn(`"${itemName}": ${fieldName} "${value}" is not a valid link and is hidden.`)
  return ''
}

/*
 * Turns a phone number as written in the data ('03-571-5131', '+886 3 571 5131',
 * '110') into { display, href }, or null when it is not a usable number.
 */
export function parsePhone(value, itemName = '') {
  if (value === null || value === undefined || value === '') return null
  const display = String(value).trim()
  const dialable = display.replace(/[\s().-]/g, '')
  if (!/^\+?\d{3,15}$/.test(dialable)) {
    warn(`"${itemName}": phone "${display}" is not a valid number and is hidden.`)
    return null
  }
  return { display, href: `tel:${dialable}` }
}

/* The type id of an item: one from resourceTypes, or the fallback. */
function getTypeId(type, itemName, fallback = defaultType) {
  if (!type) return fallback
  if (resourceTypes[type]) return type
  warn(`"${itemName}": unknown type "${type}", shown as '${fallback}'.`)
  return fallback
}

const layoutOf = (typeId) => resourceTypes[typeId]?.layout ?? 'info'

/*
 * Turns one item or place from a data file into a card, or null when it
 * cannot be shown (no name, or an emergency contact without a valid phone).
 *
 *   key         - a unique key for React
 *   categoryId  - the category it belongs to
 *   defaultType - the type to use when the item has none
 *   sponsored   - true for listings from localBusinesses.js
 */
function toCard(item, { key, categoryId, defaultType: fallbackType = defaultType, sponsored = false }) {
  const itemName = localize(item?.name, 'en')
  if (!itemName) {
    warn(`An item in "${categoryId}" has no name and is hidden.`)
    return null
  }

  const businessTypes = toBusinessTypes(item, itemName)
  const type = getTypeId(item.type ?? businessTypes[0], itemName, fallbackType)
  const layout = layoutOf(type)
  const phone = parsePhone(item.phone, itemName)

  if (layout === 'emergency' && !phone) {
    warn(`Emergency contact "${itemName}" has no valid phone number and is hidden.`)
    return null
  }

  return {
    ...item,
    kind: 'card',
    key,
    categoryId,
    type,
    layout,
    sponsored,
    labels: toLabels(item),
    image: isImagePath(item.image) ? assetPath(item.image) : '',
    // The path as written, for the photo viewer (which adds the folder itself).
    imageSource: isImagePath(item.image) ? item.image : '',
    logo: isImagePath(item.logo) ? assetPath(item.logo) : '',
    gallery: toGallery(item.gallery),
    area: item.area || item.district || shortLocation(item.address),
    businessTypes: businessTypes.length > 0 ? businessTypes : [type],
    region: toRegion(item, itemName),
    nearbyUniversities: toUniversityIds(item.nearbyUniversities, itemName),
    latitude: toCoordinate(item.latitude, 90),
    longitude: toCoordinate(item.longitude, 180),
    phone,
    googleMapsUrl: checkLink(item.googleMapsUrl, isGoogleMapsUrl, 'googleMapsUrl', itemName),
    websiteUrl: checkLink(item.websiteUrl, isWebUrl, 'websiteUrl', itemName),
    instagramUrl: checkLink(item.instagramUrl, isInstagramUrl, 'instagramUrl', itemName),
  }
}

/* The valid ids in "businessTypes" (e.g. ['restaurant', 'grocery']). */
function toBusinessTypes(item, itemName) {
  if (!Array.isArray(item.businessTypes)) return []
  return item.businessTypes.filter((typeId) => {
    if (resourceTypes[typeId]) return true
    warn(`"${itemName}": unknown business type "${typeId}" is ignored.`)
    return false
  })
}

/*
 * The region id of a place: its own "region", or the region whose
 * addressMatches appear in its address (see src/data/universities.js).
 */
function toRegion(item, itemName) {
  if (item.region) {
    if (regions.some((region) => region.id === item.region)) return item.region
    warn(`"${itemName}": unknown region "${item.region}".`)
  }
  const address = typeof item.address === 'string' ? item.address.toLowerCase() : ''
  if (!address) return ''
  const found = regions.find((region) =>
    (region.addressMatches ?? []).some((word) => address.includes(word.toLowerCase())),
  )
  return found?.id ?? ''
}

/* The ids in "nearbyUniversities" that exist in src/data/universities.js. */
function toUniversityIds(ids, itemName) {
  if (!Array.isArray(ids)) return []
  return ids.filter((id) => {
    if (universities.some((university) => university.id === id)) return true
    warn(`"${itemName}": unknown university "${id}" in nearbyUniversities is ignored.`)
    return false
  })
}

/* A latitude/longitude number within range, or null. */
function toCoordinate(value, limit) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= limit
    ? value
    : null
}

/* A local picture path ('/images/...') or a full https:// link. */
function isImagePath(value) {
  return typeof value === 'string' && (value.startsWith('/') || /^https:\/\//.test(value))
}

/*
 * Extra photos (sponsored places only). Each one can be a path, or
 * { src, alt } when it needs its own description.
 */
function toGallery(gallery) {
  if (!Array.isArray(gallery)) return []
  return gallery
    .map((photo) => (typeof photo === 'string' ? { src: photo } : photo))
    .filter((photo) => isImagePath(photo?.src))
    .map((photo) => ({ ...photo, url: assetPath(photo.src) }))
}

/*
 * A short location for cards, taken from an English Google Maps address:
 * 'No. 82號, Xinyuan St, ..., East District, Hsinchu City, 300' becomes
 * 'Xinyuan St, East District' (or 'East District, Hsinchu City' when there
 * is no street). Returns '' when the address has another form; the card
 * then shows the full address instead. Write "area" on an item to choose
 * the text yourself.
 */
export function shortLocation(address) {
  if (typeof address !== 'string') return ''
  const parts = address.split(',').map((part) => part.trim())
  const district = parts.find((part) => /\bdistrict$/i.test(part))
  if (!district) return ''
  const street = parts.find((part) =>
    /\b(st|rd|road|street|ave|avenue|blvd|boulevard|ln|lane|alley)\.?$/i.test(part),
  )
  const city = parts.find((part) => /\b(city|county)$/i.test(part))
  if (street) return `${street}, ${district}`
  return city ? `${district}, ${city}` : ''
}

function toLabels(item) {
  return [item.tag, ...(Array.isArray(item.tags) ? item.tags : [])].filter(Boolean)
}

/*
 * Sort order: featured first, then by priority (1 before 2, any priority
 * before none), then in the order of the data file.
 */
function sortCards(cards) {
  const priorityOf = (card) =>
    typeof card.priority === 'number' ? card.priority : Number.POSITIVE_INFINITY
  return cards
    .map((card, index) => ({ card, index }))
    .sort(
      (a, b) =>
        Number(b.card.featured === true) - Number(a.card.featured === true) ||
        priorityOf(a.card) - priorityOf(b.card) ||
        a.index - b.index,
    )
    .map(({ card }) => card)
}

/* Copies only the fields that are actually filled in. */
function filledFields(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  )
}

/*
 * Builds one expandable section from an item with "listings".
 * Active sponsored listings for the section are placed above the others;
 * a sponsored listing that points to an existing place with "listingId" is
 * merged with it, so the business appears only once.
 */
function toSection(item, { key, categoryId, today }) {
  const sectionName = localize(item.name, 'en') || item.id
  const listingType = getTypeId(item.listingType, sectionName)
  const sectionKey = `section-${categoryId}-${item.id ?? key}`
  const rawListings = Array.isArray(item.listings) ? item.listings : []

  // Sponsored listings for this section that are running today.
  const sponsorable = sponsorableLayouts.includes(layoutOf(listingType))
  const activeSponsored = sponsoredListings.filter(
    (listing) => item.id && listing?.section === item.id && isWithinDates(listing, today),
  )
  if (!sponsorable && activeSponsored.length > 0) {
    warn(`Section "${sectionName}" cannot hold sponsored listings; they are hidden.`)
  }

  const sponsoredIds = new Set()
  const sponsored = sponsorable
    ? activeSponsored
        .map((listing, index) => {
          const { listingId, ...fields } = listing
          let base = {}
          if (listingId) {
            base = rawListings.find((place) => place?.id === listingId)
            if (!base) {
              warn(`Sponsored listing "${listingId}" does not match any place in "${sectionName}"; it is hidden.`)
              return null
            }
            sponsoredIds.add(listingId)
          }
          let merged = { ...base, ...filledFields(fields), featured: false }
          if (listingId) {
            // Where a business is, and which campuses it is near, always
            // comes from the directory itself, never from the sponsorship.
            const locationFields = ['region', 'nearbyUniversities', 'latitude', 'longitude']
            if (locationFields.some((field) => field in fields)) {
              warn(`Sponsored listing "${listingId}": location fields are taken from the directory, not the sponsorship.`)
            }
            merged = {
              ...merged,
              ...Object.fromEntries(locationFields.map((field) => [field, base[field]])),
            }
          }
          return toCard(merged, {
            key: `${sectionKey}-sponsored-${listing.id ?? listingId ?? index}`,
            categoryId,
            defaultType: listingType,
            sponsored: true,
          })
        })
        .filter(Boolean)
        .filter((card) => {
          if (sponsorableLayouts.includes(card.layout)) return true
          warn(`Sponsored listing "${localize(card.name, 'en')}" has type "${card.type}", which cannot be sponsored. It is hidden.`)
          return false
        })
    : []

  const listings = rawListings
    // A place that is currently sponsored is shown once, in the sponsored group.
    .filter((place) => !(place?.id && sponsoredIds.has(place.id)))
    .map((place, index) =>
      toCard(place, {
        key: `${sectionKey}-${place?.id ?? index}`,
        categoryId,
        defaultType: listingType,
      }),
    )
    .filter(Boolean)

  if (listings.length === 0 && sponsored.length === 0) return null

  return {
    kind: 'section',
    key: sectionKey,
    id: item.id,
    categoryId,
    name: item.name,
    description: item.description,
    labels: toLabels(item),
    icon: item.icon,
    listingType,
    layout: layoutOf(listingType),
    featured: item.featured,
    priority: item.priority,
    listings: sortCards(listings),
    sponsored: sortCards(sponsored),
    filters: toFilters(item.filters, sectionName),
  }
}

/*
 * The filters a directory section shows (see the Indonesian Food &
 * Groceries section in resources.js), or null for none.
 */
function toFilters(filters, sectionName) {
  if (!filters || typeof filters !== 'object') return null
  const businessTypes = (Array.isArray(filters.businessTypes) ? filters.businessTypes : []).filter(
    (typeId) => {
      if (resourceTypes[typeId]) return true
      warn(`Section "${sectionName}": unknown business type "${typeId}" in filters.`)
      return false
    },
  )
  return {
    businessTypes: businessTypes.length > 1 ? businessTypes : [],
    location: filters.location === true,
  }
}

/*
 * Every category that has something to show, each with its "entries"
 * (cards and sections, sorted). Empty sections and categories are left out
 * entirely, so their tab, navbar entry and heading disappear by themselves.
 */
export function getVisibleCategories(today = getTodayString()) {
  return resourceCategories
    .map((category) => {
      const entries = (category.items ?? [])
        .map((item, index) =>
          Array.isArray(item?.listings)
            ? toSection(item, { key: index, categoryId: category.id, today })
            : toCard(item, {
                key: `resource-${category.id}-${item?.id ?? index}`,
                categoryId: category.id,
              }),
        )
        .filter(Boolean)
      return { ...category, entries: sortCards(entries) }
    })
    .filter((category) => category.entries.length > 0)
}

/* All the text of a card or section heading, in one language, for the search. */
function searchableText(entry, languageCode) {
  return [
    entry.name,
    ...entry.labels,
    resourceTypes[entry.type]?.label,
    ...(entry.businessTypes ?? []).map((typeId) => resourceTypes[typeId]?.label),
    regions.find((region) => region.id === entry.region)?.name,
    ...(entry.nearbyUniversities ?? []).flatMap((id) => {
      const university = universities.find((school) => school.id === id)
      return university ? [university.shortName, university.tagName, university.name] : []
    }),
    entry.description,
    entry.area,
    entry.address,
    entry.serviceInfo,
    entry.notes,
    entry.phone?.display,
    ...(entry.steps ?? []),
  ]
    .map((text) => localize(text, languageCode))
    .join(' ')
    .toLowerCase()
}

/*
 * The entries that match a search. A section whose own title or
 * description matches is kept whole; otherwise it keeps only the places
 * that match, and disappears when none do.
 */
export function searchEntries(entries, query, languageCode) {
  const matches = (entry) => searchableText(entry, languageCode).includes(query)
  return entries
    .map((entry) => {
      if (entry.kind !== 'section') return matches(entry) ? entry : null
      if (matches(entry)) return entry
      const listings = entry.listings.filter(matches)
      const sponsored = entry.sponsored.filter(matches)
      return listings.length + sponsored.length > 0 ? { ...entry, listings, sponsored } : null
    })
    .filter(Boolean)
}

/*
 * The entries for one type ('all' for everything). Emergency contacts are
 * always kept. Sections keep only places of that type.
 */
export function filterEntriesByType(entries, typeId) {
  if (typeId === 'all') return entries
  return entries
    .map((entry) => {
      if (entry.kind !== 'section') {
        return entry.layout === 'emergency' || entry.type === typeId ? entry : null
      }
      // Directories with their own filters are filtered there instead.
      if (entry.filters) return entry
      const listings = entry.listings.filter((card) => card.type === typeId)
      const sponsored = entry.sponsored.filter((card) => card.type === typeId)
      return listings.length + sponsored.length > 0 ? { ...entry, listings, sponsored } : null
    })
    .filter(Boolean)
}

/*
 * The types used in a category (emergency contacts excluded, as they always
 * stay visible), including the places inside sections, in the order of
 * resourceTypes. The type filter is only shown when there are two or more.
 */
export function getFilterTypes(entries) {
  const used = new Set()
  for (const entry of entries) {
    if (entry.kind === 'section') {
      // Directories with their own filters do not add to the category filter.
      if (entry.filters) continue
      ;[...entry.listings, ...entry.sponsored].forEach((card) => used.add(card.type))
    } else if (entry.layout !== 'emergency') {
      used.add(entry.type)
    }
  }
  return Object.keys(resourceTypes)
    .filter((typeId) => used.has(typeId))
    .map((typeId) => ({ id: typeId, label: resourceTypes[typeId].label }))
}

/* True when a card has at least one action button (map, website, Instagram, phone). */
export function hasActions(card) {
  return Boolean(card.googleMapsUrl || card.websiteUrl || card.instagramUrl || card.phone)
}

/* How many results a list of entries holds: one per card or place. */
export function countResults(entries) {
  return entries.reduce(
    (total, entry) =>
      total + (entry.kind === 'section' ? entry.listings.length + entry.sponsored.length : 1),
    0,
  )
}

/* ---------- Directory filters (Indonesian Food & Groceries) ---------- */

/* The choices of the "Location" filter (locationGroups in universities.js). */
export function getLocationGroups() {
  return locationGroups
}

/*
 * The Location filter choice a place falls under: its region's
 * locationGroup, or 'other' when the region is unknown.
 */
export function locationGroupOf(place) {
  return regions.find((region) => region.id === place.region)?.locationGroup ?? 'other'
}

/* True when a place fits the chosen type and location. 'all' means "any". */
export function matchesDirectoryFilters(place, { typeId, locationId }) {
  if (typeId !== 'all' && !place.businessTypes.includes(typeId)) return false
  if (locationId !== 'all' && locationGroupOf(place) !== locationId) return false
  return true
}

/*
 * The campus tag of a place, e.g. "NTHU / NYCU", built from its checked
 * nearbyUniversities and each school's tagName. '' when there is none.
 */
export function campusTagText(place, languageCode) {
  return (place.nearbyUniversities ?? [])
    .map((id) => universities.find((university) => university.id === id))
    .filter(Boolean)
    .map((university) => localize(university.tagName ?? university.shortName, languageCode))
    .filter(Boolean)
    .join(' / ')
}
