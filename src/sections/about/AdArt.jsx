import Icon from '../../components/Icon.jsx'
import { adArt } from '../../config/site.js'
import { adArtIntro } from '../../data/about.js'
import { assetPath } from '../../utils/assetPath.js'

/*
 * AD/ART (About tab)
 * Introduces the constitution and bylaws, with a button to open the PDF.
 *
 * The button is only active once "pdfPath" is filled in under "adArt" in
 * src/config/site.js. Until then it shows a disabled "Coming soon" state,
 * so visitors never reach a broken link.
 */
export default function AdArt() {
  const hasPdf = Boolean(adArt.pdfPath)

  return (
    <div className="ad-art">
      <div className="ad-art__document" aria-hidden="true">
        <Icon name="document" size={56} />
        <span>AD/ART</span>
      </div>

      <div className="ad-art__text">
        <h3 className="about__subheading">{adArtIntro.heading}</h3>
        {adArtIntro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="ad-art__actions">
          {hasPdf ? (
            <a
              href={assetPath(adArt.pdfPath)}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              View AD/ART (PDF)
              <Icon name="externalLink" size={18} />
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          ) : (
            <button type="button" className="button" disabled>
              AD/ART PDF · Coming soon
            </button>
          )}
          {adArt.lastUpdated && (
            <p className="ad-art__updated">Last updated: {adArt.lastUpdated}</p>
          )}
        </div>
      </div>
    </div>
  )
}
