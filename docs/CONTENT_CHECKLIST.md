# Content Checklist

Everything on the website that is still a placeholder. Tick items off as official content is added, and keep this list up to date.

Tip: in VS Code, press **Ctrl + Shift + F** and search for `TODO` to find every placeholder note in the code.

## Brand and cabinet

- [DONE] Confirm the cabinet term (`period: '2026/2027'`) — `src/config/cabinet.js`
- [ ] Replace the provisional purple colours with the official cabinet colours — `src/config/cabinet.js`
- [ ] Official Vision (Visi) — `src/config/cabinet.js`
- [ ] Official Mission (Misi) — `src/config/cabinet.js`
- [ ] Official Cabinet Philosophy (Filosofi Kabinet) — `src/config/cabinet.js`

## About

- [ ] Official "Who We Are" text — `src/data/about.js`
- [ ] A real PPI Hsinchu photo for "Who We Are" (currently a stock photo) — `src/data/about.js`
- [ ] AD/ART PDF — save in `public/documents/`, then set `adArt.pdfPath` in `src/config/site.js`

## Committee (28 members) — `src/data/committee.js`

- [ ] BPH: 7 names and portraits
- [ ] Divisi Sosial dan Budaya: 4 names and portraits
- [ ] Divisi Kemahasiswaan: 5 names and portraits
- [ ] Divisi Publikasi dan Dokumentasi: 4 names and portraits
- [ ] Divisi Akademik dan Karir: 4 names and portraits
- [ ] Divisi Sponsorship: 2 names and portraits
- [ ] Penasihat Umum: 2 names and portraits
- [ ] Review the short division descriptions

## Campus map — `src/data/universities.js`

- [ ] Confirm the list of 8 schools
- [ ] Confirm each pin sits on the right campus, and which NYCU campus should be shown
- [ ] Confirm Hsing Wu (Linkou, New Taipei) and Yu Da (Miaoli) belong on the map

## Leadership Through the Years — `src/data/leadership.js`

- [ ] Current cabinet: president's name and a group photo
- [ ] Verified records for previous cabinets (year, cabinet name, president, photo, highlight)
- [ ] Remove or correct the three empty placeholder years (2023/2024 to 2025/2026)

## Home — `src/config/site.js`

- [ ] YouTube video ID for the highlight reel (`featuredVideo.youtubeVideoId`)
- [ ] Real cover photo for the video (currently a stock photo)
- [ ] Real photos for the About and Gallery cards (`hero.aboutCardImage`, `hero.galleryCardImage`)

## Events — `src/data/events.js`

- [ ] Replace the 4 sample events with real events (the sample dates are not real)
- [ ] Posters for each event — `public/images/events/`
- [ ] Registration links for upcoming events

## Student resources — `src/data/resources.js`

All items are drafts marked "Needs verification".

- [ ] Living in Hsinchu: restaurants, groceries, transport, housing, banking, local services
- [ ] Immigration & Documents: ARC renewal, visas, address changes, procedures, Indonesian representative office
- [ ] Scholarships & Academics: scholarships, university links, opportunities, careers
- [ ] Healthcare & Emergency: emergency numbers, NHI, clinics, general guidance
- [ ] Check the four external links already included (NIA, NHI, NTHU, NYCU)

## Gallery — `src/data/gallery.js`

- [ ] Replace the 7 stock photos with real PPI Hsinchu photos
- [ ] Create one album per event and link it with `eventId`
- [ ] Delete unused stock photos from `public/images/photos/`

## Connect With Us — `src/config/site.js`

- [ ] Instagram URL
- [ ] LinkedIn URL
- [ ] Facebook URL
- [ ] YouTube URL
- [ ] TikTok URL
- [ ] Official contact email (`contact.email`)
- [ ] Optional: form service endpoint (`contact.formEndpoint`)

## Translations

All Indonesian and Chinese text was drafted together with the temporary English content and has **not** been reviewed by the committee.

- [ ] A fluent Indonesian speaker has reviewed `src/locales/id.json` and the `id:` texts in the data files
- [ ] A fluent Traditional Chinese (Taiwan) speaker has reviewed `src/locales/zh-TW.json` and the `'zh-TW':` texts in the data files
- [ ] Confirm the English and Chinese names of each division (`translatedName` in `src/data/committee.js`)
- [ ] Confirm the English and Chinese position titles (`"positions"` in `src/locales/`), especially Koordinator / Ketua
- [ ] Official vision, mission and philosophy supplied in all three languages

## Before launch

- [ ] Choose a hosting service and write the steps in the README "Deployment" section
- [ ] Set `showPlaceholderLabels: false` in `src/config/site.js` once no placeholder content remains
- [ ] Confirm the hero image and all photos may be used publicly
