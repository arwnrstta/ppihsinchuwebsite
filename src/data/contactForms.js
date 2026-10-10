/*
 * CONTACT FORM FIELDS
 * -------------------
 * The contact form can switch between the two form types below.
 * The ContactForm component builds the form from these lists, so adding,
 * removing or renaming a field only needs a change here.
 *
 * FIELD OPTIONS
 *   name     - a unique short name with no spaces (used internally)
 *   label    - the text shown above the field
 *   type     - 'text', 'email', 'textarea' or 'select'
 *   required - true if the visitor must fill it in
 *   options  - the choices for a 'select' field
 *   wide     - true makes the field span the full width of the form
 */

export const contactFormTypes = [
  {
    id: 'general',
    label: 'Student / General',
    title: 'Student / General Inquiry',
    fields: [
      { name: 'fullName', label: 'Full name', type: 'text', required: true },
      { name: 'email', label: 'Email address', type: 'email', required: true },
      {
        name: 'affiliation',
        label: 'University or affiliation',
        type: 'text',
        required: false,
      },
      { name: 'subject', label: 'Subject', type: 'text', required: true },
      { name: 'message', label: 'Message', type: 'textarea', required: true, wide: true },
    ],
  },
  {
    id: 'sponsorship',
    label: 'Sponsorship / Partnership',
    title: 'Sponsorship / Partnership Inquiry',
    fields: [
      { name: 'contactPerson', label: 'Contact person', type: 'text', required: true },
      {
        name: 'organization',
        label: 'Company or organization',
        type: 'text',
        required: true,
      },
      { name: 'email', label: 'Email address', type: 'email', required: true },
      {
        name: 'partnershipType',
        label: 'Partnership type',
        type: 'select',
        required: true,
        options: [
          'Event sponsorship',
          'In-kind support',
          'Media partnership',
          'Community collaboration',
          'Other',
        ],
      },
      {
        name: 'proposal',
        label: 'Proposed event or collaboration',
        type: 'text',
        required: false,
        wide: true,
      },
      { name: 'message', label: 'Message', type: 'textarea', required: true, wide: true },
    ],
  },
]
