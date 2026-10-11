import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalize } from '../utils/localize.js'
import './CampusMap.css'

/*
 * CAMPUS MAP
 * ----------
 * An interactive map with one pin per university.
 *
 *   - Hovering a pin (or focusing it with the keyboard) shows a small box
 *     with the school's name and area.
 *   - Clicking a pin opens the school's website in a new tab.
 *   - The + and - buttons zoom; the round-arrow button returns to the
 *     starting view that shows every pin.
 *
 * The map is drawn by Leaflet (a free map library) using OpenStreetMap map
 * images. No account or API key is needed. The "© OpenStreetMap" credit in
 * the corner is required by their licence, so please keep it.
 *
 * Props:
 *   universities  - the list from src/data/universities.js
 *   highlightedId - id of the school to emphasise (set when a visitor hovers
 *                   a card in the list under the map)
 *
 * HOW IT WORKS (for developers)
 * Leaflet draws into a plain <div> and manages it by itself, outside React.
 * The first effect creates the map once. The second effect adds the pins
 * and runs again when the language changes, so the hover boxes are
 * re-written in the new language.
 */
/* The area that contains every pin, with a little space around it. */
function getBoundsOfAllPins(universities) {
  return L.latLngBounds(
    universities.map((university) => [university.latitude, university.longitude]),
  ).pad(0.12)
}

export default function CampusMap({ universities, highlightedId }) {
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()

  const containerRef = useRef(null)
  const mapRef = useRef(null)
  // The pins, stored by university id, so one can be highlighted later.
  const markersRef = useRef({})

  function showAllPins() {
    mapRef.current.fitBounds(getBoundsOfAllPins(universities))
  }

  // 1. Create the map once.
  useEffect(() => {
    const map = L.map(containerRef.current, {
      // Our own buttons are used instead of Leaflet's default ones.
      zoomControl: false,
      // Scrolling the page should not zoom the map by accident.
      scrollWheelZoom: false,
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
    }).addTo(map)

    map.fitBounds(getBoundsOfAllPins(universities))
    mapRef.current = map

    // Removes the map cleanly when the visitor leaves this tab.
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [universities])

  // 2. Add the pins. Runs again when the language changes.
  useEffect(() => {
    const map = mapRef.current
    const pinLayer = L.layerGroup().addTo(map)
    const markers = {}

    universities.forEach((university) => {
      const name = localizeText(university.name)

      const marker = L.marker([university.latitude, university.longitude], {
        // The pin is a small HTML element, styled in CampusMap.css.
        icon: L.divIcon({
          className: 'campus-map__pin',
          html: '<span></span>',
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        }),
        title: '',
        alt: name,
        keyboard: true,
      })

      // The box shown on hover.
      marker.bindTooltip(
        `<strong>${name}</strong>` +
          `<span>${localizeText(university.area)}</span>` +
          `<em>${t('about.campuses.clickToVisit')}</em>`,
        { direction: 'top', offset: [0, -12], className: 'campus-map__tooltip' },
      )

      function openWebsite() {
        window.open(university.url, '_blank', 'noopener,noreferrer')
      }
      marker.on('click', openWebsite)
      // Lets keyboard users open the website with the Enter key.
      marker.on('keypress', (event) => {
        if (event.originalEvent.key === 'Enter') openWebsite()
      })

      marker.addTo(pinLayer)
      markers[university.id] = marker
    })

    markersRef.current = markers
    return () => pinLayer.remove()
    // localizeText and t change together with i18n.language.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universities, i18n.language])

  // 3. Emphasise one pin while its card in the list is hovered.
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([universityId, marker]) => {
      const isHighlighted = universityId === highlightedId
      marker.getElement()?.classList.toggle('is-highlighted', isHighlighted)
      if (isHighlighted) marker.openTooltip()
      else marker.closeTooltip()
    })
  }, [highlightedId, i18n.language])

  return (
    <div className="campus-map">
      <div
        ref={containerRef}
        className="campus-map__canvas"
        role="region"
        aria-label={t('about.campuses.mapLabel')}
      />

      <div className="campus-map__controls">
        <button
          type="button"
          className="campus-map__control campus-map__control--red"
          onClick={() => mapRef.current.zoomIn()}
          aria-label={t('about.campuses.zoomIn')}
        >
          +
        </button>
        <button
          type="button"
          className="campus-map__control campus-map__control--dark"
          onClick={() => mapRef.current.zoomOut()}
          aria-label={t('about.campuses.zoomOut')}
        >
          −
        </button>
        <button
          type="button"
          className="campus-map__control"
          onClick={showAllPins}
          aria-label={t('about.campuses.resetView')}
        >
          ↺
        </button>
      </div>
    </div>
  )
}
