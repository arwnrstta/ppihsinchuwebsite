import Hero from './home/Hero.jsx'
import HomePreviews from './home/HomePreviews.jsx'
import VideoFeature from './home/VideoFeature.jsx'

/*
 * HOME
 * ----
 * The top of the website, made of three parts (each in src/sections/home/):
 *   1. Hero         - the large "PPI HSINCHU" opening
 *   2. VideoFeature - the community highlight video
 *   3. HomePreviews - four cards leading to the other sections
 */
export default function Home({ onShowAboutTab }) {
  return (
    <>
      <Hero />
      <VideoFeature />
      <HomePreviews onShowAboutTab={onShowAboutTab} />
    </>
  )
}
