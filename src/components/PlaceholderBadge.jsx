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
export default function PlaceholderBadge({ children = 'Sample', className = '' }) {
  if (!site.showPlaceholderLabels) return null
  return <span className={`chip chip--outline ${className}`}>{children}</span>
}
