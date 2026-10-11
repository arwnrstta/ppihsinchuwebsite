import { useTranslation } from 'react-i18next'
import { site } from '../config/site.js'

/*
 * PLACEHOLDER BADGE
 * -----------------
 * A small label ("Sample", "Draft copy", "Needs verification"...) that marks
 * temporary content so visitors are not misled.
 *
 * All badges disappear at once when showPlaceholderLabels is set to false
 * in src/config/site.js.
 */
export default function PlaceholderBadge({ children, className = '' }) {
  const { t } = useTranslation()
  if (!site.showPlaceholderLabels) return null
  return (
    <span className={`chip chip--outline ${className}`}>
      {children ?? t('common.sample')}
    </span>
  )
}
