/*
 * Finds the video ID in any normal YouTube link, so a link can be pasted
 * into a data file exactly as copied from the browser or the Share button:
 *
 *   https://www.youtube.com/watch?v=abc123XYZ00
 *   https://youtu.be/abc123XYZ00?si=...
 *   https://www.youtube.com/shorts/abc123XYZ00
 *   https://www.youtube.com/embed/abc123XYZ00
 *   https://www.youtube.com/live/abc123XYZ00
 *   abc123XYZ00            (the ID on its own also works)
 *
 * Returns '' when the text is empty or not a YouTube video link.
 */
const videoIdPattern = /^[\w-]{11}$/

export function getYoutubeId(link) {
  if (typeof link !== 'string') return ''
  const text = link.trim()
  if (videoIdPattern.test(text)) return text

  let url
  try {
    url = new URL(text)
  } catch {
    return ''
  }

  const host = url.hostname.replace(/^(www\.|m\.|music\.)/, '')
  let id = ''
  if (host === 'youtu.be') {
    id = url.pathname.split('/')[1] ?? ''
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    id =
      url.searchParams.get('v') ??
      url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/]+)/)?.[1] ??
      ''
  }
  return videoIdPattern.test(id) ? id : ''
}
