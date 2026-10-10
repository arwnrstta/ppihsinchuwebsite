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
  footerMessage: 'From Hsinchu, with home in our hearts.',

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
 * To rename a menu item, change its "label" only.
 */
export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'events', label: 'Events' },
  { id: 'resources', label: 'Resources' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'connect', label: 'Connect With Us' },
]

/* HOMEPAGE HERO TEXT */
export const hero = {
  headline: 'PPI HSINCHU',
  // The single button in the middle of the hero image.
  primaryButton: { label: 'Explore the community', sectionId: 'about' },
  image: '/images/home/hero-temple.png',
  imageLarge: '/images/home/hero-temple-large.png',
  imageAlt: 'A historic gate tower in Hsinchu with a red tiled roof',
  // Photos on the homepage cards that lead to About and Gallery.
  aboutCardImage: '/images/photos/students-together.jpg',
  galleryCardImage: '/images/photos/night-market-walk.jpg',
  // Words that scroll across the band below the hero.
  marqueeWords: ['Community', 'Culture', 'Connection', 'Hsinchu', 'Indonesia'],
}

/*
 * HOMEPAGE VIDEO
 * TODO: Add the official YouTube video ID.
 * The ID is the part after "v=" in a YouTube link.
 * Example: for https://www.youtube.com/watch?v=abc123XYZ00 the ID is "abc123XYZ00".
 * While youtubeVideoId is empty, the homepage shows a "coming soon" state
 * instead of a broken player.
 */
export const featuredVideo = {
  youtubeVideoId: '',
  title: 'Life in Hsinchu, in motion.',
  description:
    'A glimpse of the gatherings, celebrations, and everyday moments that make this community feel like home.',
  coverImage: '/images/photos/community-gathering.jpg',
  coverAlt: 'A community gathering outdoors',
}

/*
 * SOCIAL MEDIA LINKS
 * TODO: Add the official URLs.
 * Leave "url" empty ('') for accounts that do not exist yet. The website
 * shows "Coming soon" instead of a broken link.
 * "icon" must be one of the icon names in src/components/Icon.jsx.
 */
export const socialLinks = [
  { id: 'instagram', label: 'Instagram', icon: 'instagram', handle: '', url: '' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', handle: '', url: '' },
  { id: 'facebook', label: 'Facebook', icon: 'facebook', handle: '', url: '' },
  { id: 'youtube', label: 'YouTube', icon: 'youtube', handle: '', url: '' },
  { id: 'tiktok', label: 'TikTok', icon: 'tiktok', handle: '', url: '' },
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
  email: '',
  formEndpoint: '',
}

/*
 * AD/ART DOCUMENT
 * TODO: Add the official AD/ART PDF.
 * 1. Save the PDF as public/documents/ad-art-ppi-hsinchu.pdf
 * 2. Change pdfPath below to '/documents/ad-art-ppi-hsinchu.pdf'
 * While pdfPath is empty, the button shows a disabled "Coming soon" state.
 */
export const adArt = {
  pdfPath: '',
  lastUpdated: '',
}
