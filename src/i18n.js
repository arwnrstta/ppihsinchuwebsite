import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import id from './locales/id.json'
import zhTW from './locales/zh-TW.json'

/*
 * LANGUAGES (INTERNATIONALISATION, "i18n")
 * ----------------------------------------
 * The website is available in several languages. Text comes from two places:
 *
 *   1. Interface text (menus, buttons, headings, error messages)
 *      -> the translation files in src/locales/  (en.json, id.json, zh-TW.json)
 *      Components read them with t('some.key').
 *
 *   2. Content (events, resources, cabinet vision, committee divisions...)
 *      -> the data files in src/data/ and src/config/, where a text can be
 *      written once per language:
 *          title: { en: 'Culture Night', id: 'Malam Budaya', 'zh-TW': '文化之夜' }
 *      Components read them with localize(...). See src/utils/localize.js.
 *
 * English is the fallback: if a translation is missing or left empty, the
 * English text is shown instead.
 *
 * HOW TO ADD A LANGUAGE
 *   1. Copy src/locales/en.json to a new file (for example ja.json) and
 *      translate the text on the right-hand side of each line.
 *   2. Import the file at the top of this file.
 *   3. Add it to "languages" and "resources" below.
 *   4. Optionally add the new language to the texts in the data files.
 *      Anything not translated yet appears in English.
 */

/*
 * The languages offered in the language switcher, in display order.
 *   code       - the language code, also used as the key in data files
 *   label      - the short text on the switcher button
 *   name       - the full name, read out by screen readers
 *   dateLocale - how dates are written in this language
 */
export const languages = [
  { code: 'en', label: 'EN', name: 'English', dateLocale: 'en-GB' },
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia', dateLocale: 'id-ID' },
  { code: 'zh-TW', label: '繁中', name: '繁體中文', dateLocale: 'zh-TW' },
]

export const defaultLanguage = 'en'

const resources = {
  en: { translation: en },
  id: { translation: id },
  'zh-TW': { translation: zhTW },
}

// The visitor's choice is remembered in the browser under this name.
const storageKey = 'ppi-hsinchu-language'

/* Reads the remembered language. Some browsers block storage, hence try/catch. */
function getSavedLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem(storageKey)
    const isSupported = languages.some((language) => language.code === savedLanguage)
    return isSupported ? savedLanguage : defaultLanguage
  } catch {
    return defaultLanguage
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: getSavedLanguage(),
  fallbackLng: defaultLanguage,
  // An empty translation ("") also falls back to English.
  returnEmptyString: false,
  // React already protects against unsafe text, so i18next does not need to.
  interpolation: { escapeValue: false },
})

/* Tells browsers and screen readers which language the page is in. */
function updatePageLanguage(languageCode) {
  document.documentElement.lang = languageCode
}

updatePageLanguage(i18n.language)

// Runs every time the visitor picks a language in the switcher.
i18n.on('languageChanged', (languageCode) => {
  updatePageLanguage(languageCode)
  try {
    window.localStorage.setItem(storageKey, languageCode)
  } catch {
    // Storage is unavailable (for example in private mode). The choice
    // still works for this visit; it just is not remembered.
  }
})

export default i18n
