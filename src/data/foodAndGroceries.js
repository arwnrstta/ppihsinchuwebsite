import { tags } from './resourceTags.js'

/*
 * INDONESIAN FOOD & GROCERIES
 * ---------------------------
 * Every business in this list appears in the "Indonesian Food & Groceries"
 * directory (Resources > Living in Hsinchu): Indonesian restaurants and
 * warungs, Indonesian grocery stores and minimarkets, and halal shops
 * selling Indonesian products. A business that is both a restaurant and a
 * shop is listed ONCE, with both business types.
 *
 * HOW TO ADD A BUSINESS
 * Copy this example into the list below and fill it in. Nothing else
 * needs changing.
 *
 *   {
 *     id: 'warung-example',                  // short unique name, no spaces
 *     name: 'Warung Example',                // the business's own name
 *     businessTypes: ['restaurant'],         // 'restaurant', 'grocery', or both:
 *                                            // ['restaurant', 'grocery']
 *     tags: [tags.halal],                    // labels from src/data/resourceTags.js
 *     description: {
 *       en: 'Home-style Indonesian food.',
 *       id: 'Masakan rumahan khas Indonesia.',
 *       'zh-TW': '印尼家常料理。',
 *     },
 *     address: 'No. 1, Example Rd., East District, Hsinchu City, 300',
 *     region: 'hsinchu-city',                // see "regions" in universities.js
 *     nearbyUniversities: ['nthu', 'nycu'],  // ONLY when checked (see below)
 *     googleMapsUrl: 'https://maps.app.goo.gl/...',  // Google Maps > Share > Copy link
 *     websiteUrl: 'https://www.example.com',
 *     instagramUrl: 'https://www.instagram.com/warungexample/',
 *     phone: '03-000-0000',
 *     image: '/images/resources/restaurants/warung-example.jpg',
 *   },
 *
 * Only "name" is required. Leave out any line you do not have: a business
 * with only a name and a Google Maps link shows just that, with one
 * "Open in Google Maps" button. Never guess a map link or an address.
 *
 * LOCATION AND UNIVERSITIES
 *   region             - 'hsinchu-city', 'hsinchu-county', 'miaoli-county' or
 *                        'new-taipei-city' (the list is "regions" in
 *                        src/data/universities.js). Without it, the region is
 *                        read from the address ("..., Hsinchu City, 300").
 *                        The Location filter shows Hsinchu City, Hsinchu
 *                        County and Other Areas (Miaoli, New Taipei and any
 *                        place whose region is unknown).
 *   nearbyUniversities - the ids of the schools this place is genuinely
 *                        convenient for, from src/data/universities.js:
 *                        'nthu', 'nycu', 'ypu' (Yuanpei), 'chu' (Chung Hua),
 *                        'cute', 'ydu' (Yu Da), 'hwu' (Hsing Wu).
 *                        Shown as a campus tag, e.g. "Near NTHU / NYCU".
 *                        Add a school only after someone has checked the
 *                        distance (for example a short walk, ride or bus
 *                        trip that students actually make). Being in the
 *                        same city or district is NOT enough. A place can be
 *                        near several schools.
 *   latitude, longitude - optional exact position, copied from Google Maps
 *                        (right-click the spot, click the two numbers). Not
 *                        shown yet; kept for future features such as a map.
 *   area               - optional short location for the card, e.g.
 *                        'Near NTHU south gate'. Without it, the card shows
 *                        e.g. "Xinyuan St, East District" from the address.
 *
 * PHOTO ("image")
 * One main photo per business. Save it in public/images/resources/restaurants/
 * (landscape, about 1200 x 750 pixels, under about 300 KB) and write its path,
 * or use a full https:// link to a photo the business shared with us.
 * Without a photo, the card shows a neutral drawn placeholder. Only use
 * photos of the business itself, taken by us or shared by the owner; do not
 * copy photos from Google Maps.
 *
 * SPONSORED BUSINESSES
 * Do not mark sponsorship here. Paid placements (with logo, extra photos,
 * longer description and promotion) are set up in src/data/localBusinesses.js
 * and point to the business's id below. Sponsorship never changes the
 * region or nearbyUniversities written here.
 *
 * Optional extras: featured (true = "Recommended" label and shown first),
 * priority (1 is shown before 2), needsVerification (true = still to be
 * checked; see "Verification" in README.md).
 *
 * The list is shown in this order unless featured/priority say otherwise.
 */
export const foodAndGroceries = [
  {
    id: 'lj',
    name: 'Toko indonesia LJ印尼商店',
    businessTypes: ['restaurant'],
    tags: [tags.food, tags.halal],
    address: 'No. 82號, Xinyuan St, Fenggong Village, East District, Hsinchu City, 300',
    region: 'hsinchu-city',
    // TODO: add nearbyUniversities once someone has checked which campuses
    // this is convenient for. If it also sells groceries, add 'grocery'
    // to businessTypes.
    googleMapsUrl: 'https://maps.app.goo.gl/ZWNkcE5gBwKJRsPP7',
    phone: '0973787159',
    image: '/images/resources/restaurants/lj.png',
  },
  {
    id: 'ramayana',
    name: 'Warung Indonesia Ramayana 南洋美食 印尼小吃',
    businessTypes: ['restaurant'],
    tags: [tags.food, tags.halal],
    address: 'No. 199號, Section 2, Guangfu Rd, Guangming Village, East District, Hsinchu City, 300',
    region: 'hsinchu-city',
    // TODO: add nearbyUniversities once someone has checked which campuses
    // this is convenient for.
    googleMapsUrl: 'https://maps.app.goo.gl/zPAMfneX68WWWp4h9',
    phone: '0917530350',
    image: '/images/resources/restaurants/ramayana.png',
  },
]
