# PPI Hsinchu Website: Maintenance and Handover Guide

This guide is for each new PPI Hsinchu committee. You do not need programming experience. If you can edit a text file carefully, you can maintain this website.

For full step-by-step instructions on any task, see the main [README](../README.md).

---

## The big idea

The website is built so that **content is separate from design**.

- You edit **content files** (plain lists of names, events, links).
- The website turns them into the finished pages.

You should almost never need to open the `components` or `sections` folders.

| I want to change... | Open this file |
| --- | --- |
| Cabinet name, colours, vision, mission, philosophy | `src/config/cabinet.js` |
| Committee names, positions, portraits | `src/data/committee.js` |
| Past cabinets | `src/data/leadership.js` |
| Events | `src/data/events.js` |
| Student resources and the guidebook tile | `src/data/resources.js` |
| Restaurants, grocery stores, local services, healthcare facilities | `src/data/foodAndGroceries.js`, `localServices.js`, `healthcareFacilities.js` |
| Sponsored local business listings | `src/data/localBusinesses.js` |
| Photo albums | `src/data/gallery.js` |
| Schools on the campus map | `src/data/universities.js` |
| "Who We Are" text | `src/data/about.js` |
| Social media, contact email, video, AD/ART, menu order | `src/config/site.js` |
| Menu words, buttons, headings, messages (in each language) | `src/locales/en.json`, `id.json`, `zh-TW.json` |
| PPI Hsinchu red, fonts, animation speed | `src/styles/variables.css` |

Images go in `public/images/` and documents in `public/documents/`.

## Three languages

The website is in **English, Bahasa Indonesia and Traditional Chinese**. English is the fallback: anything not translated yet simply appears in English, so the site never looks broken.

There are two things to remember.

**1. Content in the data files can be written once per language:**

```js
title: {
  en: 'Culture Night',
  id: 'Malam Budaya',
  'zh-TW': '文化之夜',
},
```

If you only have the English text today, write just `en:` and add the others later.

**2. Menu words, buttons and headings are in `src/locales/`**, one file per language. Change only the text on the right-hand side of each line.

**Never translate:** PPI Hsinchu, the cabinet name, people's names, and official titles.

**Always ask a fluent speaker** to check Indonesian and Chinese text before publishing. Use Traditional Chinese as written in Taiwan.

Full instructions are in the README under "Languages and translations".

---

## Before you start

