/*
 * EVENTS
 * ------
 * Every event on the website comes from this list. The order does not matter:
 * the website sorts events by date automatically.
 *
 * UPCOMING OR PAST?
 * The website decides this by itself from the "date":
 *   - date is today or later -> Upcoming
 *   - date is before today   -> Past (it moves to the archive automatically)
 *   - date is ''             -> Upcoming, shown as "Date to be announced"
 * The upcoming event with the nearest date becomes the large featured event.
 *
 * LANGUAGES
 * "title", "venue", "summary" and "description" can be written per language:
 *
 *     title: { en: 'Culture Night', id: 'Malam Budaya', 'zh-TW': '文化之夜' },
 *
 * or as plain text when the wording is the same in every language:
 *
 *     title: 'Halal Bihalal',
 *
 * A language that is missing or '' falls back to English, so you can publish
 * the English text first and add translations later.
 *
 * FIELDS
 *   id              - a short unique name with no spaces, e.g. 'halal-bihalal-2027'
 *   title           - event name
 *   date            - 'YYYY-MM-DD', e.g. '2027-03-14' (or '' if not confirmed)
 *   time            - e.g. '18:00 - 21:00' (or '')
 *   venue           - where it takes place (or '')
 *   fee             - what it costs to join. Plain text for an amount, e.g.
 *                     'NT$150', or per language for words:
 *                       fee: { en: 'Free', id: 'Gratis', 'zh-TW': '免費' },
 *                     Leave '' and no fee is shown at all.
 *   organizer       - who runs it
 *   cabinet         - the cabinet that ran the event, e.g. 'Kabinet Karya Raya'.
 *                     Shown as a purple label on the event. Cabinet names are
 *                     never translated. Leave '' to show no label.
 *   summary         - one sentence shown on the event card
 *   description     - longer text shown when the event is opened
 *   poster          - poster image saved in public/images/events/
 *                     (portrait, about 1080 x 1350). Leave '' for a placeholder.
 *   registrationUrl - the link to the registration form, for example a Google
 *                     Form: 'https://forms.gle/...'. For the featured upcoming
 *                     event it becomes the red "Register now" button. Leave ''
 *                     and the button shows "Registration opens soon" instead.
 *   documentationUrl - the link to the event's photos and videos, for example a
 *                     shared Google Drive folder: 'https://drive.google.com/...'.
 *                     Once the event is over, it becomes the "View
 *                     documentation" button on the event. Leave '' and the
 *                     button shows "Documentation coming soon" instead.
 *                     Remember to set the folder to "Anyone with the link".
 *   isSample        - true marks placeholder content with a "Sample" label.
 *                     Remove this line for real events.
 *
 * Photos of past events go in the yearly photo archive (src/data/gallery.js)
 * or behind documentationUrl; events and gallery photos are not linked.
 */

