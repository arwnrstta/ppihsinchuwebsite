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
 * ABOUT
 * -----
 * The About section is split into five tabs so visitors do not have to
 * scroll through everything. Each tab's content is its own file in
 * src/sections/about/.
 *
 * The tab names are listed in "aboutTabs" in src/data/about.js.
 * The list below connects each tab id to the file that draws its content.
 *
 * Which tab is open is stored in App.jsx (not here) so that the navbar
 * dropdown and the homepage cards can open a specific tab.
 */
const panelsByTabId = {
  'who-we-are': WhoWeAre,
  'vision-mission': VisionMission,
  'ad-art': AdArt,
  committee: Committee,
  leadership: Leadership,
}

export default function About({ activeTab, onTabChange }) {
  const currentTab = aboutTabs.find((tab) => tab.id === activeTab) ?? aboutTabs[0]
  const ActivePanel = panelsByTabId[currentTab.id]

  return (
    <section id="about" className="section section--white" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          number="01"
          label="About us"
          title="One community, many stories."
          description="Get to know PPI Hsinchu: who we are, what guides us, and the people who make it happen."
          headingId="about-title"
        />

        <div className="about__tabs">
          <Tabs
            tabs={aboutTabs}
            activeId={currentTab.id}
            onChange={onTabChange}
            label="About PPI Hsinchu"
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
          <ActivePanel />
        </div>
      </div>
    </section>
  )
}
