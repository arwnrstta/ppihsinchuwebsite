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
    year: '2023/2024',
    cabinetName: '',
    president: '',
    photo: '',
    slogan: '',
    divisions: [],
  },
  {
    year: '2024/2025',
    cabinetName: 'Kabinet Kerja Nyata Tumbuh Bersama',
    president: 'Benedict Davon Martono',
    photo: 'images/leadership/kabinet_2425.png',
    slogan: '',
    divisions: [],
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
          name: 'Badan Pengurus Harian',
          members: [
           { name: 'Aurelia Phaeophyta Liem', position: 'Koordinator' },
           { name: 'Helena Aurelia Kurniawan', position: 'Wakil Koordinator 1' },
           { name: 'Darren William', position: 'Wakil Koordinator 2' },
           { name: 'Joefelyn Vania William', position: 'Sekretaris 1' },
           { name: 'Kresentia Chelsea Tanojo', position: 'Sekretaris 2' },
           { name: 'Axel Wendy', position: 'Bendahara 1' },
           { name: 'Stacey', position: 'Bendahara 1' },
          ],
        },
        {
          name: 'Divisi Akademik dan Karir',
          members: [
            { name: 'Aloysius Niko', position: 'Ketua Divisi' },
            { name: 'Angelie Melisa', position: 'Anggota' },
            { name: 'Ellyn Septiana', position: 'Anggota' },
            { name: 'Natalie Cialista', position: 'Anggota' },
          ],
        },
        {
          name: 'Divisi Kemahasiswaan',
          members: [
            { name: 'Davin Sathya Tandun', position: 'Ketua Divisi' },
            { name: 'Dharma Paramitha Dewi Tara', position: 'Anggota' },
            { name: 'Jonathan Christian Hosea', position: 'Anggota' },
          ],
        },
        {
          name: 'Divisi Publikasi dan Dokumentasi',
          members: [
            { name: 'Arwen Rosetta Njoto', position: 'Ketua Divisi' },
            { name: 'Florence Angela Kuntadi', position: 'Anggota' },
            { name: 'Jennifer Olivia Arianto', position: 'Anggota' },
            { name: 'Shenice Mau', position: 'Anggota' },
          ],
        },
        {
          name: 'Divisi Sosial dan Budaya',
          members: [
            { name: 'Carrel Raphael', position: 'Ketua Divisi' },
            { name: 'Lareina Michella Winata', position: 'Anggota' },
            { name: 'Reint Vattenan', position: 'Anggota' },
          ],
        },
        {
          name: 'Divisi Sponsorship dan Partnership',
          members: [
            { name: 'Kayla Christabelle', position: 'Ketua Divisi' },
            { name: 'Martha Evarista ', position: 'Anggota' },
          ],
        },
        {
          name: 'Penasihat Umum',
          members: [
            { name: 'Benedict Davon Martono', position: 'Penasihat' },
          ],
        },
        {
          name: 'Spring Intake',
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
