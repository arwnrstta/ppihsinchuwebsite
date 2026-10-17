import { useEffect, useState } from 'react'

/*
 * PAGES
 * -----
 * Almost everything lives on the one-page homepage, where the menu jumps
 * between sections with links like "#about". A few extra pages have their
 * own address instead, such as /partners. This file works out which page
 * the address points to and lets components move between pages without
 * reloading the website.
 *
 * Any address that is not listed in "pages" shows the homepage.
 */
export const pages = ['home', 'partners']

// The folder the website is hosted in ('/' normally). See vite.config.js.
const basePath = import.meta.env.BASE_URL

// Fired whenever navigateTo() changes the address.
const pageChangeEvent = 'ppi:pagechange'

/* The address of a page, e.g. 'partners' -> '/partners'. */
export function pagePath(pageId) {
  return pageId === 'home' ? basePath : `${basePath}${pageId}`
}

/* Reads the page from the current address. '/partners/' also counts. */
function readPageFromAddress() {
  const { pathname } = window.location
  const path = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : ''
  const pageId = path.replace(/\/+$/, '')
  return pages.includes(pageId) && pageId !== 'home' ? pageId : 'home'
}

/*
 * Moves to another page without reloading.
 *   hash    - optional section to jump to on that page, e.g. '#about'
 *   replace - true replaces the current history entry (used for redirects,
 *             so the Back button does not return to the redirected page)
 */
export function navigateTo(pageId, { hash = '', replace = false } = {}) {
  const url = pagePath(pageId) + hash
  if (replace) {
    window.history.replaceState(null, '', url)
  } else {
    window.history.pushState(null, '', url)
  }
  window.dispatchEvent(new Event(pageChangeEvent))
}

/*
 * For use inside components: returns the id of the page being shown and
 * updates when the visitor moves between pages (including Back/Forward).
 *
 * The menu and footer use "#section" links. On a page that does not
 * contain that section (for example "#about" on /partners), the visitor is
 * taken to the homepage at that section instead.
 */
export function useCurrentPage() {
  const [pageId, setPageId] = useState(readPageFromAddress)

  useEffect(() => {
    function handleAddressChange() {
      setPageId(readPageFromAddress())
    }

    function handleHashChange() {
      const { hash } = window.location
      const sectionId = decodeURIComponent(hash.slice(1))
      if (!sectionId || document.getElementById(sectionId)) return
      if (readPageFromAddress() !== 'home') navigateTo('home', { hash, replace: true })
    }

    window.addEventListener('popstate', handleAddressChange)
    window.addEventListener(pageChangeEvent, handleAddressChange)
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('popstate', handleAddressChange)
      window.removeEventListener(pageChangeEvent, handleAddressChange)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return pageId
}
