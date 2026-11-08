/*
 * LEADERSHIP THROUGH THE YEARS
 * ----------------------------
 * One record per administration, listed from OLDEST to NEWEST.
 * The year carousel on the About section moves through this list.
 * The record marked isCurrent: true is the one shown first.
 *
 * FIELDS
 *   year        - the term, e.g. '2025/2026'
 *   cabinetName - leave '' if unknown ("Cabinet name to be added" is shown).
 *                 Cabinet names are never translated.
 *   president   - leave '' if unknown. People's names are never translated.
 *   photo       - portrait or group photo saved in public/images/leadership/
 *                 leave '' to show a placeholder
 *   slogan      - the cabinet's slogan or motto (optional). Leave '' and no
 *                 slogan is shown. Write it as plain text to show the same
 *                 words in every language:
 *                     slogan: 'Bersama, Berkarya',
 *                 or per language:
 *                     slogan: { en: '...', id: '...', 'zh-TW': '...' },
 *   divisions   - the cabinet's members, grouped by division (optional).
 *                 They are shown in a pop-up opened by the "View cabinet
 *                 members" button. See the example below.
 *   isCurrent   - true for the cabinet currently in office (only one record)
 *
 * CABINET MEMBERS
 * Division names changed from cabinet to cabinet, so every record lists its
 * own divisions with whatever names that cabinet used. Only names and
 * positions are needed:
 *
 *     divisions: [
 *       {
 *         name: 'Badan Pengurus Harian',
 *         members: [
 *           { name: 'Full Name', position: 'Ketua' },
 *           { name: 'Full Name', position: 'Sekretaris' },
 *         ],
 *       },
 *       {
 *         name: 'Divisi Acara',
 *         members: [
 *           { name: 'Full Name', position: 'Ketua Divisi' },
 *           { name: 'Full Name', position: 'Anggota' },
 *         ],
 *       },
 *     ],
 *
 *   - Division names may be plain text (shown as written in every language)
 *     or per language: name: { en: 'Events', id: 'Divisi Acara', 'zh-TW': '活動組' }
 *   - Positions written in Indonesian are translated automatically when they
 *     are listed under "positions" in src/locales/. Any other position is
 *     shown exactly as written.
 *   - Use divisions: [] while the list is not known. The button is then
 *     replaced by a short "to be added" note.
 *
 * THE CURRENT CABINET
 * Do not type the current cabinet's members here. They are read
 * automatically from src/data/committee.js, so there is only one list to
 * keep up to date. When a cabinet's term ends, copy its names and positions
 * into this file before replacing committee.js with the new committee.
 *
 * TODO: Replace the placeholder records with verified historical information.
 */

