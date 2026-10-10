import PlaceholderBadge from '../../components/PlaceholderBadge.jsx'
import { whoWeAre } from '../../data/about.js'
import { assetPath } from '../../utils/assetPath.js'

/*
 * WHO WE ARE (About tab)
 * A short introduction with a photo. Text and photo: src/data/about.js
 */
export default function WhoWeAre() {
  return (
    <div className="who-we-are">
      <div className="who-we-are__text">
        <PlaceholderBadge>Draft copy</PlaceholderBadge>
        <h3 className="about__subheading">{whoWeAre.heading}</h3>
        {whoWeAre.paragraphs.map((paragraph) => (
          <p key={paragraph} className="who-we-are__paragraph">
            {paragraph}
          </p>
        ))}

        <ul className="who-we-are__values">
          {whoWeAre.values.map((value, index) => (
            <li key={value.title}>
              <span className="who-we-are__value-number">0{index + 1}</span>
              <strong>{value.title}</strong>
              <span>{value.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The coloured blocks behind the photo are drawn in About.css. */}
      <figure className="who-we-are__photo">
        <img
          src={assetPath(whoWeAre.photo)}
          alt={whoWeAre.photoAlt}
          loading="lazy"
          width="1200"
          height="887"
        />
      </figure>
    </div>
  )
}
