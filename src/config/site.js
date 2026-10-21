/*
 * SITE CONFIGURATION
 * ------------------
 * General website settings that stay the same from one cabinet to the next:
 * organisation name, navigation, homepage text, video, social media links,
 * contact details and the AD/ART document.
 *
 * Cabinet-specific settings (cabinet name, purple theme, vision, mission)
 * live in src/config/cabinet.js instead.
 *
 * Image and document paths start with "/" and point inside the "public" folder.
 * Example: "/images/brand/logo-ppi-hsinchu.png" is the file
 *          public/images/brand/logo-ppi-hsinchu.png
 */

export const site = {
  name: 'PPI Hsinchu',
  fullName: 'Perhimpunan Pelajar Indonesia di Hsinchu',
  // The Chinese name is shown in two parts: left and right of the hero.
  chineseNameParts: ['台灣新竹印尼', '學生聯合'],
  logo: '/images/brand/logo-ppi-hsinchu.png',

  /*
   * While this is true, small "Sample" / "Draft" labels appear next to
   * temporary content so visitors are not misled.
   * Set it to false once the official content has been added.
   */
  showPlaceholderLabels: true,
}

/*
 * NAVBAR LINKS
 * Each "id" must match the id of a <section> on the page (see src/App.jsx).
 * The order here is the order in the menu. The last item is shown as the
 * red button.
 *
 * The menu TEXT is not here: it is translated in the files in src/locales/,
 * under "nav" (for example "nav" -> "about").
 */
export const navigation = [
  { id: 'home' },
  { id: 'about' },
  { id: 'events' },
  { id: 'resources' },
  { id: 'gallery' },
  { id: 'connect' },
]

/*
 * HOMEPAGE HERO
 * The button text, the scrolling words and the image description are
 * translated in src/locales/, under "hero".
 */
export const hero = {
  // The organisation's name is never translated.
  headline: 'PPI HSINCHU',
  // Which section the button in the middle of the hero image leads to.
  buttonSectionId: 'about',
  image: '/images/home/hero-temple.png',
  imageLarge: '/images/home/hero-temple-large.png',
  // Photos on the homepage cards that lead to About and Gallery.
  aboutCardImage: '/images/gallery/2025/2025_1123_09200800.jpg',
  galleryCardImage: '/images/gallery/2026/img_1580.jpg',

  /*
   * HOVER SLIDESHOWS ON THOSE TWO CARDS
   * While a visitor hovers over the card, its photo slowly crossfades
   * through these photos in a random order (each one once before any
   * repeats). The card's default photo above is always shown first.
   * To add a photo, put it in the "public" folder (resized to about 1600 px,
   * JPG, under ~400 KB) and add its path here. Leave a list empty ([]) to
   * turn that card's slideshow off.
   *
   * About Us: PPI Hsinchu itself - members, the committee, group photos.
   */
  aboutCardSlideshow: [
    '/images/gallery/2025/2025_1123_09200800.jpg',
    '/images/gallery/2025/dscf0022.jpg',
    '/images/gallery/2025/s__21266465_0.jpg',
    '/images/gallery/2025/img_8049.jpg',
    '/images/gallery/2026/img_8103.jpg',
    '/images/gallery/2026/img_1492.jpg',
  ],
  // Moments in Between: candid moments - activities, friends, celebrations.
  galleryCardSlideshow: [
    '/images/gallery/2026/img_1580.jpg',
    '/images/gallery/2026/img_1581.jpg',
    '/images/gallery/2026/img_1423.jpg',
    '/images/gallery/2026/img_8154.jpg',
    '/images/gallery/2025/dsc00177.jpg',
    '/images/gallery/2025/dscf0773.jpg',
    '/images/gallery/2025/img_7800.jpg',
    '/images/gallery/2025/img_7651.jpg',
    '/images/gallery/2025/dscf3640.jpg',
    '/images/gallery/2025/dscf3631.jpg',
    '/images/gallery/2025/dscf5959.jpg',
    '/images/gallery/2024/dsc_4235.jpg',
  ],

  /*
   * VIDEO ON THE "OUR COMMUNITY" CARD
   * A YouTube link, pasted exactly as copied (for example
   * 'https://youtu.be/abc123XYZ00'). It plays silently and on repeat behind
   * the card, like the next event's trailer on the "Upcoming Events" card,
   * but the two videos are set separately. Leave '' to keep the plain
   * gradient card.
   * communityCardVideoPoster is an optional still image (landscape) shown
   * before the video starts, or instead of it when the browser blocks
   * autoplay. Without it, YouTube's own thumbnail of the video is used.
   */
  communityCardVideoUrl: 'https://youtu.be/mz6CbDiAyOI',
  communityCardVideoPoster: '',
}

/*
 * HOMEPAGE VIDEO
 * TODO: Add the official YouTube video ID.
 * The ID is the part after "v=" in a YouTube link.
 * Example: for https://www.youtube.com/watch?v=abc123XYZ00 the ID is "abc123XYZ00".
 * While youtubeVideoId is empty, the homepage shows a "coming soon" state
 * instead of a broken player.
 *
 * The heading and description of this block are translated in src/locales/,
 * under "video".
 */
export const featuredVideo = {
  youtubeVideoId: 'S8Rp9_9hrB8',
  coverImage: '/images/leadership/kabinet_karyaraya_2627.png',
}

/*
 * SOCIAL MEDIA LINKS
 * TODO: Add the official URLs.
 * Leave "url" empty ('') for accounts that do not exist yet. The website
 * shows "Coming soon" instead of a broken link.
 * "icon" must be one of the icon names in src/components/Icon.jsx.
 */
export const socialLinks = [
  { id: 'instagram', label: 'Instagram', icon: 'instagram', handle: '', url: 'https://www.instagram.com/ppihsinchu' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', handle: '', url: 'https://www.linkedin.com/company/ppihsinchu/' },
  { id: 'facebook', label: 'Facebook', icon: 'facebook', handle: '', url: 'https://www.facebook.com/ppi.hsinchu.3#' },
  { id: 'youtube', label: 'YouTube', icon: 'youtube', handle: '', url: 'https://www.youtube.com/@ppihsinchu' },
  { id: 'tiktok', label: 'TikTok', icon: 'tiktok', handle: '', url: 'https://www.tiktok.com/@ppihsinchu' },
]

/*
 * CONTACT SETTINGS
 * The contact form has no server of its own. It works in one of three ways:
 *
 * 1. formEndpoint is filled in  -> the form sends the message to that URL
 *    (for example a Formspree or Google Apps Script endpoint) and shows a
 *    success message only if the service confirms it.
 * 2. Only email is filled in    -> the form opens the visitor's own email app
 *    with the message already written. The visitor presses "Send" there.
 * 3. Both are empty             -> the form is visible but the send button is
 *    disabled, with a note explaining that contact details are coming soon.
 *
 * TODO: Add the official PPI Hsinchu email address and/or a form endpoint.
 */
export const contact = {
  email: 'ppihsinchuorg@gmail.com',
  formEndpoint: 'https://formspree.io/f/mppqrnjp', //Formspree
}

/*
 * AD/ART DOCUMENT
 * TODO: Add the official AD/ART PDF.
 * 1. Save the PDF as public/documents/ad-art-ppi-hsinchu.pdf
 * 2. Change pdfPath below to '/documents/ad-art-ppi-hsinchu.pdf'
 * While pdfPath is empty, the button shows a disabled "Coming soon" state.
 */
export const adArt = {
  pdfPath: 'documents/Amandemen II AD_ART PPI Hsinchu 2025.pdf',
  lastUpdated: '2025',
}