export const leadershipRecords = [
  {
    year: '2022/2023',
    cabinetName: 'Kabinet Darma Bersahaja',
    president: 'Yehezkiel Yahya',
    photo: '',
    slogan: '',
    divisions: [
      {
        name: { en: 'Executive Board', id: 'Badan Pengurus Harian', 'zh-TW': '執行委員會' },
        members: [
          { name: 'Yehezkiel Yahya', position: 'Koordinator' },
          { name: 'Andi Amaliah Ibrahim', position: 'Sekretariat Jenderal' },
          { name: 'Virra Krisnafitriana', position: 'Sekretaris' },
          { name: 'Patrick', position: 'Bendahara' },
          { name: 'Braiten Dharma Onggowarsito', position: 'Bendahara' },
        ],
      },
      // Positions within these divisions are not known; only names are shown.
      {
        name: { en: 'Academic and Career Division', id: 'Divisi Akademik dan Karir', 'zh-TW': '學術與職涯組' },
        members: [
          { name: 'Abdul Hakim Imaduddin Nasution' },
          { name: 'Jovian Wilbert Liando' },
          { name: 'Chetasikha' },
        ],
      },
      {
        name: { en: 'Internal Affairs Division', id: 'Divisi Internal', 'zh-TW': '內務組' },
        members: [
          { name: 'Bobbi Aditya' },
          { name: 'Stevani Genoveva' },
          { name: 'Muhammad Hendry Wicaksono' },
          { name: 'Mercy Angelina' },
        ],
      },
      {
        name: { en: 'Publication and Documentation Division', id: 'Divisi Publikasi dan Dokumentasi', 'zh-TW': '文宣紀錄組' },
        members: [
          { name: 'Achmad Wildan Nabila' },
          { name: 'Kevin Karnadi Kirmansjah' },
          { name: 'Vanessa Adyansa' },
          { name: 'Steffannie Jolie' },
        ],
      },
      {
        name: { en: 'Talent Development Division', id: 'Divisi Pengembangan Bakat', 'zh-TW': '人才培育組' },
        members: [
          { name: 'Felix Anthony Nathaniel Liang' },
          { name: 'Cerelia Angeline 姚月娜' },
          { name: 'Rafid Fahrullah Duyo' },
        ],
      },
    ],
  },
  {
    year: '2023/2024',
    cabinetName: 'Kabinet Kolaborasi Inklusif',
    president: 'Muhammad Hendry Wicaksono',
    photo: 'images/leadership/kabinet_kolaborasi_inklusif_20232024.JPG',
    slogan: '',
    divisions: [
      {
        name: { en: 'Executive Board', id: 'Badan Pengurus Harian', 'zh-TW': '執行委員會' },
        members: [
          { name: 'Muhammad Hendry Wicaksono', position: 'Koordinator' },
          { name: 'Hans Juliano', position: 'Sekretariat Jenderal' },
          { name: 'Anastasia Riana', position: 'Sekretaris' },
          { name: 'Jessica Felicia', position: 'Sekretaris' },
          { name: 'Braiten Dharma', position: 'Bendahara' },
          { name: 'Wildan Nabi', position: 'Bendahara' },
        ],
      },
      // Positions within these divisions are not known; only names are shown.
      {
        name: { en: 'Internal Affairs Division', id: 'Bidang Internal', 'zh-TW': '內務組' },
        members: [
          { name: 'Mercy Angelina' },
          { name: 'Kaylin Hartadi' },
          { name: 'Erickson' },
          { name: 'Patrick Sam Pierry' },
        ],
      },
      {
        name: { en: 'Student Affairs Division', id: 'Bidang Kemahasiswaan', 'zh-TW': '學生事務組' },
        members: [
          { name: 'Chetasikha Khanda T' },
          { name: 'Darrell Nathaniel Prayogi' },
          { name: 'Beatrice Alberta Liando' },
          { name: 'Marcellius Brian' },
        ],
      },
      {
        name: { en: 'Social and Cultural Affairs Division', id: 'Bidang Sosial dan Budaya', 'zh-TW': '社會文化組' },
        members: [
          { name: 'Evangeline Olivia' },
          { name: 'Benedict Davon Martono' },
          { name: 'Audrey Sintia' },
          { name: 'Yokhebed Choka' },
        ],
      },
      {
        name: { en: 'Media, Publications, and IT Division', id: 'Bidang Media, Publikasi dan IT', 'zh-TW': '媒體、文宣與資訊組' },
        members: [
          { name: 'Steffannie Jollie' },
          { name: 'Jocelyn Carisa Setiawan' },
          { name: 'Kenneth Tan Benjamin' },
        ],
      },
      {
        name: { en: 'Spring Intake', id: 'Spring Intake', 'zh-TW': '春季學期招募成員'},
        members: [
          { name: 'Alicia Joely', position: 'Anggota Divisi Internal' },
          { name: 'Chiara Callista', position: 'Anggota Divisi Sosial dan Budaya' },
          { name: 'Kevin Patrick', position: 'Anggota Divisi Kemahasiswaan' },
          { name: 'Amelia Maureen', position: 'Anggota Divisi Media, Publikasi, & IT' },
        ],
      },
    ],
  },
  {
    year: '2024/2025',
    cabinetName: 'Kabinet Kerja Nyata Tumbuh Bersama',
    president: 'Benedict Davon Martono',
    photo: 'images/leadership/kabinet_2425.png',
    slogan: '',
    divisions: [
      {
        name: { en: 'Core Executive Board', id: 'BPH Inti', 'zh-TW': '執行委員會' },
        members: [
          { name: 'Benedict Davon Martono', position: 'Koordinator' },
          { name: 'Kaylin Hartadi', position: 'Wakil Koordinator' },
          { name: 'Nadya Keisha', position: 'Sekretaris 1' },
          { name: 'Aurelia Phaeophyta Liem', position: 'Sekretaris 2' },
          { name: 'Lusiana Ekawati Angelina', position: 'Bendahara 1' },
          { name: 'Beatrice Alberta Liando', position: 'Bendahara 2' },
        ],
      },
      {
        name: { en: 'Academic and Career Development Division', id: 'Bidang Akademik dan Karir', 'zh-TW': '學術與職涯組' },
        members: [
          { name: 'Alicia Joely', position: 'Ketua Divisi' },
          { name: 'Helena Aurelia Kurniawan', position: 'Anggota' },
          { name: 'Christopher Tjoanda', position: 'Anggota' },
          { name: 'Vincent Limardi', position: 'Anggota' },
        ],
      },
      {
        name: { en: 'Interests and Talents Division', id: 'Bidang Minat dan Bakat', 'zh-TW': '興趣與才藝組' },
        members: [
          { name: 'Kevin Patrick Tagore', position: 'Ketua Divisi' },
          { name: 'Wienardo Chandra', position: 'Anggota' },
          { name: 'Nicholas', position: 'Anggota' },
          { name: 'Darren William', position: 'Anggota' },
        ],
      },
      {
        name: { en: 'Social and Cultural Affairs Division', id: 'Bidang Sosial dan Budaya', 'zh-TW': '社會文化組' },
        members: [
          { name: 'Chiara Calista Sumar', position: 'Ketua Divisi' },
          { name: 'Muhammad Daffa Auliarizky Onielda', position: 'Anggota' },
          { name: 'Axel Wendy', position: 'Anggota' },
          { name: 'Carrel Raphael', position: 'Anggota' },
        ],
      },
      {
        name: { en: 'Public Relations and Media Division', id: 'Bidang Hubungan Masyarakat dan Media', 'zh-TW': '公共關係與媒體組' },
        members: [
          { name: 'Amelia Maureen', position: 'Ketua Divisi' },
          { name: 'Tiffany Uneputty', position: 'Anggota' },
          { name: 'Joefelyn', position: 'Anggota' },
          { name: 'Stevan Surya', position: 'Anggota' },
        ],
      },
      {
        name: { en: 'Spring Intake', id: 'Spring Intake', 'zh-TW': '春季學期招募成員'},
        members: [
          { name: 'Jasmine Davina', position: 'Asisten Sekretaris' },
          { name: 'Aloysius Niko', position: 'Anggota Divisi Akademik dan Karir' },
          { name: 'Jonathan Christian Hosea', position: 'Anggota Divisi Akademik dan Karir' },
          { name: 'Samuel Gerard', position: 'Anggota Divisi Minat dan Bakat' },
          { name: 'Janice Wongsosaputro', position: 'Anggota Divisi Minat dan Bakat' },
          { name: 'Edward Louis Saputro', position: 'Anggota Divisi Sosial dan Budaya' },
          { name: 'Geraldo Yovan Arifin', position: 'Anggota Divisi Sosial dan Budaya' },
        ],
      },
    ],
  },
  {
    year: '2025/2026',
    cabinetName: 'Kabinet Harmoni',
    president: 'Aurelia Phaeophyta Liem',
    photo: 'images/leadership/kabinet_harmoni_2526.png',
    slogan: 'Bersatu, Bertumbuh, Berarti',
    // TODO: Add the members of Kabinet Harmoni, grouped by its divisions.
    divisions: [
        {
          name: { en: 'Executive Board', id: 'Badan Pengurus Harian', 'zh-TW': '執行委員會' },
          members: [
           { name: 'Aurelia Phaeophyta Liem', position: 'Koordinator' },
           { name: 'Helena Aurelia Kurniawan', position: 'Wakil Koordinator 1' },
           { name: 'Darren William', position: 'Wakil Koordinator 2' },
           { name: 'Joefelyn Vania William', position: 'Sekretaris 1' },
           { name: 'Kresentia Chelsea Tanojo', position: 'Sekretaris 2' },
           { name: 'Axel Wendy', position: 'Bendahara 1' },
           { name: 'Stacey', position: 'Bendahara 2' },
          ],
        },
        {
          name: { en: 'Academic and Career Division', id: 'Divisi Akademik dan Karir', 'zh-TW': '學術與職涯組' },
          members: [
            { name: 'Aloysius Niko', position: 'Ketua Divisi' },
            { name: 'Angelie Melisa', position: 'Anggota' },
            { name: 'Ellyn Septiana', position: 'Anggota' },
            { name: 'Natalie Cialista', position: 'Anggota' },
          ],
        },
        {
          name: { en: 'Student Affairs Division', id: 'Divisi Kemahasiswaan', 'zh-TW': '學生事務組' },
          members: [
            { name: 'Davin Sathya Tandun', position: 'Ketua Divisi' },
            { name: 'Dharma Paramitha Dewi Tara', position: 'Anggota' },
            { name: 'Jonathan Christian Hosea', position: 'Anggota' },
          ],
        },
        {
          name: { en: 'Publication and Documentation Division', id: 'Divisi Publikasi dan Dokumentasi', 'zh-TW': '文宣紀錄組' },
          members: [
            { name: 'Arwen Rosetta Njoto', position: 'Ketua Divisi' },
            { name: 'Florence Angela Kuntadi', position: 'Anggota' },
            { name: 'Jennifer Olivia Arianto', position: 'Anggota' },
            { name: 'Shenice Mau', position: 'Anggota' },
          ],
        },
        {
          name: { en: 'Social and Cultural Affairs Division', id: 'Divisi Sosial dan Budaya', 'zh-TW': '社會文化組' },
          members: [
            { name: 'Carrel Raphael', position: 'Ketua Divisi' },
            { name: 'Lareina Michella Winata', position: 'Anggota' },
            { name: 'Reint Vattenan', position: 'Anggota' },
          ],
        },
        {
          name: { en: 'Sponsorship and Partnership Division', id: 'Divisi Sponsorship dan Partnership', 'zh-TW': '合作與贊助組' },
          members: [
            { name: 'Kayla Christabelle', position: 'Ketua Divisi' },
            { name: 'Martha Evarista ', position: 'Anggota' },
          ],
        },
        {
          name: { en: 'General Advisers', id: 'Penasihat Umum', 'zh-TW': '顧問' },
          members: [
            { name: 'Benedict Davon Martono', position: 'Penasihat' },
          ],
        },
        {
          name: { en: 'Spring Intake', id: 'Spring Intake', 'zh-TW': '春季學期招募成員' },
          members: [
            { name: 'Grace Angeline Sun', position: 'Asisten Sekretaris' },
            { name: 'Reynard Emerson Khoamin', position: 'Anggota Divisi Akademik dan Karir' },
            { name: 'Fidelia Amanda Djinarwan', position: 'Anggota Divisi Kemahasiswaan' },
            { name: 'Richella Nydia Shalom', position: 'Anggota Divisi Publikasi dan Dokumentasi' },
            { name: 'Bryan Evan Haryanto', position: 'Anggota Divisi Sosial dan Budaya' },
            { name: 'Frederick Addison Himiawan ', position: 'Anggota Divisi Sosial dan Budaya' },
            { name: 'Lionel Christiano Chan', position: 'Anggota Divisi Sosial dan Budaya' },
            { name: 'Minory Caroline ', position: 'Anggota Divisi Sponsorship dan Partnership' },
          ],
        },
      ],
  },
  {
    year: '2026/2027',
    cabinetName: 'Kabinet Karya Raya',
    president: 'Alicia Joely',
    photo: 'images/leadership/kabinet_karyaraya_2627.png',
    slogan: 'Merajut Karsa, Mengukir Karya, Menuju Raya',
    // No "divisions" here: the current cabinet's members come from
    // src/data/committee.js automatically.
    isCurrent: true,
  },
]
