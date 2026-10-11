import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import { featuredVideo } from '../../config/site.js'
import { assetPath } from '../../utils/assetPath.js'
import './VideoFeature.css'

/*
 * VIDEO FEATURE
 * -------------
 * A large video preview on the homepage. The video ID and cover photo are
 * in "featuredVideo" in src/config/site.js. The heading and description are
 * translated in src/locales/, under "video".
 *
 * For speed, the YouTube player is NOT loaded with the page. Visitors first
 * see a cover photo with a play button. The real player loads only after
 * they press play, so nothing ever plays sound by itself.
 *
 * If no YouTube video ID has been added yet, the play button is replaced by
 * a "coming soon" note instead of a broken player.
 */
export default function VideoFeature() {
  const { t } = useTranslation()
  const [isPlaying, setIsPlaying] = useState(false)
  const { youtubeVideoId, coverImage } = featuredVideo
  const hasVideo = Boolean(youtubeVideoId)

  return (
    <section id="home-video" className="video-feature on-dark" aria-labelledby="video-title">
      <div className="container">
        <Reveal className="video-feature__heading">
          <div>
            <p className="eyebrow">{t('video.eyebrow')}</p>
            <h2 id="video-title" className="video-feature__title">
              {t('video.title')}
            </h2>
          </div>
          <p className="lead">{t('video.description')}</p>
        </Reveal>

        <Reveal className="video-feature__frame" delay={100}>
          {isPlaying ? (
            <iframe
              // youtube-nocookie.com is YouTube's privacy-friendly player.
              src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
              title={t('video.title')}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={assetPath(coverImage)}
                alt={t('video.coverAlt')}
                loading="lazy"
                width="1200"
                height="800"
              />
              {hasVideo ? (
                <button
                  type="button"
                  className="video-feature__play"
                  onClick={() => setIsPlaying(true)}
                >
                  <span className="video-feature__play-icon">
                    <Icon name="play" size={30} />
                  </span>
                  <span>{t('video.play')}</span>
                </button>
              ) : (
                <p className="video-feature__coming-soon">
                  <span className="video-feature__play-icon">
                    <Icon name="play" size={30} />
                  </span>
                  <span>{t('video.comingSoon')}</span>
                </p>
              )}
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}