export const events = [
  {
    id: 'hsinchu-open-2026',
    title: {
      en: 'Hsinchu Open 2026',
      id: 'Hsinchu Open 2026',
      'zh-TW': 'Hsinchu Open 2026',
    },
    date: '',
    time: '',
    venue: '',
    fee: {
      en: '',
      id: '',
      'zh-TW': '',
    },
    organizer: 'PPI Hsinchu',
    cabinet: 'Kabinet Karya Raya',
    summary: {
      en: 'PPI Hsinchu\'s most anticipated annual sporting event, bringing together Indonesian students from across Taiwan to compete and build friendships.',
      id: 'Acara olahraga tahunan PPI Hsinchu yang paling dinantikan, mempertemukan mahasiswa Indonesia dari seluruh Taiwan untuk berkompetisi dan menjalin persahabatan.',
      'zh-TW': '新竹印尼學生會（PPI Hsinchu）最受期待的年度體育盛事，匯聚來自全臺各地的印尼學生，共同參與競賽並建立友誼。',
    },
    poster: '',
    registrationUrl: '',
    documentationUrl: '',
    isSample: false,
  },
  {
    id: 'orientasi-maba-fall-2026',
    title: {
      en: 'Fall 2026 Freshmen Orientation',
      id: 'Orientasi Mahasiswa Baru Fall 2026',
      'zh-TW': '2026年秋季新生說明會',
    },
    date: '2026-08-14',
    time: '20:00-22.15 (GMT+7)',
    venue: 'Zoom Meeting',
    fee: {
      en: 'Free Admission',
      id: 'Gratis',
      'zh-TW': '免費',
    },
    organizer: 'PPI Hsinchu',
    cabinet: 'Kabinet Karya Raya',
    summary: {
      en: 'Everything you need to settle into Hsinchu, your home away from home!',
      id: 'Bekal untuk memulai kehidupan di Hsinchu, rumah kedua kalian!',
      'zh-TW': '帶你做好準備，在新竹展開新生活，讓這裡成為你的第二個家！',
    },
    poster: 'images/events/kabinet_karyaraya_2627/orientasi_maba.png',
    registrationUrl: '',
    documentationUrl: 'https://drive.google.com/drive/folders/1cnMTLXDao_CeYCG__unfjJG2vD7M2_L-?usp=sharing',
    isSample: false,
  },
  {
    id: 'ppihtalk1_2026',
    title: {
      en: 'PPIH Talk #1',
      id: 'PPIH Talk #1',
      'zh-TW': 'PPIH 開講 #1',
    },
    date: '2026-10-16',
    time: '20.00–21.15 (GMT+8)',
    venue: 'R317, NTHU Library (Third Floor)',
    fee: {
      en: 'Free Admission',
      id: 'Gratis',
      'zh-TW': '免費',
    },
    organizer: 'PPI Hsinchu',
    cabinet: 'Kabinet Karya Raya',
    summary: {
      en: 'Unfiltered & Unhired: Real Talk on Getting an Internship',
      id: 'Unfiltered & Unhired: Real Talk on Getting an Internship',
      'zh-TW': '不修飾、不包裝：實習求職的真心話',
    },
    poster: 'images/events/kabinet_karyaraya_2627/ppihtalk.png',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeHbburj6yGHp0lhYLLTQttb-Tfepr21mBpqUPIe25A8yZiUA/viewform?usp=preview',
    documentationUrl: '',
  },
  {
    id: 'jelajah_hsinchu_2026',
    title: {
      en: 'Explore Hsinchu Vol. 1',
      id: 'Jelajah Hsinchu Vol. 1',
      'zh-TW': '玩轉新竹 Vol. 1',
    },
    date: '2026-09-06',
    time: '16.30–End (GMT+8)',
    venue: 'Hsinchu City',
    fee: {
      en: 'Free Admission',
      id: 'Gratis',
      'zh-TW': '免費',
    },
    organizer: 'PPI Hsinchu',
    cabinet: 'Kabinet Karya Raya',
    summary: {
      en: 'New city, new places, new connections. Get to know Hsinchu, soon to be your second home!',
      id: 'New city, new places, new connections.  Yuk, kenali lebih dekat rumah keduamu, Hsinchu!',
      'zh-TW': '新的城市、新的景點、新的朋友。一起探索新竹，讓這座城市慢慢成為你的第二個家！',
    },
    poster: 'images/events/kabinet_karyaraya_2627/jelajahhsinchu1.png',
    registrationUrl: '',
    documentationUrl: 'https://drive.google.com/drive/folders/1qlhkJBvvnpxhulBZGC8pfd7-Ft3VxkgG?usp=sharing',
  },
   {
    id: 'ppi_heat_2026',
    title: {
      en: 'PPI Hsinchu Eat And Trip',
      id: 'PPI Hsinchu Eat And Trip',
      'zh-TW': 'PPI Hsinchu Eat And Trip',
    },
    date: '2026-05-23',
    time: '10:00–21:00 (GMT+8)',
    venue: 'Xinshe Castle, National Taiwan Museum of Fine Arts, Shen Ji New Village, Yizhong Night Market',
    fee: {
      en: 'Student/Non-student: N̶T̶$̶ ̶1̶1̶0̶0̶ → NT$ 989 | Children (<12 tahun): NT$ 889',
      id: 'Student/Non-student: N̶T̶$̶ ̶1̶1̶0̶0̶ → NT$ 989 | Children (<12 tahun): NT$ 889',
      'zh-TW': '學生／一般民眾：NT$ 1,100 → NT$ 989 | 兒童（未滿12歲）：NT$ 889',
    },
    organizer: 'PPI Hsinchu',
    cabinet: 'Kabinet Harmoni',
    summary: {
      en: 'Take a break from your daily routine and enjoy a fun adventure together!',
      id: 'Escape sejenak dari rutinitas dan nikmati perjalanan seru penuh kebersamaan!',
      'zh-TW': '暫時放下日常的忙碌，一起來場充滿歡笑與回憶的小旅行吧！',
    },
    poster: 'images/events/kabinet_harmoni_2526/heat_2026.png',
    registrationUrl: '',
    documentationUrl: 'https://drive.google.com/drive/folders/1n2z_LMhitenl0bV1m0gNXTQmMyHEcnYk?usp=sharing',
  },
]
