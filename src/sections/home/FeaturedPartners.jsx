import { useTranslation } from 'react-i18next'
import Icon from '../../components/Icon.jsx'
import PageLink from '../../components/PageLink.jsx'
import Reveal from '../../components/Reveal.jsx'
import { assetPath } from '../../utils/assetPath.js'
import { getFeaturedPartners } from '../../utils/partnerHelpers.js'
import './FeaturedPartners.css'

/*
 * OUR OFFICIAL PARTNERS (homepage)
 * --------------------------------
 * A row of logos near the bottom of the homepage, showing the active
 * partners marked "featured: true" in src/data/partners.js. A logo links to
 * the partner's website or Instagram when one is given.
 *
 * When there are no active featured partners this section is not drawn at
 * all: no heading, no link and no empty space.
 */
export default function FeaturedPartners() {
  const { t } = useTranslation()
  const featuredPartners = getFeaturedPartners()

  if (featuredPartners.length === 0) return null

  return (
    <section
      id="official-partners"
      className="section section--white featured-partners"
      aria-labelledby="featured-partners-title"
    >
      <div className="container">
        <Reveal className="featured-partners__heading">
          <div className="featured-partners__heading-text">
            <p className="eyebrow">{t('partners.eyebrow')}</p>
            <h2 id="featured-partners-title">{t('partners.featuredTitle')}</h2>
          </div>
          <PageLink to="partners" className="text-link">
            {t('partners.viewAll')}
            <Icon name="arrowRight" size={18} />
          </PageLink>
        </Reveal>

        <ul className="featured-partners__logos">
          {featuredPartners.map((partner, index) => {
            const logo = <img src={assetPath(partner.logo)} alt={partner.name} loading="lazy" />

            return (
              <Reveal
                as="li"
                key={partner.id}
                className="featured-partners__item"
                delay={Math.min(index, 5) * 60}
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-partners__logo"
                    title={partner.name}
                  >
                    {logo}
                    <span className="visually-hidden">{t('common.opensNewTab')}</span>
                  </a>
                ) : (
                  <div className="featured-partners__logo">{logo}</div>
                )}
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
