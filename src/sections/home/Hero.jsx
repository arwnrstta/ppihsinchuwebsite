import Icon from '../../components/Icon.jsx'
import { hero, site } from '../../config/site.js'
import { assetPath } from '../../utils/assetPath.js'
import './Hero.css'

/*
 * HERO
 * ----
 * The opening screen, built from four layers:
 *   1. The organisation's full name and the giant "PPI HSINCHU" headline
 *   2. The Chinese name, split to the left and right edges
 *   3. The large Hsinchu gate image, which rises in front of the headline
 *   4. One button in the middle of the image
 * followed by the scrolling band of words.
 *
 * All text and images come from "site" and "hero" in src/config/site.js.
 */
export default function Hero() {
  const [chineseLeft, chineseRight] = site.chineseNameParts

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container">
        {/* "hero__inner" is a size container: the headline scales with its width. */}
        <div className="hero__inner">
          <p className="hero__subtitle">{site.fullName}</p>

          <h1 id="hero-title" className="hero__title">
            {hero.headline}
          </h1>

          <p className="hero__chinese" lang="zh-Hant">
            <span>{chineseLeft}</span>
            <span>{chineseRight}</span>
          </p>
        </div>
      </div>

      <div className="hero__stage">
        <img
          className="hero__image"
          src={assetPath(hero.image)}
          // Small screens load the small file; large screens load the sharp one.
          srcSet={`${assetPath(hero.image)} 1024w, ${assetPath(hero.imageLarge)} 2048w`}
          sizes="(max-width: 700px) 160vw, 100vw"
          alt={hero.imageAlt}
          width="2048"
          height="1251"
          fetchPriority="high"
        />

        <a
          href={`#${hero.primaryButton.sectionId}`}
          className="button button--primary hero__button"
        >
          {hero.primaryButton.label}
          <Icon name="arrowRight" size={20} />
        </a>
      </div>

      <Marquee words={hero.marqueeWords} />
    </section>
  )
}

/*
 * The band of words that scrolls slowly from right to left.
 * The list is repeated several times and the whole strip slides by exactly
 * half its width, which makes the loop look endless.
 */
function Marquee({ words }) {
  const repeatedWords = [...words, ...words, ...words, ...words]

  return (
    // Decorative only, so it is hidden from screen readers.
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {repeatedWords.map((word, index) => (
          <span key={index} className="marquee__word">
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}
