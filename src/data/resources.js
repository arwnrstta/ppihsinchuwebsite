/*
 * STUDENT RESOURCES
 * -----------------
 * Each category below becomes one tab in the Resources section.
 * Each item inside "items" becomes one expandable card.
 * The search box looks through every category at once.
 *
 * ITEM FIELDS (only "name", "tag" and "description" are required)
 *   name              - title of the resource
 *   tag               - a short label, e.g. 'Food', 'Guide', 'Official site'
 *   description       - one or two sentences
 *   location          - address or area (leave out if not relevant)
 *   steps             - a list of steps; shown as a numbered guide
 *   notes             - extra advice shown under the steps
 *   url               - full external link starting with https://
 *   urlLabel          - text for the link button, e.g. 'Visit official website'
 *   needsVerification - true shows a "Needs verification" label on the card.
 *                       Remove the line once a committee member has checked
 *                       the information against an official source.
 *
 * IMPORTANT
 * Almost everything below is a PLACEHOLDER written to show the layout.
 * Immigration, insurance and scholarship rules change often. Before
 * publishing, check every item against the official source and add the
 * correct details, addresses and links.
 *
 * TODO: Replace placeholder items with verified information.
 */

export const resourceCategories = [
  {
    id: 'living',
    title: 'Living in Hsinchu',
    intro:
      'Everyday essentials: where to eat, how to get around, and how to get set up.',
    items: [
      {
        name: 'Indonesian restaurants',
        tag: 'Food',
        description:
          'A list of Indonesian restaurants and warung around Hsinchu will be added here.',
        notes:
          'Placeholder. Add one card per restaurant with its name, address, and a map link.',
        needsVerification: true,
      },
      {
        name: 'Indonesian and halal grocery stores',
        tag: 'Groceries',
        description:
          'Where to find Indonesian ingredients, snacks, and halal products.',
        notes:
          'Placeholder. Add one card per shop with its name, address, and opening hours.',
        needsVerification: true,
      },
      {
        name: 'Getting around Hsinchu',
        tag: 'Transport',
        description:
          'An overview of buses, trains, the high-speed rail, bike sharing, and scooters.',
        steps: [
          'Get a contactless transport card (such as an EasyCard) for buses, trains, and bike sharing.',
          'Check your university’s shuttle bus routes between campuses and stations.',
          'Use a map app with public transport directions to plan trips.',
        ],
        notes: 'General guidance only. Add local routes and tips from current students.',
        needsVerification: true,
      },
      {
        name: 'Housing and accommodation',
        tag: 'Housing',
        description:
          'Tips on university dormitories and renting off campus.',
        steps: [
          'Ask your university’s housing office about dormitory applications and deadlines.',
          'If renting off campus, visit the room in person and read the contract carefully before paying a deposit.',
          'Ask senior students in the community about areas and landlords they recommend.',
        ],
        needsVerification: true,
      },
      {
        name: 'Banking and mobile services',
        tag: 'Essentials',
        description:
          'Opening a bank account and getting a local SIM card.',
        notes:
          'Placeholder. Requirements differ between banks and telecom providers. Add verified steps and the documents students usually need.',
        needsVerification: true,
      },
      {
        name: 'Essential local services',
        tag: 'Essentials',
        description:
          'Post offices, places of worship, and other useful services near campus.',
        notes: 'Placeholder. Add one card per service with its address.',
        needsVerification: true,
      },
    ],
  },
  {
    id: 'immigration',
    title: 'Immigration & Documents',
    intro:
      'Guides for the paperwork every international student meets. Always confirm the current rules with the official source.',
    items: [
      {
        name: 'ARC renewal',
        tag: 'Guide',
        description:
          'How to renew your Alien Resident Certificate before it expires.',
        steps: [
          'Check the expiry date printed on your ARC and plan to renew well before it.',
          'Confirm the current requirements and application window with the National Immigration Agency or your university’s international office.',
          'Prepare the documents on the official list.',
          'Submit your application and keep the receipt until you collect your new ARC.',
        ],
        notes:
          'Draft outline only. Exact documents, fees, and timelines must be added from the official source.',
        url: 'https://www.immigration.gov.tw/',
        urlLabel: 'National Immigration Agency',
        needsVerification: true,
      },
      {
        name: 'Visa information',
        tag: 'Guide',
        description:
          'Resident visas, visitor visas, and what to prepare before arriving in Taiwan.',
        notes: 'Placeholder. Add verified guidance and links to the official visa pages.',
        needsVerification: true,
      },
      {
        name: 'Changing your address',
        tag: 'Guide',
        description:
          'What to do when you move to a new address during your stay.',
        notes:
          'Placeholder. Add the verified procedure and the time limit for reporting a new address.',
        needsVerification: true,
      },
      {
        name: 'General immigration procedures',
        tag: 'Guide',
        description:
          'Re-entry, lost documents, and other common situations.',
        notes: 'Placeholder. Add verified guidance for each situation.',
        needsVerification: true,
      },
      {
        name: 'Indonesian representative office in Taipei',
        tag: 'Official',
        description:
          'Consular services for Indonesian citizens in Taiwan, such as passport renewal.',
        notes: 'Placeholder. Add the official website, address, and contact details.',
        needsVerification: true,
      },
    ],
  },
  {
    id: 'academics',
    title: 'Scholarships & Academics',
    intro:
      'Funding, university support, and opportunities to grow during your studies.',
    items: [
      {
        name: 'Scholarship information',
        tag: 'Scholarships',
        description:
          'Government, university, and private scholarships open to Indonesian students.',
        notes:
          'Placeholder. Add one card per scholarship with eligibility, the official link, and the application period.',
        needsVerification: true,
      },
      {
        name: 'National Tsing Hua University (NTHU)',
        tag: 'University',
        description: 'Official university website.',
        url: 'https://www.nthu.edu.tw/',
        urlLabel: 'Visit NTHU website',
        needsVerification: true,
      },
      {
        name: 'National Yang Ming Chiao Tung University (NYCU)',
        tag: 'University',
        description: 'Official university website.',
        url: 'https://www.nycu.edu.tw/',
        urlLabel: 'Visit NYCU website',
        needsVerification: true,
      },
      {
        name: 'Academic opportunities',
        tag: 'Academics',
        description:
          'Exchange programmes, research opportunities, conferences, and competitions.',
        notes: 'Placeholder. Add current opportunities as they are announced.',
        needsVerification: true,
      },
      {
        name: 'Internships and careers',
        tag: 'Careers',
        description:
          'Finding internships and jobs in Taiwan, and the work permit rules for students.',
        notes: 'Placeholder. Add verified work permit guidance and useful job platforms.',
        needsVerification: true,
      },
    ],
  },
  {
    id: 'health',
    title: 'Healthcare & Emergency',
    intro:
      'Staying healthy, understanding insurance, and knowing who to call.',
    items: [
      {
        name: 'Emergency numbers',
        tag: 'Emergency',
        description: 'The main emergency numbers in Taiwan.',
        steps: [
          '110 for the police.',
          '119 for fire and ambulance.',
        ],
        notes:
          'Add your university’s campus security number and the PPI Hsinchu emergency contact here.',
        needsVerification: true,
      },
      {
        name: 'National Health Insurance (NHI)',
        tag: 'Insurance',
        description:
          'Taiwan’s public health insurance, which international students can usually join after a qualifying period of residence.',
        notes:
          'Placeholder. Confirm the current eligibility rules and enrolment process with your university or the NHI Administration.',
        url: 'https://www.nhi.gov.tw/',
        urlLabel: 'NHI Administration',
        needsVerification: true,
      },
      {
        name: 'Clinics and hospitals',
        tag: 'Medical',
        description:
          'Campus health centres, nearby clinics, and hospitals with English-speaking staff.',
        notes: 'Placeholder. Add one card per clinic or hospital with its address.',
        needsVerification: true,
      },
      {
        name: 'General healthcare guidance',
        tag: 'Guide',
        description:
          'What to bring to an appointment and how visits usually work.',
        steps: [
          'Bring your ARC and your health insurance card to every appointment.',
          'For non-urgent problems, visit a local clinic before going to a large hospital.',
          'Ask a friend who speaks Mandarin to come with you if you are unsure.',
        ],
        needsVerification: true,
      },
    ],
  },
]
