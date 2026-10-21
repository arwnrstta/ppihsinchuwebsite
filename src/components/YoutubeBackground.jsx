import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { assetPath } from '../utils/assetPath.js'
import './YoutubeBackground.css'

/*
 * YOUTUBE BACKGROUND
 * ------------------
 * A silent, looping YouTube video used purely as a background (for example
 * behind the "Upcoming Events" card on the homepage).
 *
 * - The player is only loaded once the card scrolls into view, and it
 *   pauses while the card is off screen.
 * - It is always muted, has no controls and cannot be clicked, so clicks go
 *   to the card it sits in.
 * - A still poster is shown until the video is really playing. If the
 *   browser blocks autoplay or the video fails, the poster simply stays.
 * - Visitors who ask their device to reduce motion only see the poster.
 *
 * Props:
 *   videoId - the YouTube video ID (see getYoutubeId in src/utils/youtube.js)
 *   poster  - optional still image path; without it YouTube's own
 *             thumbnail of the video is used
 */
const playerOrigin = 'https://www.youtube-nocookie.com'
const youtubeOriginPattern = /^https:\/\/www\.youtube(-nocookie)?\.com$/
const PLAYING = 1

/* Sends a message to the YouTube player inside the iframe (if it exists yet). */
function postToPlayer(frame, videoId, message) {
  frame?.contentWindow?.postMessage(
    JSON.stringify({ ...message, id: videoId, channel: 'widget' }),
    playerOrigin,
  )
}

export default function YoutubeBackground({ videoId, poster }) {
  const wrapperRef = useRef(null)
  const frameRef = useRef(null)
  const isVisibleRef = useRef(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [posterSrc, setPosterSrc] = useState(
    poster ? assetPath(poster) : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  )
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  // Load the player when the card is first seen; play and pause with visibility.
  useEffect(() => {
    if (reduceMotion) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) setShouldLoad(true)
        postToPlayer(frameRef.current, videoId, {
          event: 'command',
          func: entry.isIntersecting ? 'playVideo' : 'pauseVideo',
          args: [],
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [reduceMotion, videoId])

  // Hide the poster only once YouTube reports that the video is playing.
  useEffect(() => {
    if (!shouldLoad) return undefined
    function handleMessage(event) {
      if (event.source !== frameRef.current?.contentWindow) return
      if (!youtubeOriginPattern.test(event.origin)) return
      let data
      try {
        data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
      } catch {
        return
      }
      const state = data?.event === 'onStateChange' ? data.info : data?.info?.playerState
      if (state === PLAYING) setIsPlaying(true)
      if (data?.event === 'onError') setIsPlaying(false)
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [shouldLoad])

  function handleFrameLoad() {
    const frame = frameRef.current
    // Ask the player to report its state changes to this page.
    postToPlayer(frame, videoId, { event: 'listening' })
    postToPlayer(frame, videoId, { event: 'command', func: 'addEventListener', args: ['onStateChange'] })
    if (!isVisibleRef.current) {
      postToPlayer(frame, videoId, { event: 'command', func: 'pauseVideo', args: [] })
    }
  }

  // YouTube answers a missing large thumbnail with a tiny grey image, so
  // fall back to the medium one (16:9, always available).
  function handlePosterLoad(event) {
    if (event.currentTarget.naturalWidth <= 120) handlePosterError()
  }

  function handlePosterError() {
    const fallback = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
    setPosterSrc((current) => (current === fallback ? '' : fallback))
  }

  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    // Looping a single video only works when it is also its own playlist.
    playlist: videoId,
    controls: '0',
    disablekb: '1',
    fs: '0',
    rel: '0',
    playsinline: '1',
    iv_load_policy: '3',
    cc_load_policy: '0',
    enablejsapi: '1',
    origin: window.location.origin,
  })

  return (
    <div
      ref={wrapperRef}
      className={`youtube-background ${isPlaying ? 'is-playing' : ''}`}
      aria-hidden="true"
    >
      {shouldLoad && (
        <iframe
          ref={frameRef}
          src={`${playerOrigin}/embed/${videoId}?${params}`}
          title="Background video"
          tabIndex={-1}
          allow="autoplay; encrypted-media; picture-in-picture"
          onLoad={handleFrameLoad}
        />
      )}
      {posterSrc && (
        <img
          className="youtube-background__poster"
          src={posterSrc}
          alt=""
          loading="lazy"
          onLoad={handlePosterLoad}
          onError={handlePosterError}
        />
      )}
    </div>
  )
}
