/*
 * COMMITTEE MEMBERS
 * -----------------
 * Each division below becomes one tab in the "Our Committee" selector.
 * The first division in the list is the one shown by default.
 *
 * HOW TO UPDATE A MEMBER
 *   name     - the member's full name. Leave '' to show "Name to be announced".
 *   position - their role, shown under the name.
 *   photo    - path to their portrait. Leave '' to show a placeholder silhouette.
 *
 * HOW TO ADD A PORTRAIT
 *   1. Use a cutout photo (transparent background, PNG or WebP), portrait
 *      orientation, around 800 x 1000 pixels, cropped from the waist up.
 *   2. Save it in public/images/committee/ (for example ketua.png).
 *   3. Set photo: '/images/committee/ketua.png'
 *
 * DIVISION NAMES AND LANGUAGES
 *   name           - the OFFICIAL Indonesian name. It is never translated.
 *   shortName      - a short Indonesian name for the selector buttons.
 *   translatedName - the English and Chinese names. In those languages the
 *                    translated name is shown as the main title, with the
 *                    official Indonesian name underneath as a subtitle.
 *   description    - one sentence per language: { en, id, 'zh-TW' }.
 *
 * POSITIONS
 *   Write positions in Indonesian (Ketua, Sekretaris, Anggota...).
 *   Their English and Chinese translations are in src/locales/, under
 *   "positions". A position that is not listed there is shown as written.
 *
 * People's names are never translated.
 *
 * To add or remove a member, add or delete one { ... } line.
 * To add a division, copy a whole division block and give it a new "id".
 *
 * TODO: Replace every placeholder with the official names and portraits.
 */

