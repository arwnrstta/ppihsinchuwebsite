# PPI Hsinchu Website

The official website of **PPI Hsinchu** (Perhimpunan Pelajar Indonesia di Hsinchu), the Indonesian student association in Hsinchu, Taiwan.

This guide is written for future committee members, including people who have never programmed before. You can update almost everything on the website by editing a few simple text files.

- New committee taking over? Start with [docs/MAINTENANCE_GUIDE.md](docs/MAINTENANCE_GUIDE.md).
- Want to know what content is still missing? See [docs/CONTENT_CHECKLIST.md](docs/CONTENT_CHECKLIST.md).

---

## 1. Project overview

### What this website is

A single-page website with six sections: **Home, About, Events, Resources, Gallery, Connect With Us**.

It is available in three languages: **English** (default), **Bahasa Indonesia** and **Traditional Chinese (繁體中文)**. Visitors switch with the language dropdown in the navbar, and their choice is remembered.

### Technology

| Tool | What it does |
| --- | --- |
| [React](https://react.dev) | Builds the page out of reusable pieces called components |
| [Vite](https://vite.dev) | Runs the website on your computer and builds the final version |
| Plain CSS | All styling. No CSS framework is used |
| [i18next](https://www.i18next.com) + react-i18next | Switches the website between languages |
| [Leaflet](https://leafletjs.com) + OpenStreetMap | The campus map in the About section (free, no account or API key) |
| Google Fonts | Montserrat, Instrument Sans, Alumni Sans |

There are no other libraries. There is no database and no server: the website is a set of static files. Translations are plain text files that you edit by hand. No automatic or AI translation runs on the live website.

### Folder structure

```
ppi-hsinchu/
├── index.html              The page shell: title, description, fonts
├── public/                 Files used as they are (images, PDFs)
│   ├── documents/          The AD/ART PDF goes here
│   └── images/
│       ├── brand/          PPI Hsinchu logo and cabinet logo
│       ├── committee/      Committee portraits
│       ├── events/         Event posters
│       ├── gallery/        Gallery photos
│       ├── home/           Homepage hero image
│       ├── leadership/     Photos of past cabinets
│       └── photos/         General photos (currently stock placeholders)
├── src/
│   ├── config/             ★ Website settings
│   │   ├── site.js         Name, menu, hero text, video, social links, contact, AD/ART
│   │   └── cabinet.js      Current cabinet: name, colours, vision, mission, philosophy
│   ├── data/               ★ Website content
│   │   ├── about.js        "Who We Are" and AD/ART introduction text
│   │   ├── committee.js    Committee members by division
│   │   ├── leadership.js   Past cabinets (Leadership Through the Years)
│   │   ├── events.js       All events
│   │   ├── resources.js    Student resources
│   │   ├── foodAndGroceries.js  Indonesian restaurants and grocery stores (also localServices.js, healthcareFacilities.js)
│   │   ├── localBusinesses.js  Sponsored local business listings
│   │   ├── gallery.js      Photo albums
│   │   ├── universities.js Schools shown on the campus map
│   │   ├── partners.js     Official partners (Our Partners page, homepage logos)
│   │   └── contactForms.js Contact form fields
│   ├── locales/            ★ Interface text in each language
│   │   ├── en.json         English
│   │   ├── id.json         Bahasa Indonesia
│   │   └── zh-TW.json      Traditional Chinese
│   ├── i18n.js             Language setup: list of languages, fallback, saved choice
│   ├── components/         Reusable building blocks (cards, tabs, pop-ups...)
│   ├── sections/           The six page sections
│   │   ├── home/           Parts of the homepage
│   │   └── about/          The five About tabs
│   ├── styles/
│   │   ├── variables.css   ★ Colours, fonts, spacing, animation speeds
│   │   └── global.css      Base styles shared by the whole site
│   ├── hooks/ and utils/   Small helper functions
│   ├── App.jsx             Puts the sections together
│   └── main.jsx            Starts the website
├── docs/                   Handover guide and content checklist
├── design_references/      Design inspiration images (not used by the website)
└── framer_reference/       The old Framer website export (not used by the website)
```

**The folders marked ★ are the only ones you normally need to touch.**

---

## 2. Getting started

### What you need

- [Node.js](https://nodejs.org) version 22 or newer (choose the "LTS" download)
- A code editor. [Visual Studio Code](https://code.visualstudio.com) is free and recommended

### Install

Open a terminal in the project folder (in VS Code: **Terminal → New Terminal**) and run:

```bash
npm install
```

You only need to do this once, or again after someone changes `package.json`.

### Run the website on your computer

```bash
npm run dev
```

The terminal shows an address such as `http://localhost:5173/`. Open it in your browser. The page refreshes by itself every time you save a file.

### Stop the website

Click on the terminal and press **Ctrl + C**.

### Build the website for production

```bash
npm run build
```

This creates a `dist` folder containing the finished website. To check that finished version on your computer:

```bash
npm run preview
```

### Check the code for mistakes

```bash
npm run lint
```

---

## 3. Updating website content

### Three rules for editing data files

1. **Text goes inside quotes**: `name: 'Budi Santoso',`
2. **Every line ends with a comma.**
3. **Empty quotes `''` mean "not available yet".** The website then shows a tidy placeholder ("Coming soon", "Name to be announced") instead of something broken.

If the page goes blank after an edit, you probably removed a quote, comma or bracket. Press **Ctrl + Z** to undo, or see [Troubleshooting](#6-troubleshooting).

### Image paths

Images live in `public/images/`. In data files, you write the path **without** the word `public`:

| File on your computer | What you write |
| --- | --- |
| `public/images/committee/ketua.png` | `'/images/committee/ketua.png'` |

File names are case-sensitive on the live website. Use lowercase letters and hyphens, with no spaces: `halal-bihalal-2027.jpg`, not `Halal Bihalal 2027.JPG`.

---

### Update committee names

**File:** [src/data/committee.js](src/data/committee.js)

Find the person's line and fill in the name:

```js
{ name: 'Budi Santoso', position: 'Ketua', photo: '' },
```

- To add a member, copy a line and paste it below.
- To remove a member, delete the line.
- The member counts on the website update automatically.

### Replace committee portraits

1. Prepare a **cutout** photo: transparent background, PNG or WebP format, portrait orientation, about 800 × 1000 pixels, cropped from the waist up. Free tools such as remove.bg can remove backgrounds.
2. Save it in `public/images/committee/`, for example `budi-santoso.png`.
3. In [src/data/committee.js](src/data/committee.js), set the photo path:

```js
{ name: 'Budi Santoso', position: 'Ketua', photo: '/images/committee/budi-santoso.png' },
```

For a consistent look, photograph everyone with the same framing and lighting.

### Change the current cabinet name and theme

**File:** [src/config/cabinet.js](src/config/cabinet.js)

This one file controls the cabinet name, term, logo, cabinet colours, vision, mission and philosophy.

```js
name: 'Kabinet Karya Raya',
shortName: 'Karya Raya',
period: '2026/2027',
logo: '/images/brand/logo-karya-raya.png',
colors: {
  primary: '#6B46C1',   // main cabinet colour
  deep: '#2D1A5C',      // very dark version
  soft: '#DDD2F4',      // very light version
  accent: '#E8B04A',    // small highlight colour
},
```

Put the new cabinet logo in `public/images/brand/` and update the `logo` path. The red PPI Hsinchu branding is not affected by cabinet changes.

### Add previous leadership records

**File:** [src/data/leadership.js](src/data/leadership.js)

Records are listed from **oldest to newest**. Add one block per cabinet:

```js
{
  year: '2025/2026',
  cabinetName: 'Kabinet Example',
  president: 'Full Name',
  photo: '/images/leadership/2025-2026.jpg',
  slogan: 'The cabinet slogan',
  divisions: [
    {
      name: 'Badan Pengurus Harian',
      members: [
        { name: 'Full Name', position: 'Ketua' },
        { name: 'Full Name', position: 'Sekretaris' },
      ],
    },
    {
      name: 'Divisi Acara',
      members: [
        { name: 'Full Name', position: 'Ketua Divisi' },
        { name: 'Full Name', position: 'Anggota' },
      ],
    },
  ],
},
```

- **Photo.** Photos go in `public/images/leadership/`. Landscape photos (4:3) fit best.
- **Slogan.** Optional. Leave it as `''` and no slogan is shown.
- **Members.** `divisions` fills the pop-up opened by the **View cabinet members** button. Only names and positions are needed. Division names differed from cabinet to cabinet, so each record lists its own divisions with whatever names that cabinet used. Use `divisions: []` while the list is unknown; the button is then replaced by "Member list to be added."
- **Current cabinet.** Only **one** record should have `isCurrent: true`. Do not type its members here: they are read automatically from [src/data/committee.js](src/data/committee.js).
- **At handover.** Before replacing `committee.js` with the new committee, copy the outgoing cabinet's names and positions into its record in this file, or its member list will be lost.

### Add upcoming events

**File:** [src/data/events.js](src/data/events.js)

Copy an existing event block, paste it, and change the details:

```js
{
  id: 'halal-bihalal-2027',
  title: 'Halal Bihalal',
  date: '2027-04-10',
  time: '18:00 - 21:00',
  venue: 'Venue name, Hsinchu',
  organizer: 'PPI Hsinchu',
  summary: 'One sentence shown on the card.',
  description: 'A longer description shown when the event is opened.',
  poster: '/images/events/halal-bihalal-2027.jpg',
  registrationUrl: 'https://...',
},
```

- `id` must be unique, with no spaces.
- `cabinet` is the cabinet that ran the event, for example `cabinet: 'Kabinet Karya Raya',`. It appears as a label on the event's card and in its pop-up: purple for the current cabinet (the name in `src/config/cabinet.js`) and grey for any earlier cabinet. The name must be spelled exactly the same as in `cabinet.js` to count as current. Leave it as `''` to show no label.
- `fee` is what it costs to join. Write an amount as plain text (`fee: 'NT$150',`) or words per language (`fee: { en: 'Free', id: 'Gratis', 'zh-TW': '免費' },`). It appears on the event's card, on the featured event, and as a "Fee" row in the pop-up. Leave it as `''` and no fee is shown.
- `date` must be written as `YYYY-MM-DD`. Leave it as `''` to show "Date to be announced".
- The upcoming event with the nearest date automatically becomes the large featured event.
- `registrationUrl` is the link to your registration form (for example a Google Form: in the form, click **Send**, choose the link tab, and copy the link). On the featured event it becomes the red **Register now** button, which opens the form in a new tab. While it is `''`, the button is greyed out and reads "Registration opens soon".
- Do not add `isSample: true` to real events. That line marks placeholder content.

### Archive past events

**You do not need to do anything.** The website compares each event's `date` with today's date. Once the date has passed, the event moves from "Upcoming" to "Past events" by itself.

After an event, it is nice to rewrite the `description` in the past tense and add its documentation link.

**Documentation (Google Drive) button.** Every past event shows a **View documentation** button, on its card and in its pop-up. Paste the link to the event's photo folder into `documentationUrl`:

```js
documentationUrl: 'https://drive.google.com/drive/folders/...',
```

In Google Drive, right-click the folder, choose **Share**, set access to **Anyone with the link**, and copy the link. Without that setting visitors will be asked to sign in. While `documentationUrl` is `''`, the button is greyed out and reads "Documentation coming soon". The button never appears on upcoming events.

### Upload event posters

1. Export the poster as JPG, portrait orientation, about 1080 × 1350 pixels, under about 400 KB.
2. Save it in `public/images/events/`.
3. Set the `poster` path on the event, for example `'/images/events/halal-bihalal-2027.jpg'`.

### Update student resources

The Resources section is built from data files only. Adding, editing or removing something never requires touching a component: each card or row shows only the fields that exist.

| What | File |
|---|---|
| Indonesian restaurants, warungs, grocery stores and halal shops | [src/data/foodAndGroceries.js](src/data/foodAndGroceries.js) |
| Universities and areas used by the food directory filters | [src/data/universities.js](src/data/universities.js) |
| Post offices, places of worship, other local services | [src/data/localServices.js](src/data/localServices.js) |
| Hospitals, clinics and pharmacies | [src/data/healthcareFacilities.js](src/data/healthcareFacilities.js) |
| Sponsored (paid) business listings | [src/data/localBusinesses.js](src/data/localBusinesses.js) |
| Guides, official links, emergency numbers, categories | [src/data/resources.js](src/data/resources.js) |
| Labels such as "Food" or "Halal" | [src/data/resourceTags.js](src/data/resourceTags.js) |

**Add a restaurant or grocery store:** add one object to the list in `foodAndGroceries.js`:

```js
{
  id: 'warung-example',
  name: 'Warung Example',
  businessTypes: ['restaurant'],          // 'restaurant', 'grocery', or both
  region: 'hsinchu-city',                 // see "regions" in universities.js
  nearbyUniversities: ['nthu', 'nycu'],   // only after checking (see below)
  tags: [tags.food, tags.halal],
  description: { en: '...', id: '...', 'zh-TW': '...' },
  address: 'No. 1, Example Rd., East District, Hsinchu City',
  googleMapsUrl: 'https://maps.app.goo.gl/...',   // Google Maps > Share > Copy link
  websiteUrl: 'https://...',
  instagramUrl: 'https://www.instagram.com/...',
  phone: '03-000-0000',
},
```

Only `name` is required. Leave out what you do not have: no `googleMapsUrl` means no map button, no `phone` means no Call button, no `image` means a placeholder. Never guess a map link; copy it from Google Maps. A business that is both a restaurant and a shop is entered once with `businessTypes: ['restaurant', 'grocery']`. Local services and healthcare facilities work the same way in their own files (facilities also take `type: 'hospital'`, `'clinic'` or `'pharmacy'`).

**Food directory filters.** The Indonesian Food & Groceries directory has two filters: business type (All / Restaurants & Warungs / Grocery Stores) and location (All Areas / Hsinchu City / Hsinchu County / Other Areas).

- `region` is the business's exact area: `hsinchu-city`, `hsinchu-county`, `miaoli-county` or `new-taipei-city`. Without it, the area is read from the address (e.g. "..., Hsinchu City"). Miaoli, New Taipei and unknown areas appear under "Other Areas"; which region falls under which choice is set by `locationGroup` in the `regions` list of `universities.js`.
- `nearbyUniversities` adds a campus tag such as "Near NTHU / NYCU", using the ids `nthu`, `nycu`, `ypu`, `chu`, `cute`, `ydu`, `hwu`. Add a school only after someone has checked that the place is genuinely convenient for its students; being in the same city or district is not enough. The short names in the tag come from `tagName` in `universities.js`.
- `latitude` and `longitude` are optional and not shown yet; they are kept for future features such as a map.

**How it looks.** Restaurants and grocery stores appear together as one always-open directory: two filters, then a grid of photo cards (photo or a neutral placeholder, name, business type, campus tag, short location, labels and buttons), with active sponsors in a "Featured Partners" strip above. Other lists (universities, hospitals, local services) appear as one expandable card that lists its places as compact rows. A section with no places is hidden completely. Sections are defined in `resources.js` as items with `listings: restaurants` (see the instructions at the top of that file), so a new kind of list can be added the same way.

**Photos.** Each business can have one `image` (see the top of `foodAndGroceries.js`). Use only photos taken by us or shared by the owner; never copy them from Google Maps. Without a photo, the card shows a placeholder.

- **Emergency contacts** (`type: 'emergency'` in `resources.js`) need a `phone` and always appear first in their category, never folded away. Items with `primary: true` (police, fire and ambulance) are large cards with a Call Now button; the others form a compact list, where `lineType: 'information'` or `'support'` marks lines that are not for emergencies. Only add numbers from an official source.
- **Ordering.** `featured: true` puts a place first with a "Recommended" label; `priority: 1` comes before `priority: 2`; everything else keeps the order of the file.
- **Search** finds places inside sections: the section opens and shows only the matching places. **Type filters** (e.g. Restaurants / Groceries) appear when a category contains more than one type and narrow sections down to that type.
- **Links are checked.** A link without `https://`, a map link not from Google Maps, or an Instagram link not on instagram.com is hidden, and `npm run dev` prints a warning in the browser console.
- **Empty categories disappear**, including their tab and navbar entry.

**Verification.** Items with `needsVerification: true` are still unchecked. Visitors see a general "confirm with the official source" notice (and, while any emergency number is unchecked, a caution line above the emergency numbers) rather than a label on every card. To see the label on each unchecked item, open the website with `?review` in the address, for example `https://<website>/?review#resources`. Remove `needsVerification` only after someone has checked the information against an official source.

### Sponsored local business listings

**File:** [src/data/localBusinesses.js](src/data/localBusinesses.js)

Paid placements appear at the top of their section (`section: 'indonesian-food-groceries'`), under a small "Featured Partners" heading and each with a "Sponsored" label. In the food directory they are wider cards that can also show a `logo`, a photo `gallery` and a `promotion`, and they follow the same type and location filters. Their `region` and `nearbyUniversities` always come from `foodAndGroceries.js`; sponsorship never adds a campus tag. A listing is only shown between its `startDate` and `endDate`; expired listings and listings with a mistyped date hide themselves. If the business is already in the directory, write `listingId: '<its id>'` instead of copying its details: it is then shown once, as sponsored, and returns to its normal place when the sponsorship ends. Emergency contacts and healthcare facilities can never be sponsored. While no listing is active, no sponsored heading appears anywhere. Full instructions are at the top of the file.

### Update the guidebook tile

**File:** [src/data/resources.js](src/data/resources.js), under `guidebook`

The large tile at the top of the Student Resources section opens the guidebook in a new tab.

```js
export const guidebook = {
  title: 'Jelajah Hsinchu Vol. 1',
  edition: { en: 'Fall 2026', id: 'Musim Gugur 2026', 'zh-TW': '2026 秋季' },
  description: { en: '...', id: '...', 'zh-TW': '...' },
  url: 'https://heyzine.com/flip-book/6701319284.html',
  thumbnail: '/images/resources/guidebook-cover.jpg',
}
```

**To change the thumbnail**, either:

- replace the file `public/images/resources/guidebook-cover.jpg` with a new picture that has the same name, or
- save a new picture in `public/images/resources/` and change `thumbnail` to its path.

The current thumbnail is the first page of the guidebook. A portrait picture (taller than wide) fits best. To use the first page of a new volume, take a screenshot of its cover, or export page 1 of the PDF as a JPG.

When a new volume comes out, update `title`, `edition`, `url` and the thumbnail.

### Add photo galleries

**File:** [src/data/gallery.js](src/data/gallery.js)

1. Resize photos to about 1600 pixels on the longest side, JPG, under about 400 KB each.
2. Create a folder for the album, for example `public/images/gallery/halal-bihalal-2027/`, and put the photos in it.
3. Add an album block:

```js
{
  id: 'halal-bihalal-2027',
  title: 'Halal Bihalal',
  year: 2027,
  description: 'An evening together after Eid.',
  eventId: 'halal-bihalal-2027',
  photos: [
    {
      src: '/images/gallery/halal-bihalal-2027/01.jpg',
      alt: 'Students sharing a meal at long tables',
      caption: 'Dinner is served',
    },
  ],
},
```

- `eventId` must match the `id` of the event in `events.js`. This one line creates both links: "View event" on the album and "View photos" on the event. Use `''` if the album has no event.
- `alt` describes the photo for visitors who use screen readers. Please always fill it in.

### Update the campus map

**File:** [src/data/universities.js](src/data/universities.js)

The map in **About → Our Campuses** shows one pin per school. Hovering a pin shows the school's name; clicking it opens the school's website. The same schools are listed as cards under the map.

To add a school, copy a block and change the details:

```js
{
  id: 'nthu',
  shortName: 'NTHU',
  name: { en: 'National Tsing Hua University', 'zh-TW': '國立清華大學' },
  area: { en: 'East District, Hsinchu City', id: 'Distrik Timur, Kota Hsinchu', 'zh-TW': '新竹市東區' },
  latitude: 24.7961,
  longitude: 120.9967,
  url: 'https://www.nthu.edu.tw/',
},
```

To find `latitude` and `longitude`: open Google Maps, right-click the campus, and click the two numbers at the top of the menu to copy them. The first is the latitude, the second the longitude.

The map zooms by itself to fit every pin. A school far from Hsinchu makes the map zoom out, which pushes the Hsinchu pins closer together.

The map images come from OpenStreetMap, which is free. The small "© OpenStreetMap" credit in the corner is required by their licence, so please leave it in place.

### Update social media links

**File:** [src/config/site.js](src/config/site.js), under `socialLinks`

```js
{ id: 'instagram', label: 'Instagram', icon: 'instagram', handle: '@ppihsinchu', url: 'https://www.instagram.com/...' },
```

Accounts with an empty `url` show "Coming soon" and are not clickable. To remove a platform completely, delete its line.

### Replace the AD/ART PDF

1. Save the PDF as `public/documents/ad-art-ppi-hsinchu.pdf`.
2. In [src/config/site.js](src/config/site.js), under `adArt`, set:

```js
pdfPath: '/documents/ad-art-ppi-hsinchu.pdf',
lastUpdated: 'October 2026',
```

While `pdfPath` is empty, the button shows a disabled "Coming soon" state.

### Update the homepage video

**File:** [src/config/site.js](src/config/site.js), under `featuredVideo`

Copy the video ID from the YouTube link. It is the part after `v=`:

```
https://www.youtube.com/watch?v=abc123XYZ00   →   youtubeVideoId: 'abc123XYZ00'
```

You can also change the `coverImage` shown before the video plays. The heading and description of the video block are under `"video"` in the files in `src/locales/`. The video only loads after a visitor presses play, which keeps the page fast.

### Update the contact form and contact email

**File:** [src/config/site.js](src/config/site.js), under `contact`

The website has no server, so the form works in one of three ways:

| Setting | What happens |
| --- | --- |
| `email` and `formEndpoint` both empty | The form is shown but the Send button is disabled |
| `email` filled in | Pressing Send opens the visitor's own email app with the message written out |
| `formEndpoint` filled in | The message is sent to an online form service, and a success message appears only when that service confirms it |

`formEndpoint` works with form services that accept a JSON `POST` request (Formspree is one example). Create an account with the service, copy the form URL it gives you, and paste it in. To change the form's fields, edit [src/data/contactForms.js](src/data/contactForms.js).

### Remove the "Sample" and "Draft" labels

Temporary content is marked with small labels so visitors are not misled. When all official content is in place, open [src/config/site.js](src/config/site.js) and set:

```js
showPlaceholderLabels: false,
```

---

## Languages and translations

The website has three languages. English is the **fallback**: whenever a translation is missing or left empty, the English text is shown instead. This means you can always publish in English first and translate later, and nothing will look broken.

Text lives in two kinds of places.

| Kind of text | Where it lives | Examples |
| --- | --- | --- |
| **Interface text** | [src/locales/](src/locales/) — one file per language | Menu, buttons, section headings, error messages, footer |
| **Content** | The data files in [src/data/](src/data/) and [src/config/cabinet.js](src/config/cabinet.js) | Events, resources, vision and mission, committee divisions, photo captions |

### What is never translated

- **PPI Hsinchu** and **Perhimpunan Pelajar Indonesia di Hsinchu**
- **Kabinet Karya Raya** and other cabinet names
- People's names
- Official institution names, unless they have an established translation (for example 國立清華大學)
- The official title of the AD/ART. Other languages show a small explanatory subtitle under it.

### Edit existing translations (interface text)

Open the file for the language in [src/locales/](src/locales/):

| Language | File |
| --- | --- |
| English | `src/locales/en.json` |
| Bahasa Indonesia | `src/locales/id.json` |
| Traditional Chinese | `src/locales/zh-TW.json` |

Each line has a **name** on the left and the **text** on the right. Only change the text on the right:

```json
"nav": {
  "home": "Beranda",
  "about": "Tentang",
```

Rules for these files:

- Never change the names on the left. All three files must use the same names.
- Keep every quote `"` and comma. These files are stricter than the data files: a missing comma breaks the page.
- Words inside double curly brackets, such as `{{count}}` or `{{title}}`, are filled in by the website. Keep them exactly as they are and move them to wherever they belong in the sentence.
- To use the English text for now, set the text to `""`.

To find a piece of text, press **Ctrl + Shift + F** in VS Code and search for the English wording.

### Write content in several languages (data files)

In the data files, any text can be written in two ways.

**One text per language** (most content):

```js
title: {
  en: 'Culture Night',
  id: 'Malam Budaya',
  'zh-TW': '文化之夜',
},
```

**Plain text**, when it is the same in every language (names, official titles):

```js
organizer: 'PPI Hsinchu',
```

Notes:

- `'zh-TW'` needs quotes because it contains a hyphen. `en` and `id` do not.
- Leave a language out, or set it to `''`, and English is used.
- Use Traditional Chinese as written in Taiwan, not Simplified Chinese.
- Never paste text from an automatic translator without asking a fluent speaker to check it.

### Add a multilingual event

In [src/data/events.js](src/data/events.js), write `title`, `venue`, `summary` and `description` per language:

```js
{
  id: 'malam-budaya-2027',
  title: { en: 'Culture Night', id: 'Malam Budaya', 'zh-TW': '文化之夜' },
  date: '2027-05-22',
  time: '18:30 - 21:30',
  venue: 'Venue name, Hsinchu',
  organizer: 'PPI Hsinchu',
  summary: {
    en: 'An evening of Indonesian music, dance, and food.',
    id: 'Malam penuh musik, tari, dan kuliner Indonesia.',
    'zh-TW': '一個充滿印尼音樂、舞蹈與美食的夜晚。',
  },
  description: {
    en: 'Join us for our annual culture night.',
    id: 'Bergabunglah dalam malam budaya tahunan kami.',
    'zh-TW': '歡迎參加我們的年度文化之夜。',
  },
  poster: '/images/events/malam-budaya-2027.jpg',
  registrationUrl: 'https://...',
},
```

Dates are translated automatically: `2027-05-22` appears as "22 May 2027", "22 Mei 2027" or "2027年5月22日".

### Translate a student resource

In [src/data/resources.js](src/data/resources.js), each text of an item can be written per language, including every step of a guide:

```js
{
  name: { en: 'ARC renewal', id: 'Perpanjangan ARC', 'zh-TW': '居留證延期' },
  tag: tags.guide,
  description: {
    en: 'How to renew your ARC.',
    id: 'Cara memperpanjang ARC.',
    'zh-TW': '如何辦理居留證延期。',
  },
  steps: [
    { en: 'First step.', id: 'Langkah pertama.', 'zh-TW': '第一步。' },
    { en: 'Second step.', id: 'Langkah kedua.', 'zh-TW': '第二步。' },
  ],
},
```

The short labels on the cards (`tags.guide`, `tags.food`...) are translated once in [src/data/resourceTags.js](src/data/resourceTags.js). Reuse them, or add a new one there. The search box searches in the language the visitor is using.

### Update cabinet information in all languages

In [src/config/cabinet.js](src/config/cabinet.js):

- `name`, `shortName` and `period` are written once and never translated.
- `vision`, each point of `mission`, and the `philosophy` texts are written once per language.

```js
vision: {
  en: 'To be a warm and inclusive home...',
  id: 'Menjadi rumah yang hangat dan inklusif...',
  'zh-TW': '成為溫暖且包容的家……',
},
```

### Committee divisions and positions

In [src/data/committee.js](src/data/committee.js), each division keeps its **official Indonesian name** and adds translations:

```js
name: 'Divisi Kemahasiswaan',
shortName: 'Kemahasiswaan',
translatedName: { en: 'Student Affairs', 'zh-TW': '學生事務組' },
```

| Language | What visitors see |
| --- | --- |
| Indonesian | **Divisi Kemahasiswaan** |
| English | **Student Affairs**, with *Divisi Kemahasiswaan* underneath |
| Chinese | **學生事務組**, with *Divisi Kemahasiswaan* underneath |

Positions are written in Indonesian in the data file (`position: 'Sekretaris'`). Their translations are under `"positions"` in the three files in `src/locales/`. If you use a new position (for example `'Humas'`), add a line for it to each file. Until you do, it is shown exactly as written.

### Add another language

1. Copy `src/locales/en.json` to a new file named with the language code, for example `src/locales/ja.json`, and translate the text on the right of each line.
2. Open [src/i18n.js](src/i18n.js) and:
   - import the file at the top: `import ja from './locales/ja.json'`
   - add it to `languages`: `{ code: 'ja', label: '日本語', name: '日本語', dateLocale: 'ja-JP' },`
   - add it to `resources`: `ja: { translation: ja },`
3. The language now appears in the switcher. Content in the data files shows in English until you add a `ja: '...'` line to each text.

### Change the default language

In [src/i18n.js](src/i18n.js), change `defaultLanguage`. It is both the language new visitors see and the fallback for missing translations, so it should be the language in which all content is complete.

---

## 4. Website customisation

### Change the primary and secondary colours

- **PPI Hsinchu colours** (red, crimson, cream, charcoal): [src/styles/variables.css](src/styles/variables.css), at the top.
- **Cabinet colours** (purple): [src/config/cabinet.js](src/config/cabinet.js), under `colors`.

Colours are written as hex codes such as `#CE1126`. Any online "colour picker" can give you a hex code. Gradients are built from these colours, so they update automatically.

### Update fonts

Fonts are set in two places, and both must match:

1. [index.html](index.html): the Google Fonts `<link>` that downloads the fonts.
2. [src/styles/variables.css](src/styles/variables.css): the `--font-heading`, `--font-body` and `--font-display` lines.

To use a different font, pick one on [fonts.google.com](https://fonts.google.com), replace the link in `index.html` with the one Google gives you, then change the font name in `variables.css`.

### Adjust animations

All animation settings are in the "Animation" block of [src/styles/variables.css](src/styles/variables.css):

```css
--duration-fast: 200ms;      /* hover effects */
--duration-medium: 350ms;    /* tabs, accordions */
--duration-slow: 500ms;      /* scroll fade-ins */
--reveal-distance: 18px;     /* how far elements rise when they fade in */
```

Smaller numbers are faster. Set `--reveal-distance` to `0px` for a plain fade. Animations are switched off automatically for visitors whose device is set to "reduce motion".

### Update the navbar

- **Order of the menu items:** [src/config/site.js](src/config/site.js), under `navigation`. The `id` values must match the section ids on the page, so leave those unchanged. The last item in the list is displayed as the red button.
- **Text of the menu items:** the three files in [src/locales/](src/locales/), under `"nav"`.

**Dropdowns.** Hovering a menu item shows a dropdown of that section's parts. The About, Resources and Gallery dropdowns are built from the data files (`aboutTabs` in `src/data/about.js`, the categories in `resources.js`, the albums in `gallery.js`), so they update by themselves. The Home and Events dropdowns are short fixed lists at the top of [src/components/Navbar.jsx](src/components/Navbar.jsx). A menu item with fewer than two parts gets no dropdown. Dropdowns are hidden in the mobile menu.

**Language switcher.** The language dropdown (showing `EN`, `ID` or `繁中`) comes from the `languages` list in [src/i18n.js](src/i18n.js).

### Change the homepage hero

**File:** [src/config/site.js](src/config/site.js), under `hero`: headline, hero image, and which section the button leads to. The button text and the scrolling words are under `"hero"` in the files in [src/locales/](src/locales/). The two logos in the navbar come from `site.logo` and from `logo` in [src/config/cabinet.js](src/config/cabinet.js).

---

## 5. Deployment

### Build

```bash
npm run build
```

The finished website is created in the `dist` folder. It is a set of plain files that can be hosted on any static website host.

### Deploying updates

**No hosting service has been set up for this project yet**, so there is no automatic deployment. The code is stored on GitHub at `https://github.com/arwnrstta/ppihsinchuwebsite`.

Whichever host the committee chooses, the process is the same:

1. Make and test your changes with `npm run dev`.
2. Run `npm run build`.
3. Publish the contents of the `dist` folder to the host.

Many hosts can connect to the GitHub repository and do steps 2 and 3 automatically each time changes are pushed. If you set that up, the two settings they ask for are:

- Build command: `npm run build`
- Output folder: `dist`

Once hosting is chosen, please write the exact steps in this section for the next committee.

### If the website is hosted in a sub-folder

If the address will look like `https://example.com/some-folder/` rather than `https://example.com/`, add a `base` line to [vite.config.js](vite.config.js):

```js
export default defineConfig({
  base: '/some-folder/',
  plugins: [react()],
})
```

Image paths in the data files do not need to change.

### Environment variables and external services

The website needs **no environment variables**. The only external services are:

| Service | Used for | Where it is configured |
| --- | --- | --- |
| Google Fonts | Fonts | `index.html` |
| OpenStreetMap | Map images for the campus map | `src/components/CampusMap.jsx` |
| YouTube | Homepage video (optional) | `featuredVideo` in `src/config/site.js` |
| A form service (optional) | Contact form delivery | `contact.formEndpoint` in `src/config/site.js` |

---

## 6. Troubleshooting

**"npm is not recognized" or "command not found"**
Node.js is not installed. Install it from [nodejs.org](https://nodejs.org), then close and reopen the terminal.

**"Cannot find module" or "vite is not recognized"**
Dependencies are not installed. Run `npm install`.

**The development server will not start**
- Check that the terminal is in the project folder (the one containing `package.json`).
- If it says the port is in use, another copy is already running. Close other terminals, or simply use the new address Vite prints.
- Delete the `node_modules` folder and run `npm install` again.

**The page is blank, or the terminal shows a red error after editing a data file**
There is a typing mistake in the file you just edited. The error message names the file and line number. Look there for:
- a missing comma at the end of a line
- a missing or extra quote `'`
- a missing bracket `}` or `]`
- an apostrophe inside single quotes. Write `'Don’t'` with a curly apostrophe, or use double quotes: `"Don't"`

Press **Ctrl + Z** to undo until the page works again.

**An image does not display**
- The file must be inside `public/images/`.
- The path in the data file must start with `/images/`, not `public/images/`.
- The name must match exactly, including capital letters and the ending (`.jpg` is not `.JPG` or `.jpeg`).
- Avoid spaces and special characters in file names.

**An image works on my computer but not on the live website**
This is almost always a capital-letter mismatch. Windows ignores the difference between `Photo.JPG` and `photo.jpg`, but web servers do not.

**A link does nothing or opens the wrong page**
External links must be complete and start with `https://`. Test every link after adding it.

**An event is in the wrong list (upcoming or past)**
Check the `date`. It must be `YYYY-MM-DD` with a four-digit year and two-digit month and day, for example `'2027-04-05'`.

**Some text appears in English although another language is selected**
That text has no translation yet, so the English fallback is shown. For interface text, fill in the matching line in `src/locales/id.json` or `zh-TW.json`. For content, add the `id:` or `'zh-TW':` line in the data file.

**A word like `nav.home` or `events.title` appears on the page**
The name on the left side of a line in `src/locales/en.json` was changed or deleted. Restore it. Only the text on the right should be edited.

**The page shows `[object Object]`**
A multilingual text `{ en: ..., id: ... }` was used where the website expects plain text. Check the file you just edited against the examples in "Languages and translations".

**"View photos" does not appear on an event**
The album's `eventId` in `gallery.js` must match the event's `id` in `events.js` exactly.

**`npm run build` fails**
Run `npm run lint`. It lists problems with file names and line numbers. Fix them and build again. If the build worked before your changes, the cause is in a file you edited.

**I broke something and cannot fix it**
If the project uses Git, you can throw away the changes in one file and return it to the last saved version:

```bash
git checkout -- src/data/events.js
```

---

## Notes for developers

- Translation uses `react-i18next`. Interface strings come from `t('key')`; multilingual content from the data files goes through `localize()` / `useLocalize()` in `src/utils/localize.js`. No user-facing string should be hardcoded in JSX.
- Sections share state through `App.jsx` only where two sections need to talk to each other (see the comment at the top of that file).
- Each component has its own CSS file next to it. Class names follow the pattern `block__element--modifier`.
- Pop-ups use the browser's native `<dialog>` element (see `src/components/Modal.jsx`).
- Paths from data files pass through `assetPath()` (`src/utils/assetPath.js`) so the site also works when hosted in a sub-folder.
