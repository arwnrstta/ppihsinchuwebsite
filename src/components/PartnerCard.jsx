import { useTranslation } from 'react-i18next'
import { assetPath } from '../utils/assetPath.js'
import { useLocalize } from '../utils/localize.js'
import { isInstagramUrl } from '../utils/partnerHelpers.js'
import Icon from './Icon.jsx'
import './PartnerCard.css'

/*
 * PARTNER CARD
 * ------------
 * One official partner on the Partners page: logo, name, description and
 * (when there is one) a link to their website or Instagram.
 *
 * Props:
 *   partner      - one item from src/data/partners.js
 *   headingLevel - 'h2' or 'h3' for the partner's name, so headings stay in
 *                  order with or without tier headings above (default 'h3')
 *
 * Logos keep their own shape: they are fitted inside the box, never
 * stretched or cropped.
 */
export default function PartnerCard({ partner, headingLevel: Heading = 'h3' }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const description = localizeText(partner.description)

  return (
    <article className="partner-card">
      <div className="partner-card__logo">
        <img
          src={assetPath(partner.logo)}
          alt={t('partners.logoAlt', { name: partner.name })}
          loading="lazy"
        />
      </div>
      <Heading className="partner-card__name">{partner.name}</Heading>
      {description && <p className="partner-card__description">{description}</p>}
      {partner.url && (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link partner-card__link"
        >
          {isInstagramUrl(partner.url) ? t('partners.visitInstagram') : t('partners.visitWebsite')}
          <Icon name="externalLink" size={16} />
          <span className="visually-hidden">{t('common.opensNewTab')}</span>
        </a>
      )}
    </article>
  )
}
