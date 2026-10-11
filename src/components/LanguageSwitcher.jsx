import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../i18n.js'
import Icon from './Icon.jsx'
import './LanguageSwitcher.css'

/*
 * LANGUAGE SWITCHER
 * -----------------
 * The language dropdown in the navbar. The button shows the current
 * language ("EN"); clicking it opens a short list of all languages.
 *
 * Choosing a language calls i18n.changeLanguage(). Every text on the page
 * then updates immediately, without reloading, so the visitor stays exactly
 * where they were. The choice is saved for their next visit (see src/i18n.js).
 *
 * The list of languages, and which one is the default (English), come from
 * src/i18n.js.
 *
 * The list closes when a language is chosen, when the visitor clicks
 * anywhere else, or when they press the Escape key.
 */
export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const switcherRef = useRef(null)

  const currentLanguage =
    languages.find((language) => language.code === i18n.language) ?? languages[0]

  // While the list is open, watch for clicks outside it and for Escape.
  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event) {
      if (!switcherRef.current.contains(event.target)) setIsOpen(false)
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function chooseLanguage(languageCode) {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div
      ref={switcherRef}
      className={`language-switcher ${isOpen ? 'is-open' : ''}`}
    >
      <button
        type="button"
        className="language-switcher__toggle"
        aria-expanded={isOpen}
        aria-controls="language-switcher-list"
        // Read out as, for example, "Language: English".
        aria-label={`${t('language.label')}: ${currentLanguage.name}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name="globe" size={18} />
        <span>{currentLanguage.label}</span>
        <span className="language-switcher__chevron">
          <Icon name="chevronDown" size={14} />
        </span>
      </button>

      <ul id="language-switcher-list" className="language-switcher__list">
        {languages.map((language) => {
          const isActive = language.code === currentLanguage.code
          return (
            <li key={language.code}>
              <button
                type="button"
                className={`language-switcher__option ${isActive ? 'is-active' : ''}`}
                // Each language's name is written in that language.
                lang={language.code}
                aria-current={isActive ? 'true' : undefined}
                // Keeps the hidden list out of the Tab key order while closed.
                tabIndex={isOpen ? 0 : -1}
                onClick={() => chooseLanguage(language.code)}
              >
                <span className="language-switcher__code">{language.label}</span>
                <span>{language.name}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
