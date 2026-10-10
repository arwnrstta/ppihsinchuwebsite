import Tabs from './Tabs.jsx'

/*
 * COMMITTEE SELECTOR
 * ------------------
 * The row of division names above the committee portraits.
 * It is the shared Tabs component, set up for the committee:
 *   - purple cabinet colour
 *   - a scrollable row of buttons on desktop
 *   - a dropdown on mobile, because the division names are long
 *
 * Props:
 *   divisions        - the list from src/data/committee.js
 *   activeDivisionId - id of the division being shown
 *   onChange         - called with the new division id
 */
export default function CommitteeSelector({ divisions, activeDivisionId, onChange }) {
  const divisionTabs = divisions.map((division) => ({
    id: division.id,
    label: division.shortName,
  }))

  return (
    <Tabs
      tabs={divisionTabs}
      activeId={activeDivisionId}
      onChange={onChange}
      label="Committee divisions"
      idPrefix="committee"
      tone="cabinet"
      mobileSelect
    />
  )
}
