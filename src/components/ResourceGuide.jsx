import { useTranslation } from 'react-i18next'
import { formatEventDate } from '../utils/eventHelpers.js'
import { useLocalize } from '../utils/localize.js'
import Icon from './Icon.jsx'
import './ResourceGuide.css'

/*
 * RESOURCE GUIDE
 * --------------
 * The fold-out content of a resource: what is shown when a card (or an
 * expandable section) is opened. Shared by ResourceCard.jsx and
 * ResourceSection.jsx. Every part is optional and only drawn when it exists
 * in the data (src/data/resources.js):
 *
 *   steps        - numbered steps
 *   tips         - short bullet points ("Good to know")
 *   subsections  - smaller headed blocks, each with its own text, steps,
 *                  tips and links, e.g. "University dormitories" and
 *                  "Renting off campus"
 *   links        - a list of official links, each { label, url, description }
 *   notes        - one extra remark at the end
 *   lastVerified - the date ('YYYY-MM-DD') someone last checked the
 *                  information against the official sources
 */

/* A list of official links, each opening in a new tab. */
function GuideLinks({ links, title }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  if (!links?.length) return null

  return (
    <div className="resource-guide__links">
      {title && <p className="resource-guide__label">{title}</p>}
      <ul>
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="resource-guide__link">
              <span className="resource-guide__link-label">{localizeText(link.label)}</span>
              <Icon name="externalLink" size={16} />
              <span className="visually-hidden">{t('common.opensNewTab')}</span>
            </a>
            {link.description && (
              <span className="resource-guide__link-description">{localizeText(link.description)}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Text, steps, tips and links: the same building blocks for a guide and its subsections. */
function GuideBlock({ block }) {
  const localizeText = useLocalize()
  const text = localizeText(block.text)
  const steps = block.steps ?? []
  const tips = block.tips ?? []

  return (
    <>
      {text && <p className="resource-guide__text">{text}</p>}
      {steps.length > 0 && (
        // Same numbered style as the original step guides (ResourceCard.css).
        <ol className="resource-card__steps">
          {steps.map((step, index) => (
            <li key={index}>{localizeText(step)}</li>
          ))}
        </ol>
      )}
      {tips.length > 0 && (
        <ul className="resource-guide__tips">
          {tips.map((tip, index) => (
            <li key={index}>{localizeText(tip)}</li>
          ))}
        </ul>
      )}
      <GuideLinks links={block.links} title={block.linksTitle ? localizeText(block.linksTitle) : ''} />
    </>
  )
}

export default function ResourceGuide({ item }) {
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()
  const notes = localizeText(item.notes)
  const checkedOn = item.lastVerified
    ? formatEventDate({ date: item.lastVerified }, i18n.language)
    : ''

  return (
    <div className="resource-guide">
      <GuideBlock block={{ text: item.text, steps: item.steps, tips: item.tips }} />

      {(item.subsections ?? []).map((subsection, index) => (
        <section key={index} className="resource-guide__subsection">
          <h5 className="resource-guide__subtitle">{localizeText(subsection.title)}</h5>
          <GuideBlock block={subsection} />
        </section>
      ))}

      <GuideLinks links={item.links} title={item.links?.length ? t('resources.officialLinks') : ''} />

      {notes && <p className="resource-card__notes">{notes}</p>}

      {checkedOn && (
        <p className="resource-guide__checked">
          <Icon name="check" size={14} />
          {t('resources.lastChecked', { date: checkedOn })}
        </p>
      )}
    </div>
  )
}
