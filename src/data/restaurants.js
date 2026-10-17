import { tags } from './resourceTags.js'

/*
 * INDONESIAN RESTAURANTS
 * ----------------------
 * Every restaurant in this list appears inside the "Indonesian restaurants"
 * section of Resources > Living in Hsinchu. To add a restaurant, copy the
 * example below into the list and fill it in. Nothing else needs changing.
 *
 *   {
 *     id: 'warung-example',             // short unique name, no spaces
 *     name: 'Warung Example',           // the restaurant's own name
 *     tags: [tags.food, tags.halal],    // labels from src/data/resourceTags.js
 *     description: {
 *       en: 'Home-style Indonesian food.',
 *       id: 'Masakan rumahan khas Indonesia.',
 *       'zh-TW': '印尼家常料理。',
 *     },
 *     address: 'No. 1, Example Rd., East District, Hsinchu City',
 *     googleMapsUrl: 'https://maps.app.goo.gl/...',  // Google Maps > Share > Copy link
 *     websiteUrl: 'https://www.example.com',
 *     instagramUrl: 'https://www.instagram.com/warungexample/',
 *     phone: '03-000-0000',
 *     area: 'Near NTHU',                // optional short location for the card
 *     image: '/images/resources/restaurants/warung-example.jpg',
 *   },
 *
 * Only "name" is required. Leave out any line you do not have: a listing
 * with only a name and a Google Maps link shows just that, with one
 * "Open in Google Maps" button. Never guess a map link or address.
 *
 * PHOTO ("image")
 * One main photo per restaurant. Save it in public/images/resources/restaurants/
 * (landscape, about 1200 x 750 pixels, under about 300 KB) and write its path,
 * or use a full https:// link to a photo the restaurant shared with us.
 * Without a photo, the card shows a neutral drawn placeholder. Only use
 * photos of the restaurant itself, taken by us or shared by the owner;
 * do not copy photos from Google Maps.
 *
 * LOCATION ON THE CARD
 * Cards show a short location such as "Xinyuan St, East District", taken
 * from an English Google Maps address. Write "area" to choose the text
 * yourself; the full address is still used for searching.
 *
 * SPONSORED RESTAURANTS
 * Do not mark sponsorship here. Paid placements (with logo, extra photos,
 * longer description and promotion) are set up in src/data/localBusinesses.js
 * and point to the restaurant's id below.
 *
 * Optional extras: featured (true = "Recommended" label and shown first),
 * priority (1 is shown before 2), needsVerification (true = shows a
 * "Needs verification" label until someone has checked the details).
 *
 * The list is shown in this order unless featured/priority say otherwise.
 */
export const restaurants = [
  {
    id: 'lj',
    name: 'Toko indonesia LJ印尼商店',
    tags: [tags.food, tags.halal],
    address: 'No. 82號, Xinyuan St, Fenggong Village, East District, Hsinchu City, 300',
    googleMapsUrl: 'https://maps.app.goo.gl/ZWNkcE5gBwKJRsPP7',
    phone: '0973787159',
  },
  {
    id: 'ramayana',
    name: 'Warung Indonesia Ramayana 南洋美食 印尼小吃',
    tags: [tags.food, tags.halal],
    address: 'No. 199號, Section 2, Guangfu Rd, Guangming Village, East District, Hsinchu City, 300',
    googleMapsUrl: 'https://maps.app.goo.gl/zPAMfneX68WWWp4h9',
    phone: '0917530350',
  },
]
