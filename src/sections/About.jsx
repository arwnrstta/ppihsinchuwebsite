import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeading from '../components/SectionHeading.jsx'
import Tabs from '../components/Tabs.jsx'
import { aboutTabs } from '../data/about.js'
import AdArt from './about/AdArt.jsx'
import Committee from './about/Committee.jsx'
import Leadership from './about/Leadership.jsx'
import VisionMission from './about/VisionMission.jsx'
import WhoWeAre from './about/WhoWeAre.jsx'
import './About.css'

/*
 * The campus map uses a map library that is fairly large, so it is loaded
 * only when a visitor opens the "Our Campuses" tab ("lazy" loading).
 * This keeps the first page load fast.
 */
const Campuses = lazy(() => import('./about/Campuses.jsx'))

/*
 * ABOUT
 * -----
 * The About section is split into six tabs so visitors do not have to
 * scroll through everything. Each tab's content is its own file in
 * src/sections/about/.
 *
 * The tabs are listed in "aboutTabs" in src/data/about.js, and their names
 * are translated in src/locales/, under "about" -> "tabs".
 * The list below connects each tab id to the file that draws its content.
 *
 * Which tab is open is stored in App.jsx (not here) so that the navbar
 * dropdown and the homepage cards can open a specific tab.
 */
const panelsByTabId = {
  'who-we-are': WhoWeAre,
  campuses: Campuses,
  'vision-mission': VisionMission,
  'ad-art': AdArt,
  committee: Committee,
  leadership: Leadership,
}

export default function About({ activeTab, onTabChange }) {
  const { t } = useTranslation()
  const currentTab = aboutTabs.find((tab) => tab.id === activeTab) ?? aboutTabs[0]
  const ActivePanel = panelsByTabId[currentTab.id]

  const translatedTabs = aboutTabs.map((tab) => ({
    id: tab.id,
    label: t(`about.tabs.${tab.id}`),
  }))

  return (
    <section id="about" className="section section--white" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          number="01"
          label={t('about.label')}
          title={t('about.title')}
          description={t('about.description')}
          headingId="about-title"
        />

        <div className="about__tabs">
          <Tabs
            tabs={translatedTabs}
            activeId={currentTab.id}
            onChange={onTabChange}
            label={t('about.tabsLabel')}
            idPrefix="about"
            mobileSelect
          />
        </div>

        {/* "key" restarts the fade-in animation every time the tab changes. */}
        <div
          key={currentTab.id}
          role="tabpanel"
          id="about-panel"
          aria-labelledby={`about-tab-${currentTab.id}`}
          className="about__panel fade-up"
        >
          {/* Suspense shows nothing for the brief moment a lazy tab is loading. */}
          <Suspense fallback={null}>
            <ActivePanel />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
