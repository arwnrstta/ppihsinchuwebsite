// eslint-disable-next-line no-unused-vars -- used by the entries added below
import { tags } from './resourceTags.js'

/*
 * HOSPITALS, CLINICS AND PHARMACIES
 * ---------------------------------
 * Every facility in this list appears inside the "Hospitals, clinics and
 * pharmacies" section of Resources > Healthcare & Emergency. While the list
 * is empty, that section is hidden.
 *
 * To add a facility, copy this into the list and fill it in:
 *
 *   {
 *     id: 'example-hospital',
 *     type: 'hospital',                 // 'hospital', 'clinic' or 'pharmacy'
 *     name: { en: 'Example Hospital', 'zh-TW': '範例醫院' },
 *     tags: [tags.medical],
 *     description: { en: 'Large hospital near the science park.', id: '...', 'zh-TW': '...' },
 *     address: '...',
 *     googleMapsUrl: 'https://maps.app.goo.gl/...',  // Google Maps > Share > Copy link
 *     websiteUrl: 'https://...',
 *     phone: '03-000-0000',
 *     serviceInfo: {
 *       en: 'International medical service centre.',
 *       id: '...',
 *       'zh-TW': '...',
 *     },
 *   },
 *
 * - "type" decides the type filter (Hospitals / Clinics / Pharmacies).
 *   Without it, a facility counts as a hospital.
 * - serviceInfo is for details confirmed by the facility itself. Never
 *   write "open 24 hours" or "English-speaking" unless that is verified.
 * - Facilities can never be sponsored (see src/data/localBusinesses.js).
 * - Emergency numbers do NOT go here; they are in src/data/resources.js.
 */
export const healthcareFacilities = []
