/*
 * PHOTO GALLERY
 * -------------
 * Photos grouped by year. Each year becomes one filter button in the
 * Gallery section (after "All photos"), newest first, whatever order they
 * are written in here. A year without photos is not shown at all.
 *
 * HOW TO ADD PHOTOS
 *   1. Resize each photo to about 1600 pixels on the longest side and save
 *      it as JPG (under roughly 400 KB) so the site stays fast. Phone and
 *      camera originals (5-15 MB) are far too large for a website, and
 *      HEIC photos do not open in most browsers: convert them to JPG first.
 *   2. Put the photos in a folder for their year, for example
 *      public/images/gallery/2026/
 *   3. Add one line per photo to that year's "photos" list below:
 *
 *        { src: '/images/gallery/2026/welcome-party.jpg', title: 'Welcome Party 2026', alt: 'Students cheering at a welcome party' },
 *
 *   For a new year, copy a whole year block and change the year.
 *
 * FIELDS
 *   year   - (required) the year the photos were taken, e.g. 2026
 *   photos - the year's photos, shown in this order
 *     src   - (required) the photo's path inside the "public" folder
 *     title - (optional) the event or occasion, e.g. 'Hsinchu Open 2025'.
 *             Shown with the photo, together with its year.
 *             Several photos can share a title. Leave it out when unsure.
 *     alt   - a short description of what is in the photo. It is never
 *             shown on the page; screen readers read it to visitors who
 *             cannot see the photo. Describe the scene, not the event name.
 *
 * "title" and "alt" can be plain text, or written per language:
 *   title: { en: 'Independence Day', id: 'Hari Kemerdekaan', 'zh-TW': '印尼獨立紀念日' }
 */
export const gallery = [
  {
    year: 2026,
    photos: [
      { src: '/images/gallery/2026/img_1580.jpg', alt: 'Students playing a group game on campus at sunset' },
      { src: '/images/gallery/2026/img_1581.jpg', alt: 'A student waving and smiling during an outdoor campus activity' },
      { src: '/images/gallery/2026/img_1492.jpg', alt: 'A large group of students making hand-sign poses on outdoor steps at night' },
      { src: '/images/gallery/2026/img_1423.jpg', alt: 'Friends posing playfully outside a train station at night' },
      { src: '/images/gallery/2026/img_8154.jpg', alt: 'Students in batik serving Indonesian snacks at a festival booth' },
      { src: '/images/gallery/2026/img_8103.jpg', title: 'NYCU International Day', alt: 'An instant photo of the PPI Hsinchu booth team, held up in front of the booth' },
      { src: '/images/gallery/2026/img_2986.jpg', title: 'NYCU International Day', alt: 'A student in batik showing an Indonesian food menu at an international day fair' },
    ],
  },
  {
    year: 2025,
    photos: [
      { src: '/images/gallery/2025/dsc00177.jpg', title: 'Indonesia Cultural Class', alt: 'Workshop participants holding up their painted batik-style patterns' },
      { src: '/images/gallery/2025/dsc00160.jpg', title: 'Indonesia Cultural Class', alt: 'Participants painting colourful patterns at a cultural workshop' },
      { src: '/images/gallery/2025/dsc00117.jpg', title: 'Indonesia Cultural Class', alt: 'A student in batik explaining an activity to participants at a workshop table' },
      { src: '/images/gallery/2025/dsc00096.jpg', title: 'Indonesia Cultural Class', alt: 'Students eating lunch beside stacks of painting materials at a workshop' },
      { src: '/images/gallery/2025/dscf0773.jpg', title: 'Hsinchu Open 2025', alt: 'Badminton players giving each other a high five during a match' },
      { src: '/images/gallery/2025/2025_1123_09200800.jpg', title: 'Hsinchu Open 2025', alt: 'A large group photo of participants with a tournament banner on a badminton court' },
      { src: '/images/gallery/2025/dscf0022.jpg', title: 'Hsinchu Open 2025', alt: 'A large group photo with the PPI Hsinchu banner in a classroom' },
      { src: '/images/gallery/2025/dscf0261.jpg', title: 'Hsinchu Open 2025', alt: 'A player lining up a shot at a pool table' },
      { src: '/images/gallery/2025/s__21266465_0.jpg', alt: 'A large group photo with the PPI Hsinchu banner at a night barbecue' },
      { src: '/images/gallery/2025/img_8078-1.jpg', alt: 'Skewers and meat cooking on a charcoal grill' },
      { src: '/images/gallery/2025/img_8049.jpg', alt: 'Committee members making hand-sign poses in front of a brick wall at night' },
      { src: '/images/gallery/2025/img_7800.jpg', alt: 'Students cheering with their hands raised at a night gathering' },
      { src: '/images/gallery/2025/img_7651.jpg', alt: 'Students grilling skewers at a night barbecue' },
      { src: '/images/gallery/2025/dscf5959.jpg', alt: 'Students presenting Indonesian culture to a room of children' },
      { src: '/images/gallery/2025/dscf4003.jpg', alt: 'Red paper lanterns along a busy mountain village street' },
      { src: '/images/gallery/2025/dscf3640.jpg', alt: 'Students smiling together on a boat ride across a lake' },
      { src: '/images/gallery/2025/dscf3631.jpg', alt: 'Four friends smiling on a boat on a lake' },
    ],
  },
  {
    year: 2024,
    photos: [
      { src: '/images/gallery/2024/dsc_4235.jpg', alt: 'Students playing a basketball match on an outdoor court' },
    ],
  },
  {
    year: 2023,
    photos: [
      { src: '/images/gallery/2023/pot01385.jpg', alt: 'Players competing in an outdoor futsal match' },
    ],
  },
]
