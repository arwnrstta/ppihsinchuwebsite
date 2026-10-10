import Reveal from './Reveal.jsx'
import './SectionHeading.css'

/*
 * SECTION HEADING
 * ---------------
 * The standard heading block at the top of each section:
 * a small numbered label, a large title, and an optional introduction.
 *
 * Props:
 *   number      - e.g. '02'
 *   label       - e.g. 'Events'  (shown as "02 / EVENTS")
 *   title       - the large heading
 *   description - optional paragraph under the title
 *   headingId   - id for the <h2>, used to label the section for screen readers
 *   children    - optional extra content placed on the right (e.g. a button)
 */
export default function SectionHeading({
  number,
  label,
  title,
  description,
  headingId,
  children,
}) {
  return (
    <Reveal className="section-heading">
      <div className="section-heading__text">
        <p className="eyebrow">
          {number} / {label}
        </p>
        <h2 id={headingId} className="section-heading__title">
          {title}
        </h2>
        {description && <p className="lead">{description}</p>}
      </div>
      {children && <div className="section-heading__aside">{children}</div>}
    </Reveal>
  )
}
