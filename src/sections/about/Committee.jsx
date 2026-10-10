import { useState } from 'react'
import CommitteeCard from '../../components/CommitteeCard.jsx'
import CommitteeSelector from '../../components/CommitteeSelector.jsx'
import PlaceholderBadge from '../../components/PlaceholderBadge.jsx'
import { cabinet } from '../../config/cabinet.js'
import { divisions } from '../../data/committee.js'
import './Committee.css'

/*
 * OUR COMMITTEE (About tab)
 * -------------------------
 * Shows ONE division at a time instead of all members in a long list.
 *
 * How it works:
 *   1. "activeDivisionId" remembers which division is selected.
 *      It starts as the first division in src/data/committee.js (the BPH).
 *   2. CommitteeSelector shows the division names. Picking one updates
 *      activeDivisionId.
 *   3. Only the members of that division are drawn, one CommitteeCard each.
 *
 * To change names, positions or portraits, edit src/data/committee.js.
 */
export default function Committee() {
  const [activeDivisionId, setActiveDivisionId] = useState(divisions[0].id)
  const activeDivision = divisions.find((division) => division.id === activeDivisionId)

  const totalMembers = divisions.reduce(
    (total, division) => total + division.members.length,
    0,
  )
  const hasPlaceholders = activeDivision.members.some(
    (member) => !member.name || !member.photo,
  )

  return (
    <div className="committee">
      <header className="about__panel-header">
        <div>
          <p className="eyebrow eyebrow--cabinet">
            {cabinet.name} · {cabinet.period}
          </p>
          <h3 className="about__subheading">Made possible by people who care.</h3>
        </div>
        <p className="about__panel-intro">
          Meet the {totalMembers} student volunteers who keep our community
          connected. Choose a division to see its team.
        </p>
      </header>

      <CommitteeSelector
        divisions={divisions}
        activeDivisionId={activeDivisionId}
        onChange={setActiveDivisionId}
      />

      {/* "key" restarts the card animations whenever the division changes. */}
      <div
        key={activeDivision.id}
        role="tabpanel"
        id="committee-panel"
        aria-labelledby={`committee-tab-${activeDivision.id}`}
        className="committee__panel"
      >
        <div className="committee__division fade-up">
          <h4 className="committee__division-name">{activeDivision.name}</h4>
          <p className="committee__division-description">
            {activeDivision.description}
          </p>
          <p className="committee__division-meta">
            <span className="chip chip--cabinet">
              {activeDivision.members.length}{' '}
              {activeDivision.members.length === 1 ? 'member' : 'members'}
            </span>
            {hasPlaceholders && (
              <PlaceholderBadge>Names and portraits coming soon</PlaceholderBadge>
            )}
          </p>
        </div>

        <div className="committee__grid">
          {activeDivision.members.map((member, index) => (
            <CommitteeCard
              // Members may share a position, so the list position is part of the key.
              key={`${member.position}-${index}`}
              member={member}
              watermark={activeDivision.shortName}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
