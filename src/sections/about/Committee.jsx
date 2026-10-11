import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CommitteeCard from '../../components/CommitteeCard.jsx'
import CommitteeSelector from '../../components/CommitteeSelector.jsx'
import PlaceholderBadge from '../../components/PlaceholderBadge.jsx'
import { cabinet } from '../../config/cabinet.js'
import { divisions } from '../../data/committee.js'
import { useLocalize } from '../../utils/localize.js'
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
 * DIVISION NAMES IN DIFFERENT LANGUAGES
 *   Indonesian:        the official name only      "Divisi Kemahasiswaan"
 *   English / Chinese: the translated name as the  "Student Affairs"
 *                      main title, with the        "Divisi Kemahasiswaan"
 *                      official name underneath
 *
 * To change names, positions or portraits, edit src/data/committee.js.
 */
export default function Committee() {
  const { t, i18n } = useTranslation()
  const localizeText = useLocalize()
  const [activeDivisionId, setActiveDivisionId] = useState(divisions[0].id)
  const activeDivision =
    divisions.find((division) => division.id === activeDivisionId) ?? divisions[0]

  const totalMembers = divisions.reduce(
    (total, division) => total + division.members.length,
    0,
  )
  const hasPlaceholders = activeDivision.members.some(
    (member) => !member.name || !member.photo,
  )

  // Empty in Indonesian, and for a division that has no translation yet.
  const translatedName = activeDivision.translatedName?.[i18n.language] ?? ''

  return (
    <div className="committee">
      <header className="about__panel-header">
        <div>
          <p className="eyebrow eyebrow--cabinet">
            {cabinet.name} · {cabinet.period}
          </p>
          <h3 className="about__subheading">{t('about.committee.heading')}</h3>
        </div>
        <p className="about__panel-intro">
          {t('about.committee.intro', { count: totalMembers })}
        </p>
      </header>

      <CommitteeSelector
        divisions={divisions}
        activeDivisionId={activeDivision.id}
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
          {translatedName ? (
            <>
              <h4 className="committee__division-name">{translatedName}</h4>
              <p className="committee__division-official" lang="id">
                {activeDivision.name}
              </p>
            </>
          ) : (
            <h4 className="committee__division-name" lang="id">
              {activeDivision.name}
            </h4>
          )}
          <p className="committee__division-description">
            {localizeText(activeDivision.description)}
          </p>
          <p className="committee__division-meta">
            <span className="chip chip--cabinet">
              {t('about.committee.members', { count: activeDivision.members.length })}
            </span>
            {hasPlaceholders && (
              <PlaceholderBadge>{t('about.committee.placeholders')}</PlaceholderBadge>
            )}
          </p>
        </div>

        <div className="committee__grid">
          {activeDivision.members.map((member, index) => (
            <CommitteeCard
              // Members may share a position, so the list position is part of the key.
              key={`${member.position}-${index}`}
              member={member}
              // The faint word behind each portrait stays in Indonesian.
              watermark={activeDivision.shortName}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
