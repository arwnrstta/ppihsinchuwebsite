import { gallery } from '../data/gallery.js'

/*
 * Helpers for the photos in src/data/gallery.js, shared by the Gallery
 * section, the navbar dropdown and the homepage preview card.
 */

/*
 * The years that have photos, newest first, each with only its valid
 * photos (those with a "src"). Years written twice are combined.
 */
export function getGalleryYears() {
  const byYear = new Map()
  for (const entry of gallery) {
    const year = Number(entry?.year)
    if (!Number.isInteger(year)) continue
    const photos = (entry.photos ?? []).filter((photo) => typeof photo?.src === 'string' && photo.src)
    byYear.set(year, [...(byYear.get(year) ?? []), ...photos])
  }
  return [...byYear.entries()]
    .filter(([, photos]) => photos.length > 0)
    .sort(([a], [b]) => b - a)
    .map(([year, photos]) => ({ year, photos }))
}

/* How many photos the archive holds in total. */
export function countGalleryPhotos() {
  return getGalleryYears().reduce((total, { photos }) => total + photos.length, 0)
}
