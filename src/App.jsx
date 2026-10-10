import { useState } from 'react'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Events from './sections/Events.jsx'
import Gallery from './sections/Gallery.jsx'
import Home from './sections/Home.jsx'
import Resources from './sections/Resources.jsx'
import { resourceCategories } from './data/resources.js'

/*
 * APP
 * ---
 * The whole website is one page made of sections stacked in this order:
 * Home, About, Events, Resources, Gallery, Connect With Us.
 *
 * Most sections look after themselves. App only keeps the pieces of
 * information that connect DIFFERENT parts of the page to each other:
 *
 *   aboutTab        - which About tab is open, so the navbar dropdown or a
 *                     homepage card can jump straight to "Our Committee".
 *   resourceCategoryId - which resource category is open, so the navbar
 *                     dropdown can open one.
 *   openEventId     - which event's detail window is open, so a gallery
 *                     album can open its event.
 *   selectedAlbumId - which album the gallery is showing, so an event can
 *                     jump to its photos.
 */

function scrollToSection(sectionId) {
  // A short wait lets any open pop-up finish closing before the page moves.
  window.setTimeout(() => {
    document.getElementById(sectionId)?.scrollIntoView()
  }, 60)
}

export default function App() {
  const [aboutTab, setAboutTab] = useState('who-we-are')
  const [resourceCategoryId, setResourceCategoryId] = useState(resourceCategories[0].id)
  const [openEventId, setOpenEventId] = useState(null)
  const [selectedAlbumId, setSelectedAlbumId] = useState('all')

  function showAboutTab(tabId) {
    setAboutTab(tabId)
    scrollToSection('about')
  }

  function showAlbum(albumId) {
    setOpenEventId(null)
    setSelectedAlbumId(albumId)
    scrollToSection('gallery')
  }

  /*
   * Called when a visitor picks an entry in a navbar dropdown.
   * Each entry has a "kind" that says what to do and a "target" that says
   * which tab, category, album or element to show.
   * The entries themselves are listed in src/components/Navbar.jsx.
   */
  function handleDropdownSelect(dropdownItem) {
    if (dropdownItem.kind === 'aboutTab') {
      showAboutTab(dropdownItem.target)
    } else if (dropdownItem.kind === 'resourceCategory') {
      setResourceCategoryId(dropdownItem.target)
      scrollToSection('resources')
    } else if (dropdownItem.kind === 'album') {
      showAlbum(dropdownItem.target)
    } else {
      scrollToSection(dropdownItem.target)
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar onDropdownSelect={handleDropdownSelect} />
      <main id="main-content">
        <Home onShowAboutTab={showAboutTab} />
        <About activeTab={aboutTab} onTabChange={setAboutTab} />
        <Events
          openEventId={openEventId}
          onOpenEvent={setOpenEventId}
          onCloseEvent={() => setOpenEventId(null)}
          onShowAlbum={showAlbum}
        />
        <Resources
          activeCategoryId={resourceCategoryId}
          onCategoryChange={setResourceCategoryId}
        />
        <Gallery
          selectedAlbumId={selectedAlbumId}
          onSelectAlbum={setSelectedAlbumId}
          onOpenEvent={setOpenEventId}
        />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
