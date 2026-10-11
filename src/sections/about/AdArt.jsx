import { useTranslation } from 'react-i18next'
import Icon from '../../components/Icon.jsx'
import { adArt } from '../../config/site.js'
import { adArtIntro } from '../../data/about.js'
import { assetPath } from '../../utils/assetPath.js'
import { useLocalize } from '../../utils/localize.js'

/*
 * AD/ART (About tab)
 * Introduces the constitution and bylaws, with a button to open the PDF.
 *
 * The document's official Indonesian title is always shown as written.
 * Other languages add a small explanatory subtitle underneath.
 *
 * The button is only active once "pdfPath" is filled in under "adArt" in
 * src/config/site.js. Until then it shows a disabled "Coming soon" state,
 * so visitors never reach a broken link.
 */
export default function AdArt() {
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()
  const hasPdf = Boolean(adArt.pdfPath)
  // The title is already Indonesian, so Indonesian needs no explanation.
  const subtitle = i18n.language === 'id' ? '' : localizeText(adArtIntro.subtitle)

  return (
    <div className="ad-art">
      <div className="ad-art__document" aria-hidden="true">
        <Icon name="document" size={56} />
        <span>AD/ART</span>
      </div>

      <div className="ad-art__text">
        <div>
          <h3 className="about__subheading" lang="id">
            {adArtIntro.heading}
          </h3>
          {subtitle && <p className="ad-art__subtitle">{subtitle}</p>}
        </div>
        {adArtIntro.paragraphs.map((paragraph, index) => (
          <p key={index}>{localizeText(paragraph)}</p>
        ))}

        <div className="ad-art__actions">
          {hasPdf ? (
            <a
              href={assetPath(adArt.pdfPath)}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              {t('about.adArt.view')}
              <Icon name="externalLink" size={18} />
              <span className="visually-hidden">{t('common.opensNewTab')}</span>
            </a>
          ) : (
            <button type="button" className="button" disabled>
              {t('about.adArt.comingSoon')}
            </button>
          )}
          {adArt.lastUpdated && (
            <p className="ad-art__updated">
              {t('about.adArt.lastUpdated', { date: adArt.lastUpdated })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
