/*
 * EVENTS
 * ------
 * Every event on the website comes from this list. The order does not matter:
 * the website sorts events by date automatically.
 *
 * UPCOMING OR PAST?
 * The website decides this by itself from the event's dates ("date" plus
 * any "additionalDates"), using the visitor's own local date:
 *   - the last date is today or later -> Upcoming
 *   - the last date is before today   -> Past (it moves to the archive
 *                                        automatically the next day)
 *   - date is ''                      -> Upcoming, shown as "Date to be announced"
 * The upcoming event whose NEXT date is nearest becomes the large featured
 * event, so a multi-day event stays featured between its days even after
 * its first day has passed.
 *
 * EVENTS ON SEVERAL DAYS
 * Write the first day in "date" and every other day in "additionalDates".
 * The days do not need to be consecutive or in order:
 *
 *     date: '2026-11-14',
 *     additionalDates: ['2026-11-20', '2026-11-21', '2026-11-22'],
 *
 * The website sorts the dates and joins consecutive days automatically:
 *     English     November 14, 20–22, 2026
 *     Indonesian  14, 20–22 November 2026
 *     Chinese     2026年11月14日、20日至22日
 * Dates in other months or years work too, for example
 *     date: '2026-12-30', additionalDates: ['2026-12-31', '2027-01-02'],
 *     -> December 30–31, 2026; January 2, 2027
 * In the archive, an event on dates in two years appears under both years.
 * Leave "additionalDates" out (or []) for a one-day event; it then shows a
 * single date exactly as before.
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
 *   date            - 'YYYY-MM-DD', e.g. '2027-03-14' (or '' if not confirmed).
 *                     For a multi-day event, the first day.
 *   additionalDates - optional: the event's other days, each 'YYYY-MM-DD',
 *                     e.g. ['2027-03-20', '2027-03-21']. See "EVENTS ON
 *                     SEVERAL DAYS" above.
 *   time            - e.g. '18:00 - 21:00' (or '')
 *   venue           - where it takes place, in full (or ''). Shown in the
 *                     event details window.
 *   venueShort      - optional: a short version of the venue for the large
 *                     featured event card, where space is limited. Without
 *                     it, the featured card shows "venue" (cut off after two
 *                     lines if it is very long). Per language, e.g.
 *                       venueShort: {
 *                         en: 'Multiple Venues in Hsinchu + Online',
 *                         id: 'Beberapa Lokasi di Hsinchu + Online',
 *                         'zh-TW': '新竹多個場地及線上',
 *                       },
 *   venues          - optional: for events in several places, one entry per
 *                     activity with its location. The details window then
 *                     lists them as neat rows instead of the "venue" text:
 *                       venues: [
 *                         { activity: 'Badminton', location: 'NYCU Composite Building' },
 *                         { activity: { en: 'E-Sports', id: 'E-Sport', 'zh-TW': '電競' },
 *                           location: 'Online via Discord' },
 *                       ],
 *                     "activity" is optional; "location" is required.
 *                     Keep "venue" filled in as well; it is the fallback
 *                     wherever "venues" or "venueShort" is not used.
 *   fee             - what it costs to join. Plain text for an amount, e.g.
 *                     'NT$150', or per language for words:
 *                       fee: { en: 'Free', id: 'Gratis', 'zh-TW': '免費' },
 *                     Leave '' and no fee is shown at all.
 *   feeShort        - optional: a short price for the featured event card,
 *                     e.g. a range when there are several ticket types.
 *                     Without it, the card shows "fee". When both are empty,
 *                     no fee is shown. Per language, e.g.
 *                       feeShort: { en: 'NT$889–989', id: 'NT$889–989', 'zh-TW': 'NT$889–989' },
 *   fees            - optional: for events with several ticket categories,
 *                     one entry per category. The details window then shows
 *                     them as rows under "Registration Fees" instead of the
 *                     "fee" text:
 *                       fees: [
 *                         {
 *                           category: { en: 'Early Bird', id: 'Early Bird', 'zh-TW': '早鳥票' },
 *                           price: 'NT$300',
 *                           notes: { en: 'Until 1 November', id: 'Sampai 1 November', 'zh-TW': '至11月1日' },
 *                         },
 *                         { category: { en: 'Regular', id: 'Reguler', 'zh-TW': '一般票' }, price: 'NT$350' },
 *                       ],
 *                     "price" is required; "category" and "notes" are
 *                     optional. Only list categories and prices that are
 *                     actually offered. Keep "fee" filled in as well.
 *
 *                     EARLY BIRD / REGULAR TABLE: when every price is either
 *                     Early Bird or Regular, the details window shows a
 *                     compact table instead: one row per competition, with
 *                     both prices side by side. Name the categories
 *                     "<competition> - Early Bird" and "<competition> - Regular"
 *                     (as in Hsinchu Open 2026 below), or add the fields
 *                       group: { en: 'Badminton Singles', id: '...', 'zh-TW': '...' },
 *                       tier: 'earlyBird',   // or 'regular'
 *                     - If every Early Bird price has the same "notes" (the
 *                       deadline), it is shown once above the table.
 *                     - A unit at the end of both prices of a row, such as
 *                       'NT$450/team', is shown next to the name instead:
 *                       "E-Sports (per team)" with NT$450 / NT$500.
 *                     Prices that are neither (e.g. Student, Children) are
 *                     shown as a short list.
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
 *   trailerYoutubeUrl - optional: a YouTube link to a short trailer, pasted
 *                     exactly as copied, e.g. 'https://youtu.be/abc123XYZ00'
 *                     or 'https://www.youtube.com/watch?v=abc123XYZ00'.
 *                     While this is the next upcoming event, the trailer
 *                     plays silently and on repeat behind the "Upcoming
 *                     Events" card on the homepage. Leave '' to keep the
 *                     plain red card.
 *   trailerPoster   - optional: a still image (landscape) shown on that card
 *                     before the trailer starts, or instead of it when the
 *                     browser blocks autoplay. Without it, YouTube's own
 *                     thumbnail of the trailer is used.
 *   sponsors        - optional: the event's sponsors, shown as logos in the
 *                     event details window under "Sponsors". One entry each,
 *                     with the logo saved next to the poster:
 *                       sponsors: [
 *                         { name: 'PT. Example', logo: 'images/events/.../sponsor/example.png' },
 *                       ],
 *                     "name" is never translated and is read out by screen
 *                     readers. Leave it out (or []) and nothing is shown.
 *   mediaPartners   - optional: the same, for media partners. Shown as a
 *                     separate group under "Media Partners".
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
    date: '2026-11-14',
    additionalDates: [
      '2026-11-20',
      '2026-11-21',
      '2026-11-22',
    ],
    time: '',
    venue: 'E-Sports: Online via Discord | Billiard: 歐印撞球飛鏢館 OUYIN Billiard | Badminton: NYCU Composite Building 國立陽明交通大學綜合球館',
    venueShort: {
      en: 'Multiple Venues in Hsinchu + Online',
      id: 'Beberapa Lokasi di Hsinchu + Online',
      'zh-TW': '新竹多個場地及線上',
    },
    venues: [
      {
        activity: { en: 'E-Sports', id: 'E-Sport', 'zh-TW': '電競' },
        location: { en: 'Online via Discord', id: 'Online via Discord', 'zh-TW': '線上（Discord）' },
      },
      {
        activity: { en: 'Billiard', id: 'Biliar', 'zh-TW': '撞球' },
        location: '歐印撞球飛鏢館 OUYIN Billiard',
      },
      {
        activity: { en: 'Badminton', id: 'Bulu Tangkis', 'zh-TW': '羽球' },
        location: 'NYCU Composite Building 國立陽明交通大學綜合球館',
      },
    ],
    feeShort: {
      en: 'From NT$250',
      id: 'Mulai dari NT$250',
      'zh-TW': 'NT$250 起',
    },
    
    fees: [
      // E-SPORTS
      {
        category: {
          en: 'E-Sports - Early Bird',
          id: 'E-Sports - Early Bird',
          'zh-TW': '電競 - 早鳥價',
        },
        price: 'NT$450/team',
        notes: {
          en: 'Until October 26, 2026',
          id: 'Sampai 26 Oktober 2026',
          'zh-TW': '優惠至2026年10月26日止',
        },
      },
      {
        category: {
          en: 'E-Sports - Regular',
          id: 'E-Sports - Reguler',
          'zh-TW': '電競 - 一般價',
        },
        price: 'NT$500/team',
      },

      // BILLIARDS
      {
        category: {
          en: 'Billiards - Early Bird',
          id: 'Biliar - Early Bird',
          'zh-TW': '撞球 - 早鳥價',
        },
        price: 'NT$250',
        notes: {
          en: 'Until October 26, 2026',
          id: 'Sampai 26 Oktober 2026',
          'zh-TW': '優惠至2026年10月26日止',
        },
      },
      {
        category: {
          en: 'Billiards - Regular',
          id: 'Biliar - Reguler',
          'zh-TW': '撞球 - 一般價',
        },
        price: 'NT$270',
      },

      // BADMINTON SINGLES
      {
        category: {
          en: 'Badminton Singles - Early Bird',
          id: 'Badminton Tunggal - Early Bird',
          'zh-TW': '羽球單打 - 早鳥價',
        },
        price: 'NT$250',
        notes: {
          en: 'Until October 26, 2026',
          id: 'Sampai 26 Oktober 2026',
          'zh-TW': '優惠至2026年10月26日止',
        },
      },
      {
        category: {
          en: 'Badminton Singles - Regular',
          id: 'Badminton Tunggal - Reguler',
          'zh-TW': '羽球單打 - 一般價',
        },
        price: 'NT$270',
      },

      // BADMINTON DOUBLES
      {
        category: {
          en: 'Badminton Doubles - Early Bird',
          id: 'Badminton Ganda - Early Bird',
          'zh-TW': '羽球雙打 - 早鳥價',
        },
        price: 'NT$400',
        notes: {
          en: 'Until October 26, 2026',
          id: 'Sampai 26 Oktober 2026',
          'zh-TW': '優惠至2026年10月26日止',
        },
      },
      {
        category: {
          en: 'Badminton Doubles - Regular',
          id: 'Badminton Ganda - Reguler',
          'zh-TW': '羽球雙打 - 一般價',
        },
        price: 'NT$420',
      },
    ],

    organizer: 'PPI Hsinchu',
    cabinet: 'Kabinet Karya Raya',
    summary: {
      en: 'PPI Hsinchu\'s most anticipated annual sporting event, bringing together Indonesian students from across Taiwan to compete and build friendships.',
      id: 'Acara olahraga tahunan PPI Hsinchu yang paling dinantikan, mempertemukan mahasiswa Indonesia dari seluruh Taiwan untuk berkompetisi dan menjalin persahabatan.',
      'zh-TW': '新竹印尼學生會（PPI Hsinchu）最受期待的年度體育盛事，匯聚來自全臺各地的印尼學生，共同參與競賽並建立友誼。',
    },
    poster: 'images/events/kabinet_karyaraya_2627/hsinchu_open_2026.png',
    registrationUrl: 'https://forms.gle/9SnnTBPyH7jkdcSk6',
    documentationUrl: '',
    // TODO: Paste the Hsinchu Open 2026 trailer link here.
    trailerYoutubeUrl: 'https://youtu.be/0sWlnrB-1Ls?si=IsKS2q9Y5XuMM_gA',
    sponsors: [
      { name: 'NTHU Office of Global Affairs', logo: 'images/events/kabinet_karyaraya_2627/open_2026/sponsor/NTHU OGA - Logo.png' },
      { name: 'PT. Mitra Mulia Bangun Putera', logo: 'images/events/kabinet_karyaraya_2627/open_2026/sponsor/logo MMBP.jpg' },
      { name: 'PT. Bravo Eterna Sentosa', logo: 'images/events/kabinet_karyaraya_2627/open_2026/sponsor/logo BRAVO.jpg' },
      { name: 'Trijaya Abadi Bangunan', logo: 'images/events/kabinet_karyaraya_2627/open_2026/sponsor/logo TAB.jpg' },
      { name: 'ALLIN Billiard', logo: 'images/events/kabinet_karyaraya_2627/open_2026/sponsor/ALLIN Billiard - Logo.png' },
    ],
    mediaPartners: [
      { name: 'Radio Taiwan International', logo: 'images/events/kabinet_karyaraya_2627/open_2026/medpar/RTI - 3.影片用_Rti品牌logo_白底紅字.png' },
      { name: 'Nihao', logo: 'images/events/kabinet_karyaraya_2627/open_2026/medpar/Nihao - Logo final ROUND.png' },
      { name: 'FSA NTHU', logo: 'images/events/kabinet_karyaraya_2627/open_2026/medpar/FSA_logo.png' },
      { name: 'NCUE ISA', logo: 'images/events/kabinet_karyaraya_2627/open_2026/medpar/NCUE - Background .JPG' },
      { name: 'DYU-ISA', logo: 'images/events/kabinet_karyaraya_2627/open_2026/medpar/DYU_logo.jpg' },
    ],
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
    feeShort: {
      en: 'NT$889–989',
      id: 'NT$889–989',
      'zh-TW': 'NT$889–989',
    },
    fees: [
      {
        category: {
          en: 'Student / Non-student',
          id: 'Mahasiswa / Umum',
          'zh-TW': '學生／一般民眾',
        },
        price: 'NT$989',
        notes: {
          en: 'Discounted from NT$1,100',
          id: 'Diskon dari NT$1.100',
          'zh-TW': '原價 NT$1,100',
        },
      },
      {
        category: {
          en: 'Children (under 12)',
          id: 'Anak-anak (di bawah 12 tahun)',
          'zh-TW': '兒童（未滿12歲）',
        },
        price: 'NT$889',
      },
    ],
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
