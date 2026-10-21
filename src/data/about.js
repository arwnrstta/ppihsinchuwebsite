/*
 * ABOUT SECTION CONTENT
 * TODO: Replace this temporary text with the official introduction, in all
 * three languages.
 *
 * LANGUAGES
 * Texts written as { en: '...', id: '...', 'zh-TW': '...' } are shown in the
 * language the visitor selects. A language that is missing or '' falls back
 * to English.
 */

/*
 * The tabs of the About section, in the order they appear.
 * The tab names are translated in the files in src/locales/, under
 * "about" -> "tabs". Leave the "id" values as they are: the code uses them
 * to decide which content to show.
 */
export const aboutTabs = [
  { id: 'who-we-are' },
  { id: 'campuses' },
  { id: 'vision-mission' },
  { id: 'ad-art' },
  { id: 'committee' },
  { id: 'leadership' },
]

export const whoWeAre = {
  heading: {
    en: 'A place to belong, wherever you’re from.',
    id: 'Rumah bagi semua, dari mana pun asalmu.',
    'zh-TW': '無論你來自哪裡，這裡都有你的位置。',
  },
  paragraphs: [
    {
      en: 'PPI Hsinchu (Perhimpunan Pelajar Indonesia di Hsinchu) is the Indonesian student association based in Hsinchu, Taiwan. We bring together Indonesian students from the universities across the city.',
      id: 'PPI Hsinchu (Perhimpunan Pelajar Indonesia di Hsinchu) adalah perhimpunan pelajar Indonesia yang berbasis di Hsinchu, Taiwan. Kami mempertemukan mahasiswa Indonesia dari berbagai universitas di kota ini.',
      'zh-TW':
        'PPI Hsinchu（Perhimpunan Pelajar Indonesia di Hsinchu）是位於台灣新竹的印尼學生會，凝聚新竹各大學的印尼學生。',
    },
    {
      en: 'Moving to a new city is a big adventure. We help students share stories, celebrate traditions, lend each other a hand, and make Hsinchu feel like home, while supporting the wider Indonesian community around us.',
      id: 'Pindah ke kota baru adalah petualangan besar. Kami membantu mahasiswa berbagi cerita, merayakan tradisi, saling mengulurkan tangan, dan menjadikan Hsinchu terasa seperti rumah, sambil mendukung komunitas Indonesia di sekitar kita.',
      'zh-TW':
        '搬到一座新城市是一場大冒險。我們協助學生分享故事、慶祝傳統、彼此扶持，讓新竹有家的感覺，同時也支持周遭的印尼社群。',
    },
  ],
  /*
   * Photos of the people behind PPI Hsinchu: cabinet group photos, the
   * committee at work, official portraits. They crossfade by themselves in
   * a random order while the section is on screen. The FIRST photo is shown
   * first, and is the only one shown to visitors who turn on "reduce
   * motion" on their device, so keep the current cabinet's photo first.
   * Landscape photos fit the frame best; the edges of very wide photos are
   * cropped. To add a photo, save it in the "public" folder (about 1600 px
   * on the longest side, JPG, under ~400 KB) and add its path here.
   */
  photos: [
    '/images/leadership/kabinet_karyaraya_2627.png',
    '/images/leadership/kabinet_harmoni_2526.png',
    '/images/leadership/kabinet_2425.png',
    '/images/gallery/2025/img_8049.jpg',
  ],
  // Describes the slideshow as a whole for screen readers.
  photoAlt: {
    en: 'Photos of the PPI Hsinchu committee and cabinets',
    id: 'Foto-foto pengurus dan kabinet PPI Hsinchu',
    'zh-TW': 'PPI Hsinchu 幹部與歷屆內閣合照',
  },
  // Three short values shown under the introduction.
  values: [
    {
      title: { en: 'Connect', id: 'Terhubung', 'zh-TW': '連結' },
      text: {
        en: 'Bringing students together across campuses.',
        id: 'Mempertemukan mahasiswa lintas kampus.',
        'zh-TW': '串連各校學生。',
      },
    },
    {
      title: { en: 'Support', id: 'Mendukung', 'zh-TW': '支持' },
      text: {
        en: 'Helping each other settle in and succeed.',
        id: 'Saling membantu untuk beradaptasi dan berhasil.',
        'zh-TW': '互相幫助，安頓並成長。',
      },
    },
    {
      title: { en: 'Celebrate', id: 'Merayakan', 'zh-TW': '慶祝' },
      text: {
        en: 'Keeping Indonesian culture alive abroad.',
        id: 'Menjaga budaya Indonesia tetap hidup di perantauan.',
        'zh-TW': '在異鄉延續印尼文化。',
      },
    },
  ],
}

/* Introduction shown on the AD/ART tab. */
export const adArtIntro = {
  // The official title of the document. It is not translated.
  heading: 'Anggaran Dasar & Anggaran Rumah Tangga',
  // An explanatory subtitle shown under the official title (except in Indonesian).
  subtitle: {
    en: 'Constitution and Bylaws',
    id: '',
    'zh-TW': '組織章程與細則',
  },
  paragraphs: [
    {
      en: 'The AD/ART is the constitution and bylaws of PPI Hsinchu. It defines our purpose, membership, organisational structure, and how decisions are made.',
      id: 'AD/ART adalah anggaran dasar dan anggaran rumah tangga PPI Hsinchu. Dokumen ini menetapkan tujuan, keanggotaan, struktur organisasi, dan cara pengambilan keputusan.',
      'zh-TW':
        'AD/ART 是 PPI Hsinchu 的組織章程與細則，規範我們的宗旨、會員資格、組織架構以及決策方式。',
    },
    {
      en: 'Every cabinet works within this framework, so that the organisation stays accountable and consistent from one administration to the next.',
      id: 'Setiap kabinet bekerja dalam kerangka ini, agar organisasi tetap akuntabel dan konsisten dari satu kepengurusan ke kepengurusan berikutnya.',
      'zh-TW': '每一屆內閣都在這個架構下運作，使組織在歷屆交接之間保持負責且一致。',
    },
  ],
}
