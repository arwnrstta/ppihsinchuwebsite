import { foodAndGroceries } from './foodAndGroceries.js'
import { healthcareFacilities } from './healthcareFacilities.js'
import { localServices } from './localServices.js'
import { tags } from './resourceTags.js'

/*
 * STUDENT RESOURCES
 * -----------------
 * Everything in the Resources section comes from this file. Each category
 * below becomes one tab; each item inside "items" becomes one card. Adding,
 * editing or removing a resource only means editing data files. The cards
 * work out by themselves which details and buttons to show.
 *
 * WHERE THINGS GO
 *   Restaurants, warungs,
 *   grocery stores            src/data/foodAndGroceries.js
 *   Universities and regions  src/data/universities.js
 *   Local services            src/data/localServices.js
 *   Hospitals, clinics,
 *   pharmacies                src/data/healthcareFacilities.js
 *   Sponsored (paid) listings src/data/localBusinesses.js
 *   Labels (tags)             src/data/resourceTags.js
 *   Guides, official links,
 *   emergency numbers         this file
 *
 * SECTIONS (one card holding many places)
 * An item with "listings" becomes an expandable section: one card with a
 * title and description that opens to show every place in its list.
 *
 *   {
 *     id: 'local-services',             // sponsored listings use this id
 *     name: { en: 'Essential local services', ... },
 *     description: { en: '...', ... },
 *     listings: localServices,          // a list imported at the top
 *     listingType: 'service',           // type of each place, unless the
 *                                       // place has its own "type"
 *     icon: 'service',                  // optional; see SECTION ICONS below
 *   },
 *
 * Sections of places people visit (listingType 'restaurant', 'grocery' or
 * 'shop') are drawn as an open directory of photo cards. Such a section can
 * add "filters" (business type and location); see the Indonesian Food &
 * Groceries section below.
 *
 * A section whose list is empty (and has no active sponsored listing) is
 * hidden completely. To start a new kind of list, create a file like
 * localServices.js, import it at the top of this file and add a section.
 *
 * SECTION ICONS: 'restaurant', 'grocery', 'shop', 'service', 'medical',
 * 'transport'.
 * Without "icon", the icon follows listingType.
 *
 * LANGUAGES
 * Every text can be written once per language:
 *
 *     name: { en: 'ARC renewal', id: 'Perpanjangan ARC', 'zh-TW': '居留證延期' },
 *
 * or as plain text when it is the same everywhere (for example the name of
 * a restaurant). A language that is missing or '' falls back to English, so
 * a new item can be published in English first.
 *
 * ITEM FIELDS (for cards here and for places in the listing files)
 * Only "name" is required. Leave out every line you do not need: a missing
 * field simply shows nothing (no empty button, no empty space).
 *
 *   id                - short unique name, no spaces, e.g. 'warung-sederhana'
 *   type              - what kind of resource it is. Decides the card layout
 *                       and the type filter. One of the ids in resourceTypes
 *                       below. Leave out for guides and general information.
 *   name              - title of the resource
 *   tag               - one short label from src/data/resourceTags.js
 *   tags              - several labels, e.g. [tags.food, tags.halal]
 *   description       - one or two sentences
 *   address           - street address or area
 *   googleMapsUrl     - the link from Google Maps > Share > Copy link.
 *                       Never guess or type one by hand: an address without
 *                       this link simply has no map button.
 *   websiteUrl        - official website, starting with https://
 *   websiteLabel      - text for the website button (default "Visit website")
 *   instagramUrl      - e.g. 'https://www.instagram.com/ppihsinchu/'
 *   phone             - as people should read it, e.g. '03-571-5131'.
 *                       Adds a "Call" button.
 *   image             - photo or logo in public/images/resources/,
 *                       e.g. '/images/resources/warung-sederhana.jpg'
 *   imageAlt          - describes the picture for screen readers
 *   serviceInfo       - medical only: verified service details, e.g.
 *                       'English-speaking staff on weekdays'. Never write
 *                       "open 24 hours" unless the facility confirms it.
 *   icon              - emergency only: 'police', 'fire', 'medical',
 *                       'heart', 'info', 'shield' or 'phone' (default)
 *   steps             - a list of steps; shown as a numbered guide.
 *                       Each step is one { en, id, 'zh-TW' } block.
 *   notes             - extra advice shown under the steps
 *   featured          - true shows a "Recommended" label and puts the card first
 *   priority          - a number for ordering: 1 comes before 2, and items
 *                       with a priority come before items without one.
 *                       Items without either keep the order of this file.
 *   needsVerification - true shows a "Needs verification" label on the card.
 *                       Remove the line once a committee member has checked
 *                       the information against an official source.
 *
 * EXAMPLE: A RESTAURANT OR SHOP
 *   {
 *     id: 'warung-example',
 *     type: 'restaurant',
 *     name: 'Warung Example',
 *     tags: [tags.food, tags.halal],
 *     description: { en: 'Home-style Indonesian food.', id: '...', 'zh-TW': '...' },
 *     address: 'No. 1, Example Rd., East District, Hsinchu City',
 *     googleMapsUrl: 'https://maps.app.goo.gl/...',
 *     instagramUrl: 'https://www.instagram.com/warungexample/',
 *     phone: '03-000-0000',
 *   },
 *
 * EXAMPLE: A PHARMACY, CLINIC OR HOSPITAL
 *   {
 *     id: 'example-hospital',
 *     type: 'hospital',            // or 'clinic' or 'pharmacy'
 *     name: { en: 'Example Hospital', 'zh-TW': '範例醫院' },
 *     tag: tags.medical,
 *     address: '...',
 *     googleMapsUrl: 'https://maps.app.goo.gl/...',
 *     websiteUrl: 'https://...',
 *     phone: '03-000-0000',
 *     serviceInfo: { en: 'International medical service centre.', ... },
 *   },
 *
 * EXAMPLE: AN EMERGENCY HOTLINE
 * Emergency contacts get their own "Emergency contacts" block at the top of
 * their category. Only add numbers taken from an official source.
 *   {
 *     id: 'police',
 *     type: 'emergency',
 *     icon: 'police',
 *     primary: true,                 // large card with a Call Now button
 *     name: { en: 'Police', id: 'Polisi', 'zh-TW': '警察' },
 *     phone: '110',
 *     description: { en: 'Crime, accidents, and threats to your safety.', ... },
 *     websiteUrl: 'https://www.npa.gov.tw/',   // optional official page
 *   },
 *
 *   primary  - true for the few numbers people must find instantly (police,
 *              fire/ambulance). They are shown as two large cards. Every
 *              other hotline is shown in a compact list underneath.
 *   lineType - 'information' for advice lines that are NOT for emergencies
 *              (shown with an "Information line" label), 'support' for
 *              listening/support lines. Leave out for real emergency numbers.
 *
 * Links that are not valid (for example missing "https://", or a map link
 * that is not from Google Maps) are not shown, and a warning appears in the
 * browser console while running "npm run dev".
 *
 * GUIDE FIELDS (shown when a card is opened)
 *   text         - a short paragraph
 *   steps        - numbered steps
 *   tips         - bullet points
 *   subsections  - smaller headed blocks: [{ title, text, steps, tips, links }]
 *   links        - official links: [{ label, url, description }]
 *   lastVerified - 'YYYY-MM-DD': the day someone checked the information
 *                  against the official sources. Shown as "Last checked on".
 *                  Only write it after actually checking.
 *
 * KEEPING THIS UP TO DATE
 * Immigration, insurance, work and scholarship rules change often. Check
 * them against the official sources at least once a year (see
 * docs/MAINTENANCE_GUIDE.md) and update lastVerified when you do. Items
 * marked needsVerification still contain something that could not be
 * confirmed; the comment next to it says what.
 */

