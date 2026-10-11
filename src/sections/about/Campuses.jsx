import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CampusMap from '../../components/CampusMap.jsx'
import Icon from '../../components/Icon.jsx'
import { universities } from '../../data/universities.js'
import { useLocalize } from '../../utils/localize.js'
import './Campuses.css'

/*
 * OUR CAMPUSES (About tab)
 * ------------------------
 * A map of the universities where our members study, with a card for each
 * school underneath.
 *
 *   - Hover a pin on the map to see the school; click it to open its website.
 *   - The cards do the same job for visitors on phones or using a keyboard,
 *     where hovering is not possible. Hovering a card also lights up its pin.
 *
 * The schools and their map positions are in src/data/universities.js.
 */
export default function Campuses() {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  // The id of the school whose card is being hovered, or null.
  const [highlightedId, setHighlightedId] = useState(null)

  return (
    <div className="campuses">
      <header className="about__panel-header">
        <div>
          <p className="eyebrow">{t('about.campuses.eyebrow')}</p>
          <h3 className="about__subheading">{t('about.campuses.heading')}</h3>
        </div>
        <p className="about__panel-intro">
          {t('about.campuses.intro', { count: universities.length })}
        </p>
      </header>

      <CampusMap universities={universities} highlightedId={highlightedId} />

      <ul className="campuses__list">
        {universities.map((university) => (
          <li key={university.id}>
            <a
              href={university.url}
              target="_blank"
              rel="noopener noreferrer"
              className="campus-card"
              onMouseEnter={() => setHighlightedId(university.id)}
              onMouseLeave={() => setHighlightedId(null)}
              onFocus={() => setHighlightedId(university.id)}
              onBlur={() => setHighlightedId(null)}
            >
              <span className="campus-card__short-name">{university.shortName}</span>
              <span className="campus-card__name">{localizeText(university.name)}</span>
              <span className="campus-card__area">
                <Icon name="mapPin" size={16} />
                {localizeText(university.area)}
              </span>
              <span className="campus-card__link">
                {t('about.campuses.visitWebsite')}
                <Icon name="externalLink" size={16} />
              </span>
              <span className="visually-hidden">{t('common.opensNewTab')}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
