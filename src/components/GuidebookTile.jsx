import { useTranslation } from 'react-i18next'
import { assetPath } from '../utils/assetPath.js'
import { useLocalize } from '../utils/localize.js'
import Icon from './Icon.jsx'
import './GuidebookTile.css'

/*
 * GUIDEBOOK TILE
 * --------------
 * The large tile at the top of the Student Resources section that opens the
 * PPI Hsinchu guidebook (an online flipbook) in a new tab.
 *
 * Everything it shows comes from "guidebook" in src/data/resources.js:
 * the title, description, link and the cover picture (thumbnail).
 *
 * The whole tile is one link, so clicking anywhere on it opens the guidebook.
 *
 * Props:
 *   guidebook - the "guidebook" object from src/data/resources.js
 */
export default function GuidebookTile({ guidebook }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()

  return (
    <a
      href={guidebook.url}
      target="_blank"
      rel="noopener noreferrer"
      className="guidebook-tile on-dark"
    >
      <span className="guidebook-tile__cover">
        <img
          src={assetPath(guidebook.thumbnail)}
          alt={localizeText(guidebook.thumbnailAlt)}
          loading="lazy"
          width="990"
          height="1400"
        />
      </span>

      <span className="guidebook-tile__body">
        <span className="guidebook-tile__labels">
          <span className="chip chip--red">{t('resources.guidebook.label')}</span>
          {guidebook.edition && (
            <span className="chip chip--outline">{localizeText(guidebook.edition)}</span>
          )}
        </span>

        {/* The guidebook's own title is not translated. */}
        <span className="guidebook-tile__title">{guidebook.title}</span>
        <span className="guidebook-tile__description">
          {localizeText(guidebook.description)}
        </span>

        <span className="button button--light guidebook-tile__button">
          {t('resources.guidebook.read')}
          <Icon name="externalLink" size={18} />
        </span>
        <span className="visually-hidden">{t('common.opensNewTab')}</span>
      </span>
    </a>
  )
}