/*
 * GUIDEBOOK
 * ---------
 * The large tile at the top of the Student Resources section. Clicking it
 * opens the guidebook in a new tab.
 *
 *   title        - the guidebook's own title (not translated)
 *   edition      - a small label next to "Guidebook", e.g. the semester.
 *                  Use '' to hide it.
 *   description  - one or two sentences, written per language
 *   url          - the link to the online guidebook
 *   thumbnail    - the picture shown on the tile
 *   thumbnailAlt - describes the picture for screen readers
 *
 * HOW TO CHANGE THE THUMBNAIL
 *   The current picture is the first page (cover) of the guidebook, saved as
 *   public/images/resources/guidebook-cover.jpg
 *
 *   Option 1: replace that file with a new picture using the SAME file name.
 *   Option 2: save a new picture in public/images/resources/ and change
 *             "thumbnail" below to its path, e.g. '/images/resources/vol-2.jpg'
 *
 *   A portrait picture (taller than wide, like a book page) fits best.
 *
 * WHEN A NEW VOLUME IS PUBLISHED
 *   Update "title", "edition", "url" and the thumbnail.
 */
export const guidebook = {
  title: 'Jelajah Hsinchu Vol. 1',
  edition: { en: 'Fall 2026', id: 'Musim Gugur 2026', 'zh-TW': '2026 秋季' },
  description: {
    en: 'Your guide to calling Hsinchu your new home: transport, landmarks, bubble tea, and everything else you need to know.',
    id: 'Panduanmu untuk menjadikan Hsinchu rumah baru: transportasi, tempat ikonik, bubble tea, dan semua hal lain yang perlu kamu tahu.',
    'zh-TW': '把新竹當成新家的指南：交通、地標、珍珠奶茶，以及所有你需要知道的事。',
  },
  url: 'https://heyzine.com/flip-book/6701319284.html',
  thumbnail: '/images/resources/guidebook-cover.jpg',
  thumbnailAlt: {
    en: 'Cover of the Jelajah Hsinchu guidebook',
    id: 'Sampul buku panduan Jelajah Hsinchu',
    'zh-TW': 'Jelajah Hsinchu 指南的封面',
  },
}


/*
 * RESOURCE TYPES
 * The "type" of an item decides how its card looks ("layout") and its name
 * in the type filter, which appears above a category's cards when that
 * category contains more than one type.
 *
 * "label" is the name in filters, "itemLabel" (optional) the label on one
 * business card.
 *
 * Layouts:
 *   place     - restaurants and shops: address and map first
 *   service   - services: website and contact first
 *   medical   - hospitals, clinics, pharmacies: directions, call, website
 *   emergency - hotlines: compact, phone-first cards in their own block
 *   info      - guides and general information: text and an official link
 *
 * A new type can be added here with any of these layouts.
 * An item without a "type" (or with an unknown one) counts as 'information'.
 */
export const resourceTypes = {
  restaurant: {
    layout: 'place',
    label: { en: 'Restaurants & Warungs', id: 'Restoran & Warung', 'zh-TW': '餐廳與小吃店' },
    // The label on one business card (optional; "label" is used otherwise).
    itemLabel: { en: 'Restaurant / warung', id: 'Restoran / warung', 'zh-TW': '餐廳／小吃店' },
  },
  grocery: {
    layout: 'place',
    label: { en: 'Grocery Stores', id: 'Toko Bahan Makanan', 'zh-TW': '食品雜貨店' },
    itemLabel: { en: 'Grocery store', id: 'Toko bahan makanan', 'zh-TW': '食品雜貨店' },
  },
  shop: {
    layout: 'place',
    label: { en: 'Shops', id: 'Toko', 'zh-TW': '商店' },
  },
  service: {
    layout: 'service',
    label: { en: 'Services', id: 'Layanan', 'zh-TW': '服務' },
  },
  hospital: {
    layout: 'medical',
    label: { en: 'Hospitals', id: 'Rumah sakit', 'zh-TW': '醫院' },
  },
  clinic: {
    layout: 'medical',
    label: { en: 'Clinics', id: 'Klinik', 'zh-TW': '診所' },
  },
  pharmacy: {
    layout: 'medical',
    label: { en: 'Pharmacies', id: 'Apotek', 'zh-TW': '藥局' },
  },
  emergency: {
    layout: 'emergency',
    label: { en: 'Emergency contacts', id: 'Kontak darurat', 'zh-TW': '緊急聯絡資訊' },
  },
  information: {
    layout: 'info',
    label: { en: 'Guides & information', id: 'Panduan & informasi', 'zh-TW': '指南與資訊' },
  },
}

/*
 * CATEGORIES
 *   id     - short unique name
 *   title  - the tab name (also used in the navbar dropdown)
 *   intro  - one sentence shown above the cards
 *   notice - optional short notice under the intro
 *   items  - the resources
 * A category with no items (and no active sponsored listing) is hidden
 * everywhere, including its tab and the navbar dropdown.
 */
