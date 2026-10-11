/*
 * STUDENT RESOURCES
 * -----------------
 * Each category below becomes one tab in the Resources section.
 * Each item inside "items" becomes one expandable card.
 * The search box looks through every category at once, in the language the
 * visitor is using.
 *
 * LANGUAGES
 * Every text can be written once per language:
 *
 *     name: { en: 'ARC renewal', id: 'Perpanjangan ARC', 'zh-TW': '居留證延期' },
 *
 * or as plain text when it is the same everywhere (for example the official
 * name of a university). A language that is missing or '' falls back to
 * English, so a new item can be published in English first.
 *
 * ITEM FIELDS (only "name", "tag" and "description" are required)
 *   name              - title of the resource
 *   tag               - a short label. Reuse one from "tags" below, or add one.
 *   description       - one or two sentences
 *   location          - address or area (leave out if not relevant)
 *   steps             - a list of steps; shown as a numbered guide.
 *                       Each step is one { en, id, 'zh-TW' } block.
 *   notes             - extra advice shown under the steps
 *   url               - full external link starting with https://
 *   urlLabel          - text for the link button
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

/* The short labels on the cards, written once and reused by many items. */
const tags = {
  food: { en: 'Food', id: 'Kuliner', 'zh-TW': '美食' },
  groceries: { en: 'Groceries', id: 'Belanja', 'zh-TW': '採買' },
  transport: { en: 'Transport', id: 'Transportasi', 'zh-TW': '交通' },
  housing: { en: 'Housing', id: 'Tempat tinggal', 'zh-TW': '住宿' },
  essentials: { en: 'Essentials', id: 'Kebutuhan dasar', 'zh-TW': '生活必需' },
  guide: { en: 'Guide', id: 'Panduan', 'zh-TW': '指南' },
  official: { en: 'Official', id: 'Resmi', 'zh-TW': '官方' },
  scholarships: { en: 'Scholarships', id: 'Beasiswa', 'zh-TW': '獎學金' },
  university: { en: 'University', id: 'Universitas', 'zh-TW': '大學' },
  academics: { en: 'Academics', id: 'Akademik', 'zh-TW': '學術' },
  careers: { en: 'Careers', id: 'Karier', 'zh-TW': '職涯' },
  emergency: { en: 'Emergency', id: 'Darurat', 'zh-TW': '緊急' },
  insurance: { en: 'Insurance', id: 'Asuransi', 'zh-TW': '保險' },
  medical: { en: 'Medical', id: 'Medis', 'zh-TW': '醫療' },
}

