/*
 * CURRENT CABINET
 * ---------------
 * Everything that changes when a new PPI Hsinchu administration starts.
 * A new cabinet should only need to edit this file (plus the committee,
 * leadership and other files in src/data).
 *
 * The red PPI Hsinchu branding does NOT live here. It stays the same for
 * every cabinet and is defined in src/styles/variables.css.
 */

export const cabinet = {
  name: 'Kabinet Karya Raya',
  shortName: 'Karya Raya',
  // TODO: Confirm the official term of office.
  period: '2026/2027',
  logo: '/images/brand/logo-karya-raya.png',
  logoAlt: 'Kabinet Karya Raya logo',

  /*
   * CABINET COLOURS
   * These provisional purples were picked from the Karya Raya logo.
   * TODO: Replace with the exact official cabinet colours.
   *
   * primary - main cabinet colour (selected tabs, labels, accents)
   * deep    - a very dark version (dark gradient backgrounds)
   * soft    - a very light version (tints, text on dark backgrounds)
   * accent  - a small highlight colour (the gold of the Karya Raya logo)
   *
   * These values are copied into CSS variables (--cabinet-primary, etc.)
   * when the website starts. See src/utils/applyCabinetTheme.js.
   */
  colors: {
    primary: '#6B46C1',
    deep: '#2D1A5C',
    soft: '#DDD2F4',
    accent: '#E8B04A',
  },

  /*
   * VISION, MISSION AND CABINET PHILOSOPHY
   * TODO: Replace this temporary text with the official wording.
   */
  vision:
    'To be a warm, inclusive, and active home for Indonesian students in Hsinchu: a community that grows together academically, professionally, and culturally.',

  mission: [
    'Connect Indonesian students across Hsinchu through regular gatherings and shared activities.',
    'Support students as they settle in, study, and plan their careers in Taiwan.',
    'Celebrate and share Indonesian culture with the wider Hsinchu community.',
    'Build lasting partnerships with universities, organisations, and sponsors.',
  ],

  philosophy: {
    summary:
      '“Karya Raya” means “great work”. The name reflects a cabinet that values meaningful contribution: many hands working together to create something larger than any one person.',
    points: [
      {
        title: 'Karya',
        text: 'Work that is done with care, and that leaves something useful behind for the next generation of students.',
      },
      {
        title: 'Raya',
        text: 'Great in spirit and in reach: open to every Indonesian student in Hsinchu, wherever they study.',
      },
    ],
  },
}
