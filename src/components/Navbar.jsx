import { useEffect, useState } from 'react'
import { cabinet } from '../config/cabinet.js'
import { navigation, site } from '../config/site.js'
import { aboutTabs } from '../data/about.js'
import { albums } from '../data/gallery.js'
import { resourceCategories } from '../data/resources.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { assetPath } from '../utils/assetPath.js'
import Icon from './Icon.jsx'
import './Navbar.css'

/*
 * NAVBAR
 * ------
 * The sticky menu at the top of every screen.
 * The menu items come from the "navigation" list in src/config/site.js.
 *
 * - On wide screens the links sit in a row. Hovering a link (or reaching it
 *   with the Tab key) opens a dropdown listing the parts of that section.
 * - On small screens the links move into a panel opened by the menu button.
 *   Dropdowns are hidden there to keep the panel short.
 * - The link for the section currently on screen is highlighted.
 */

// Created once, outside the component, so the list stays the same between renders.
const sectionIds = navigation.map((item) => item.id)

/*
 * DROPDOWN CONTENTS
 * One list per menu item, keyed by the item's id. A menu item without a
 * list here (or with only one entry) simply has no dropdown.
 *
 * Most lists are built from the data files, so a new About tab, resource
 * category or photo album appears in the menu automatically.
 *
 * Each entry has:
 *   label - the text shown
 *   kind  - what should happen when it is clicked (handled in App.jsx):
 *             'scroll'           scroll to the element whose id is "target"
 *             'aboutTab'         open the About tab "target"
 *             'resourceCategory' open the resource category "target"
 *             'album'            show the gallery album "target"
 */
const dropdowns = {
  home: [
    { label: 'Welcome', kind: 'scroll', target: 'home' },
    { label: 'Community highlight', kind: 'scroll', target: 'home-video' },
    { label: 'Start here', kind: 'scroll', target: 'home-previews' },
  ],
  about: aboutTabs.map((tab) => ({
    label: tab.label,
    kind: 'aboutTab',
    target: tab.id,
  })),
  events: [
    { label: 'Upcoming event', kind: 'scroll', target: 'events' },
    { label: 'Event archive', kind: 'scroll', target: 'events-archive' },
  ],
  resources: resourceCategories.map((category) => ({
    label: category.title,
    kind: 'resourceCategory',
    target: category.id,
  })),
  gallery: [
    { label: 'All photos', kind: 'album', target: 'all' },
    ...albums.map((album) => ({
      label: album.title,
      kind: 'album',
      target: album.id,
    })),
  ],
}

export default function Navbar({ onDropdownSelect }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const activeSectionId = useActiveSection(sectionIds)

  // Adds a background to the navbar once the visitor scrolls down a little.
  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 12)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lets keyboard users close the mobile menu with the Escape key.
  useEffect(() => {
    if (!isMenuOpen) return
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  function handleDropdownClick(event, dropdownItem) {
    event.preventDefault()
    onDropdownSelect(dropdownItem)
    // Removing focus lets the dropdown close after a choice is made.
    event.currentTarget.blur()
  }

  // The last item ("Connect With Us") is styled as a button.
  const mainLinks = navigation.slice(0, -1)
  const contactLink = navigation[navigation.length - 1]

  return (
    <header
      className={`navbar ${hasScrolled || isMenuOpen ? 'navbar--solid' : ''}`}
    >
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand" onClick={() => setIsMenuOpen(false)}>
          <img
            className="navbar__logo"
            src={assetPath(site.logo)}
            alt={`${site.name} logo`}
            width="52"
            height="44"
          />
          <img
            className="navbar__cabinet-logo"
            src={assetPath(cabinet.logo)}
            alt={cabinet.logoAlt}
            width="140"
            height="45"
          />
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} size={24} />
          <span className="visually-hidden">
            {isMenuOpen ? 'Close menu' : 'Open menu'}
          </span>
        </button>

        <nav
          id="navbar-menu"
          className={`navbar__menu ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Main"
        >
          <ul className="navbar__links">
            {mainLinks.map((item) => {
              const dropdownItems = dropdowns[item.id] ?? []
              // A dropdown is only useful when there is more than one part to choose.
              const hasDropdown = dropdownItems.length > 1

              return (
                <li key={item.id} className="navbar__item">
                  <a
                    href={`#${item.id}`}
                    className={`navbar__link ${
                      activeSectionId === item.id ? 'is-active' : ''
                    }`}
                    aria-current={activeSectionId === item.id ? 'true' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {hasDropdown && (
                      <span className="navbar__chevron">
                        <Icon name="chevronDown" size={14} />
                      </span>
                    )}
                  </a>

                  {hasDropdown && (
                    <ul className="navbar__dropdown" aria-label={`${item.label} sections`}>
                      {dropdownItems.map((dropdownItem) => (
                        <li key={dropdownItem.label}>
                          <a
                            href={`#${item.id}`}
                            className="navbar__dropdown-link"
                            onClick={(event) => handleDropdownClick(event, dropdownItem)}
                          >
                            {dropdownItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
          <a
            href={`#${contactLink.id}`}
            className="button button--primary navbar__cta"
            onClick={() => setIsMenuOpen(false)}
          >
            {contactLink.label}
          </a>
        </nav>
      </div>
    </header>
  )
}
