// eslint-disable-next-line no-unused-vars -- used by the entries added below
import { tags } from './resourceTags.js'

/*
 * ESSENTIAL LOCAL SERVICES
 * ------------------------
 * Every entry in this list appears inside the "Essential local services"
 * section of Resources > Living in Hsinchu: post offices, places of
 * worship, phone shops, and other useful services near campus. While the
 * list is empty, that section is hidden.
 *
 * To add a service, copy this into the list and fill it in:
 *
 *   {
 *     id: 'example-post-office',
 *     name: { en: 'Example Post Office', 'zh-TW': '範例郵局' },
 *     tags: [tags.essentials],
 *     description: { en: 'Sending parcels home.', id: '...', 'zh-TW': '...' },
 *     address: '...',
 *     googleMapsUrl: 'https://maps.app.goo.gl/...',
 *     websiteUrl: 'https://...',
 *     phone: '03-000-0000',
 *   },
 *
 * Only "name" is required; the fields work exactly as in foodAndGroceries.js.
 * A shop or restaurant listed here can say so with type: 'shop' or
 * type: 'restaurant' so the type filter finds it.
 */
export const localServices = []
