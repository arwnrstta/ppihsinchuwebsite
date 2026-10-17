// eslint-disable-next-line no-unused-vars -- used by the entries added below
import { tags } from './resourceTags.js'

/*
 * INDONESIAN AND HALAL GROCERY STORES
 * -----------------------------------
 * Every shop in this list appears inside the "Indonesian and halal grocery
 * stores" section of Resources > Living in Hsinchu. While the list is
 * empty, that section is hidden.
 *
 * To add a shop, copy this into the list and fill it in:
 *
 *   {
 *     id: 'toko-example',
 *     name: 'Toko Example',
 *     tags: [tags.groceries, tags.halal],
 *     description: { en: 'Indonesian snacks and spices.', id: '...', 'zh-TW': '...' },
 *     address: '...',
 *     googleMapsUrl: 'https://maps.app.goo.gl/...',  // Google Maps > Share > Copy link
 *     instagramUrl: 'https://www.instagram.com/...',
 *     phone: '03-000-0000',
 *   },
 *
 * Only "name" is required; the fields work exactly as in restaurants.js.
 * A shop that is really a different kind of place can say so with
 * type: 'shop' (see resourceTypes in src/data/resources.js).
 */
export const groceryStores = []
