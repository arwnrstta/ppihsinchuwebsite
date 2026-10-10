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
| Student resources | `src/data/resources.js` |
| Photo albums | `src/data/gallery.js` |
| "Who We Are" text | `src/data/about.js` |
| Social media, contact email, video, AD/ART, menu, hero text | `src/config/site.js` |
| PPI Hsinchu red, fonts, animation speed | `src/styles/variables.css` |

Images go in `public/images/` and documents in `public/documents/`.

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
- [ ] `vision`, `mission` and `philosophy` rewritten

File: `src/data/leadership.js`

- [ ] Remove `isCurrent: true` from the previous cabinet
- [ ] Fill in the previous cabinet's president, photo and highlight while people still remember them
- [ ] Add a new record for your cabinet at the bottom of the list, with `isCurrent: true`

### 2. Update committee profiles

File: `src/data/committee.js`

- [ ] Every name and position updated
- [ ] Divisions added, renamed or removed to match your structure
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
- [ ] Add a photo album for each finished event

### 6. Add upcoming events

File: `src/data/events.js`

- [ ] Each planned event added with date, venue and poster
- [ ] Registration links tested

### 7. Update student resources

File: `src/data/resources.js`

- [ ] Immigration, insurance and scholarship information checked against official sources. These rules change often
- [ ] Restaurants and shops that have closed removed; new ones added
- [ ] `needsVerification: true` removed only from items you have personally checked

### 8. Verify contact information

File: `src/config/site.js`

- [ ] `contact.email` is an address the new committee can access
- [ ] If a form service is used, the new committee has the login for it
- [ ] Send a test message through the website and confirm it arrives

### 9. Test website responsiveness

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

---

## Example 2: Adding a new event

**Goal:** announce a new event.

**Step 1.** Save the poster as `public/images/events/malam-budaya-2027.jpg`.

**Step 2.** Open `src/data/events.js`. Find the line `export const events = [` and add a new block directly underneath it:

```js
export const events = [
  {
    id: 'malam-budaya-2027',
    title: 'Malam Budaya',
    date: '2027-05-22',
    time: '18:30 - 21:30',
    venue: 'Venue name, Hsinchu',
    organizer: 'PPI Hsinchu, Divisi Sosial dan Budaya',
    summary: 'An evening of Indonesian music, dance, and food.',
    description:
      'Join us for our annual culture night, with performances by students from across Hsinchu and a shared Indonesian dinner.',
    poster: '/images/events/malam-budaya-2027.jpg',
    registrationUrl: 'https://forms.gle/your-form-link',
  },
  // ...the other events stay below
```

**Step 3.** Save and check the **Events** section. If this is the nearest upcoming event, it appears as the large featured card. The homepage card updates too.

**After the event:** you do not need to move anything. Once 22 May 2027 has passed, the event appears under "Past events" automatically. To add photos, create an album in `src/data/gallery.js` with `eventId: 'malam-budaya-2027'`.

Things to notice:

- `id` is unique and has no spaces.
- The date is written year-month-day: `2027-05-22`.
- The block starts with `{` and ends with `},`.

---

## Good habits

- **Change one thing at a time**, then check the website. Mistakes are much easier to find.
- **Keep images small.** Large photos make the website slow, especially on phones. Aim for under 400 KB each.
- **Use simple file names**: lowercase, hyphens, no spaces.
- **Do not publish unverified information**, especially about immigration, insurance or scholarships. Link to the official source instead.
- **Ask permission** before publishing photos of people.
- **Save your work with Git** (or keep a dated copy of the project folder) before making big changes, so you can go back.

---

## If you get stuck

1. Read the red error message. It usually names the file and line number.
2. Undo your last change (**Ctrl + Z**) and try again more slowly.
3. Check the "Troubleshooting" section of the [README](../README.md).
4. Ask the previous committee's web maintainer, or a friend who studies computer science. The project uses very common tools (React and Vite), so many students will be able to help.
