import { partners as allPartners, partnerTiers } from '../data/partners.js'
import { getTodayString } from './eventHelpers.js'

/*
 * Helper functions for the official partners in src/data/partners.js.
 * Every part of the website that shows partners (the Partners page, the
 * homepage section and the footer link) uses these, so the rules about
 * which partners are visible live in one place only.
 */

/*
 * True only for a real calendar date written as 'YYYY-MM-DD'.
 * Rejects '', '2026-9-1', '2026-02-30' and anything that is not text.
 */
function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

/*
 * A partner is active when it has a name and a logo, both dates are valid,
 * and today falls between them (both days included). Anything missing or
 * mistyped means "not active", so a partnership is never shown by mistake.
 * Dates in 'YYYY-MM-DD' form can be compared as plain text.
 */
export function isPartnerActive(partner, today = getTodayString()) {
  if (!partner?.name || !partner.logo) return false
  return isWithinDates(partner, today)
}

/*
 * True when both dates are valid and today falls between them (both days
 * included). Shared by official partners and the sponsored local business
 * listings (src/utils/resourceHelpers.js).
 */
export function isWithinDates({ startDate, endDate }, today = getTodayString()) {
  if (!isValidDate(startDate) || !isValidDate(endDate)) return false
  if (endDate < startDate) return false
  return startDate <= today && today <= endDate
}

/* Active partners, in the order they are listed in the data file. */
export function getActivePartners(partners = allPartners) {
  const today = getTodayString()
  return partners.filter((partner) => isPartnerActive(partner, today))
}

/* Active partners that should also appear on the homepage. */
export function getFeaturedPartners(partners = allPartners) {
  return getActivePartners(partners).filter((partner) => partner.featured === true)
}

/* True when the Partners page and footer link should be shown at all. */
export function hasActivePartners(partners = allPartners) {
  return getActivePartners(partners).length > 0
}

/*
 * Splits active partners into groups for the Partners page.
 * Returns a list of { tier, partners }:
 *   - When no active partner has a known tier, one group with tier null
 *     (shown without a heading).
 *   - Otherwise one group per tier, in the order of partnerTiers, followed
 *     by a heading-less group for any partners without a known tier.
 * Empty groups are left out.
 */
export function groupPartnersByTier(partners = getActivePartners()) {
  const findTier = (partner) => partnerTiers.find((tier) => tier.id === partner.tier)
  const hasTiers = partners.some(findTier)
  if (!hasTiers) {
    return partners.length > 0 ? [{ tier: null, partners }] : []
  }

  const groups = partnerTiers.map((tier) => ({
    tier,
    partners: partners.filter((partner) => partner.tier === tier.id),
  }))
  groups.push({ tier: null, partners: partners.filter((partner) => !findTier(partner)) })
  return groups.filter((group) => group.partners.length > 0)
}

/* True when a link points to Instagram, so it can be labelled as such. */
export function isInstagramUrl(url) {
  return /^https?:\/\/(www\.)?instagram\.com\//i.test(url ?? '')
}
