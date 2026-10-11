import { useTranslation } from 'react-i18next'
import { defaultLanguage } from '../i18n.js'

/*
 * MULTILINGUAL CONTENT
 * --------------------
 * In the data files, any text can be written in one of two ways:
 *
 *   1. Plain text, used as it is in every language.
 *      Use this for names that are never translated.
 *
 *        organizer: 'PPI Hsinchu',
 *
 *   2. One text per language. The keys are the language codes from
 *      src/i18n.js.
 *
 *        title: {
 *          en: 'Culture Night',
 *          id: 'Malam Budaya',
 *          'zh-TW': '文化之夜',
 *        },
 *
 * A language that is missing or left as '' falls back to English, so it is
 * fine to add the English text first and translate later.
 *
 * (The code 'zh-TW' needs quotes because it contains a hyphen.)
 */

/* Returns the text for one language, falling back to English. */
export function localize(value, languageCode) {
  if (value === null || value === undefined) return ''
  // Plain text or a number: the same in every language.
  if (typeof value !== 'object') return value
  return value[languageCode] || value[defaultLanguage] || ''
}

/*
 * For use inside components. It returns a function that picks the text for
 * the language currently selected on the website:
 *
 *   const localizeText = useLocalize()
 *   <h3>{localizeText(event.title)}</h3>
 */
export function useLocalize() {
  const { i18n } = useTranslation()
  return (value) => localize(value, i18n.language)
}
