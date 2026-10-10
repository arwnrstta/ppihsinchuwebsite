/*
 * PHOTO GALLERY
 * -------------
 * Photos are grouped into albums. Each album becomes one filter button in the
 * Gallery section.
 *
 * ALBUM FIELDS
 *   id          - a short unique name with no spaces
 *   title       - album name
 *   year        - the year the photos were taken
 *   description - one sentence about the album (optional)
 *   eventId     - the "id" of the matching event in src/data/events.js.
 *                 This single field creates BOTH links: the album shows a
 *                 "View event" button, and the event shows a "View photos"
 *                 button. Leave '' if the album does not belong to an event.
 *   photos      - the list of photos
 *
 * PHOTO FIELDS
 *   src     - image saved in public/images/gallery/ (a folder per album is tidy)
 *   alt     - a short description of what is in the photo, for screen readers
 *   caption - optional text shown with the photo
 *
 * IMAGE TIPS
 *   Resize photos to about 1600 pixels on the longest side and save them as
 *   JPG (under roughly 400 KB each) before adding them, so the site stays fast.
 *
 * TODO: Replace these stock photos with real PPI Hsinchu photographs.
 * The photos below came from the old Framer site and are placeholders only.
 */

export const albums = [
  {
    id: 'sample-community-moments',
    title: 'Community Moments',
    year: 2025,
    description: 'Sample album using placeholder stock photos.',
    eventId: 'sample-culture-night',
    isSample: true,
    photos: [
      {
        src: '/images/photos/community-gathering.jpg',
        alt: 'A community gathering outdoors',
        caption: 'Together, outdoors',
      },
      {
        src: '/images/photos/friends-at-event.jpg',
        alt: 'Friends taking a selfie at an outdoor event',
        caption: 'Say cheese',
      },
      {
        src: '/images/photos/students-together.jpg',
        alt: 'A group of students standing together',
        caption: 'Waiting for the show',
      },
      {
        src: '/images/photos/campus-gathering.jpg',
        alt: 'People walking across a wide campus plaza',
        caption: 'A quiet afternoon on campus',
      },
    ],
  },
  {
    id: 'sample-around-hsinchu',
    title: 'Around Hsinchu',
    year: 2025,
    description: 'Sample album using placeholder stock photos.',
    eventId: 'sample-explore-hsinchu',
    isSample: true,
    photos: [
      {
        src: '/images/photos/night-market-walk.jpg',
        alt: 'Friends walking through a busy night market',
        caption: 'Night market run',
      },
      {
        src: '/images/photos/friends-walking-tall.jpg',
        alt: 'Friends walking together down a street',
        caption: 'Exploring the city',
      },
      {
        src: '/images/photos/busy-street.jpg',
        alt: 'Friends exploring a busy street',
        caption: 'Weekend wandering',
      },
    ],
  },
]