1. Install [Node.js](https://nodejs.org) (LTS version) and [Visual Studio Code](https://code.visualstudio.com).
2. Get the project folder from the previous committee (or from GitHub).
3. Open the folder in VS Code, open a terminal (**Terminal → New Terminal**) and run:

```bash
npm install
npm run dev
```

4. Open the address shown in the terminal (usually `http://localhost:5173/`). Keep it open while you edit: it updates every time you save.

---

## Checklist for each new administration

Work through this list at the start of your term.

### 1. Update cabinet information

File: `src/config/cabinet.js`

- [ ] `name`, `shortName` and `period`
- [ ] New cabinet logo saved in `public/images/brand/`, and the `logo` path updated
- [ ] `colors` changed to the new cabinet's colours
- [ ] `vision`, `mission` and `philosophy` rewritten in all three languages

File: `src/data/leadership.js`

- [ ] Remove `isCurrent: true` from the previous cabinet
- [ ] Fill in the previous cabinet's president, photo and slogan while people still remember them
- [ ] **Before** changing `src/data/committee.js`, copy the previous cabinet's member names and positions into its `divisions` in `leadership.js`. The current cabinet's list is read from `committee.js`, so it disappears once that file is replaced
- [ ] Add a new record for your cabinet at the bottom of the list, with `isCurrent: true`

### 2. Update committee profiles

File: `src/data/committee.js`

- [ ] Every name and position updated
- [ ] Divisions added, renamed or removed to match your structure
- [ ] Each division has its official Indonesian `name` plus a `translatedName` in English and Chinese
- [ ] Any new position title added under `"positions"` in the three files in `src/locales/`
- [ ] New cutout portraits saved in `public/images/committee/` and linked
- [ ] Old portraits that are no longer used deleted from the folder

### 3. Replace official branding assets

- [ ] Cabinet logo: `public/images/brand/`
- [ ] PPI Hsinchu logo, only if it has officially changed: replace `public/images/brand/logo-ppi-hsinchu.png` (keep the same file name)
- [ ] AD/ART PDF, if it was amended: `public/documents/`, then update `adArt` in `src/config/site.js`

### 4. Review external links

Click every link on the website and fix or remove any that are broken.

- [ ] Social media links (`src/config/site.js`)
- [ ] Resource links (`src/data/resources.js`)
- [ ] Event registration links (`src/data/events.js`)
- [ ] Homepage video still plays

### 5. Archive past events

- [ ] Nothing to move: events become "past" automatically once their date has passed
- [ ] Rewrite the descriptions of finished events in the past tense
- [ ] Remove registration links from finished events (`registrationUrl: ''`)
- [ ] Add each finished event's Google Drive folder link as its `documentationUrl` (folder shared as "Anyone with the link")
- [ ] Add a photo album for each finished event

### 6. Add upcoming events

File: `src/data/events.js`

- [ ] Each planned event added with date, venue and poster
- [ ] Title, summary and description written in all three languages (English at minimum)
- [ ] Registration links tested

### 7. Update student resources

File: `src/data/resources.js`

- [ ] Immigration, insurance and scholarship information checked against official sources. These rules change often
- [ ] Restaurants and shops that have closed removed; new ones added (`foodAndGroceries.js`, `localServices.js`, `healthcareFacilities.js` in `src/data/`)
- [ ] Campus tags (`nearbyUniversities` on food businesses) still correct: checked by someone who knows the area, not guessed from the district
- [ ] `needsVerification: true` removed only from items you have personally checked. Open the website with `?review` in the address (e.g. `/?review#resources`) to see which items are still unchecked
- [ ] Emergency numbers (`type: 'emergency'`) still match the official sources
- [ ] Map, website and Instagram links open the right place (run `npm run dev` and check the browser console for link warnings)
- [ ] Sponsored listings (`src/data/localBusinesses.js`) have the right `section`, `startDate` and `endDate`

- [ ] The schools on the campus map (`src/data/universities.js`) still match where members study, and each website link works

- [ ] The guidebook tile (`guidebook` in `src/data/resources.js`) points to the latest volume, with its cover as the thumbnail

- [ ] Official partners (`src/data/partners.js`) have the right `startDate` and `endDate`, and `featured: true` only on those that should appear on the homepage. Instructions are at the top of that file. Partners whose dates have passed disappear by themselves; while none are active, the website shows nothing about partners at all

### 8. Verify contact information

File: `src/config/site.js`

- [ ] `contact.email` is an address the new committee can access
- [ ] If a form service is used, the new committee has the login for it
- [ ] Send a test message through the website and confirm it arrives

### 9. Test website responsiveness

- [ ] Use the language dropdown to switch between EN, ID and 繁中, and read through every section in each language
- [ ] No text is left in the wrong language, and no long word is cut off or overlapping

- [ ] Open the site on a phone, a tablet and a computer
- [ ] On a computer, you can also press **F12** in the browser, then click the phone/tablet icon to preview different screen sizes
- [ ] Check every section, open an event, open a gallery photo, and switch through all the tabs
- [ ] Nothing is cut off and nothing scrolls sideways

### 10. Deploy the updated website

- [ ] `npm run lint` shows no errors
- [ ] `npm run build` finishes without errors
- [ ] `npm run preview` looks correct
- [ ] Published to the hosting service (see "Deployment" in the README)
- [ ] The live website checked after publishing

### Finally

- [ ] Update [CONTENT_CHECKLIST.md](CONTENT_CHECKLIST.md)
- [ ] Add anything you learned to this guide for the next committee

---

## Example 1: Editing a committee member

**Goal:** add the Ketua's name and portrait.

**Step 1.** Save the portrait as `public/images/committee/ketua-siti-rahma.png`.
It should be a cutout photo with a transparent background.

**Step 2.** Open `src/data/committee.js` and find the Ketua's line in the BPH division:

```js
{ name: '', position: 'Ketua', photo: '' },
```

**Step 3.** Fill in the name and photo path:

```js
{ name: 'Siti Rahma', position: 'Ketua', photo: '/images/committee/ketua-siti-rahma.png' },
```

**Step 4.** Save the file (**Ctrl + S**) and look at the website. Go to **About → Our Committee**. The card now shows the portrait and name.

Things to notice:

- The path starts with `/images/`, not `public/images/`.
- The quotes and the comma at the end of the line are still there.
- You did not need to change any other file.
- The name is never translated. The position `'Ketua'` stays in Indonesian here; visitors using English or Chinese automatically see "President" or 「會長」.

---

## Example 2: Adding a new event

**Goal:** announce a new event.

**Step 1.** Save the poster as `public/images/events/malam-budaya-2027.jpg`.

**Step 2.** Open `src/data/events.js`. Find the line `export const events = [` and add a new block directly underneath it:

```js
export const events = [
  {
    id: 'malam-budaya-2027',
    title: {
      en: 'Culture Night',
      id: 'Malam Budaya',
      'zh-TW': '文化之夜',
    },
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
      en: 'Join us for our annual culture night, with performances by students from across Hsinchu and a shared Indonesian dinner.',
      id: 'Bergabunglah dalam malam budaya tahunan kami, dengan penampilan mahasiswa dari seluruh Hsinchu dan makan malam khas Indonesia bersama.',
      'zh-TW': '歡迎參加我們的年度文化之夜，有來自新竹各校學生的表演，以及一起享用的印尼晚餐。',
    },
    poster: '/images/events/malam-budaya-2027.jpg',
    registrationUrl: 'https://forms.gle/your-form-link',
  },
  // ...the other events stay below
```

Short on time? Write only the `en:` lines. The event appears in English in every language until you add the others.

**Step 3.** Save and check the **Events** section. If this is the nearest upcoming event, it appears as the large featured card. The homepage card updates too.

**After the event:** you do not need to move anything. Once 22 May 2027 has passed, the event appears under "Past events" automatically. To add photos, create an album in `src/data/gallery.js` with `eventId: 'malam-budaya-2027'`.

Things to notice:

- `id` is unique and has no spaces.
- The date is written year-month-day: `2027-05-22`.
- The block starts with `{` and ends with `},`.
- `'zh-TW'` is written with quotes because it contains a hyphen.
- The date is not translated by you: the website writes it correctly in each language.

---

## Good habits

- **Change one thing at a time**, then check the website. Mistakes are much easier to find.
- **Keep images small.** Large photos make the website slow, especially on phones. Aim for under 400 KB each.
- **Use simple file names**: lowercase, hyphens, no spaces.
- **Translate carefully.** Do not paste from an automatic translator without a fluent speaker checking it. A missing translation (shown in English) is better than a wrong one.
- **Do not publish unverified information**, especially about immigration, insurance or scholarships. Link to the official source instead.
- **Ask permission** before publishing photos of people.
- **Save your work with Git** (or keep a dated copy of the project folder) before making big changes, so you can go back.

---

## If you get stuck

1. Read the red error message. It usually names the file and line number.
2. Undo your last change (**Ctrl + Z**) and try again more slowly.
3. Check the "Troubleshooting" section of the [README](../README.md).
4. Ask the previous committee's web maintainer, or a friend who studies computer science. The project uses very common tools (React and Vite), so many students will be able to help.
