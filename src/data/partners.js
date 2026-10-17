/*
 * OFFICIAL PARTNERS
 * -----------------
 * Organisations, companies and institutions that support PPI Hsinchu as an
 * organisation (not just one event). They appear on the "Our Partners" page
 * (/partners), and featured partners also appear near the bottom of the
 * homepage.
 *
 * This list is separate from event sponsors, media partners and local
 * business promotions (src/data/localBusinesses.js). Adding someone here
 * does not show them anywhere else.
 *
 * WHILE THIS LIST IS EMPTY (or every partnership has ended), the website
 * shows nothing about partners at all: no homepage section, no footer link,
 * and /partners sends visitors back to the homepage.
 *
 * HOW TO ADD A PARTNER
 * Copy this example into the list below and fill it in:
 *
 *   {
 *     id: 'example-company',            // short unique name, no spaces
 *     name: 'Example Company',          // never translated
 *     logo: 'images/partners/example-company.png',
 *     description: {
 *       en: 'One or two sentences about the partner.',
 *       id: 'Satu atau dua kalimat tentang mitra.',
 *       'zh-TW': '一兩句關於合作夥伴的介紹。',
 *     },
 *     url: 'https://www.example.com',   // website or Instagram, or ''
 *     tier: 'official',                 // an id from partnerTiers, or ''
 *     startDate: '2026-09-01',          // first day shown (YYYY-MM-DD)
 *     endDate: '2027-08-31',            // last day shown (YYYY-MM-DD)
 *     featured: true,                   // also show the logo on the homepage
 *   },
 *
 * - Put logo files in public/images/partners/. Transparent PNG or SVG
 *   logos look best. Any shape works; the logo is never stretched.
 * - A partner is shown only from startDate to endDate (both days included).
 *   Both dates are required. A partner with a missing or mistyped date is
 *   never shown, so a mistake cannot accidentally keep an old partnership
 *   online. There is no need to delete partners whose partnership has ended.
 * - Partners appear in the order they are listed here.
 */
export const partners = []

/*
 * PARTNERSHIP TIERS
 * On the Partners page, partners are grouped under these headings, in this
 * order. A partner's "tier" must match one of the ids below.
 * If no active partner has a tier, all partners are shown together without
 * headings. Tiers can be added, renamed or removed freely.
 */
export const partnerTiers = [
  {
    id: 'strategic',
    name: {
      en: 'Strategic Partners',
      id: 'Mitra Strategis',
      'zh-TW': '策略合作夥伴',
    },
  },
  {
    id: 'official',
    name: {
      en: 'Official Partners',
      id: 'Mitra Resmi',
      'zh-TW': '官方合作夥伴',
    },
  },
]
