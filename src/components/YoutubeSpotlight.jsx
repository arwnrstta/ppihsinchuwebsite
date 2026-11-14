import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { socialLinks, youtubeSpotlight } from '../config/site.js'
import { useLocalize } from '../utils/localize.js'
import { getYoutubeId } from '../utils/youtube.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import './YoutubeSpotlight.css'

/*
 * YOUTUBE SPOTLIGHT
 * -----------------
 * A video or live stream from the PPI Hsinchu YouTube channel, shown in the
 * Events section under the next event. Everything it shows is set in
 * "youtubeSpotlight" in src/config/site.js; with no videoUrl it is hidden.
 *
 * Like the homepage video, the YouTube player is NOT loaded with the page.
 * Visitors see the video's thumbnail with a play button, and the player
 * loads only after they press it.
 */
const statusLabels = {
  live: 'events.youtube.live',
  upcoming: 'events.youtube.upcoming',
  video: 'events.youtube.video',
}

export default function YoutubeSpotlight() {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const [isPlaying, setIsPlaying] = useState(false)
  const { videoUrl, status, title, description } = youtubeSpotlight
  const videoId = getYoutubeId(videoUrl)
  // YouTube's large thumbnail, or the smaller one that every video has.
  const [thumbnail, setThumbnail] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`)

  if (!videoId) return null

  const isLive = status === 'live'
  const heading = localizeText(title) || t('events.youtube.fallbackTitle')
  const channelUrl = socialLinks.find((link) => link.id === 'youtube')?.url

  return (
    <Reveal as="article" className="youtube-spotlight" aria-labelledby="youtube-spotlight-title">
      <div className="youtube-spotlight__frame">
        {isPlaying ? (
          <iframe
            // youtube-nocookie.com is YouTube's privacy-friendly player.
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={heading}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={thumbnail}
              alt=""
              loading="lazy"
              width="1280"
              height="720"
              onError={() => setThumbnail(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)}
            />
            <button
              type="button"
              className="youtube-spotlight__play"
              onClick={() => setIsPlaying(true)}
            >
              <span className="youtube-spotlight__play-icon">
                <Icon name="play" size={26} />
              </span>
              <span className="visually-hidden">
                {isLive ? t('events.youtube.watchLive') : t('events.youtube.play')}: {heading}
              </span>
            </button>
          </>
        )}
      </div>

      <div className="youtube-spotlight__body">
        <span className={`chip ${isLive ? 'chip--red youtube-spotlight__live' : 'chip--outline'}`}>
          {isLive ? <span className="youtube-spotlight__dot" aria-hidden="true" /> : <Icon name="youtube" size={14} />}
          {t(statusLabels[status] ?? statusLabels.video)}
        </span>

        <h3 id="youtube-spotlight-title" className="youtube-spotlight__title">
          {heading}
        </h3>
        {localizeText(description) && (
          <p className="youtube-spotlight__description">{localizeText(description)}</p>
        )}

        <div className="youtube-spotlight__actions">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary"
          >
            {isLive ? t('events.youtube.watchLive') : t('events.youtube.watchOnYoutube')}
            <Icon name="externalLink" size={18} />
            <span className="visually-hidden">{t('common.opensNewTab')}</span>
          </a>
          {channelUrl && (
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline"
            >
              <Icon name="youtube" size={18} />
              {t('events.youtube.visitChannel')}
              <span className="visually-hidden">{t('common.opensNewTab')}</span>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}
