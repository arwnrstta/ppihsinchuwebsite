/*
 * CURRENT CABINET
 * ---------------
 * Everything that changes when a new PPI Hsinchu administration starts.
 * A new cabinet should only need to edit this file (plus the committee,
 * leadership and other files in src/data).
 *
 * The red PPI Hsinchu branding does NOT live here. It stays the same for
 * every cabinet and is defined in src/styles/variables.css.
 *
 * LANGUAGES
 * Texts written as { en: '...', id: '...', 'zh-TW': '...' } are shown in the
 * language the visitor selects. A missing or empty language falls back to
 * English. The cabinet name itself is never translated.
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
   * TODO: Replace this temporary text with the official wording, in all
   * three languages.
   */
  vision: {
    en: 'To make PPI Hsinchu an inclusive, impactful, and responsive community that empowers Indonesians in Hsinchu to reach their full potential while fostering unity and a stronger sense of belonging.',
    id: 'Mewujudkan PPI Hsinchu sebagai wadah yang inklusif, berdaya guna, dan responsif dalam mendukung pengembangan potensi serta persatuan seluruh diaspora Indonesia di Hsinchu.',
    'zh-TW':
      '致力於將 PPI Hsinchu 打造成一個包容、多元、積極回應需求的社群，協助在新竹的印尼僑民發揮潛能，並促進彼此之間的交流與團結。',
  },

  // One { en, id, 'zh-TW' } block per mission point.
  mission: [
    {
      en: 'To make PPI Hsinchu a bridge that connects and brings together the Indonesian community in Hsinchu, including both students and working professionals, through meaningful upskilling programs and mutually supportive collaborations that contribute to the well-being of all.',
      id: 'Menjadikan PPI Hsinchu sebagai jembatan yang merangkul seluruh komunitas diaspora di Hsinchu, baik pelajar maupun pekerja, melalui program-program peningkatan keterampilan (up-skilling) yang nyata dan kolaborasi yang saling mendukung demi kesejahteraan bersama.',
      'zh-TW': '讓 PPI Hsinchu 成為連結新竹印尼社群的橋樑，不論是學生還是職場人士，都能透過實用的技能提升課程與互助合作，共同成長，促進整體社群的福祉。',
    },
    {
      en: 'To create more opportunities for students to prepare for life and careers in Taiwan after graduation by providing information on employment regulations, practical career preparation, and opportunities to expand their professional networks.',
      id: 'Membuka peluang yang lebih luas bagi mahasiswa untuk mempersiapkan transisi kehidupan dan karir pasca-kelulusan di Taiwan. Hal ini akan diwujudkan lewat penyediaan informasi regulasi ketenagakerjaan, pembekalan praktis, serta perluasan jejaring (networking) profesional.',
      'zh-TW': '為學生創造更多機會，協助他們為畢業後在台灣的生活與職涯做好準備，包括提供勞動法規相關資訊、實務技能培訓，以及拓展專業人脈與職場交流的機會',
    },
    {
      en: 'To strengthen PPI Hsinchu\'s role as a responsive organization that listens to the community, advocates for shared interests, and fosters a sense of national pride, while providing a safe and supportive home for all Indonesians in Hsinchu.',
      id: 'Memosisikan PPI Hsinchu sebagai garda utama yang responsif dalam menaungi aspirasi, melindungi kepentingan bersama, serta mempererat rasa nasionalisme. Organisasi harus hadir sebagai rumah yang aman dan suportif bagi seluruh warga Indonesia di Hsinchu.',
      'zh-TW': '強化 PPI Hsinchu 作為社群支持與溝通橋樑的角色，積極傾聽大家的聲音、維護共同權益，並凝聚對印尼的認同感與向心力，讓每一位在新竹的印尼人都能在這裡找到安心、溫暖且互相支持的歸屬感。',
    },
  ],

  philosophy: {
    summary: {
      en: '“Karya Raya” means “great work”. The name reflects a cabinet that values meaningful contribution: many hands working together to create something larger than any one person.',
      id: '“Karya Raya” berarti “karya yang besar”. Nama ini mencerminkan kabinet yang menjunjung kontribusi bermakna: banyak tangan yang bekerja bersama untuk menciptakan sesuatu yang lebih besar dari diri masing-masing.',
      'zh-TW':
        '「Karya Raya」意為「偉大的作品」。這個名稱代表一個重視有意義貢獻的內閣：眾人攜手，創造超越個人的成果。',
    },
    // The titles "Karya" and "Raya" are Indonesian words and stay as they are.
    points: [
      {
        title: 'Karya',
        text: {
          en: 'Work that is done with care, and that leaves something useful behind for the next generation of students.',
          id: 'Karya yang dikerjakan dengan sepenuh hati, dan meninggalkan sesuatu yang bermanfaat bagi generasi mahasiswa berikutnya.',
          'zh-TW': '用心完成的工作，並為下一代學生留下有用的成果。',
        },
      },
      {
        title: 'Raya',
        text: {
          en: 'Great in spirit and in reach: open to every Indonesian student in Hsinchu, wherever they study.',
          id: 'Besar dalam semangat dan jangkauan: terbuka bagi setiap mahasiswa Indonesia di Hsinchu, di mana pun mereka belajar.',
          'zh-TW': '精神與影響力皆宏大：向每一位在新竹的印尼學生敞開，無論就讀哪所學校。',
        },
      },
    ],
  },
}
