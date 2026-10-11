import { useTranslation } from 'react-i18next'
import { assetPath } from '../utils/assetPath.js'
import './CommitteeCard.css'

/*
 * COMMITTEE CARD
 * --------------
 * One portrait card: a cutout photo standing in front of a red-to-purple
 * shape, with the member's name and position at the bottom.
 *
 * Every card uses the same design. The only things that change are the
 * photo, name and position, which come from src/data/committee.js.
 *
 * Props:
 *   member    - { name, position, photo } from the data file
 *   watermark - the faint vertical word behind the portrait (division name)
 *   index     - position in the grid, used to stagger the entrance animation
 *
 * LANGUAGES
 *   - The member's name is never translated.
 *   - The position is written in Indonesian in the data file. Its English
 *     and Chinese versions come from "positions" in src/locales/. A position
 *     that is not listed there is shown exactly as written.
 *
 * If a member has no photo yet, a neutral silhouette is shown instead.
 * If a member has no name yet, "Name to be announced" is shown.
 */
export default function CommitteeCard({ member, watermark, index = 0 }) {
  const { t } = useTranslation()
  const displayName = member.name || t('about.committee.nameTba')
  // defaultValue is used when no translation exists for this position.
  const position = t(`positions.${member.position}`, { defaultValue: member.position })

  return (
    <article className="committee-card" style={{ '--card-index': index }}>
      <div className="committee-card__shape" aria-hidden="true">
        <span className="committee-card__watermark">{watermark}</span>
      </div>

      {member.photo ? (
        <img
          className="committee-card__portrait"
          src={assetPath(member.photo)}
          alt={t('about.committee.portraitAlt', { name: displayName })}
          loading="lazy"
        />
      ) : (
        <PortraitPlaceholder />
      )}

      {/* Dark gradient at the bottom so the white text is always readable. */}
      <div className="committee-card__fade" aria-hidden="true" />

      <div className="committee-card__text">
        <h4 className={`committee-card__name ${member.name ? '' : 'is-placeholder'}`}>
          {displayName}
        </h4>
        <p className="committee-card__position">{position}</p>
      </div>
    </article>
  )
}

/* A simple head-and-shoulders outline used until a real portrait is added. */
function PortraitPlaceholder() {
  return (
    <svg
      className="committee-card__portrait committee-card__portrait--placeholder"
      viewBox="0 0 200 250"
      aria-hidden="true"
    >
      <circle cx="100" cy="72" r="38" />
      <path d="M22 250v-58c0-42 34-70 78-70s78 28 78 70v58Z" />
    </svg>
  )
}
