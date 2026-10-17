import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Events from './sections/Events.jsx'
import Gallery from './sections/Gallery.jsx'
import Home from './sections/Home.jsx'
import FeaturedPartners from './sections/home/FeaturedPartners.jsx'
import Partners from './sections/Partners.jsx'
import Resources from './sections/Resources.jsx'
import { getVisibleCategories } from './utils/resourceHelpers.js'
import { navigateTo, useCurrentPage } from './hooks/useCurrentPage.js'
import { hasActivePartners } from './utils/partnerHelpers.js'

/*
 * APP
 * ---
 * The whole website is one page made of sections stacked in this order:
 * Home, About, Events, Resources, Gallery, Connect With Us, and (only when
 * there are featured partners) Our Official Partners.
 *
 * There is one extra page, Our Partners (/partners), shown only while at
 * least one official partner is active (see src/data/partners.js). With no
 * active partners, visiting /partners redirects to the homepage.
 *
 * Most sections look after themselves. App only keeps the pieces of
 * information that connect DIFFERENT parts of the page to each other:
 *
 *   aboutTab        - which About tab is open, so the navbar dropdown or a
 *                     homepage card can jump straight to "Our Committee".
 *   resourceCategoryId - which resource category is open, so the navbar
 *                     dropdown can open one.
 *   openEventId     - which event's detail window is open.
 *   selectedYear    - which year the gallery is showing, so the navbar
 *                     dropdown can open one.
 */

function scrollToSection(sectionId) {
  // A short wait lets any open pop-up finish closing before the page moves.
  window.setTimeout(() => {
    document.getElementById(sectionId)?.scrollIntoView()
  }, 60)
}

export default function App() {
  const { t } = useTranslation()
  const [aboutTab, setAboutTab] = useState('who-we-are')
  const [resourceCategoryId, setResourceCategoryId] = useState(
    () => getVisibleCategories()[0]?.id ?? '',
  )
  const [openEventId, setOpenEventId] = useState(null)
  const [selectedYear, setSelectedYear] = useState('all')
  const currentPage = useCurrentPage()
  const partnersAvailable = hasActivePartners()
  const isPartnersPage = currentPage === 'partners' && partnersAvailable

  // /partners without any active partner: go to the homepage instead.
  useEffect(() => {
    if (currentPage === 'partners' && !partnersAvailable) {
      navigateTo('home', { replace: true })
    }
  }, [currentPage, partnersAvailable])

  // After moving between pages, start at the top, or at the section named
  // in the address (e.g. "#about" when coming back from /partners).
  // Nothing happens on the first load, so the browser keeps its own scroll
  // position when the page is refreshed.
  const shownPageRef = useRef(isPartnersPage)
  useEffect(() => {
    if (shownPageRef.current === isPartnersPage) return
    shownPageRef.current = isPartnersPage
    const sectionId = decodeURIComponent(window.location.hash.slice(1))
    const section = sectionId && document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [isPartnersPage])

  /* Scrolls to a homepage section, leaving the Partners page first if needed. */
  function goToSection(sectionId) {
    if (isPartnersPage) navigateTo('home')
    scrollToSection(sectionId)
  }

  function showAboutTab(tabId) {
    setAboutTab(tabId)
    goToSection('about')
  }

  function showGalleryYear(year) {
    setSelectedYear(year)
    goToSection('gallery')
  }

  /*
   * Called when a visitor picks an entry in a navbar dropdown.
   * Each entry has a "kind" that says what to do and a "target" that says
   * which tab, category, year or element to show.
   * The entries themselves are listed in src/components/Navbar.jsx.
   */
  function handleDropdownSelect(dropdownItem) {
    if (dropdownItem.kind === 'aboutTab') {
      showAboutTab(dropdownItem.target)
    } else if (dropdownItem.kind === 'resourceCategory') {
      setResourceCategoryId(dropdownItem.target)
      goToSection('resources')
    } else if (dropdownItem.kind === 'galleryYear') {
      showGalleryYear(dropdownItem.target)
    } else {
      goToSection(dropdownItem.target)
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('common.skipToContent')}
      </a>
      {/* A new navbar for each page, so it watches the sections of that page. */}
      <Navbar
        key={isPartnersPage ? 'partners' : 'home'}
        isHomePage={!isPartnersPage}
        onDropdownSelect={handleDropdownSelect}
      />
      {isPartnersPage ? (
        <main id="main-content">
          <Partners />
        </main>
      ) : (
        <main id="main-content">
          <Home onShowAboutTab={showAboutTab} />
          <About activeTab={aboutTab} onTabChange={setAboutTab} />
          <Events
            openEventId={openEventId}
            onOpenEvent={setOpenEventId}
            onCloseEvent={() => setOpenEventId(null)}
          />
          <Resources
            activeCategoryId={resourceCategoryId}
            onCategoryChange={setResourceCategoryId}
          />
          <Gallery selectedYear={selectedYear} onSelectYear={setSelectedYear} />
          <Contact />
          <FeaturedPartners />
        </main>
      )}
      <Footer backToTopId={isPartnersPage ? 'partners' : 'home'} />
    </>
  )
}
