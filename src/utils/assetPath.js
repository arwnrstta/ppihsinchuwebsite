/*
 * Turns a path from a data file (such as "/images/events/poster.jpg") into a
 * URL that works wherever the site is hosted.
 *
 * Why this exists: if the site is ever hosted in a sub-folder (for example
 * https://username.github.io/ppihsinchuwebsite/), a path starting with "/"
 * would point to the wrong place. Vite provides the correct starting folder
 * as import.meta.env.BASE_URL, so we add it to the front of every path.
 */
export function assetPath(path) {
  if (!path) return ''
  const isExternal = /^https?:\/\//.test(path)
  if (isExternal) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
