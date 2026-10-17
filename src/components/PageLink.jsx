import { navigateTo, pagePath } from '../hooks/useCurrentPage.js'

/*
 * PAGE LINK
 * ---------
 * A link to another page of the website (such as /partners) that opens
 * without reloading. Ctrl/Cmd-click and middle-click still open the page
 * in a new tab like a normal link.
 *
 * Props:
 *   to        - the page id, e.g. 'partners' (see src/hooks/useCurrentPage.js)
 *   className - classes for the link
 */
export default function PageLink({ to, className, children, ...otherProps }) {
  function handleClick(event) {
    const opensElsewhere =
      event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    if (opensElsewhere) return
    event.preventDefault()
    navigateTo(to)
  }

  return (
    <a href={pagePath(to)} className={className} onClick={handleClick} {...otherProps}>
      {children}
    </a>
  )
}
