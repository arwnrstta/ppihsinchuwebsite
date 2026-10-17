import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cabinet } from '../config/cabinet.js'
import { navigation, site } from '../config/site.js'
import { aboutTabs } from '../data/about.js'
import { getGalleryYears } from '../utils/galleryHelpers.js'
import { getVisibleCategories } from '../utils/resourceHelpers.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { assetPath } from '../utils/assetPath.js'
import { useLocalize } from '../utils/localize.js'
import Icon from './Icon.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import './Navbar.css'

/*
 * NAVBAR
 * ------
 * The sticky menu at the top of every screen.
 * The menu items come from the "navigation" list in src/config/site.js, and
 * their text from "nav" in the translation files (src/locales/).
 *
 * - On wide screens the links sit in a row. Hovering a link (or reaching it
 *   with the Tab key) opens a dropdown listing the parts of that section.
 * - On small screens the links move into a panel opened by the menu button.
 *   Dropdowns are hidden there to keep the panel short.
 * - The link for the section currently on screen is highlighted (on the
 *   homepage only; other pages such as /partners highlight nothing).
 * - The language switcher sits on the right (inside the panel on mobile).
 */

// Created once, outside the component, so the list stays the same between renders.
const sectionIds = navigation.map((item) => item.id)

/*
 * DROPDOWN CONTENTS
 * One list per menu item, keyed by the item's id. A menu item without a
 * list here (or with only one entry) simply has no dropdown.
 *
 * Most lists are built from the data files, so a new About tab, resource
 * category or gallery year appears in the menu automatically.
 *
 * Each entry has ONE of these for its text:
 *   labelKey - the name of a text in the translation files (src/locales/)
 *   label    - text taken straight from a data file (may hold all languages)
 *
 * and says what should happen when it is clicked (handled in App.jsx):
 *   kind 'scroll'           scroll to the element whose id is "target"
 *   kind 'aboutTab'         open the About tab "target"
 *   kind 'resourceCategory' open the resource category "target"
 *   kind 'galleryYear'      show the gallery year "target" ('all' for every year)
 */
const dropdowns = {
  home: [
    { labelKey: 'nav.dropdown.welcome', kind: 'scroll', target: 'home' },
    { labelKey: 'nav.dropdown.highlight', kind: 'scroll', target: 'home-video' },
    { labelKey: 'nav.dropdown.startHere', kind: 'scroll', target: 'home-previews' },
  ],
  about: aboutTabs.map((tab) => ({
    labelKey: `about.tabs.${tab.id}`,
    kind: 'aboutTab',
    target: tab.id,
  })),
  events: [
    { labelKey: 'nav.dropdown.upcomingEvent', kind: 'scroll', target: 'events' },
    { labelKey: 'nav.dropdown.eventArchive', kind: 'scroll', target: 'events-archive' },
  ],
  // Only categories with something to show (see src/utils/resourceHelpers.js).
  resources: getVisibleCategories().map((category) => ({
    label: category.title,
    kind: 'resourceCategory',
    target: category.id,
  })),
  gallery: [
    { labelKey: 'nav.dropdown.allPhotos', kind: 'galleryYear', target: 'all' },
    ...getGalleryYears().map(({ year }) => ({
      label: String(year),
      kind: 'galleryYear',
      target: String(year),
    })),
  ],
}

export default function Navbar({ isHomePage = true, onDropdownSelect }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const sectionOnScreen = useActiveSection(sectionIds)
  const activeSectionId = isHomePage ? sectionOnScreen : null

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
            {isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          </span>
        </button>

        <nav
          id="navbar-menu"
          className={`navbar__menu ${isMenuOpen ? 'is-open' : ''}`}
          aria-label={t('nav.mainLabel')}
        >
          <ul className="navbar__links">
            {mainLinks.map((item) => {
              const itemLabel = t(`nav.${item.id}`)
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
                    {itemLabel}
                    {hasDropdown && (
                      <span className="navbar__chevron">
                        <Icon name="chevronDown" size={14} />
                      </span>
                    )}
                  </a>

                  {hasDropdown && (
                    <ul
                      className="navbar__dropdown"
                      aria-label={t('nav.sectionsOf', { section: itemLabel })}
                    >
                      {dropdownItems.map((dropdownItem) => (
                        <li key={dropdownItem.target}>
                          <a
                            href={`#${item.id}`}
                            className="navbar__dropdown-link"
                            onClick={(event) => handleDropdownClick(event, dropdownItem)}
                          >
                            {dropdownItem.labelKey
                              ? t(dropdownItem.labelKey)
                              : localizeText(dropdownItem.label)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="navbar__actions">
            <LanguageSwitcher />
            <a
              href={`#${contactLink.id}`}
              className="button button--primary navbar__cta"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(`nav.${contactLink.id}`)}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
