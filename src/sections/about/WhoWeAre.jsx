import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import PlaceholderBadge from '../../components/PlaceholderBadge.jsx'
import { whoWeAre } from '../../data/about.js'
import { useAutoSlideshow } from '../../hooks/useSlideshow.js'
import { assetPath } from '../../utils/assetPath.js'
import { useLocalize } from '../../utils/localize.js'

/*
 * WHO WE ARE (About tab)
 * A short introduction with a slideshow of committee photos. Text (in all
 * languages) and photos: src/data/about.js
 */
export default function WhoWeAre() {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const photoRef = useRef(null)
  const slideshow = useAutoSlideshow(whoWeAre.photos, photoRef)

  return (
    <div className="who-we-are">
      <div className="who-we-are__text">
        <PlaceholderBadge>{t('common.draftCopy')}</PlaceholderBadge>
        <h3 className="about__subheading">{localizeText(whoWeAre.heading)}</h3>
        {whoWeAre.paragraphs.map((paragraph, index) => (
          <p key={index} className="who-we-are__paragraph">
            {localizeText(paragraph)}
          </p>
        ))}

        <ul className="who-we-are__values">
          {whoWeAre.values.map((value, index) => (
            <li key={index}>
              <span className="who-we-are__value-number">0{index + 1}</span>
              <strong>{localizeText(value.title)}</strong>
              <span>{localizeText(value.text)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The coloured blocks behind the photo are drawn in About.css. */}
      {/* The first photo sets the frame's size; the two slideshow layers
          above it fade in and out to crossfade between photos. */}
      <figure ref={photoRef} className="who-we-are__photo">
        <img
          src={assetPath(whoWeAre.photos[0])}
          alt={localizeText(whoWeAre.photoAlt)}
          loading="lazy"
          width="1200"
          height="887"
        />
        {slideshow.slides.map(
          (src, index) =>
            src && (
              <img
                key={index}
                src={src}
                alt=""
                className={`who-we-are__slide ${slideshow.front === index ? 'is-active' : ''}`}
              />
            ),
        )}
      </figure>
    </div>
  )
}
