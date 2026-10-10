/*
 * ABOUT: "WHO WE ARE" CONTENT
 * TODO: Replace this temporary text with the official introduction.
 */

/*
 * The tabs of the About section, in the order they appear.
 * Change a "label" to rename a tab. The same labels are used in the
 * navbar's About dropdown. Leave the "id" values as they are: the code
 * uses them to decide which content to show.
 */
export const aboutTabs = [
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'vision-mission', label: 'Vision, Mission & Philosophy' },
  { id: 'ad-art', label: 'AD/ART' },
  { id: 'committee', label: 'Our Committee' },
  { id: 'leadership', label: 'Leadership Through the Years' },
]

export const whoWeAre = {
  heading: 'A place to belong, wherever you’re from.',
  paragraphs: [
    'PPI Hsinchu (Perhimpunan Pelajar Indonesia di Hsinchu) is the Indonesian student association based in Hsinchu, Taiwan. We bring together Indonesian students from the universities across the city.',
    'Moving to a new city is a big adventure. We help students share stories, celebrate traditions, lend each other a hand, and make Hsinchu feel like home, while supporting the wider Indonesian community around us.',
  ],
  photo: '/images/photos/students-together.jpg',
  photoAlt: 'A group of students standing together outdoors',
  // Three short values shown under the introduction.
  values: [
    { title: 'Connect', text: 'Bringing students together across campuses.' },
    { title: 'Support', text: 'Helping each other settle in and succeed.' },
    { title: 'Celebrate', text: 'Keeping Indonesian culture alive abroad.' },
  ],
}

/* Introduction shown on the AD/ART tab. */
export const adArtIntro = {
  heading: 'Anggaran Dasar & Anggaran Rumah Tangga',
  paragraphs: [
    'The AD/ART is the constitution and bylaws of PPI Hsinchu. It defines our purpose, membership, organisational structure, and how decisions are made.',
    'Every cabinet works within this framework, so that the organisation stays accountable and consistent from one administration to the next.',
  ],
}
