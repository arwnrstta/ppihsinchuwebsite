import { useTranslation } from 'react-i18next'
import { socialLinks } from '../config/site.js'
import Icon from './Icon.jsx'
import './SocialLinks.css'

/*
 * SOCIAL LINKS
 * ------------
 * Shows the social media accounts listed in src/config/site.js.
 *
 * Props:
 *   variant - 'cards' (large rows, used in Connect With Us)
 *             'icons' (small round buttons, used in the footer)
 *
 * Accounts with an empty "url" are shown as "Coming soon" and are not
 * clickable, so visitors never land on a broken link.
 * Platform names (Instagram, LinkedIn...) are brand names and stay as they are.
 */
export default function SocialLinks({ variant = 'cards' }) {
  const { t } = useTranslation()

  if (variant === 'icons') {
    // The footer only shows accounts that already have a link.
    const liveLinks = socialLinks.filter((link) => link.url)
    if (liveLinks.length === 0) return null

    return (
      <ul className="social-icons">
        {liveLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icons__link"
              aria-label={`${link.label} ${t('common.opensNewTab')}`}
            >
              <Icon name={link.icon} size={18} />
            </a>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="social-cards">
      {socialLinks.map((link) => {
        const content = (
          <>
            <span className="social-cards__icon">
              <Icon name={link.icon} size={22} />
            </span>
            <span className="social-cards__text">
              <span className="social-cards__label">{link.label}</span>
              <span className="social-cards__handle">
                {link.url
                  ? link.handle || t('contact.social.followUs')
                  : t('contact.social.comingSoon')}
              </span>
            </span>
            {link.url && <Icon name="externalLink" size={18} />}
          </>
        )

        return (
          <li key={link.id}>
            {link.url ? (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-cards__item"
              >
                {content}
                <span className="visually-hidden">{t('common.opensNewTab')}</span>
              </a>
            ) : (
              <div className="social-cards__item is-unavailable">{content}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
