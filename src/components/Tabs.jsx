import { useEffect, useRef } from 'react'
import './Tabs.css'

/*
 * TABS
 * ----
 * A row of buttons that switches between views. Used for the About
 * sub-sections, the committee divisions, resource categories and more.
 *
 * This component only draws the buttons. The parent decides what to show:
 *
 *   const [activeTab, setActiveTab] = useState('first')
 *   <Tabs tabs={[{ id: 'first', label: 'First' }]} activeId={activeTab}
 *         onChange={setActiveTab} label="Example" idPrefix="example" />
 *   <div role="tabpanel" id="example-panel"
 *        aria-labelledby={`example-tab-${activeTab}`}> ...content... </div>
 *
 * Props:
 *   tabs         - list of { id, label }
 *   activeId     - id of the selected tab
 *   onChange     - called with the new id when the visitor picks a tab
 *   label        - describes the group for screen readers
 *   idPrefix     - unique text used to build ids (see example above)
 *   tone         - 'red' (default) or 'cabinet' for the purple cabinet colour
 *   mobileSelect - true swaps the buttons for a dropdown on small screens,
 *                  which is easier to use when there are many long labels
 *
 * When the row is wider than the screen it scrolls sideways (by touch,
 * trackpad or mouse). Choosing a tab also scrolls the row by itself so
 * that the chosen tab AND its neighbours are fully visible, e.g. choosing
 * the second-to-last tab reveals the last one too. The first tab scrolls
 * back to the start, the last one to the end. Nothing moves when they are
 * already visible, and the page itself never scrolls up or down.
 */

// Space kept between the visible tabs and the edges of the row (pixels).
const edgePadding = 16

/*
 * Where the row should scroll to so the tab at "index" and its neighbours
 * are fully visible, or null when no scrolling is needed.
 */
function getScrollTarget(list, tabElements, index) {
  const maxScroll = list.scrollWidth - list.clientWidth
  if (maxScroll <= 0) return null

  // A tab's start and end, measured along the whole scrollable row.
  const listLeft = list.getBoundingClientRect().left
  const span = (element) => {
    const rect = element.getBoundingClientRect()
    const start = rect.left - listLeft + list.scrollLeft
    return { start, end: start + rect.width }
  }

  const active = span(tabElements[index])
  const previous = tabElements[index - 1]
  const next = tabElements[index + 1]
  // No neighbour on a side means "all the way to that end of the row".
  let regionStart = previous ? span(previous).start - edgePadding : 0
  let regionEnd = next ? span(next).end + edgePadding : list.scrollWidth

  // On narrow screens the neighbours may not fit: keep the chosen tab whole.
  if (regionEnd - regionStart > list.clientWidth) {
    regionStart = active.start - edgePadding
    regionEnd = active.end + edgePadding
  }

  const viewStart = list.scrollLeft
  const viewEnd = viewStart + list.clientWidth
  let target = viewStart
  if (regionStart < viewStart) target = regionStart
  else if (regionEnd > viewEnd) target = regionEnd - list.clientWidth

  target = Math.min(Math.max(target, 0), maxScroll)
  return Math.abs(target - viewStart) < 1 ? null : target
}

/* Scrolls the row so the selected tab and its neighbours are visible. */
function revealSelectedTab(list, { smooth }) {
  // A row hidden behind the mobile dropdown has no width: nothing to do.
  if (!list || list.clientWidth === 0) return
  const tabElements = Array.from(list.querySelectorAll('[role="tab"]'))
  const index = tabElements.findIndex((tab) => tab.getAttribute('aria-selected') === 'true')
  if (index < 0) return
  const target = getScrollTarget(list, tabElements, index)
  if (target === null) return
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  list.scrollTo({ left: target, behavior: smooth && !reduceMotion ? 'smooth' : 'auto' })
}
export default function Tabs({
  tabs,
  activeId,
  onChange,
  label,
  idPrefix,
  tone = 'red',
  mobileSelect = false,
}) {
  const listRef = useRef(null)
  const hasMountedRef = useRef(false)

  // A new selection: glide to it (jump instead on the first render).
  useEffect(() => {
    revealSelectedTab(listRef.current, { smooth: hasMountedRef.current })
    hasMountedRef.current = true
  }, [activeId])

  // The row changed size (window resized, language changed...): adjust instantly.
  useEffect(() => {
    const list = listRef.current
    if (!list || typeof ResizeObserver === 'undefined') return undefined
    let isFirstCall = true
    const observer = new ResizeObserver(() => {
      // The observer reports once straight away; the effect above handles that.
      if (isFirstCall) {
        isFirstCall = false
        return
      }
      revealSelectedTab(list, { smooth: false })
    })
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  /* Left/Right arrow keys move between tabs, as keyboard users expect. */
  function handleKeyDown(event) {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeId)
    let nextIndex

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length
    else if (event.key === 'ArrowLeft')
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = tabs.length - 1
    else return

    event.preventDefault()
    const nextTab = tabs[nextIndex]
    onChange(nextTab.id)
    // preventScroll: the row scrolls itself smoothly once the tab is selected.
    document.getElementById(`${idPrefix}-tab-${nextTab.id}`)?.focus({ preventScroll: true })
  }

  return (
    <div
      className={`tabs tabs--${tone} ${mobileSelect ? 'tabs--mobile-select' : ''}`}
    >
      <div
        ref={listRef}
        className="tabs__list"
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${tab.id}`}
              className={`tabs__tab ${isActive ? 'is-active' : ''}`}
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel`}
              // Only the selected tab is in the Tab key order.
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {mobileSelect && (
        <label className="tabs__select-wrapper">
          <span className="visually-hidden">{label}</span>
          <select
            className="select tabs__select"
            value={activeId}
            onChange={(event) => onChange(event.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  )
}
