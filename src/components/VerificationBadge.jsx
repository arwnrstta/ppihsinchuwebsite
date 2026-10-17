import { useTranslation } from 'react-i18next'
import Icon from './Icon.jsx'
import PlaceholderBadge from './PlaceholderBadge.jsx'

/*
 * VERIFICATION BADGE
 * ------------------
 * The "Needs verification" label for items with needsVerification: true in
 * the resource data files.
 *
 * Visitors do not see one label per card; the Resources section shows a
 * general "confirm with the official source" notice instead, and the
 * emergency numbers carry their own caution line while any of them is
 * unverified.
 *
 * REVIEW MODE: committee members checking content can see every label by
 * adding "?review" to the address, for example
 *     https://<website>/?review#resources
 * Nothing is saved; it only shows the labels in that browser tab.
 *
 * Like every placeholder label, these also disappear when
 * showPlaceholderLabels is false in src/config/site.js.
 */

/* True when the page was opened with "?review" in its address. */
const isReviewMode =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('review')

export default function VerificationBadge({ show, className = '' }) {
  const { t } = useTranslation()
  if (!show || !isReviewMode) return null
  return (
    <PlaceholderBadge className={`verification-badge ${className}`}>
      <Icon name="alert" size={14} />
      {t('resources.needsVerification')}
    </PlaceholderBadge>
  )
}
