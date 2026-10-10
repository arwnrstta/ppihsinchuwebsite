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
    description:
      'The executive board that leads the cabinet and coordinates every division.',
    members: [
      { name: '', position: 'Ketua', photo: '' },
      { name: '', position: 'Wakil Ketua', photo: '' },
      { name: '', position: 'Wakil Ketua', photo: '' },
      { name: '', position: 'Sekretaris', photo: '' },
      { name: '', position: 'Sekretaris', photo: '' },
      { name: '', position: 'Bendahara', photo: '' },
      { name: '', position: 'Bendahara', photo: '' },
    ],
  },
  {
    id: 'sosial-budaya',
    shortName: 'Sosial & Budaya',
    name: 'Divisi Sosial dan Budaya',
    description:
      'Brings the community together through social gatherings and cultural celebrations.',
    members: [
      { name: '', position: 'Ketua Divisi', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
    ],
  },
  {
    id: 'kemahasiswaan',
    shortName: 'Kemahasiswaan',
    name: 'Divisi Kemahasiswaan',
    description:
      'Looks after student welfare and helps new arrivals settle into life in Hsinchu.',
    members: [
      { name: '', position: 'Ketua Divisi', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
    ],
  },
  {
    id: 'publikasi-dokumentasi',
    shortName: 'Publikasi & Dokumentasi',
    name: 'Divisi Publikasi dan Dokumentasi',
    description:
      'Tells our story through design, photography, social media, and this website.',
    members: [
      { name: '', position: 'Ketua Divisi', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
    ],
  },
  {
    id: 'akademik-karir',
    shortName: 'Akademik & Karir',
    name: 'Divisi Akademik dan Karir',
    description:
      'Supports academic growth and career preparation through talks, sharing sessions, and resources.',
    members: [
      { name: '', position: 'Ketua Divisi', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
    ],
  },
  {
    id: 'sponsorship',
    shortName: 'Sponsorship',
    name: 'Divisi Sponsorship',
    description:
      'Builds partnerships with the organisations and sponsors that make our programmes possible.',
    members: [
      { name: '', position: 'Ketua Divisi', photo: '' },
      { name: '', position: 'Anggota', photo: '' },
    ],
  },
  {
    id: 'penasihat',
    shortName: 'Penasihat',
    name: 'Penasihat Umum',
    description:
      'Experienced advisers who guide the cabinet and keep it connected to its history.',
    members: [
      { name: '', position: 'Penasihat', photo: '' },
      { name: '', position: 'Penasihat', photo: '' },
    ],
  },
]
