import { cabinet } from '../config/cabinet.js'
import { navigation, site } from '../config/site.js'
import { assetPath } from '../utils/assetPath.js'
import SocialLinks from './SocialLinks.jsx'
import './Footer.css'

/*
 * FOOTER
 * ------
 * Branding, quick links, social media and the copyright line.
 * Text comes from src/config/site.js and src/config/cabinet.js.
 * The copyright year updates by itself.
 */
export default function Footer() {
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
                <p className="footer__full-name">{site.fullName}</p>
              </div>
            </div>
            <p className="footer__message">{site.footerMessage}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer__heading">Explore</h2>
            <ul className="footer__links">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">Current cabinet</h2>
            <p className="footer__cabinet">{cabinet.name}</p>
            <p className="footer__period">{cabinet.period}</p>
            <SocialLinks variant="icons" />
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {currentYear} {site.name} · {cabinet.name}
          </p>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
