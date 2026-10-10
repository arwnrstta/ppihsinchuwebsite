import { useState } from 'react'
import Icon from '../../components/Icon.jsx'
import Reveal from '../../components/Reveal.jsx'
import { featuredVideo } from '../../config/site.js'
import { assetPath } from '../../utils/assetPath.js'
import './VideoFeature.css'

/*
 * VIDEO FEATURE
 * -------------
 * A large video preview on the homepage. Settings are in "featuredVideo"
 * in src/config/site.js.
 *
 * For speed, the YouTube player is NOT loaded with the page. Visitors first
 * see a cover photo with a play button. The real player loads only after
 * they press play, so nothing ever plays sound by itself.
 *
 * If no YouTube video ID has been added yet, the play button is replaced by
 * a "coming soon" note instead of a broken player.
 */
export default function VideoFeature() {
  const [isPlaying, setIsPlaying] = useState(false)
  const { youtubeVideoId, title, description, coverImage, coverAlt } = featuredVideo
  const hasVideo = Boolean(youtubeVideoId)

  return (
    <section id="home-video" className="video-feature on-dark" aria-labelledby="video-title">
      <div className="container">
        <Reveal className="video-feature__heading">
          <div>
            <p className="eyebrow">Community highlight</p>
            <h2 id="video-title" className="video-feature__title">
              {title}
            </h2>
          </div>
          <p className="lead">{description}</p>
        </Reveal>

        <Reveal className="video-feature__frame" delay={100}>
          {isPlaying ? (
            <iframe
              // youtube-nocookie.com is YouTube's privacy-friendly player.
              src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={assetPath(coverImage)}
                alt={coverAlt}
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
                  <span>Play video</span>
                </button>
              ) : (
                <p className="video-feature__coming-soon">
                  <span className="video-feature__play-icon">
                    <Icon name="play" size={30} />
                  </span>
                  <span>Highlight reel coming soon</span>
                </p>
              )}
            </>
          )}
        </Reveal>
      </div>
    </section>
  )
}
