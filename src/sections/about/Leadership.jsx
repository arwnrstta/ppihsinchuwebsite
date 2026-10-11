import { useTranslation } from 'react-i18next'
import LeadershipCarousel from '../../components/LeadershipCarousel.jsx'
import { divisions as currentCommitteeDivisions } from '../../data/committee.js'
import { leadershipRecords } from '../../data/leadership.js'

/*
 * LEADERSHIP THROUGH THE YEARS (About tab)
 * A short introduction above the year carousel.
 * Records are edited in src/data/leadership.js.
 *
 * WHERE THE MEMBER LISTS COME FROM
 *   Past cabinets   - the "divisions" written in src/data/leadership.js
 *   Current cabinet - src/data/committee.js (the same list used by the
 *                     "Our Committee" tab), so it is only typed once.
 */

/*
 * Turns the committee data into the simpler shape used by the carousel:
 * a division name in each language, and members with a name and position.
 */
function getCurrentCabinetDivisions() {
  return currentCommitteeDivisions.map((division) => ({
    name: {
      en: division.translatedName?.en || division.name,
      id: division.name,
      'zh-TW': division.translatedName?.['zh-TW'] || division.name,
    },
    members: division.members.map((member) => ({
      name: member.name,
      position: member.position,
    })),
  }))
}

export default function Leadership() {
  const { t } = useTranslation()

  // The current cabinet gets its member list from committee.js, unless a
  // list has been written for it in leadership.js.
  const records = leadershipRecords.map((record) => {
    const hasOwnList = record.divisions && record.divisions.length > 0
    if (record.isCurrent && !hasOwnList) {
      return { ...record, divisions: getCurrentCabinetDivisions() }
    }
    return record
  })

  return (
    <div className="leadership-tab">
      <header className="about__panel-header">
        <div>
          <p className="eyebrow eyebrow--cabinet">{t('about.leadership.eyebrow')}</p>
          <h3 className="about__subheading">{t('about.leadership.heading')}</h3>
        </div>
        <p className="about__panel-intro">{t('about.leadership.intro')}</p>
      </header>

      <LeadershipCarousel records={records} />
    </div>
  )
}
