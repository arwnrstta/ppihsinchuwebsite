import { useState } from 'react'
import { assetPath } from '../utils/assetPath.js'
import Icon from './Icon.jsx'
import PlaceholderBadge from './PlaceholderBadge.jsx'
import './LeadershipCarousel.css'

/*
 * LEADERSHIP CAROUSEL
 * -------------------
 * Steps through past administrations one year at a time:
 *
 *        [<]   2026/2027   [>]
 *
 * How it works:
 *   - "records" is the list from src/data/leadership.js, oldest first.
 *   - "currentIndex" is the position in that list being shown.
 *   - The arrows add or subtract 1. The year buttons underneath jump
 *     straight to a year.
 *   - It opens on the record marked isCurrent: true (or the newest one).
 *
 * Props:
 *   records - list of { year, cabinetName, president, photo, highlight, isCurrent }
 */
export default function LeadershipCarousel({ records }) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const indexOfCurrentCabinet = records.findIndex((record) => record.isCurrent)
    return indexOfCurrentCabinet >= 0 ? indexOfCurrentCabinet : records.length - 1
  })

  const record = records[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === records.length - 1
  // A record with no cabinet name and no president is still a placeholder.
  const isUnverified = !record.cabinetName && !record.president

  /* Left/Right arrow keys also change the year while the controls have focus. */
  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft' && !isFirst) setCurrentIndex(currentIndex - 1)
    if (event.key === 'ArrowRight' && !isLast) setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="leadership on-dark">
      <div
        className="leadership__controls"
        role="group"
        aria-label="Choose a year"
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className="leadership__arrow"
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={isFirst}
          aria-label="Previous year"
        >
          <Icon name="arrowLeft" size={22} />
        </button>

        {/* aria-live makes screen readers announce the year when it changes. */}
        <p className="leadership__year" aria-live="polite">
          {record.year}
        </p>

        <button
          type="button"
          className="leadership__arrow"
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={isLast}
          aria-label="Next year"
        >
          <Icon name="arrowRight" size={22} />
        </button>
      </div>

      {/* "key" replays the fade animation each time the year changes. */}
      <div key={record.year} className="leadership__slide fade-up">
        <div className="leadership__photo">
          {record.photo ? (
            <img
              src={assetPath(record.photo)}
              alt={`${record.cabinetName || 'PPI Hsinchu leadership'}, ${record.year}`}
              loading="lazy"
            />
          ) : (
            <div className="leadership__photo-placeholder">
              <Icon name="users" size={44} />
              <span>Photo to be added</span>
            </div>
          )}
        </div>

        <div className="leadership__details">
          <div className="leadership__badges">
            {record.isCurrent && <span className="chip chip--cabinet">Current cabinet</span>}
            {isUnverified && <PlaceholderBadge>Record to be verified</PlaceholderBadge>}
          </div>

          <h4 className="leadership__cabinet">
            {record.cabinetName || 'Cabinet name to be added'}
          </h4>

          <dl className="leadership__facts">
            <div>
              <dt>President (Ketua)</dt>
              <dd>{record.president || 'To be added'}</dd>
            </div>
            <div>
              <dt>Term</dt>
              <dd>{record.year}</dd>
            </div>
          </dl>

          <p className="leadership__highlight">
            {record.highlight ||
              'Highlights from this administration will be added once the historical record has been confirmed.'}
          </p>
        </div>
      </div>

      <ol className="leadership__timeline">
        {records.map((timelineRecord, index) => (
          <li key={timelineRecord.year}>
            <button
              type="button"
              className={`leadership__timeline-button ${
                index === currentIndex ? 'is-active' : ''
              }`}
              aria-current={index === currentIndex ? 'true' : undefined}
              onClick={() => setCurrentIndex(index)}
            >
              {timelineRecord.year}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
