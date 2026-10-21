import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { assetPath } from '../utils/assetPath.js'

/*
 * SLIDESHOWS
 * ----------
 * Photo slideshows that slowly crossfade between photos in a random order.
 * Every photo is shown once before any photo repeats, and the same photo
 * never appears twice in a row.
 *
 * Only the NEXT photo is downloaded, shortly before it is needed, so the
 * page never loads the whole collection up front.
 *
 * Both hooks return:
 *   slides - two photo URLs; the frame stacks them above its first photo
 *   front  - which of the two is showing (0 or 1), or null for the first photo
 * Render them with fading layers, as in src/sections/home/HomePreviews.jsx.
 *
 * useHoverSlideshow - runs only while the element is hovered or focused
 * useAutoSlideshow  - runs by itself while the element is on screen
 */
const HOVER_FIRST_CHANGE_MS = 900
const CHANGE_EVERY_MS = 3500

function shuffle(items) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[other]] = [result[other], result[index]]
  }
  return result
}

/* Full, unique URLs of the photos. */
function toUrls(images) {
  return [...new Set((images ?? []).map(assetPath).filter(Boolean))]
}

/*
 * The shared engine. "initialUrl" is the photo shown before the slideshow
 * starts; it is never picked straight after itself.
 */
function useSlideshow(pool, initialUrl) {
  const [slides, setSlides] = useState(['', ''])
  const [front, setFront] = useState(null)

  const timerRef = useRef(null)
  const runRef = useRef(0)
  const queueRef = useRef([])
  const upcomingRef = useRef(null)
  const shownRef = useRef(initialUrl)
  const lastFrontRef = useRef(1)

  /* The next photo from the shuffled queue, reshuffled once it runs out. */
  const takeNext = useCallback(() => {
    if (queueRef.current.length === 0) {
      const queue = shuffle(pool)
      // Never start a new round with the photo that is on screen.
      if (queue.length > 1 && queue[0] === shownRef.current) queue.push(queue.shift())
      queueRef.current = queue
    }
    return queueRef.current.shift()
  }, [pool])

  /* Starts downloading the next photo so it is ready when its turn comes. */
  const prepareNext = useCallback(() => {
    const url = takeNext()
    const image = new Image()
    image.src = url
    const ready = image.decode()
    // Handled when the photo's turn comes; this only silences the console.
    ready.catch(() => {})
    upcomingRef.current = { url, ready }
  }, [takeNext])

  /* Starts (or resumes) changing photos; the first change after "delay" ms. */
  const start = useCallback(
    (delay) => {
      if (pool.length === 0) return
      clearTimeout(timerRef.current)
      runRef.current += 1
      const run = runRef.current
      if (!upcomingRef.current) prepareNext()

      const scheduleChange = (wait) => {
        timerRef.current = setTimeout(() => {
          const { url, ready } = upcomingRef.current
          ready.then(
            () => {
              if (run !== runRef.current) return
              const target = lastFrontRef.current === 0 ? 1 : 0
              lastFrontRef.current = target
              shownRef.current = url
              // Put the photo in the hidden layer first, then fade it in on a
              // later frame, so the browser always animates the crossfade.
              setSlides((current) =>
                current.map((slide, index) => (index === target ? url : slide)),
              )
              requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                  if (run === runRef.current) setFront(target)
                }),
              )
              prepareNext()
              scheduleChange(CHANGE_EVERY_MS)
            },
            () => {
              // A photo that fails to load is skipped.
              if (run !== runRef.current) return
              prepareNext()
              scheduleChange(CHANGE_EVERY_MS)
            },
          )
        }, wait)
      }
      scheduleChange(delay)
    },
    [pool, prepareNext],
  )

  /* Pauses on the photo that is showing. */
  const pause = useCallback(() => {
    runRef.current += 1
    clearTimeout(timerRef.current)
  }, [])

  /* Stops and fades back to the first photo. */
  const reset = useCallback(() => {
    runRef.current += 1
    clearTimeout(timerRef.current)
    shownRef.current = initialUrl
    setFront(null)
  }, [initialUrl])

  useEffect(
    () => () => {
      runRef.current += 1
      clearTimeout(timerRef.current)
    },
    [],
  )

  return { slides, front, start, pause, reset }
}

/*
 * While a card is hovered (or focused with the keyboard), its background
 * crossfades through "images"; when the pointer leaves, it fades back to
 * "defaultImage". Off on touch screens (no hover) and for visitors who ask
 * their device to reduce motion: they simply see the default photo.
 *
 * Also returns "handlers": spread these onto the card element.
 */
const hoverQuery =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export function useHoverSlideshow(images, defaultImage) {
  const defaultUrl = assetPath(defaultImage)
  // The default photo is already underneath, so it is not part of the rotation.
  const pool = useMemo(
    () => toUrls(images).filter((url) => url !== defaultUrl),
    [images, defaultUrl],
  )
  const { slides, front, start, reset } = useSlideshow(pool, defaultUrl)
  const sourcesRef = useRef(new Set())

  // Hover and keyboard focus each keep the slideshow running on their own.
  const handlers = useMemo(() => {
    const activate = (source) => {
      const wasActive = sourcesRef.current.size > 0
      sourcesRef.current.add(source)
      if (!wasActive && window.matchMedia?.(hoverQuery).matches) start(HOVER_FIRST_CHANGE_MS)
    }
    const deactivate = (source) => {
      sourcesRef.current.delete(source)
      if (sourcesRef.current.size === 0) reset()
    }
    return {
      onMouseEnter: () => activate('hover'),
      onMouseLeave: () => deactivate('hover'),
      onFocus: () => activate('focus'),
      onBlur: () => deactivate('focus'),
    }
  }, [start, reset])

  return { slides, front, handlers }
}

/*
 * Crossfades through "images" by itself, starting with the first one,
 * while the element in "elementRef" is on screen. It pauses when the
 * element scrolls out of view and resumes when it comes back. Visitors who
 * ask their device to reduce motion only see the first photo.
 */
export function useAutoSlideshow(images, elementRef) {
  const pool = useMemo(() => toUrls(images), [images])
  const { slides, front, start, pause } = useSlideshow(pool, pool[0])

  useEffect(() => {
    const element = elementRef.current
    if (!element || pool.length < 2) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start(CHANGE_EVERY_MS) : pause()),
      { threshold: 0.3 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      pause()
    }
  }, [elementRef, pool, start, pause])

  return { slides, front }
}
