import { useTranslation } from 'react-i18next'
import Accordion from '../../components/Accordion.jsx'
import PlaceholderBadge from '../../components/PlaceholderBadge.jsx'
import { cabinet } from '../../config/cabinet.js'
import { assetPath } from '../../utils/assetPath.js'
import { useLocalize } from '../../utils/localize.js'

/*
 * VISION, MISSION & CABINET PHILOSOPHY (About tab)
 * Three expandable cards. The wording (in all languages) comes from
 * src/config/cabinet.js, because it changes with each cabinet.
 *
 * Each card shows the translated title with the original Indonesian term
 * ("Visi", "Misi", "Filosofi Kabinet") as a small label above it. In
 * Indonesian the two are the same, so the small label is left out.
 */
export default function VisionMission() {
  const { t } = useTranslation()
  const localizeText = useLocalize()

  /* Returns the Indonesian term, unless the title already says the same. */
  function indonesianTerm(term, title) {
    return term === title ? '' : term
  }

  const visionTitle = t('about.vision.visionTitle')
  const missionTitle = t('about.vision.missionTitle')
  const philosophyTitle = t('about.vision.philosophyTitle')

  const accordionItems = [
    {
      id: 'vision',
      number: '01',
      kicker: indonesianTerm('Visi', visionTitle),
      title: visionTitle,
      content: <p>{localizeText(cabinet.vision)}</p>,
    },
    {
      id: 'mission',
      number: '02',
      kicker: indonesianTerm('Misi', missionTitle),
      title: missionTitle,
      content: (
        <ol className="vision__mission-list">
          {cabinet.mission.map((missionPoint, index) => (
            <li key={index}>{localizeText(missionPoint)}</li>
          ))}
        </ol>
      ),
    },
    {
      id: 'philosophy',
      number: '03',
      kicker: indonesianTerm('Filosofi Kabinet', philosophyTitle),
      title: philosophyTitle,
      tone: 'cabinet',
      content: (
        <>
          <p>{localizeText(cabinet.philosophy.summary)}</p>
          <dl className="vision__philosophy-points">
            {cabinet.philosophy.points.map((point) => (
              <div key={point.title}>
                <dt>{point.title}</dt>
                <dd>{localizeText(point.text)}</dd>
              </div>
            ))}
          </dl>
        </>
      ),
    },
  ]

  return (
    <div className="vision">
      <aside className="vision__cabinet on-dark">
        <p className="eyebrow">
          {t('about.vision.currentCabinet')} · {cabinet.period}
        </p>
        <h3 className="vision__cabinet-name">{cabinet.name}</h3>
        <div className="vision__cabinet-logo">
          <img
            src={assetPath(cabinet.logo)}
            alt={cabinet.logoAlt}
            loading="lazy"
            width="320"
            height="103"
          />
        </div>
        <p className="vision__cabinet-note">{t('about.vision.note')}</p>
        <PlaceholderBadge>{t('common.draftCopy')}</PlaceholderBadge>
      </aside>

      <Accordion items={accordionItems} defaultOpenId="vision" />
    </div>
  )
}
