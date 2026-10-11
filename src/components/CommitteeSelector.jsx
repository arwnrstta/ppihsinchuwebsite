import { useTranslation } from 'react-i18next'
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
 *
 * The buttons show the translated division name in English and Chinese,
 * and the short Indonesian name in Indonesian.
 */
export default function CommitteeSelector({ divisions, activeDivisionId, onChange }) {
  const { t, i18n } = useTranslation()

  const divisionTabs = divisions.map((division) => ({
    id: division.id,
    label: division.translatedName?.[i18n.language] || division.shortName,
  }))

  return (
    <Tabs
      tabs={divisionTabs}
      activeId={activeDivisionId}
      onChange={onChange}
      label={t('about.committee.selectorLabel')}
      idPrefix="committee"
      tone="cabinet"
      mobileSelect
    />
  )
}
