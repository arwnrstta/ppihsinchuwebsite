import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import { cabinet } from '../../config/cabinet.js'
import { hero } from '../../config/site.js'
import { divisions } from '../../data/committee.js'
import { events } from '../../data/events.js'
import { albums } from '../../data/gallery.js'
import { assetPath } from '../../utils/assetPath.js'
import { formatEventDate, getUpcomingEvents } from '../../utils/eventHelpers.js'
import './HomePreviews.css'

/*
 * HOME PREVIEWS
 * -------------
 * Four cards on the homepage that lead to About, Events, Our Committee and
 * the Gallery. The numbers and event name on the cards are worked out from
 * the data files, so they stay correct without editing this file.
 */
export default function HomePreviews({ onShowAboutTab }) {
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
    <section id="home-previews" className="section home-previews" aria-labelledby="previews-title">
      <div className="container">
        <Reveal className="home-previews__heading">
          <p className="eyebrow">Start here</p>
          <h2 id="previews-title">Everything PPI Hsinchu, in one place.</h2>
        </Reveal>

        <div className="home-previews__grid">
          <Reveal className="home-previews__cell home-previews__cell--wide">
            <a
              href="#about"
              className="preview-card preview-card--photo"
              onClick={(event) => openAboutTab(event, 'who-we-are')}
            >
              <img
                src={assetPath(hero.aboutCardImage)}
                alt=""
                loading="lazy"
              />
              <PreviewText
                label="About"
                title="A place to belong, wherever you’re from."
                text="Who we are, what we stand for, and how we are organised."
              />
            </a>
          </Reveal>

          <Reveal className="home-previews__cell" delay={80}>
            <a href="#events" className="preview-card preview-card--red">
              <PreviewText
                label="Upcoming events"
                title={nextEvent ? nextEvent.title : 'Good things happen together.'}
                text={
                  nextEvent
                    ? formatEventDate(nextEvent)
                    : 'New events will be announced here.'
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
                label="Our community"
                title={`Meet ${cabinet.name}.`}
                text={`${memberCount} student volunteers across ${divisions.length} teams keep this community connected.`}
              />
            </a>
          </Reveal>

          <Reveal className="home-previews__cell home-previews__cell--wide" delay={160}>
            <a href="#gallery" className="preview-card preview-card--photo">
              <img
                src={assetPath(hero.galleryCardImage)}
                alt=""
                loading="lazy"
              />
              <PreviewText
                label="Photo gallery"
                title="The moments in between."
                text={`${photoCount} photos of the faces, places, and memories that make this community ours.`}
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
