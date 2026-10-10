import Accordion from '../../components/Accordion.jsx'
import PlaceholderBadge from '../../components/PlaceholderBadge.jsx'
import { cabinet } from '../../config/cabinet.js'
import { assetPath } from '../../utils/assetPath.js'

/*
 * VISION, MISSION & CABINET PHILOSOPHY (About tab)
 * Three expandable cards. All wording comes from src/config/cabinet.js,
 * because it changes with each cabinet.
 */
export default function VisionMission() {
  const accordionItems = [
    {
      id: 'vision',
      number: '01',
      kicker: 'Visi',
      title: 'Vision',
      content: <p>{cabinet.vision}</p>,
    },
    {
      id: 'mission',
      number: '02',
      kicker: 'Misi',
      title: 'Mission',
      content: (
        <ol className="vision__mission-list">
          {cabinet.mission.map((missionPoint) => (
            <li key={missionPoint}>{missionPoint}</li>
          ))}
        </ol>
      ),
    },
    {
      id: 'philosophy',
      number: '03',
      kicker: 'Filosofi Kabinet',
      title: 'Cabinet Philosophy',
      tone: 'cabinet',
      content: (
        <>
          <p>{cabinet.philosophy.summary}</p>
          <dl className="vision__philosophy-points">
            {cabinet.philosophy.points.map((point) => (
              <div key={point.title}>
                <dt>{point.title}</dt>
                <dd>{point.text}</dd>
              </div>
            ))}
          </dl>
        </>
      ),
    },
  ]

  return (
    <div className="vision">
      <aside className="vision__cabinet on-dark">
        <p className="eyebrow">Current cabinet · {cabinet.period}</p>
        <h3 className="vision__cabinet-name">{cabinet.name}</h3>
        <div className="vision__cabinet-logo">
          <img
            src={assetPath(cabinet.logo)}
            alt={cabinet.logoAlt}
            loading="lazy"
            width="320"
            height="103"
          />
        </div>
        <p className="vision__cabinet-note">
          The ideas that guide this year’s work, from our long-term vision to
          the meaning behind the cabinet’s name.
        </p>
        <PlaceholderBadge>Draft copy</PlaceholderBadge>
      </aside>

      <Accordion items={accordionItems} defaultOpenId="vision" />
    </div>
  )
}
