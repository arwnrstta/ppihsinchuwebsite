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
 */
export default function Tabs({
  tabs,
  activeId,
  onChange,
  label,
  idPrefix,
  tone = 'red',
  mobileSelect = false,
}) {
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
    document.getElementById(`${idPrefix}-tab-${nextTab.id}`)?.focus()
  }

  return (
    <div
      className={`tabs tabs--${tone} ${mobileSelect ? 'tabs--mobile-select' : ''}`}
    >
      <div
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
