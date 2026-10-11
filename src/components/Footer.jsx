import { useTranslation } from 'react-i18next'
import { cabinet } from '../config/cabinet.js'
import { navigation, site } from '../config/site.js'
import { assetPath } from '../utils/assetPath.js'
import SocialLinks from './SocialLinks.jsx'
import './Footer.css'

/*
 * FOOTER
 * ------
 * Branding, quick links, social media and the copyright line.
 * Names come from src/config/site.js and src/config/cabinet.js (never
 * translated). The other wording is in src/locales/, under "footer".
 * The copyright year updates by itself.
 */
export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer on-dark">
      <div className="container">
        <p className="footer__wordmark" aria-hidden="true">
          {site.name}
        </p>

        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={assetPath(site.logo)} alt="" width="56" height="48" />
              <div>
                <p className="footer__name">{site.name}</p>
                <p className="footer__full-name" lang="id">
                  {site.fullName}
                </p>
              </div>
            </div>
            <p className="footer__message">{t('footer.message')}</p>
          </div>

          <nav aria-label={t('footer.navLabel')}>
            <h2 className="footer__heading">{t('footer.explore')}</h2>
            <ul className="footer__links">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{t(`nav.${item.id}`)}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">{t('footer.currentCabinet')}</h2>
            <p className="footer__cabinet">{cabinet.name}</p>
            <p className="footer__period">{cabinet.period}</p>
            <SocialLinks variant="icons" />
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {currentYear} {site.name} · {cabinet.name}
          </p>
          <a href="#home">{t('footer.backToTop')} ↑</a>
        </div>
      </div>
    </footer>
  )
}
