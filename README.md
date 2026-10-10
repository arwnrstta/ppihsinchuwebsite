# PPI Hsinchu Website

The official website of **PPI Hsinchu** (Perhimpunan Pelajar Indonesia di Hsinchu), the Indonesian student association in Hsinchu, Taiwan.

This guide is written for future committee members, including people who have never programmed before. You can update almost everything on the website by editing a few simple text files.

- New committee taking over? Start with [docs/MAINTENANCE_GUIDE.md](docs/MAINTENANCE_GUIDE.md).
- Want to know what content is still missing? See [docs/CONTENT_CHECKLIST.md](docs/CONTENT_CHECKLIST.md).

---

## 1. Project overview

### What this website is

A single-page website with six sections: **Home, About, Events, Resources, Gallery, Connect With Us**.

### Technology

| Tool | What it does |
| --- | --- |
| [React](https://react.dev) | Builds the page out of reusable pieces called components |
| [Vite](https://vite.dev) | Runs the website on your computer and builds the final version |
| Plain CSS | All styling. No CSS framework is used |
| Google Fonts | Bricolage Grotesque, Instrument Sans, Alumni Sans |

There are no other libraries. There is no database and no server: the website is a set of static files.

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
│   │   ├── gallery.js      Photo albums
│   │   └── contactForms.js Contact form fields
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
  highlight: 'One or two sentences about this cabinet.',
},
```

Photos go in `public/images/leadership/`. Landscape photos (4:3) fit best. Only **one** record should have `isCurrent: true`: the cabinet in office now.

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
- `date` must be written as `YYYY-MM-DD`. Leave it as `''` to show "Date to be announced".
- The upcoming event with the nearest date automatically becomes the large featured event.
- Do not add `isSample: true` to real events. That line marks placeholder content.

### Archive past events

**You do not need to do anything.** The website compares each event's `date` with today's date. Once the date has passed, the event moves from "Upcoming" to "Past events" by itself.

After an event, it is nice to rewrite the `description` in the past tense and link a photo album (see below).

### Upload event posters

1. Export the poster as JPG, portrait orientation, about 1080 × 1350 pixels, under about 400 KB.
2. Save it in `public/images/events/`.
3. Set the `poster` path on the event, for example `'/images/events/halal-bihalal-2027.jpg'`.

### Update student resources

**File:** [src/data/resources.js](src/data/resources.js)

Each category is a tab. Each item is an expandable card:

```js
{
  name: 'Name of the resource',
  tag: 'Food',
  description: 'One or two sentences.',
  location: 'Address or area',
  steps: ['First step.', 'Second step.'],
  notes: 'Extra advice.',
  url: 'https://...',
  urlLabel: 'Visit website',
},
```

Only `name`, `tag` and `description` are required. Leave out the lines you do not need.

**Important:** every current item has `needsVerification: true`, which shows a "Needs verification" label. Remove that line only after someone has checked the information against an official source.

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

You can also change `title`, `description` and the `coverImage` shown before the video plays. The video only loads after a visitor presses play, which keeps the page fast.

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

**File:** [src/config/site.js](src/config/site.js), under `navigation`

To rename a menu item, change its `label`. The `id` values must match the section ids on the page, so leave those unchanged. The last item in the list is displayed as the red button.

**Dropdowns.** Hovering a menu item shows a dropdown of that section's parts. The About, Resources and Gallery dropdowns are built from the data files (`aboutTabs` in `src/data/about.js`, the categories in `resources.js`, the albums in `gallery.js`), so they update by themselves. The Home and Events dropdowns are short fixed lists at the top of [src/components/Navbar.jsx](src/components/Navbar.jsx). A menu item with fewer than two parts gets no dropdown. Dropdowns are hidden in the mobile menu.

### Change the homepage hero

**File:** [src/config/site.js](src/config/site.js), under `hero`: headline, button label, hero image and the scrolling words. The two logos in the navbar come from `site.logo` and from `logo` in [src/config/cabinet.js](src/config/cabinet.js).

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

- Sections share state through `App.jsx` only where two sections need to talk to each other (see the comment at the top of that file).
- Each component has its own CSS file next to it. Class names follow the pattern `block__element--modifier`.
- Pop-ups use the browser's native `<dialog>` element (see `src/components/Modal.jsx`).
- Paths from data files pass through `assetPath()` (`src/utils/assetPath.js`) so the site also works when hosted in a sub-folder.