export const divisions = [
  {
    id: 'bph',
    shortName: 'BPH',
    name: 'Badan Pengurus Harian',
    translatedName: { en: 'Executive Board', 'zh-TW': '執行委員會' },
    description: {
      en: 'The executive board that leads the cabinet and coordinates every division.',
      id: 'Badan pengurus yang memimpin kabinet dan mengoordinasikan setiap divisi.',
      'zh-TW': '帶領內閣並協調各組運作的執行團隊。',
    },
    members: [
      { name: 'Alicia Joely', position: 'Koordinator', photo: 'images/committee/bph/koor_alicia.png' },
      { name: 'Arwen Rosetta Njoto', position: 'Wakil Koordinator 1', photo: 'images/committee/bph/wakil1_arwen.png' },
      { name: 'Edward Louis Saputro', position: 'Wakil Koordinator 2', photo: 'images/committee/bph/wakil2_edward.png' },
      { name: 'Grace Angeline Sun', position: 'Sekretaris 1', photo: 'images/committee/bph/sekre1_grace.png' },
      { name: 'Jocelyn Bernetta Iskandar', position: 'Sekretaris 2', photo: 'images/committee/bph/sekre2_jocelyn.png' },
      { name: 'Reynard Emerson Khoamin', position: 'Bendahara 1', photo: 'images/committee/bph/bendahara1_reynard.png' },
      { name: 'Davin Sathya Tandun', position: 'Bendahara 2', photo: 'images/committee/bph/bendahara2_davin.png' },
    ],
  },
  {
    id: 'sosial-budaya',
    shortName: 'Sosial & Budaya',
    name: 'Divisi Sosial dan Budaya',
    translatedName: { en: 'Social & Cultural Affairs', 'zh-TW': '社會文化組' },
    description: {
      en: 'Brings the community together through social gatherings and cultural celebrations.',
      id: 'Mempererat komunitas melalui kegiatan sosial dan perayaan budaya.',
      'zh-TW': '透過聯誼聚會與文化慶典凝聚社群。',
    },
    members: [
      { name: 'Frederick Addison Himiawan ', position: 'Ketua Divisi', photo: 'images/committee/sosbud/sosbud_fred.png' },
      { name: 'Bryan Evan Haryanto', position: 'Anggota', photo: 'images/committee/sosbud/sosbud_bryan.png' },
      { name: 'Elaine Wongsosaputro', position: 'Anggota', photo: 'images/committee/sosbud/sosbud_elaine.png' },
      { name: 'Sean Patrick', position: 'Anggota', photo: 'images/committee/sosbud/sosbud_sean.png' },
    ],
  },
  {
    id: 'kemahasiswaan',
    shortName: 'Kemahasiswaan',
    name: 'Divisi Kemahasiswaan',
    translatedName: { en: 'Student Affairs', 'zh-TW': '學生事務組' },
    description: {
      en: 'Looks after student welfare and helps new arrivals settle into life in Hsinchu.',
      id: 'Memperhatikan kesejahteraan mahasiswa dan membantu mahasiswa baru beradaptasi dengan kehidupan di Hsinchu.',
      'zh-TW': '照顧學生福祉，並協助新生適應新竹的生活。',
    },
    members: [
      { name: 'Audrey Priscilla Wijaya', position: 'Ketua Divisi', photo: 'images/committee/kemahasiswaan/kemahasiswaan_audrey.png' },
      { name: 'Kenzion Nicholas Ciang', position: 'Anggota', photo: 'images/committee/kemahasiswaan/kemahasiswaan_kenzion.png' },
      { name: 'Kevin Pinalfian', position: 'Anggota', photo: 'images/committee/kemahasiswaan/kemahasiswaan_kevin.png' },
      { name: 'Lionel Djuneidy', position: 'Anggota', photo: 'images/committee/kemahasiswaan/kemahasiswaan_lionel.png' },
      { name: 'Veronica Natasha Santoso', position: 'Anggota', photo: 'images/committee/kemahasiswaan/kemahasiswaan_tasha.png' },
    ],
  },
  {
    id: 'publikasi-dokumentasi',
    shortName: 'Publikasi & Dokumentasi',
    name: 'Divisi Publikasi dan Dokumentasi',
    translatedName: { en: 'Publication & Documentation', 'zh-TW': '文宣紀錄組' },
    description: {
      en: 'Tells our story through design, photography, social media, and this website.',
      id: 'Menceritakan kisah kita melalui desain, fotografi, media sosial, dan situs web ini.',
      'zh-TW': '透過設計、攝影、社群媒體與本網站，述說我們的故事。',
    },
    members: [
      { name: 'Amelia Maureen Widiya', position: 'Ketua Divisi', photo: 'images/committee/pubdok/pubdok_amel.png' },
      { name: 'Aileen Roselyn Wijaya', position: 'Anggota', photo: 'images/committee/pubdok/pubdok_aileen.png' },
      { name: 'Jocelyn Thio', position: 'Anggota', photo: 'images/committee/pubdok/pubdok_jocelyn_thio.png' },
      { name: 'Richella Nydia Shalom', position: 'Anggota', photo: 'images/committee/pubdok/pubdok_nydia.png' },
    ],
  },
  {
    id: 'akademik-karir',
    shortName: 'Akademik & Karir',
    name: 'Divisi Akademik dan Karir',
    translatedName: { en: 'Academic & Career', 'zh-TW': '學術與職涯組' },
    description: {
      en: 'Supports academic growth and career preparation through talks, sharing sessions, and resources.',
      id: 'Mendukung pengembangan akademik dan persiapan karier melalui seminar, sesi berbagi, dan berbagai sumber informasi.',
      'zh-TW': '透過講座、分享會與各項資源，支持學術成長與職涯準備。',
    },
    members: [
      { name: 'Chiara Callista Sumar', position: 'Ketua Divisi', photo: 'images/committee/akademik/akademik_chiara.png' },
      { name: 'Christoffer Richie Tobing', position: 'Anggota', photo: 'images/committee/akademik/akademik_richie.png' },
      { name: 'Enzo Wendy', position: 'Anggota', photo: 'images/committee/akademik/akademik_enzo.png' },
      { name: 'Kelvin Claudio', position: 'Anggota', photo: 'images/committee/akademik/akademik_kelvin.png' },
    ],
  },
  {
    id: 'sponsorship',
    shortName: 'Partnership dan Sponsorship',
    name: 'Divisi Partnership dan Sponsorship',
    translatedName: { en: 'Partnership and Sponsorship', 'zh-TW': '合作與贊助' },
    description: {
      en: 'Builds partnerships with the organisations and sponsors that make our programmes possible.',
      id: 'Membangun kemitraan dengan organisasi dan sponsor yang memungkinkan program kita terlaksana.',
      'zh-TW': '與支持我們各項計畫的團體及贊助夥伴建立合作關係。',
    },
    members: [
      { name: 'Nathanael Jason Nababan', position: 'Ketua Divisi', photo: 'images/committee/sponsor/sponsor_jason.png' },
      { name: 'Chelsea Jocelyn Suwono', position: 'Anggota', photo: 'images/committee/sponsor/sponsor_chelsea.png' },
    ],
  },
  {
    id: 'penasihat',
    shortName: 'Penasihat',
    name: 'Penasihat Umum',
    translatedName: { en: 'General Advisers', 'zh-TW': '顧問' },
    description: {
      en: 'Experienced advisers who guide the cabinet and keep it connected to its history.',
      id: 'Para penasihat berpengalaman yang membimbing kabinet dan menjaganya tetap terhubung dengan sejarahnya.',
      'zh-TW': '經驗豐富的顧問，為內閣提供指引，並延續組織的歷史傳承。',
    },
    members: [
      { name: 'Benedict Davon Martono', position: 'Penasihat', photo: 'images/committee/penasihat/penasihat1_davon.png' },
      { name: 'Helena Aurelia Kurniawan', position: 'Penasihat', photo: 'images/committee/penasihat/penasihat2_helena.png' },
    ],
  },
]
