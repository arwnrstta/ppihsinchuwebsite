/*
 * PHOTO GALLERY
 * -------------
 * Photos are grouped into albums. Each album becomes one filter button in the
 * Gallery section.
 *
 * LANGUAGES
 * "title", "description", "alt" and "caption" can be written per language:
 *     title: { en: 'Culture Night', id: 'Malam Budaya', 'zh-TW': '文化之夜' },
 * or as plain text when it is the same in every language. A language that
 * is missing or '' falls back to English.
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

const sampleAlbumDescription = {
  en: 'Sample album using placeholder stock photos.',
  id: 'Album contoh dengan foto stok sementara.',
  'zh-TW': '使用暫用圖庫照片的範例相簿。',
}

export const albums = [
  {
    id: 'sample-community-moments',
    title: {
      en: 'Community Moments',
      id: 'Momen Komunitas',
      'zh-TW': '社群時光',
    },
    year: 2025,
    description: sampleAlbumDescription,
    eventId: 'sample-culture-night',
    isSample: true,
    photos: [
      {
        src: '/images/photos/community-gathering.jpg',
        alt: {
          en: 'A community gathering outdoors',
          id: 'Pertemuan komunitas di luar ruangan',
          'zh-TW': '戶外的社群聚會',
        },
        caption: {
          en: 'Together, outdoors',
          id: 'Bersama di alam terbuka',
          'zh-TW': '在戶外相聚',
        },
      },
      {
        src: '/images/photos/friends-at-event.jpg',
        alt: {
          en: 'Friends taking a selfie at an outdoor event',
          id: 'Sekelompok teman berswafoto di acara luar ruangan',
          'zh-TW': '朋友們在戶外活動中自拍',
        },
        caption: {
          en: 'Say cheese',
          id: 'Senyum dulu',
          'zh-TW': '笑一個',
        },
      },
      {
        src: '/images/photos/students-together.jpg',
        alt: {
          en: 'A group of students standing together',
          id: 'Sekelompok mahasiswa berdiri bersama',
          'zh-TW': '一群學生站在一起',
        },
        caption: {
          en: 'Waiting for the show',
          id: 'Menunggu acara dimulai',
          'zh-TW': '等待表演開始',
        },
      },
      {
        src: '/images/photos/campus-gathering.jpg',
        alt: {
          en: 'People walking across a wide campus plaza',
          id: 'Orang-orang berjalan melintasi pelataran kampus yang luas',
          'zh-TW': '人們走過寬闊的校園廣場',
        },
        caption: {
          en: 'A quiet afternoon on campus',
          id: 'Sore yang tenang di kampus',
          'zh-TW': '校園裡寧靜的午後',
        },
      },
    ],
  },
  {
    id: 'sample-around-hsinchu',
    title: {
      en: 'Around Hsinchu',
      id: 'Keliling Hsinchu',
      'zh-TW': '新竹走走',
    },
    year: 2025,
    description: sampleAlbumDescription,
    eventId: 'sample-explore-hsinchu',
    isSample: true,
    photos: [
      {
        src: '/images/photos/night-market-walk.jpg',
        alt: {
          en: 'Friends walking through a busy night market',
          id: 'Sekelompok teman berjalan di pasar malam yang ramai',
          'zh-TW': '朋友們走在熱鬧的夜市裡',
        },
        caption: {
          en: 'Night market run',
          id: 'Jalan-jalan ke pasar malam',
          'zh-TW': '逛夜市',
        },
      },
      {
        src: '/images/photos/friends-walking-tall.jpg',
        alt: {
          en: 'Friends walking together down a street',
          id: 'Sekelompok teman berjalan bersama di jalan',
          'zh-TW': '朋友們一起走在街上',
        },
        caption: {
          en: 'Exploring the city',
          id: 'Menjelajahi kota',
          'zh-TW': '探索城市',
        },
      },
      {
        src: '/images/photos/busy-street.jpg',
        alt: {
          en: 'Friends exploring a busy street',
          id: 'Sekelompok teman menjelajahi jalan yang ramai',
          'zh-TW': '朋友們在熱鬧的街道上探索',
        },
        caption: {
          en: 'Weekend wandering',
          id: 'Jalan-jalan akhir pekan',
          'zh-TW': '週末漫步',
        },
      },
    ],
  },
]
