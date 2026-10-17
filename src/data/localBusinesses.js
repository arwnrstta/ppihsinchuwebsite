/*
 * SPONSORED LOCAL BUSINESS LISTINGS
 * ---------------------------------
 * Paid placements for local businesses (restaurants, shops, services) in the
 * Resources section. Each listing appears inside the resource section it
 * belongs to (for example "Indonesian restaurants"), above the community's
 * own listings, under a small "Featured Partners" heading and with a
 * "Sponsored" label, so visitors can always tell paid placements apart from
 * the community's own recommendations.
 *
 * This list is separate from the official partners in src/data/partners.js
 * and from event sponsors. Adding a business here does not show it anywhere
 * else.
 *
 * WHILE THIS LIST IS EMPTY (or every listing has ended), no sponsored
 * heading or space appears anywhere.
 *
 * HOW TO ADD A LISTING
 * Copy this example into the list below and fill it in:
 *
 *   {
 *     id: 'example-bakery',             // short unique name, no spaces
 *     section: 'indonesian-restaurants',  // the id of a section in src/data/resources.js
 *     name: 'Example Bakery',           // never translated
 *     description: {
 *       en: 'One or two sentences about the business.',
 *       id: 'Satu atau dua kalimat tentang usaha ini.',
 *       'zh-TW': '一兩句關於商家的介紹。',
 *     },
 *     address: 'No. 1, Example Rd., East District, Hsinchu City',
 *     googleMapsUrl: 'https://maps.app.goo.gl/...',  // Google Maps > Share > Copy link
 *     websiteUrl: 'https://www.example.com',
 *     instagramUrl: 'https://www.instagram.com/examplebakery/',
 *     phone: '03-000-0000',
 *     image: '/images/resources/example-bakery.jpg',  // main photo
 *     logo: '/images/resources/example-bakery-logo.png',
 *     gallery: [                        // extra photos, opened full screen
 *       '/images/resources/example-bakery-2.jpg',
 *       '/images/resources/example-bakery-3.jpg',
 *     ],
 *     promotion: {                      // optional offer, shown highlighted
 *       en: '10% off for students with a PPI Hsinchu membership card.',
 *       id: 'Diskon 10% untuk mahasiswa dengan kartu anggota PPI Hsinchu.',
 *       'zh-TW': '持 PPI Hsinchu 會員卡的學生享九折優惠。',
 *     },
 *     startDate: '2026-09-01',          // first day shown (YYYY-MM-DD)
 *     endDate: '2027-02-28',            // last day shown (YYYY-MM-DD)
 *     priority: 1,                      // optional: 1 is shown before 2
 *   },
 *
 * Every optional field works exactly as in src/data/restaurants.js: leave
 * out what the business does not have, and its button simply does not appear.
 *
 * SECTION IDS: 'indonesian-restaurants', 'halal-groceries', 'local-services'
 *
 * WHEN THE BUSINESS IS ALREADY IN THE DIRECTORY
 * If the restaurant or shop is already listed (e.g. in restaurants.js), do
 * not copy its details. Point to it with "listingId" instead, and it is
 * shown once, at the top, with the "Sponsored" label:
 *
 *   {
 *     section: 'indonesian-restaurants',
 *     listingId: 'lj',                  // the id used in restaurants.js
 *     startDate: '2026-09-01',
 *     endDate: '2027-02-28',
 *   },
 *
 * Any other field written here (a longer description, logo, gallery,
 * promotion...) is added to the directory entry while the sponsorship
 * runs. After endDate the business goes back to an ordinary card.
 *
 * HOW SPONSORED PLACES LOOK
 * In a restaurant or grocery directory, sponsored places appear in a
 * "Featured Partners" strip above the ordinary cards, as wider cards with
 * the logo, photo gallery, description and promotion, and a "Sponsored"
 * label. The strip says that being featured is not a rating or a
 * recommendation. Logo, gallery and promotion are only shown for active
 * sponsorships; ordinary listings show one photo.
 *
 * RULES
 * - A listing is shown only from startDate to endDate (both days included).
 *   Both dates are required. A listing with a missing or mistyped date is
 *   never shown, so a mistake cannot keep an expired placement online.
 *   There is no need to delete listings that have ended.
 * - Sponsored listings can never be emergency contacts or medical
 *   facilities (types 'emergency', 'hospital', 'clinic', 'pharmacy'), and
 *   cannot be placed in the hospitals or universities sections. Such
 *   listings are ignored, so payment can never affect safety, health or
 *   official information.
 * - Sponsored listings never get the "Recommended" label and never change
 *   the order of the community's own listings.
 * - A listing whose "section" does not exist is not shown.
 */
export const sponsoredListings = []