const officialUniversityWebsite = {
  en: 'Official university website.',
  id: 'Situs resmi universitas.',
  'zh-TW': '學校官方網站。',
}

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
        name: {
          en: 'Indonesian restaurants',
          id: 'Restoran Indonesia',
          'zh-TW': '印尼餐廳',
        },
        tag: tags.food,
        description: {
          en: 'A list of Indonesian restaurants and warung around Hsinchu will be added here.',
          id: 'Daftar restoran dan warung Indonesia di sekitar Hsinchu akan ditambahkan di sini.',
          'zh-TW': '新竹一帶的印尼餐廳與小吃店清單將在此補上。',
        },
        notes: {
          en: 'Placeholder. Add one card per restaurant with its name, address, and a map link.',
          id: 'Sementara. Tambahkan satu kartu per restoran beserta nama, alamat, dan tautan peta.',
          'zh-TW': '暫定內容。請為每間餐廳新增一張卡片，包含店名、地址與地圖連結。',
        },
        needsVerification: true,
      },
      {
        name: {
          en: 'Indonesian and halal grocery stores',
          id: 'Toko bahan makanan Indonesia dan halal',
          'zh-TW': '印尼與清真食品雜貨店',
        },
        tag: tags.groceries,
        description: {
          en: 'Where to find Indonesian ingredients, snacks, and halal products.',
          id: 'Tempat mencari bahan masakan Indonesia, camilan, dan produk halal.',
          'zh-TW': '哪裡可以買到印尼食材、零食與清真產品。',
        },
        notes: {
          en: 'Placeholder. Add one card per shop with its name, address, and opening hours.',
          id: 'Sementara. Tambahkan satu kartu per toko beserta nama, alamat, dan jam buka.',
          'zh-TW': '暫定內容。請為每間店新增一張卡片，包含店名、地址與營業時間。',
        },
        needsVerification: true,
      },
      {
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
        name: {
          en: 'Essential local services',
          id: 'Layanan lokal penting',
          'zh-TW': '在地生活服務',
        },
        tag: tags.essentials,
        description: {
          en: 'Post offices, places of worship, and other useful services near campus.',
          id: 'Kantor pos, tempat ibadah, dan layanan berguna lainnya di dekat kampus.',
          'zh-TW': '校園附近的郵局、宗教場所與其他實用服務。',
        },
        notes: {
          en: 'Placeholder. Add one card per service with its address.',
          id: 'Sementara. Tambahkan satu kartu per layanan beserta alamatnya.',
          'zh-TW': '暫定內容。請為每項服務新增一張卡片並附上地址。',
        },
        needsVerification: true,
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
        url: 'https://www.immigration.gov.tw/',
        urlLabel: {
          en: 'National Immigration Agency',
          id: 'National Immigration Agency',
          'zh-TW': '內政部移民署',
        },
        needsVerification: true,
      },
      {
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
        // Official institution names stay in English, with the established
        // Chinese name shown for Chinese readers.
        name: {
          en: 'National Tsing Hua University (NTHU)',
          'zh-TW': '國立清華大學 (NTHU)',
        },
        tag: tags.university,
        description: officialUniversityWebsite,
        url: 'https://www.nthu.edu.tw/',
        urlLabel: {
          en: 'Visit NTHU website',
          id: 'Kunjungi situs NTHU',
          'zh-TW': '前往清華大學網站',
        },
        needsVerification: true,
      },
      {
        name: {
          en: 'National Yang Ming Chiao Tung University (NYCU)',
          'zh-TW': '國立陽明交通大學 (NYCU)',
        },
        tag: tags.university,
        description: officialUniversityWebsite,
        url: 'https://www.nycu.edu.tw/',
        urlLabel: {
          en: 'Visit NYCU website',
          id: 'Kunjungi situs NYCU',
          'zh-TW': '前往陽明交通大學網站',
        },
        needsVerification: true,
      },
      {
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
    items: [
      {
        name: {
          en: 'Emergency numbers',
          id: 'Nomor darurat',
          'zh-TW': '緊急電話',
        },
        tag: tags.emergency,
        description: {
          en: 'The main emergency numbers in Taiwan.',
          id: 'Nomor darurat utama di Taiwan.',
          'zh-TW': '台灣主要的緊急電話號碼。',
        },
        steps: [
          {
            en: '110 for the police.',
            id: '110 untuk polisi.',
            'zh-TW': '110：警察。',
          },
          {
            en: '119 for fire and ambulance.',
            id: '119 untuk pemadam kebakaran dan ambulans.',
            'zh-TW': '119：消防與救護車。',
          },
        ],
        notes: {
          en: 'Add your university’s campus security number and the PPI Hsinchu emergency contact here.',
          id: 'Tambahkan nomor keamanan kampus universitasmu dan kontak darurat PPI Hsinchu di sini.',
          'zh-TW': '請在此補上學校校安中心電話與 PPI Hsinchu 的緊急聯絡方式。',
        },
        needsVerification: true,
      },
      {
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
        url: 'https://www.nhi.gov.tw/',
        urlLabel: {
          en: 'NHI Administration',
          id: 'NHI Administration',
          'zh-TW': '中央健康保險署',
        },
        needsVerification: true,
      },
      {
        name: {
          en: 'Clinics and hospitals',
          id: 'Klinik dan rumah sakit',
          'zh-TW': '診所與醫院',
        },
        tag: tags.medical,
        description: {
          en: 'Campus health centres, nearby clinics, and hospitals with English-speaking staff.',
          id: 'Pusat kesehatan kampus, klinik terdekat, dan rumah sakit dengan staf berbahasa Inggris.',
          'zh-TW': '校內衛生保健組、附近診所，以及有英語服務人員的醫院。',
        },
        notes: {
          en: 'Placeholder. Add one card per clinic or hospital with its address.',
          id: 'Sementara. Tambahkan satu kartu per klinik atau rumah sakit beserta alamatnya.',
          'zh-TW': '暫定內容。請為每間診所或醫院新增一張卡片並附上地址。',
        },
        needsVerification: true,
      },
      {
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
