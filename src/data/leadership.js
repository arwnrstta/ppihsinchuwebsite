/*
 * LEADERSHIP THROUGH THE YEARS
 * ----------------------------
 * One record per administration, listed from OLDEST to NEWEST.
 * The year carousel on the About section moves through this list.
 * The record marked isCurrent: true is the one shown first.
 *
 * FIELDS
 *   year        - the term, e.g. '2025/2026'
 *   cabinetName - leave '' if unknown ("Cabinet name to be added" is shown)
 *   president   - leave '' if unknown
 *   photo       - portrait or group photo saved in public/images/leadership/
 *                 leave '' to show a placeholder
 *   highlight   - one or two sentences about that administration (optional)
 *   isCurrent   - true for the cabinet currently in office (only one record)
 *
 * TODO: Replace the placeholder records with verified historical information.
 * Nothing below has been verified except the current cabinet's name.
 */

export const leadershipRecords = [
  {
    year: '2023/2024',
    cabinetName: '',
    president: '',
    photo: '',
    highlight: '',
  },
  {
    year: '2024/2025',
    cabinetName: '',
    president: '',
    photo: '',
    highlight: '',
  },
  {
    year: '2025/2026',
    cabinetName: '',
    president: '',
    photo: '',
    highlight: '',
  },
  {
    year: '2026/2027',
    cabinetName: 'Kabinet Karya Raya',
    president: '',
    photo: '',
    highlight:
      'The current administration. Highlights will be added as the term progresses.',
    isCurrent: true,
  },
]
