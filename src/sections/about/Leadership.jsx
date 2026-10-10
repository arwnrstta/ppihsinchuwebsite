import LeadershipCarousel from '../../components/LeadershipCarousel.jsx'
import { leadershipRecords } from '../../data/leadership.js'

/*
 * LEADERSHIP THROUGH THE YEARS (About tab)
 * A short introduction above the year carousel.
 * Records are edited in src/data/leadership.js.
 */
export default function Leadership() {
  return (
    <div className="leadership-tab">
      <header className="about__panel-header">
        <div>
          <p className="eyebrow eyebrow--cabinet">Our history</p>
          <h3 className="about__subheading">Every cabinet leaves its mark.</h3>
        </div>
        <p className="about__panel-intro">
          PPI Hsinchu is passed from one generation of students to the next.
          Step through the years to meet the cabinets that shaped it.
        </p>
      </header>

      <LeadershipCarousel records={leadershipRecords} />
    </div>
  )
}
