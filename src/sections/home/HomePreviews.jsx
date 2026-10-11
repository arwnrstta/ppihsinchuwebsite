import { useTranslation } from 'react-i18next'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import { cabinet } from '../../config/cabinet.js'
import { hero } from '../../config/site.js'
import { divisions } from '../../data/committee.js'
import { events } from '../../data/events.js'
import { albums } from '../../data/gallery.js'
import { assetPath } from '../../utils/assetPath.js'
import { formatEventDate, getUpcomingEvents } from '../../utils/eventHelpers.js'
import { useLocalize } from '../../utils/localize.js'
import './HomePreviews.css'

/*
 * HOME PREVIEWS
 * -------------
 * Four cards on the homepage that lead to About, Events, Our Committee and
 * the Gallery. The numbers and event name on the cards are worked out from
 * the data files, so they stay correct without editing this file.
 * The fixed wording is translated in src/locales/, under "previews".
 */
export default function HomePreviews({ onShowAboutTab }) {
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()

  const nextEvent = getUpcomingEvents(events)[0]
  const memberCount = divisions.reduce(
    (total, division) => total + division.members.length,
    0,
  )
  const photoCount = albums.reduce((total, album) => total + album.photos.length, 0)

  /* Opens a specific About tab instead of only scrolling to the section. */
  function openAboutTab(event, tabId) {
    event.preventDefault()
    onShowAboutTab(tabId)
  }

  return (
    <section
      id="home-previews"
      className="section home-previews"
      aria-labelledby="previews-title"
    >
      <div className="container">
        <Reveal className="home-previews__heading">
          <p className="eyebrow">{t('previews.eyebrow')}</p>
          <h2 id="previews-title">{t('previews.title')}</h2>
        </Reveal>

        <div className="home-previews__grid">
          <Reveal className="home-previews__cell home-previews__cell--wide">
            <a
              href="#about"
              className="preview-card preview-card--photo"
              onClick={(event) => openAboutTab(event, 'who-we-are')}
            >
              <img src={assetPath(hero.aboutCardImage)} alt="" loading="lazy" />
              <PreviewText
                label={t('previews.about.label')}
                title={t('previews.about.title')}
                text={t('previews.about.text')}
              />
            </a>
          </Reveal>

          <Reveal className="home-previews__cell" delay={80}>
            <a href="#events" className="preview-card preview-card--red">
              <PreviewText
                label={t('previews.events.label')}
                title={
                  nextEvent
                    ? localizeText(nextEvent.title)
                    : t('previews.events.fallbackTitle')
                }
                text={
                  nextEvent
                    ? formatEventDate(nextEvent, i18n.language) || t('events.dateTba')
                    : t('previews.events.fallbackText')
                }
              />
            </a>
          </Reveal>

          <Reveal className="home-previews__cell" delay={80}>
            <a
              href="#about"
              className="preview-card preview-card--cabinet"
              onClick={(event) => openAboutTab(event, 'committee')}
            >
              <PreviewText
                label={t('previews.community.label')}
                title={t('previews.community.title', { cabinet: cabinet.name })}
                text={t('previews.community.text', {
                  members: memberCount,
                  teams: divisions.length,
                })}
              />
            </a>
          </Reveal>

          <Reveal className="home-previews__cell home-previews__cell--wide" delay={160}>
            <a href="#gallery" className="preview-card preview-card--photo">
              <img src={assetPath(hero.galleryCardImage)} alt="" loading="lazy" />
              <PreviewText
                label={t('previews.gallery.label')}
                title={t('previews.gallery.title')}
                text={t('previews.gallery.text', { count: photoCount })}
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* The text block shared by all four cards. */
function PreviewText({ label, title, text }) {
  return (
    <div className="preview-card__text">
      <p className="preview-card__label">{label}</p>
      <h3 className="preview-card__title">{title}</h3>
      <p className="preview-card__description">{text}</p>
      <span className="preview-card__arrow">
        <Icon name="arrowRight" size={20} />
      </span>
    </div>
  )
}
