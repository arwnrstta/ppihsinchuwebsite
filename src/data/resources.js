import { groceryStores } from './groceryStores.js'
import { healthcareFacilities } from './healthcareFacilities.js'
import { localServices } from './localServices.js'
import { tags } from './resourceTags.js'
import { restaurants } from './restaurants.js'

/*
 * STUDENT RESOURCES
 * -----------------
 * Everything in the Resources section comes from this file. Each category
 * below becomes one tab; each item inside "items" becomes one card. Adding,
 * editing or removing a resource only means editing data files. The cards
 * work out by themselves which details and buttons to show.
 *
 * WHERE THINGS GO
 *   Restaurants               src/data/restaurants.js
 *   Grocery stores            src/data/groceryStores.js
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
 *     id: 'indonesian-restaurants',     // sponsored listings use this id
 *     name: { en: 'Indonesian restaurants', ... },
 *     description: { en: '...', ... },
 *     listings: restaurants,            // a list imported at the top
 *     listingType: 'restaurant',        // type of each place, unless the
 *                                       // place has its own "type"
 *     icon: 'restaurant',               // optional; see SECTION ICONS below
 *   },
 *
 * A section whose list is empty (and has no active sponsored listing) is
 * hidden completely. To start a new kind of list, create a file like
 * restaurants.js, import it at the top of this file and add a section.
 *
 * SECTION ICONS: 'restaurant', 'grocery', 'shop', 'service', 'medical',
 * 'university'.
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
 * IMPORTANT
 * Much of the content below is a PLACEHOLDER written to show the layout.
 * Immigration, insurance and scholarship rules change often. Before
 * publishing, check every item against the official source and add the
 * correct details, addresses and links.
 *
 * TODO: Replace placeholder items with verified information.
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
    label: { en: 'Restaurants', id: 'Restoran', 'zh-TW': '餐廳' },
  },
  grocery: {
    layout: 'place',
    label: { en: 'Groceries', id: 'Toko bahan makanan', 'zh-TW': '食品雜貨' },
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

const officialUniversityWebsite = {
  en: 'Official university website.',
  id: 'Situs resmi universitas.',
  'zh-TW': '學校官方網站。',
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
        id: 'indonesian-restaurants',
        name: {
          en: 'Indonesian restaurants',
          id: 'Restoran Indonesia',
          'zh-TW': '印尼餐廳',
        },
        description: {
          en: 'Indonesian restaurants and warung around Hsinchu.',
          id: 'Restoran dan warung Indonesia di sekitar Hsinchu.',
          'zh-TW': '新竹一帶的印尼餐廳與小吃店。',
        },
        // Add restaurants in src/data/restaurants.js
        listings: restaurants,
        listingType: 'restaurant',
      },
      {
        id: 'halal-groceries',
        name: {
          en: 'Indonesian and halal grocery stores',
          id: 'Toko bahan makanan Indonesia dan halal',
          'zh-TW': '印尼與清真食品雜貨店',
        },
        description: {
          en: 'Where to find Indonesian ingredients, snacks, and halal products.',
          id: 'Tempat mencari bahan masakan Indonesia, camilan, dan produk halal.',
          'zh-TW': '哪裡可以買到印尼食材、零食與清真產品。',
        },
        // Add shops in src/data/groceryStores.js
        listings: groceryStores,
        listingType: 'grocery',
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
          en: 'An overview of buses, trains, the high-speed rail, bike sharing, and scooters.',
          id: 'Gambaran umum tentang bus, kereta, kereta cepat, sepeda sewa, dan skuter.',
          'zh-TW': '公車、火車、高鐵、公共自行車與機車的概覽。',
        },
        steps: [
          {
            en: 'Get a contactless transport card (such as an EasyCard) for buses, trains, and bike sharing.',
            id: 'Miliki kartu transportasi nirsentuh (seperti EasyCard) untuk bus, kereta, dan sepeda sewa.',
            'zh-TW': '辦一張電子票證（例如悠遊卡），可用於公車、火車與公共自行車。',
          },
          {
            en: 'Check your university’s shuttle bus routes between campuses and stations.',
            id: 'Cek rute bus antar-jemput universitasmu antara kampus dan stasiun.',
            'zh-TW': '查詢學校往返校區與車站的接駁車路線。',
          },
          {
            en: 'Use a map app with public transport directions to plan trips.',
            id: 'Gunakan aplikasi peta dengan petunjuk transportasi umum untuk merencanakan perjalanan.',
            'zh-TW': '使用提供大眾運輸路線的地圖應用程式規劃行程。',
          },
        ],
        notes: {
          en: 'General guidance only. Add local routes and tips from current students.',
          id: 'Hanya panduan umum. Tambahkan rute lokal dan kiat dari mahasiswa yang sedang berkuliah.',
          'zh-TW': '僅為一般性建議。請補上在地路線與在學學生的經驗分享。',
        },
        needsVerification: true,
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
          en: 'Tips on university dormitories and renting off campus.',
          id: 'Kiat seputar asrama universitas dan menyewa tempat tinggal di luar kampus.',
          'zh-TW': '關於學校宿舍與校外租屋的建議。',
        },
        steps: [
          {
            en: 'Ask your university’s housing office about dormitory applications and deadlines.',
            id: 'Tanyakan kepada bagian asrama universitasmu tentang pendaftaran dan tenggat waktu.',
            'zh-TW': '向學校住宿組詢問宿舍申請方式與截止日期。',
          },
          {
            en: 'If renting off campus, visit the room in person and read the contract carefully before paying a deposit.',
            id: 'Jika menyewa di luar kampus, lihat kamarnya langsung dan baca kontrak dengan teliti sebelum membayar deposit.',
            'zh-TW': '若在校外租屋，請親自看房並仔細閱讀合約後再支付押金。',
          },
          {
            en: 'Ask senior students in the community about areas and landlords they recommend.',
            id: 'Tanyakan kepada para senior di komunitas tentang daerah dan pemilik kos yang mereka rekomendasikan.',
            'zh-TW': '向社群裡的學長姐請教他們推薦的區域與房東。',
          },
        ],
        needsVerification: true,
      },
      {
        id: 'banking-mobile',
        name: {
          en: 'Banking and mobile services',
          id: 'Perbankan dan layanan seluler',
          'zh-TW': '銀行與行動通訊',
        },
        tag: tags.essentials,
        description: {
          en: 'Opening a bank account and getting a local SIM card.',
          id: 'Membuka rekening bank dan mendapatkan kartu SIM lokal.',
          'zh-TW': '開立銀行帳戶與申辦本地 SIM 卡。',
        },
        notes: {
          en: 'Placeholder. Requirements differ between banks and telecom providers. Add verified steps and the documents students usually need.',
          id: 'Sementara. Persyaratan berbeda antara bank dan operator seluler. Tambahkan langkah yang sudah diverifikasi dan dokumen yang biasanya dibutuhkan mahasiswa.',
          'zh-TW': '暫定內容。各銀行與電信業者的規定不同，請補上經確認的步驟與學生通常需要準備的文件。',
        },
        needsVerification: true,
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
          en: 'ARC renewal',
          id: 'Perpanjangan ARC',
          'zh-TW': '居留證 (ARC) 延期',
        },
        tag: tags.guide,
        description: {
          en: 'How to renew your Alien Resident Certificate before it expires.',
          id: 'Cara memperpanjang Alien Resident Certificate sebelum masa berlakunya habis.',
          'zh-TW': '如何在外僑居留證到期前辦理延期。',
        },
        steps: [
          {
            en: 'Check the expiry date printed on your ARC and plan to renew well before it.',
            id: 'Periksa tanggal kedaluwarsa yang tertera pada ARC dan rencanakan perpanjangan jauh sebelum tanggal itu.',
            'zh-TW': '確認居留證上的到期日，並提早規劃延期。',
          },
          {
            en: 'Confirm the current requirements and application window with the National Immigration Agency or your university’s international office.',
            id: 'Pastikan persyaratan dan periode pengajuan terbaru ke National Immigration Agency atau kantor urusan internasional universitasmu.',
            'zh-TW': '向內政部移民署或學校國際事務處確認最新的規定與申請期間。',
          },
          {
            en: 'Prepare the documents on the official list.',
            id: 'Siapkan dokumen sesuai daftar resmi.',
            'zh-TW': '依官方清單準備文件。',
          },
          {
            en: 'Submit your application and keep the receipt until you collect your new ARC.',
            id: 'Ajukan permohonan dan simpan tanda terimanya sampai kamu mengambil ARC yang baru.',
            'zh-TW': '送出申請，並保留收據直到領取新的居留證。',
          },
        ],
        notes: {
          en: 'Draft outline only. Exact documents, fees, and timelines must be added from the official source.',
          id: 'Hanya kerangka sementara. Dokumen, biaya, dan jangka waktu yang tepat harus ditambahkan dari sumber resmi.',
          'zh-TW': '僅為草稿大綱。確切的文件、費用與時程須依官方來源補上。',
        },
        websiteUrl: 'https://www.immigration.gov.tw/',
        websiteLabel: {
          en: 'National Immigration Agency',
          id: 'National Immigration Agency',
          'zh-TW': '內政部移民署',
        },
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
          en: 'Resident visas, visitor visas, and what to prepare before arriving in Taiwan.',
          id: 'Visa residen, visa kunjungan, dan apa saja yang perlu disiapkan sebelum tiba di Taiwan.',
          'zh-TW': '居留簽證、停留簽證，以及來台前需要準備的事項。',
        },
        notes: {
          en: 'Placeholder. Add verified guidance and links to the official visa pages.',
          id: 'Sementara. Tambahkan panduan yang sudah diverifikasi dan tautan ke halaman visa resmi.',
          'zh-TW': '暫定內容。請補上經確認的說明與官方簽證頁面連結。',
        },
        needsVerification: true,
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
          en: 'What to do when you move to a new address during your stay.',
          id: 'Apa yang harus dilakukan saat pindah ke alamat baru selama tinggal di sini.',
          'zh-TW': '居留期間搬家時該辦理的事項。',
        },
        notes: {
          en: 'Placeholder. Add the verified procedure and the time limit for reporting a new address.',
          id: 'Sementara. Tambahkan prosedur yang sudah diverifikasi dan batas waktu pelaporan alamat baru.',
          'zh-TW': '暫定內容。請補上經確認的流程與申報新地址的期限。',
        },
        needsVerification: true,
      },
      {
        id: 'immigration-procedures',
        name: {
          en: 'General immigration procedures',
          id: 'Prosedur imigrasi umum',
          'zh-TW': '一般移民手續',
        },
        tag: tags.guide,
        description: {
          en: 'Re-entry, lost documents, and other common situations.',
          id: 'Izin masuk kembali, dokumen hilang, dan situasi umum lainnya.',
          'zh-TW': '重入境、證件遺失及其他常見情況。',
        },
        notes: {
          en: 'Placeholder. Add verified guidance for each situation.',
          id: 'Sementara. Tambahkan panduan yang sudah diverifikasi untuk setiap situasi.',
          'zh-TW': '暫定內容。請為各種情況補上經確認的說明。',
        },
        needsVerification: true,
      },
      {
        id: 'indonesian-office-taipei',
        name: {
          en: 'Indonesian representative office in Taipei',
          id: 'Kantor perwakilan Indonesia di Taipei',
          'zh-TW': '印尼駐台北代表處',
        },
        tag: tags.official,
        description: {
          en: 'Consular services for Indonesian citizens in Taiwan, such as passport renewal.',
          id: 'Layanan kekonsuleran bagi warga negara Indonesia di Taiwan, seperti perpanjangan paspor.',
          'zh-TW': '為在台印尼公民提供的領事服務，例如護照換發。',
        },
        notes: {
          en: 'Placeholder. Add the official website, address, and contact details.',
          id: 'Sementara. Tambahkan situs resmi, alamat, dan informasi kontak.',
          'zh-TW': '暫定內容。請補上官方網站、地址與聯絡方式。',
        },
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
        id: 'scholarships',
        name: {
          en: 'Scholarship information',
          id: 'Informasi beasiswa',
          'zh-TW': '獎學金資訊',
        },
        tag: tags.scholarships,
        description: {
          en: 'Government, university, and private scholarships open to Indonesian students.',
          id: 'Beasiswa pemerintah, universitas, dan swasta yang terbuka bagi mahasiswa Indonesia.',
          'zh-TW': '開放印尼學生申請的政府、學校與民間獎學金。',
        },
        notes: {
          en: 'Placeholder. Add one card per scholarship with eligibility, the official link, and the application period.',
          id: 'Sementara. Tambahkan satu kartu per beasiswa beserta syarat, tautan resmi, dan periode pendaftaran.',
          'zh-TW': '暫定內容。請為每項獎學金新增一張卡片，包含申請資格、官方連結與申請期間。',
        },
        needsVerification: true,
      },
      {
        id: 'universities',
        name: {
          en: 'Universities in Hsinchu',
          id: 'Universitas di Hsinchu',
          'zh-TW': '新竹的大學',
        },
        tag: tags.university,
        description: {
          en: 'Official websites of the universities where our members study.',
          id: 'Situs resmi universitas tempat anggota kami berkuliah.',
          'zh-TW': '我們成員就讀大學的官方網站。',
        },
        // Each university below is one row. Add another the same way.
        listings: [
          {
            id: 'nthu',
            // Official institution names stay in English, with the established
            // Chinese name shown for Chinese readers.
            name: {
              en: 'National Tsing Hua University (NTHU)',
              'zh-TW': '國立清華大學 (NTHU)',
            },
            description: officialUniversityWebsite,
            websiteUrl: 'https://www.nthu.edu.tw/',
            websiteLabel: {
              en: 'Visit NTHU website',
              id: 'Kunjungi situs NTHU',
              'zh-TW': '前往清華大學網站',
            },
            needsVerification: true,
          },
          {
            id: 'nycu',
            name: {
              en: 'National Yang Ming Chiao Tung University (NYCU)',
              'zh-TW': '國立陽明交通大學 (NYCU)',
            },
            description: officialUniversityWebsite,
            websiteUrl: 'https://www.nycu.edu.tw/',
            websiteLabel: {
              en: 'Visit NYCU website',
              id: 'Kunjungi situs NYCU',
              'zh-TW': '前往陽明交通大學網站',
            },
            needsVerification: true,
          },
        ],
        icon: 'university',
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
          en: 'Exchange programmes, research opportunities, conferences, and competitions.',
          id: 'Program pertukaran, kesempatan riset, konferensi, dan kompetisi.',
          'zh-TW': '交換計畫、研究機會、研討會與競賽。',
        },
        notes: {
          en: 'Placeholder. Add current opportunities as they are announced.',
          id: 'Sementara. Tambahkan kesempatan terbaru saat diumumkan.',
          'zh-TW': '暫定內容。請於公布時補上最新機會。',
        },
        needsVerification: true,
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
          en: 'Finding internships and jobs in Taiwan, and the work permit rules for students.',
          id: 'Mencari magang dan pekerjaan di Taiwan, serta aturan izin kerja bagi mahasiswa.',
          'zh-TW': '在台灣尋找實習與工作，以及學生工作許可的相關規定。',
        },
        notes: {
          en: 'Placeholder. Add verified work permit guidance and useful job platforms.',
          id: 'Sementara. Tambahkan panduan izin kerja yang sudah diverifikasi dan platform lowongan yang berguna.',
          'zh-TW': '暫定內容。請補上經確認的工作許可說明與實用的求職平台。',
        },
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
          en: 'Crimes, traffic accidents, and any threat to your safety.',
          id: 'Tindak kejahatan, kecelakaan lalu lintas, dan ancaman terhadap keselamatanmu.',
          'zh-TW': '犯罪、交通事故及任何危及人身安全的情況。',
        },
        websiteUrl: 'https://www.npa.gov.tw/',
        needsVerification: true,
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
          en: 'Fires, serious injuries, and medical emergencies.',
          id: 'Kebakaran, cedera serius, dan keadaan darurat medis.',
          'zh-TW': '火災、重大傷害與緊急醫療狀況。',
        },
        websiteUrl: 'https://www.nfa.gov.tw/',
        needsVerification: true,
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
          en: 'From a mobile phone, connects to emergency services even without a local SIM card.',
          id: 'Dari ponsel, terhubung ke layanan darurat bahkan tanpa kartu SIM lokal.',
          'zh-TW': '以手機撥打，即使沒有本地 SIM 卡也能連線至緊急救援單位。',
        },
        needsVerification: true,
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
          en: 'Questions about visas, residence, health insurance, and daily life, from the National Immigration Agency. Not for emergencies.',
          id: 'Pertanyaan seputar visa, izin tinggal, asuransi kesehatan, dan kehidupan sehari-hari, dari National Immigration Agency. Bukan untuk keadaan darurat.',
          'zh-TW': '內政部移民署提供的簽證、居留、健保與生活諮詢。非緊急求助專線。',
        },
        websiteUrl: 'https://www.immigration.gov.tw/',
        needsVerification: true,
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
          en: 'Someone to talk to when you are struggling or thinking about suicide, from the Ministry of Health and Welfare.',
          id: 'Tempat bercerita saat kamu merasa berat atau berpikir untuk bunuh diri, dari Ministry of Health and Welfare.',
          'zh-TW': '衛生福利部提供，當你感到難以承受或有輕生念頭時，有人可以傾聽。',
        },
        websiteUrl: 'https://www.mohw.gov.tw/',
        needsVerification: true,
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
          en: 'Check a suspicious call or message, or report a scam.',
          id: 'Cek telepon atau pesan yang mencurigakan, atau laporkan penipuan.',
          'zh-TW': '查證可疑的電話或訊息，或檢舉詐騙。',
        },
        websiteUrl: 'https://165.npa.gov.tw/',
        needsVerification: true,
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
          en: 'Taiwan’s public health insurance, which international students can usually join after a qualifying period of residence.',
          id: 'Asuransi kesehatan publik Taiwan, yang biasanya dapat diikuti mahasiswa internasional setelah memenuhi masa tinggal tertentu.',
          'zh-TW': '台灣的公共健康保險，國際學生通常在居留滿一定期間後可以加保。',
        },
        notes: {
          en: 'Placeholder. Confirm the current eligibility rules and enrolment process with your university or the NHI Administration.',
          id: 'Sementara. Pastikan aturan kelayakan dan proses pendaftaran terbaru ke universitasmu atau NHI Administration.',
          'zh-TW': '暫定內容。請向學校或衛生福利部中央健康保險署確認最新的加保資格與流程。',
        },
        websiteUrl: 'https://www.nhi.gov.tw/',
        websiteLabel: {
          en: 'NHI Administration',
          id: 'NHI Administration',
          'zh-TW': '中央健康保險署',
        },
        needsVerification: true,
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
          en: 'General healthcare guidance',
          id: 'Panduan umum layanan kesehatan',
          'zh-TW': '就醫一般須知',
        },
        tag: tags.guide,
        description: {
          en: 'What to bring to an appointment and how visits usually work.',
          id: 'Apa yang perlu dibawa saat berobat dan bagaimana biasanya prosesnya.',
          'zh-TW': '看診時要帶什麼，以及一般的就醫流程。',
        },
        steps: [
          {
            en: 'Bring your ARC and your health insurance card to every appointment.',
            id: 'Bawa ARC dan kartu asuransi kesehatanmu setiap kali berobat.',
            'zh-TW': '每次看診都請攜帶居留證與健保卡。',
          },
          {
            en: 'For non-urgent problems, visit a local clinic before going to a large hospital.',
            id: 'Untuk keluhan yang tidak mendesak, kunjungi klinik terdekat sebelum ke rumah sakit besar.',
            'zh-TW': '非緊急狀況請先到附近診所，再視情況前往大醫院。',
          },
          {
            en: 'Ask a friend who speaks Mandarin to come with you if you are unsure.',
            id: 'Ajak teman yang bisa berbahasa Mandarin jika kamu ragu.',
            'zh-TW': '如果不確定，可以請會說中文的朋友陪同。',
          },
        ],
        needsVerification: true,
      },
    ],
  },
]
