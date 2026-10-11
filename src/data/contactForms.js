/*
 * CONTACT FORM FIELDS
 * -------------------
 * The contact form can switch between the two form types below.
 * The ContactForm component builds the form from these lists, so adding,
 * removing or renaming a field only needs a change here.
 *
 * LANGUAGES
 * Every "label", "title" and option is written once per language:
 *     { en: '...', id: '...', 'zh-TW': '...' }
 * A language that is missing or '' falls back to English.
 *
 * FIELD OPTIONS
 *   name     - a unique short name with no spaces (used internally, never shown)
 *   label    - the text shown above the field
 *   type     - 'text', 'email', 'textarea' or 'select'
 *   required - true if the visitor must fill it in
 *   options  - the choices for a 'select' field
 *   wide     - true makes the field span the full width of the form
 */

const emailLabel = { en: 'Email address', id: 'Alamat email', 'zh-TW': '電子郵件' }
const messageLabel = { en: 'Message', id: 'Pesan', 'zh-TW': '訊息內容' }

export const contactFormTypes = [
  {
    id: 'general',
    label: {
      en: 'Student / General',
      id: 'Mahasiswa / Umum',
      'zh-TW': '學生／一般',
    },
    title: {
      en: 'Student / General Inquiry',
      id: 'Pertanyaan Mahasiswa / Umum',
      'zh-TW': '學生／一般詢問',
    },
    fields: [
      {
        name: 'fullName',
        label: { en: 'Full name', id: 'Nama lengkap', 'zh-TW': '姓名' },
        type: 'text',
        required: true,
      },
      { name: 'email', label: emailLabel, type: 'email', required: true },
      {
        name: 'affiliation',
        label: {
          en: 'University or affiliation',
          id: 'Universitas atau afiliasi',
          'zh-TW': '學校或所屬單位',
        },
        type: 'text',
        required: false,
      },
      {
        name: 'subject',
        label: { en: 'Subject', id: 'Perihal', 'zh-TW': '主旨' },
        type: 'text',
        required: true,
      },
      { name: 'message', label: messageLabel, type: 'textarea', required: true, wide: true },
    ],
  },
  {
    id: 'sponsorship',
    label: {
      en: 'Sponsorship / Partnership',
      id: 'Sponsor / Kemitraan',
      'zh-TW': '贊助／合作',
    },
    title: {
      en: 'Sponsorship / Partnership Inquiry',
      id: 'Pertanyaan Sponsor / Kemitraan',
      'zh-TW': '贊助／合作洽詢',
    },
    fields: [
      {
        name: 'contactPerson',
        label: { en: 'Contact person', id: 'Narahubung', 'zh-TW': '聯絡人' },
        type: 'text',
        required: true,
      },
      {
        name: 'organization',
        label: {
          en: 'Company or organization',
          id: 'Perusahaan atau organisasi',
          'zh-TW': '公司或團體',
        },
        type: 'text',
        required: true,
      },
      { name: 'email', label: emailLabel, type: 'email', required: true },
      {
        name: 'partnershipType',
        label: { en: 'Partnership type', id: 'Jenis kemitraan', 'zh-TW': '合作類型' },
        type: 'select',
        required: true,
        options: [
          { en: 'Event sponsorship', id: 'Sponsor kegiatan', 'zh-TW': '活動贊助' },
          { en: 'In-kind support', id: 'Dukungan non-tunai', 'zh-TW': '實物贊助' },
          { en: 'Media partnership', id: 'Kemitraan media', 'zh-TW': '媒體合作' },
          { en: 'Community collaboration', id: 'Kolaborasi komunitas', 'zh-TW': '社群合作' },
          { en: 'Other', id: 'Lainnya', 'zh-TW': '其他' },
        ],
      },
      {
        name: 'proposal',
        label: {
          en: 'Proposed event or collaboration',
          id: 'Usulan kegiatan atau kolaborasi',
          'zh-TW': '提案的活動或合作內容',
        },
        type: 'text',
        required: false,
        wide: true,
      },
      { name: 'message', label: messageLabel, type: 'textarea', required: true, wide: true },
    ],
  },
]