export const resourceCategories = [
  {
    id: 'living',
    title: {
      en: 'Living in Hsinchu',
      id: 'Hidup di Hsinchu',
      'zh-TW': '新竹生活',
    },
    intro: {
      en: 'Everyday essentials: where to eat, how to get around, and how to get set up.',
      id: 'Kebutuhan sehari-hari: tempat makan, cara bepergian, dan cara memulai hidup di sini.',
      'zh-TW': '日常必備：去哪裡吃、怎麼移動，以及如何安頓下來。',
    },
    items: [
      {
        id: 'indonesian-food-groceries',
        name: {
          en: 'Indonesian Food & Groceries',
          id: 'Kuliner & Bahan Makanan Indonesia',
          'zh-TW': '印尼美食與雜貨',
        },
        description: {
          en: 'Indonesian restaurants, warungs, grocery stores, and halal shops for students at our universities.',
          id: 'Restoran, warung, toko bahan makanan, dan toko halal Indonesia untuk mahasiswa di kampus-kampus kita.',
          'zh-TW': '為各校學生整理的印尼餐廳、小吃店、雜貨店與清真商店。',
        },
        // Add businesses in src/data/foodAndGroceries.js
        listings: foodAndGroceries,
        listingType: 'restaurant',
        // Filters shown above the directory: business type (the types
        // listed here, as tabs) and location (see locationGroups in
        // src/data/universities.js).
        filters: {
          businessTypes: ['restaurant', 'grocery'],
          location: true,
        },
      },
      {
        id: 'getting-around',
        name: {
          en: 'Getting around Hsinchu',
          id: 'Bepergian di Hsinchu',
          'zh-TW': '新竹交通',
        },
        tag: tags.transport,
        description: {
          en: 'Official sites for buses, trains, the high-speed rail, YouBike, and campus shuttles.',
          id: 'Situs resmi untuk bus, kereta, kereta cepat, YouBike, dan bus kampus.',
          'zh-TW': '公車、火車、高鐵、YouBike 與校園接駁車的官方網站。',
        },
        icon: 'transport',
        // Each service below is one row with a link button.
        listingType: 'information',
        listings: [
          {
            id: 'hsinchu-city-bus',
            name: { en: 'Hsinchu City buses', id: 'Bus Kota Hsinchu', 'zh-TW': '新竹市公車' },
            description: 'Bus routes and timetables from the Hsinchu City Department of Transportation (see “Bus information”). For live arrival times, use Google Maps or the smart displays at many bus stops.',
            websiteUrl: 'https://dep-traffic.hccg.gov.tw/en/',
            websiteLabel: { en: 'City transport info', id: 'Info transportasi kota', 'zh-TW': '市府交通資訊' },
          },
          {
            id: 'hsinchu-county-bus',
            name: { en: 'Hsinchu County buses', id: 'Bus Kabupaten Hsinchu', 'zh-TW': '新竹縣公車' },
            description: 'Hsinchu County Smart Bus: routes and service changes for Zhubei, Hukou, and nearby towns (in Chinese).',
            websiteUrl: 'https://ibus.hsinchu.gov.tw/',
            websiteLabel: { en: 'County bus info', id: 'Info bus kabupaten', 'zh-TW': '縣府公車資訊' },
          },
          {
            id: 'highway-bus',
            name: { en: 'Intercity highway buses', id: 'Bus antarkota', 'zh-TW': '公路客運' },
            description: 'Real-time information for intercity buses, run by the Highway Bureau. Available in English.',
            websiteUrl: 'https://www.taiwanbus.tw/',
          },
          {
            id: 'tra',
            name: { en: 'Taiwan Railway (TRA)', 'zh-TW': '臺灣鐵路 (TRA)' },
            description: 'Local and intercity trains: timetables and tickets.',
            websiteUrl: 'https://www.railway.gov.tw/',
          },
          {
            id: 'thsr',
            name: { en: 'Taiwan High Speed Rail (THSR)', 'zh-TW': '台灣高鐵 (THSR)' },
            description: 'Fast trains between major cities. Hsinchu HSR Station is in Zhubei, not at Hsinchu TRA Station.',
            websiteUrl: 'https://en.thsrc.com.tw/',
          },
          {
            id: 'youbike',
            name: 'YouBike',
            description: 'Public bike sharing, with a station map and station list.',
            websiteUrl: 'https://en.youbike.com.tw/',
          },
          {
            id: 'easycard',
            name: { en: 'EasyCard', 'zh-TW': '悠遊卡' },
            description: 'Stored-value card for public transport and small payments, including where it can be used.',
            websiteUrl: 'https://www.easycard.com.tw/en/',
          },
          {
            id: 'nthu-shuttle',
            name: { en: 'NTHU campus shuttle', id: 'Bus kampus NTHU', 'zh-TW': '清華大學校園公車' },
            description: 'Timetables are posted as news by NTHU’s Division of Physical Facilities and change every term.',
            websiteUrl: 'https://affairs.site.nthu.edu.tw/?Lang=en',
            websiteLabel: { en: 'NTHU shuttle timetables', id: 'Jadwal bus NTHU', 'zh-TW': '清大校園公車時刻表' },
          },
          {
            id: 'nycu-shuttle',
            name: { en: 'NYCU shuttles', id: 'Bus antar-jemput NYCU', 'zh-TW': '陽明交大交通車' },
            description: 'NYCU runs shuttles linking Guangfu Campus with Boai Campus and Hsinchu HSR Station. Timetables come from NYCU’s Office of General Affairs; ask your department for the current one.',
            // TODO: add the official NYCU timetable page as websiteUrl once
            // confirmed (none could be found on 2026-10-17).
            needsVerification: true,
          },
        ],
        tips: [
          'An EasyCard works on many transport services, including buses, TRA trains, and YouBike.',
          'Hsinchu TRA Station (city centre) and Hsinchu HSR Station (Zhubei) are different stations. Check which one you need before you travel.',
          'Google Maps public transport directions are a reliable way to plan bus and train trips.',
          'To ride a scooter you need a driving licence that is valid in Taiwan, and helmets are compulsory.',
        ],
        lastVerified: '2026-10-17',
      },
      {
        id: 'housing',
        name: {
          en: 'Housing and accommodation',
          id: 'Tempat tinggal dan akomodasi',
          'zh-TW': '住宿',
        },
        tag: tags.housing,
        description: {
          en: 'University dormitories and renting off campus: what to check before you pay.',
          id: 'Asrama universitas dan menyewa di luar kampus: apa yang perlu dicek sebelum membayar.',
          'zh-TW': '學校宿舍與校外租屋：付款前該確認的事項。',
        },
        subsections: [
          {
            title: { en: 'University dormitories', id: 'Asrama universitas', 'zh-TW': '學校宿舍' },
            tips: [
              'Contact your university’s housing office for availability, application deadlines, and fees.',
              'Read the dormitory rules (contract length, guests, cooking, quiet hours) before you apply.',
              'Apply as early as possible, as places can be limited.',
            ],
          },
          {
            title: { en: 'Renting off campus', id: 'Menyewa di luar kampus', 'zh-TW': '校外租屋' },
            steps: [
              'Search on trusted platforms such as 591, and ask seniors in the community about areas and landlords.',
              'Visit the room in person before paying anything.',
              'Work out the total monthly cost: rent, electricity, water, internet, management fees, and any other charges.',
              'Read the rental agreement carefully, including the deposit, contract length, and early-termination terms.',
              'Keep every payment receipt, and photograph the room’s condition on the day you move in.',
            ],
            tips: [
              'For residential rentals, the security deposit may not exceed two months’ rent (Rental Housing Market Development and Regulation Act, Article 7).',
              'The Ministry of the Interior publishes a standard residential lease template (in Chinese) you can compare your contract with.',
              'After moving, report your new address to the National Immigration Agency within 15 days (see Immigration & Documents).',
            ],
            links: [
              {
                label: '591 Rentals',
                url: 'https://rent.591.com.tw/',
                description: 'Rental listings (in Chinese)',
              },
              {
                label: 'Ministry of the Interior: rental housing regulations',
                url: 'https://www.land.moi.gov.tw/chhtml/news/89',
                description: 'Official rules and lease templates (in Chinese)',
              },
            ],
          },
        ],
        lastVerified: '2026-10-17',
      },
      {
        id: 'bank-account',
        name: {
          en: 'Opening a bank account',
          id: 'Membuka rekening bank',
          'zh-TW': '開立銀行帳戶',
        },
        tag: tags.essentials,
        description: {
          en: 'What to bring, and choosing between a bank and Chunghwa Post.',
          id: 'Apa yang perlu dibawa, dan memilih antara bank atau Chunghwa Post.',
          'zh-TW': '需要準備什麼，以及選擇銀行或中華郵政。',
        },
        steps: [
          'Choose where to open an account: a bank near your campus, or Chunghwa Post (the post office), which also offers savings accounts.',
          'Ask the branch which documents it needs before you go. Most ask for your passport and ARC; some also ask for another ID such as your student ID, or a Taiwan phone number.',
          'Visit the branch in person. Ask for an ATM card and online banking at the same time.',
          'If you will send or receive money from abroad, ask about international transfer fees and the details needed for incoming transfers.',
        ],
        tips: [
          'Requirements differ between banks, and sometimes between branches of the same bank.',
          'Your university may have a campus branch or a preferred bank for scholarships and stipends.',
          'When your ARC is renewed, update your details with your bank as well.',
        ],
        links: [
          {
            label: 'Chunghwa Post (English)',
            url: 'https://www.post.gov.tw/post/internet/U_english2/',
          },
          {
            label: 'Chunghwa Post savings and remittances',
            url: 'https://www.post.gov.tw/post/internet/B_saving/',
            description: 'Postal savings accounts and money transfers (in Chinese)',
          },
        ],
        lastVerified: '2026-10-17',
      },
      {
        id: 'sim-card',
        name: {
          en: 'Getting a Taiwan SIM card',
          id: 'Mendapatkan kartu SIM Taiwan',
          'zh-TW': '申辦台灣 SIM 卡',
        },
        tag: tags.essentials,
        description: {
          en: 'Prepaid or monthly plans, what to bring, and what to compare.',
          id: 'Paket prabayar atau bulanan, apa yang perlu dibawa, dan apa yang perlu dibandingkan.',
          'zh-TW': '預付卡或月租方案、需要攜帶的證件，以及比較重點。',
        },
        tips: [
          'Prepaid: no contract, top up as you go. Monthly (postpaid): billed every month, often with a fixed contract period.',
          'Bring your passport and ARC. Providers often ask for two forms of ID, so check with the store first.',
          'Want an eSIM? Check that your phone supports it before signing up.',
          'Compare data allowance, contract length, early-termination fees, and any setup fees before you sign.',
          'Taiwan closed its 3G network in 2024. Phones that do not support 4G calling (VoLTE) cannot make calls, including emergency calls.',
          'Providers are listed alphabetically below; PPI Hsinchu does not recommend any particular one.',
        ],
        links: [
          { label: 'Chunghwa Telecom', url: 'https://www.cht.com.tw/' },
          { label: 'Far EasTone', url: 'https://www.fetnet.net/' },
          { label: 'Taiwan Mobile', url: 'https://www.taiwanmobile.com/' },
        ],
      },
      {
        id: 'local-services',
        name: {
          en: 'Essential local services',
          id: 'Layanan lokal penting',
          'zh-TW': '在地生活服務',
        },
        description: {
          en: 'Post offices, places of worship, and other useful services near campus.',
          id: 'Kantor pos, tempat ibadah, dan layanan berguna lainnya di dekat kampus.',
          'zh-TW': '校園附近的郵局、宗教場所與其他實用服務。',
        },
        // Add services in src/data/localServices.js
        listings: localServices,
        listingType: 'service',
      },
    ],
  },
  {
    id: 'immigration',
    title: {
      en: 'Immigration & Documents',
      id: 'Imigrasi & Dokumen',
      'zh-TW': '移民與文件',
    },
    intro: {
      en: 'Guides for the paperwork every international student meets. Always confirm the current rules with the official source.',
      id: 'Panduan untuk urusan dokumen yang dihadapi setiap mahasiswa internasional. Selalu pastikan aturan terbaru ke sumber resmi.',
      'zh-TW': '每位國際學生都會遇到的文件手續指南。請務必向官方來源確認最新規定。',
    },
    items: [
      {
        id: 'arc-renewal',
        name: {
          en: 'ARC application and renewal',
          id: 'Pengajuan dan perpanjangan ARC',
          'zh-TW': '居留證申請與延期',
        },
        tag: tags.guide,
        description: {
          en: 'Your Alien Resident Certificate is your residence permit. Apply after you arrive, and renew it before it expires.',
          id: 'Alien Resident Certificate adalah izin tinggalmu. Ajukan setelah tiba, dan perpanjang sebelum habis masa berlakunya.',
          'zh-TW': '外僑居留證是你的居留許可。抵台後申請，並在到期前延期。',
        },
        subsections: [
          {
            title: { en: 'What the ARC is', id: 'Apa itu ARC', 'zh-TW': '什麼是居留證' },
            text: 'The Alien Resident Certificate (ARC) is the residence permit for foreigners staying in Taiwan for more than six months, and your main ID while you live here. Students who enter on a resident visa must apply for their first ARC within 15 days of arrival.',
          },
          {
            title: { en: 'Renewing your ARC', id: 'Memperpanjang ARC', 'zh-TW': '居留證延期' },
            steps: [
              'Check the expiry date on your ARC. Most universities ask students to apply for an extension in the 30 days before it expires, and some international offices collect applications for you. Follow your university’s instructions.',
              'Prepare your documents. These usually include your passport, your current ARC, a recent photo, and proof that you are still enrolled; the NIA document instructions below list the exact requirements.',
              'Apply through the NIA Student Online Application System, choosing “Foreign students and Overseas Chinese students”.',
              'Wait for the review (often around five working days), then pay the fee as instructed, online or at a convenience store.',
              'Collect your new ARC as instructed by the NIA.',
            ],
          },
        ],
        tips: [
          'Never let your ARC expire. Overstaying can lead to fines, and you may have to leave Taiwan and apply for a new visa.',
          'Carry your ARC with you: it is your official ID in Taiwan.',
          'For questions, call the 1990 hotline for foreigners or ask your international office.',
        ],
        websiteUrl: 'https://coa.immigration.gov.tw/coa-frontend/student/entry',
        websiteLabel: {
          en: 'NIA student online application',
          id: 'Aplikasi online mahasiswa NIA',
          'zh-TW': '移民署學生線上申辦',
        },
        links: [
          { label: 'National Immigration Agency', url: 'https://www.immigration.gov.tw/' },
          {
            label: 'NIA document instructions for ARC applications (PDF)',
            url: 'https://www.immigration.gov.tw/media/80228/instructions-on-document-submission-in-applications-by-foreign-nationals-for-an-alien-resident-certificate-or-its-extension-or-replacement-or-change-of-reason-for-residence.pdf',
          },
        ],
        // The 30-day renewal window comes from university guidance; confirm
        // it with the NIA before removing this line.
        needsVerification: true,
      },
      {
        id: 'visa-information',
        name: {
          en: 'Visa information',
          id: 'Informasi visa',
          'zh-TW': '簽證資訊',
        },
        tag: tags.guide,
        description: {
          en: 'Visitor or resident visa? Check what you need before you travel to Taiwan.',
          id: 'Visa kunjungan atau visa residen? Cek kebutuhanmu sebelum berangkat ke Taiwan.',
          'zh-TW': '停留簽證或居留簽證？來台前先確認你需要哪一種。',
        },
        subsections: [
          {
            title: { en: 'Visitor and resident visas', id: 'Visa kunjungan dan visa residen', 'zh-TW': '停留簽證與居留簽證' },
            tips: [
              'Visitor visas are for short stays, such as tourism, family visits, or short courses.',
              'Resident visas are for stays of more than six months, such as a degree programme. After entering on a resident visa, you apply for an ARC within 15 days.',
              'Not every visa can be changed into student residence after you arrive, so apply for the visa that matches your study plans.',
            ],
          },
          {
            title: { en: 'Applying from Indonesia', id: 'Mengajukan dari Indonesia', 'zh-TW': '在印尼申請' },
            steps: [
              'Check the requirements for your visa type on the Bureau of Consular Affairs website.',
              'Complete the online visa application form and print it.',
              'Submit the form, your passport, and supporting documents to the Taipei Economic and Trade Office in Jakarta, or its Surabaya office if you live in its area.',
            ],
            tips: [
              'Typical documents include your passport, photos, and, for students, your university admission letter. The full list depends on the visa type, so always follow the official checklist.',
            ],
          },
        ],
        links: [
          { label: 'Bureau of Consular Affairs', url: 'https://www.boca.gov.tw/mp-2.html' },
          { label: 'Visitor visas', url: 'https://www.boca.gov.tw/np-147-2.html' },
          { label: 'Resident visas', url: 'https://www.boca.gov.tw/np-150-2.html' },
          { label: 'Online visa application form', url: 'https://visawebapp.boca.gov.tw/' },
          {
            label: 'Taipei Economic and Trade Office, Jakarta',
            url: 'https://www.roc-taiwan.org/id_en/index.html',
            description: 'Taiwan’s representative office in Indonesia',
          },
        ],
        lastVerified: '2026-10-17',
      },
      {
        id: 'change-of-address',
        name: {
          en: 'Changing your address',
          id: 'Perubahan alamat',
          'zh-TW': '變更地址',
        },
        tag: tags.guide,
        description: {
          en: 'Moved? Update the address on your ARC within 15 days.',
          id: 'Pindah? Perbarui alamat di ARC-mu dalam 15 hari.',
          'zh-TW': '搬家了嗎？請在 15 天內更新居留證地址。',
        },
        text: 'If you move, you must report your new residence address to the National Immigration Agency within 15 days. Late reporting can be fined.',
        steps: [
          'Prepare proof of your new address, such as your rental agreement or a dormitory certificate, together with your passport and ARC.',
          'Apply through the NIA Student Online Application System, or at the NIA service center for your new area.',
          'Once your ARC is updated, tell your university so that its records match.',
        ],
        websiteUrl: 'https://coa.immigration.gov.tw/coa-frontend/student/entry',
        websiteLabel: {
          en: 'NIA student online application',
          id: 'Aplikasi online mahasiswa NIA',
          'zh-TW': '移民署學生線上申辦',
        },
        links: [{ label: 'National Immigration Agency', url: 'https://www.immigration.gov.tw/' }],
        lastVerified: '2026-10-17',
      },
      {
        id: 'immigration-procedures',
        name: {
          en: 'Other immigration situations',
          id: 'Situasi imigrasi lainnya',
          'zh-TW': '其他移民相關情況',
        },
        tag: tags.guide,
        description: {
          en: 'A lost ARC, a new passport, travelling abroad, and changes in your student status.',
          id: 'ARC hilang, paspor baru, bepergian ke luar negeri, dan perubahan status mahasiswa.',
          'zh-TW': '居留證遺失、換新護照、出國旅行，以及學籍狀態變更。',
        },
        subsections: [
          {
            title: { en: 'Lost or damaged ARC', id: 'ARC hilang atau rusak', 'zh-TW': '居留證遺失或損毀' },
            steps: [
              'If your ARC is lost or stolen, report it to the local police first.',
              'Apply for a replacement as soon as possible, even if your ARC is about to expire.',
            ],
          },
          {
            title: { en: 'New passport', id: 'Paspor baru', 'zh-TW': '換新護照' },
            tips: [
              'If you renew your passport, your ARC record still shows the old passport number. Ask your international office or the NIA how to update it, and do this before you travel.',
            ],
          },
          {
            title: { en: 'Travelling and re-entry', id: 'Bepergian dan masuk kembali', 'zh-TW': '出國與重入境' },
            tips: [
              'A valid ARC generally also works as a multiple re-entry permit, so you can leave and return with your passport and ARC.',
              'Make sure your ARC will still be valid on the day you come back.',
              'Long or repeated trips abroad can affect your NHI eligibility (see Healthcare & Emergency).',
            ],
          },
          {
            title: { en: 'Changes in your student status', id: 'Perubahan status mahasiswa', 'zh-TW': '學籍狀態變更' },
            tips: [
              'If you graduate, transfer, take a leave of absence, or withdraw, the purpose of your residence changes. Contact your international office and the NIA straight away to find out what you need to do.',
            ],
          },
          {
            title: { en: 'Who to ask', id: 'Bertanya ke mana', 'zh-TW': '可以詢問誰' },
            tips: [
              'Your university’s international office: school documents and procedures.',
              'The National Immigration Agency or the 1990 hotline: residence rules and your ARC.',
            ],
          },
        ],
        links: [{ label: 'National Immigration Agency', url: 'https://www.immigration.gov.tw/' }],
        // The passport-update procedure could not be confirmed on 2026-10-17.
        needsVerification: true,
      },
      {
        id: 'indonesian-office-taipei',
        name: {
          en: 'Indonesian Economic and Trade Office in Taipei (KDEI)',
          id: 'Kantor Dagang dan Ekonomi Indonesia (KDEI) di Taipei',
          'zh-TW': '駐台北印尼經濟貿易代表處 (KDEI)',
        },
        tag: tags.official,
        description: {
          en: 'Passport services and help for Indonesian citizens in Taiwan.',
          id: 'Layanan paspor dan bantuan bagi WNI di Taiwan.',
          'zh-TW': '為在台印尼公民提供護照服務與協助。',
        },
        tips: [
          'KDEI Taipei provides consular services for Indonesians in Taiwan, including passport issuance and renewal, travel documents (SPLP), and document legalisation.',
          'Since January 2026, passport fees can also be paid at convenience stores such as 7-Eleven, FamilyMart, and Hi-Life.',
          'Register your stay abroad (Lapor Diri) on Peduli WNI, the Indonesian Ministry of Foreign Affairs portal, so that you can be contacted in an emergency.',
          'Check KDEI’s official channels for current opening hours, fees, and appointment procedures before you visit.',
        ],
        links: [
          {
            label: 'Peduli WNI',
            url: 'https://peduliwni.kemlu.go.id/',
            description: 'Indonesian Ministry of Foreign Affairs portal for citizens abroad',
          },
        ],
        // TODO: add the official KDEI Taipei website as websiteUrl once it
        // has been confirmed (it could not be verified on 2026-10-17).
        needsVerification: true,
      },
    ],
  },
  {
    id: 'academics',
    title: {
      en: 'Scholarships & Academics',
      id: 'Beasiswa & Akademik',
      'zh-TW': '獎學金與學術',
    },
    intro: {
      en: 'Funding, university support, and opportunities to grow during your studies.',
      id: 'Pendanaan, dukungan universitas, dan kesempatan untuk berkembang selama studi.',
      'zh-TW': '求學期間的經費、學校支援與成長機會。',
    },
    items: [
      {
        id: 'moe-scholarship',
        name: {
          en: 'MOE Taiwan Scholarship',
          id: 'Beasiswa MOE Taiwan',
          'zh-TW': '教育部臺灣獎學金',
        },
        tag: tags.scholarships,
        description: {
          en: 'Ministry of Education scholarship for international students on degree programmes in Taiwan.',
          id: 'Beasiswa Kementerian Pendidikan Taiwan untuk mahasiswa internasional program gelar.',
          'zh-TW': '教育部提供國際學位生的獎學金。',
        },
        tips: [
          'Covers tuition and fees up to a set amount each semester, plus a monthly living allowance.',
          'Available for bachelor’s, master’s, and doctoral programmes.',
          'You apply for the scholarship through the Taiwan office in your home country (for Indonesians, the Taipei Economic and Trade Office), and apply separately to your university.',
          'Students already enrolled in Taiwan at the same degree level are generally not eligible.',
          'Eligibility, deadlines, and amounts are published each year, so always read the current guidelines.',
        ],
        websiteUrl: 'https://taiwanscholarship.moe.gov.tw/',
        websiteLabel: { en: 'Taiwan Scholarship website', id: 'Situs Taiwan Scholarship', 'zh-TW': '臺灣獎學金網站' },
        links: [
          {
            label: 'Ministry of Education: Taiwan Scholarship Program',
            url: 'https://english.moe.gov.tw/fp-24-16833-23C09-1.html',
          },
          {
            label: 'Taipei Economic and Trade Office, Jakarta',
            url: 'https://www.roc-taiwan.org/id_en/index.html',
            description: 'Announcements for applicants in Indonesia',
          },
        ],
        lastVerified: '2026-10-17',
      },
      {
        id: 'icdf-scholarship',
        name: {
          en: 'TaiwanICDF Scholarship',
          id: 'Beasiswa TaiwanICDF',
          'zh-TW': '國合會外籍生獎學金',
        },
        tag: tags.scholarships,
        description: {
          en: 'International Higher Education Scholarship from Taiwan’s International Cooperation and Development Fund, for selected programmes.',
          id: 'Beasiswa pendidikan tinggi dari International Cooperation and Development Fund Taiwan untuk program tertentu.',
          'zh-TW': '財團法人國際合作發展基金會的國際高等人力培訓外籍生獎學金。',
        },
        tips: [
          'For Indonesian applicants, recent calls were limited to master’s and doctoral programmes.',
          'Only specific programmes at partner universities take part; check the current call for the list.',
          'Application periods change each year, so follow the latest official announcement.',
        ],
        links: [
          {
            label: 'TaiwanICDF scholarships',
            url: 'https://www.icdf.org.tw/wSite/ct?xItem=4623&ctNode=31279&mp=1',
            description: 'Official programme page (in Chinese)',
          },
          {
            label: 'TaiwanICDF scholarship announcement for Indonesia',
            url: 'https://www.roc-taiwan.org/id_en/post/3831.html',
          },
        ],
        lastVerified: '2026-10-17',
      },
      {
        id: 'university-scholarships',
        name: {
          en: 'University scholarships',
          id: 'Beasiswa universitas',
          'zh-TW': '學校獎學金',
        },
        tag: tags.scholarships,
        description: {
          en: 'Most universities offer their own scholarships for international students.',
          id: 'Sebagian besar universitas menawarkan beasiswa sendiri untuk mahasiswa internasional.',
          'zh-TW': '多數大學為國際學生提供校內獎學金。',
        },
        tips: [
          'Each university runs its own scholarships, with its own rules, amounts, and deadlines.',
          'Watch announcements from your international office and your department, and check again every semester.',
          'Some scholarships require a minimum grade or credit load to keep receiving them.',
          'Our members’ universities are listed under About › Our Campuses.',
        ],
      },
      {
        id: 'academic-opportunities',
        name: {
          en: 'Academic opportunities',
          id: 'Kesempatan akademik',
          'zh-TW': '學術機會',
        },
        tag: tags.academics,
        description: {
          en: 'Exchange programmes, research, conferences, competitions, and workshops.',
          id: 'Program pertukaran, riset, konferensi, kompetisi, dan lokakarya.',
          'zh-TW': '交換計畫、研究、研討會、競賽與工作坊。',
        },
        tips: [
          'Student exchange: your international office announces exchange and dual-degree programmes with partner universities.',
          'Undergraduate research: ask professors and research centres in your department about lab positions or research projects.',
          'Conferences: watch your department’s announcements for calls for papers; some departments support student travel.',
          'Hackathons and competitions: universities, companies, and government agencies host them regularly, and career centres and student clubs share many.',
          'Workshops and professional development: career centres and libraries run sessions on CVs, interviews, and academic skills.',
        ],
        links: [
          {
            label: 'Study in Taiwan',
            url: 'https://www.studyintaiwan.org/',
            description: 'Programmes and scholarships for international students',
          },
        ],
      },
      {
        id: 'internships-careers',
        name: {
          en: 'Internships and careers',
          id: 'Magang dan karier',
          'zh-TW': '實習與職涯',
        },
        tag: tags.careers,
        description: {
          en: 'Work permits for part-time jobs, and where to find internships.',
          id: 'Izin kerja untuk kerja paruh waktu, dan tempat mencari magang.',
          'zh-TW': '打工所需的工作許可，以及去哪裡找實習。',
        },
        subsections: [
          {
            title: { en: 'Student work permits', id: 'Izin kerja mahasiswa', 'zh-TW': '學生工作許可' },
            steps: [
              'Check that you are eligible: degree students can apply after enrolling; students in Mandarin language programmes must first study for at least six months.',
              'Apply online through the Workforce Development Agency’s EZ Work Permit system. You will usually upload your student ID, passport, and ARC as PDF files.',
              'Pay the application fee as instructed.',
              'Start working only after your work permit has been approved.',
            ],
            tips: [
              'During the semester you may work at most 20 hours per week. This weekly limit does not apply during official winter and summer vacations.',
              'A student work permit is valid for up to six months, so reapply each term if you keep working.',
              'Working without a permit can lead to heavy fines and removal from Taiwan.',
              'Internships may follow different rules depending on their type (for example, credit-bearing internships). Check with your department and international office.',
            ],
          },
          {
            title: { en: 'Finding opportunities', id: 'Mencari kesempatan', 'zh-TW': '尋找機會' },
            tips: [
              'Your university career centre: job fairs, internship programmes, and CV help.',
              'Department announcements: internships with partner companies and labs.',
              'Job platforms such as 104 and 1111 (mostly in Chinese).',
            ],
            links: [
              { label: '104 Job Bank', url: 'https://www.104.com.tw/' },
              { label: '1111 Job Bank', url: 'https://www.1111.com.tw/' },
            ],
          },
        ],
        links: [
          {
            label: 'EZ Work Permit',
            url: 'https://ezwp.wda.gov.tw/',
            description: 'Online work permit applications (Workforce Development Agency)',
          },
          {
            label: 'Foreigners Working in Taiwan',
            url: 'https://ezworktaiwan.wda.gov.tw/',
            description: 'Ministry of Labor information for foreign students and workers',
          },
        ],
        // The 20-hour limit comes from university guidance; the Ministry of
        // Labor page refers to the rules without stating the number.
        needsVerification: true,
      },
    ],
  },
  {
    id: 'health',
    title: {
      en: 'Healthcare & Emergency',
      id: 'Kesehatan & Darurat',
      'zh-TW': '醫療與緊急狀況',
    },
    intro: {
      en: 'Staying healthy, understanding insurance, and knowing who to call.',
      id: 'Menjaga kesehatan, memahami asuransi, dan tahu siapa yang harus dihubungi.',
      'zh-TW': '維持健康、了解保險，並知道該聯絡誰。',
    },
    // An optional short notice shown under the intro of this category.
    notice: {
      en: 'General information only, not medical advice. In an emergency, call 119.',
      id: 'Hanya informasi umum, bukan nasihat medis. Dalam keadaan darurat, hubungi 119.',
      'zh-TW': '僅供一般參考，並非醫療建議。遇緊急狀況請撥打 119。',
    },
    items: [
      /*
       * EMERGENCY CONTACTS
       * Shown at the top of this category: "primary: true" numbers as two
       * large cards, the rest as a compact list. Only add numbers taken
       * from an official source.
       * TODO: add each university's campus security number and the
       *       PPI Hsinchu emergency contact once confirmed.
       */
      {
        id: 'police',
        type: 'emergency',
        icon: 'police',
        primary: true,
        name: { en: 'Police', id: 'Polisi', 'zh-TW': '警察' },
        phone: '110',
        description: {
          en: 'Crimes, threats to your safety, and urgent police help.',
          id: 'Tindak kejahatan, ancaman terhadap keselamatanmu, dan bantuan polisi yang mendesak.',
          'zh-TW': '犯罪、人身安全威脅與緊急警察協助。',
        },
        websiteUrl: 'https://www.npa.gov.tw/',
        lastVerified: '2026-10-17',
      },
      {
        id: 'fire-ambulance',
        type: 'emergency',
        icon: 'fire',
        primary: true,
        name: {
          en: 'Fire and ambulance',
          id: 'Pemadam kebakaran dan ambulans',
          'zh-TW': '消防與救護車',
        },
        phone: '119',
        description: {
          en: 'Fires, medical emergencies, and rescue.',
          id: 'Kebakaran, keadaan darurat medis, dan penyelamatan.',
          'zh-TW': '火災、緊急醫療與救援。',
        },
        websiteUrl: 'https://www.nfa.gov.tw/',
        lastVerified: '2026-10-17',
      },
      {
        id: 'mobile-emergency',
        type: 'emergency',
        icon: 'phone',
        name: {
          en: 'Mobile emergency number',
          id: 'Nomor darurat ponsel',
          'zh-TW': '手機緊急求救',
        },
        phone: '112',
        description: {
          en: 'From a mobile phone, works even without a SIM card if there is network coverage. A voice menu connects you to the police (press 0) or fire and ambulance (press 9). When you can, dial 110 or 119 directly: it is faster.',
          id: 'Dari ponsel, bisa dipakai bahkan tanpa kartu SIM selama ada sinyal. Menu suara akan menyambungkan ke polisi (tekan 0) atau pemadam kebakaran dan ambulans (tekan 9). Jika bisa, langsung hubungi 110 atau 119 karena lebih cepat.',
          'zh-TW': '以手機撥打，只要有訊號，即使沒有 SIM 卡也能撥通。語音選單可轉接警察（按 0）或消防與救護（按 9）。可以的話請直接撥打 110 或 119，速度更快。',
        },
        lastVerified: '2026-10-17',
      },
      {
        id: 'foreigner-hotline',
        type: 'emergency',
        icon: 'info',
        lineType: 'information',
        name: {
          en: 'Hotline for foreigners in Taiwan',
          id: 'Layanan informasi untuk warga asing di Taiwan',
          'zh-TW': '外來人士在臺生活諮詢服務熱線',
        },
        // Replaced the old number 0800-024-111 in 2022.
        phone: '1990',
        description: {
          en: 'Information on residence, health insurance, work, and daily life from the National Immigration Agency. Chinese, English, and Japanese: 24 hours. Indonesian: weekdays, 9:00 to 17:00. Not for emergencies.',
          id: 'Informasi seputar izin tinggal, asuransi kesehatan, pekerjaan, dan kehidupan sehari-hari dari National Immigration Agency. Bahasa Mandarin, Inggris, dan Jepang: 24 jam. Bahasa Indonesia: hari kerja, 09.00 sampai 17.00. Bukan untuk keadaan darurat.',
          'zh-TW': '內政部移民署提供居留、健保、工作與生活諮詢。中文、英語、日語：24 小時；印尼語：週一至週五 9:00 至 17:00。非緊急求助專線。',
        },
        websiteUrl: 'https://www.immigration.gov.tw/5475/5478/6928/6940/204896/204917/',
        lastVerified: '2026-10-17',
      },
      {
        id: 'mental-health-hotline',
        type: 'emergency',
        icon: 'heart',
        lineType: 'support',
        name: {
          en: 'Mental health support line',
          id: 'Layanan dukungan kesehatan mental',
          'zh-TW': '安心專線',
        },
        phone: '1925',
        description: {
          en: 'Free, 24-hour support from the Ministry of Health and Welfare when you are struggling emotionally or thinking about suicide.',
          id: 'Dukungan gratis 24 jam dari Ministry of Health and Welfare saat kamu merasa berat secara emosional atau berpikir untuk bunuh diri.',
          'zh-TW': '衛生福利部提供的 24 小時免付費支持專線，在你情緒困擾或有輕生念頭時可以撥打。',
        },
        websiteUrl: 'https://www.mohw.gov.tw/',
        lastVerified: '2026-10-17',
      },
      {
        id: 'anti-fraud-hotline',
        type: 'emergency',
        icon: 'shield',
        lineType: 'information',
        name: {
          en: 'Anti-fraud hotline',
          id: 'Layanan pengaduan penipuan',
          'zh-TW': '反詐騙諮詢專線',
        },
        phone: '165',
        description: {
          en: 'Check a suspicious call or message, or report a scam, to the National Police Agency. Calls may be charged depending on your provider.',
          id: 'Cek telepon atau pesan mencurigakan, atau laporkan penipuan, ke National Police Agency. Panggilan bisa dikenai biaya tergantung operator.',
          'zh-TW': '向內政部警政署查證可疑電話或訊息，或檢舉詐騙。依電信業者不同，通話可能需付費。',
        },
        websiteUrl: 'https://165.npa.gov.tw/',
        lastVerified: '2026-10-17',
      },
      {
        id: 'nhi',
        name: {
          en: 'National Health Insurance (NHI)',
          id: 'Asuransi Kesehatan Nasional (NHI)',
          'zh-TW': '全民健康保險 (NHI)',
        },
        tag: tags.insurance,
        description: {
          en: 'Taiwan’s public health insurance: when international students join, and how it works.',
          id: 'Asuransi kesehatan publik Taiwan: kapan mahasiswa internasional bisa ikut, dan cara kerjanya.',
          'zh-TW': '台灣的公共健康保險：國際學生何時加保，以及如何使用。',
        },
        subsections: [
          {
            title: { en: 'Who can join', id: 'Siapa yang bisa ikut', 'zh-TW': '加保資格' },
            tips: [
              'International students holding an ARC must join NHI once they have lived in Taiwan for six full months.',
              'The six months must be continuous, with one exception: you may leave Taiwan once for no more than 30 days, and those days are added to your waiting period. Leaving more than once, or for longer, restarts the count.',
              'Different rules apply to people employed in Taiwan, newborns, and some family members.',
              'Until you qualify, you need other health insurance. Your university will tell you what it requires.',
            ],
          },
          {
            title: { en: 'Enrolling', id: 'Pendaftaran', 'zh-TW': '加保方式' },
            steps: [
              'Your university usually enrols eligible students as a group and adds the premium to your tuition bill. Follow its instructions.',
              'After you are enrolled, apply for your NHI card. Your university can tell you how.',
            ],
          },
          {
            title: { en: 'Using NHI', id: 'Menggunakan NHI', 'zh-TW': '使用健保' },
            tips: [
              'Bring your NHI card to every clinic and hospital visit.',
              'You still pay a registration fee and a copayment at each visit. Larger hospitals usually charge a higher copayment than local clinics.',
              'Some treatments, medicines, and materials are not covered or are only partly covered. Ask before treatment if you are unsure.',
            ],
          },
        ],
        websiteUrl: 'https://www.nhi.gov.tw/en/',
        websiteLabel: { en: 'NHI Administration', id: 'NHI Administration', 'zh-TW': '中央健康保險署' },
        lastVerified: '2026-10-17',
      },
      {
        id: 'clinics-hospitals',
        name: {
          en: 'Hospitals, clinics and pharmacies',
          id: 'Rumah sakit, klinik, dan apotek',
          'zh-TW': '醫院、診所與藥局',
        },
        description: {
          en: 'Campus health centres, nearby clinics, pharmacies, and hospitals.',
          id: 'Pusat kesehatan kampus, klinik terdekat, apotek, dan rumah sakit.',
          'zh-TW': '校內衛生保健組、附近診所、藥局與醫院。',
        },
        // Add facilities in src/data/healthcareFacilities.js
        listings: healthcareFacilities,
        listingType: 'hospital',
        icon: 'medical',
      },
      {
        id: 'healthcare-guidance',
        name: {
          en: 'Seeing a doctor in Taiwan',
          id: 'Berobat di Taiwan',
          'zh-TW': '在台灣看醫生',
        },
        tag: tags.guide,
        description: {
          en: 'Finding a clinic, what to bring, how payment works, and when to call 119.',
          id: 'Mencari klinik, apa yang perlu dibawa, cara pembayaran, dan kapan harus menghubungi 119.',
          'zh-TW': '如何找診所、要帶什麼、如何付費，以及何時該撥打 119。',
        },
        steps: [
          'Find a clinic or hospital. For everyday illness a local clinic is usually quickest. Use Google Maps, ask your university health centre, or search by the department you need, such as family medicine, ENT, or dermatology.',
          'Book if you can. Many hospitals take appointments online or by phone; most small clinics accept walk-ins during opening hours.',
          'Bring your ARC (or passport), your NHI card, and a list of any medication you take.',
          'Pay at the counter. With NHI you pay a registration fee and a copayment; without NHI you pay the full cost, so keep your receipts for your insurance.',
          'Get language help if you need it: write your symptoms down in Mandarin beforehand, use a translation app, or bring a friend who speaks Mandarin. Some larger hospitals have international medical service centres.',
        ],
        tips: [
          'Life-threatening emergencies, such as chest pain, difficulty breathing, serious injury, or loss of consciousness: call 119 immediately.',
          'Urgent but not life-threatening outside clinic hours: go to a hospital emergency department.',
          'Your university health centre can often give first advice and referrals.',
        ],
      },
    ],
  },
]
