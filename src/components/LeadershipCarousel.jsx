import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { assetPath } from '../utils/assetPath.js'
import { useLocalize } from '../utils/localize.js'
import Icon from './Icon.jsx'
import Modal from './Modal.jsx'
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
 * For each cabinet it shows the name, president, term and slogan (if there
 * is one), plus a "View cabinet members" button that opens a pop-up listing
 * every member by division.
 *
 * Cabinet names and people's names are shown exactly as written in the
 * data file. Slogans, division names and positions are translated when a
 * translation exists.
 *
 * Props:
 *   records - list of { year, cabinetName, president, photo, slogan,
 *             divisions, isCurrent }
 */

/*
 * Keeps only what can actually be shown: members that have a name, and
 * divisions that still have at least one such member.
 */
function getDivisionsWithNamedMembers(record) {
  return (record.divisions ?? [])
    .map((division) => ({
      ...division,
      members: division.members.filter((member) => member.name),
    }))
    .filter((division) => division.members.length > 0)
}

export default function LeadershipCarousel({ records }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const [currentIndex, setCurrentIndex] = useState(() => {
    const indexOfCurrentCabinet = records.findIndex((record) => record.isCurrent)
    return indexOfCurrentCabinet >= 0 ? indexOfCurrentCabinet : records.length - 1
  })
  const [isMemberListOpen, setIsMemberListOpen] = useState(false)

  const record = records[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === records.length - 1
  // A record with no cabinet name and no president is still a placeholder.
  const isUnverified = !record.cabinetName && !record.president
  const slogan = localizeText(record.slogan)
  const divisions = getDivisionsWithNamedMembers(record)
  const cabinetName = record.cabinetName || t('about.leadership.cabinetTba')

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
        aria-label={t('about.leadership.chooseYear')}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className="leadership__arrow"
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={isFirst}
          aria-label={t('about.leadership.previousYear')}
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
          aria-label={t('about.leadership.nextYear')}
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
              alt={t('about.leadership.photoAlt', {
                cabinet: record.cabinetName || t('about.leadership.photoAltFallback'),
                year: record.year,
              })}
              loading="lazy"
            />
          ) : (
            <div className="leadership__photo-placeholder">
              <Icon name="users" size={44} />
              <span>{t('about.leadership.photoTba')}</span>
            </div>
          )}
        </div>

        <div className="leadership__details">
          <div className="leadership__badges">
            {record.isCurrent && (
              <span className="chip chip--cabinet">
                {t('about.leadership.currentCabinet')}
              </span>
            )}
            {isUnverified && (
              <PlaceholderBadge>{t('about.leadership.toVerify')}</PlaceholderBadge>
            )}
          </div>

          <h4 className="leadership__cabinet">{cabinetName}</h4>

          {/* The slogan is shown only when the record has one. */}
          {slogan && (
            <figure className="leadership__slogan">
              <figcaption>{t('about.leadership.slogan')}</figcaption>
              <blockquote>{slogan}</blockquote>
            </figure>
          )}

          <dl className="leadership__facts">
            <div>
              <dt>{t('about.leadership.president')}</dt>
              <dd>{record.president || t('about.leadership.tba')}</dd>
            </div>
            <div>
              <dt>{t('about.leadership.term')}</dt>
              <dd>{record.year}</dd>
            </div>
          </dl>

          {divisions.length > 0 ? (
            <button
              type="button"
              className="button button--light"
              onClick={() => setIsMemberListOpen(true)}
            >
              <Icon name="users" size={18} />
              {t('about.leadership.viewMembers')}
            </button>
          ) : (
            <p className="leadership__no-members">{t('about.leadership.membersTba')}</p>
          )}
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

      {isMemberListOpen && (
        <CabinetMembers
          cabinetName={cabinetName}
          year={record.year}
          slogan={slogan}
          divisions={divisions}
          onClose={() => setIsMemberListOpen(false)}
        />
      )}
    </div>
  )
}

/*
 * The pop-up listing a cabinet's members: one block per division, and under
 * it each member's name with their position.
 */
function CabinetMembers({ cabinetName, year, slogan, divisions, onClose }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()

  return (
    <Modal onClose={onClose} label={t('about.leadership.membersOf', { cabinet: cabinetName })}>
      <div className="cabinet-members">
        <header className="cabinet-members__header">
          <p className="eyebrow eyebrow--cabinet">{year}</p>
          <h3 className="cabinet-members__title">{cabinetName}</h3>
          {slogan && <p className="cabinet-members__slogan">“{slogan}”</p>}
        </header>

        <div className="cabinet-members__divisions">
          {divisions.map((division, divisionIndex) => (
            <section key={divisionIndex} className="cabinet-members__division">
              <h4>{localizeText(division.name)}</h4>
              <ul>
                {division.members.map((member, memberIndex) => (
                  <li key={memberIndex}>
                    <span className="cabinet-members__name">{member.name}</span>
                    <span className="cabinet-members__position">
                      {/* Known positions are translated; others are shown as written. */}
                      {t(`positions.${member.position}`, {
                        defaultValue: member.position,
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Modal>
  )
}
