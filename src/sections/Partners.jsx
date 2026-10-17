import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PartnerCard from '../components/PartnerCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { site } from '../config/site.js'
import { useLocalize } from '../utils/localize.js'
import { groupPartnersByTier } from '../utils/partnerHelpers.js'
import './Partners.css'

/*
 * OUR PARTNERS PAGE (/partners)
 * -----------------------------
 * Every official partner whose partnership is currently running, grouped
 * by tier when tiers are used.
 *
 * Partners and tiers: src/data/partners.js
 * Which partners are shown: src/utils/partnerHelpers.js
 * Headings: src/locales/, under "partners"
 *
 * App.jsx only shows this page while at least one partner is active, and
 * sends visitors to the homepage otherwise.
 */
export default function Partners() {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const groups = groupPartnersByTier()
  const hasTierHeadings = groups.some((group) => group.tier)
  const pageTitle = t('partners.title')

  // Shows the page name in the browser tab, and restores it when leaving.
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${pageTitle} | ${site.name}`
    return () => {
      document.title = previousTitle
    }
  }, [pageTitle])

  if (groups.length === 0) return null

  return (
    <section id="partners" className="section partners-page" aria-labelledby="partners-title">
      <div className="container">
        <Reveal className="section-heading">
          <div className="section-heading__text">
            <p className="eyebrow">{t('partners.eyebrow')}</p>
            <h1 id="partners-title" className="partners-page__title">
              {pageTitle}
            </h1>
            <p className="lead">{t('partners.description')}</p>
          </div>
        </Reveal>

        {groups.map((group) => (
          <div key={group.tier?.id ?? 'other'} className="partners-page__group">
            {group.tier && (
              <Reveal as="h2" className="partners-page__tier">
                {localizeText(group.tier.name)}
              </Reveal>
            )}
            <ul className="partners-page__grid">
              {group.partners.map((partner, index) => (
                <Reveal as="li" key={partner.id} delay={(index % 3) * 80}>
                  <PartnerCard partner={partner} headingLevel={hasTierHeadings ? 'h3' : 'h2'} />
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
