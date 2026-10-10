import { useState } from 'react'
import Icon from './Icon.jsx'
import './Accordion.css'

/*
 * ACCORDION
 * ---------
 * A stack of expandable cards. Opening one closes the others.
 * Used for Vision, Mission and Cabinet Philosophy.
 *
 * Props:
 *   items         - list of { id, number, kicker, title, content, tone }
 *                     number  - e.g. '01'
 *                     kicker  - small text above the title (optional)
 *                     content - what appears when the card is open
 *                     tone    - 'cabinet' gives the card a purple accent
 *   defaultOpenId - id of the card that starts open
 */
export default function Accordion({ items, defaultOpenId }) {
  const [openId, setOpenId] = useState(defaultOpenId)

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = item.id === openId
        return (
          <div
            key={item.id}
            className={`accordion__item ${isOpen ? 'is-open' : ''} ${
              item.tone === 'cabinet' ? 'accordion__item--cabinet' : ''
            }`}
          >
            <h4 className="accordion__heading">
              <button
                type="button"
                id={`accordion-button-${item.id}`}
                className="accordion__button"
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                // Clicking the open card closes it again.
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="accordion__number">{item.number}</span>
                <span className="accordion__titles">
                  {item.kicker && (
                    <span className="accordion__kicker">{item.kicker}</span>
                  )}
                  <span className="accordion__title">{item.title}</span>
                </span>
                <span className="accordion__icon">
                  <Icon name="chevronDown" />
                </span>
              </button>
            </h4>

            {/* "inert" keeps hidden content away from keyboards and screen readers. */}
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-button-${item.id}`}
              className={`collapse ${isOpen ? 'is-open' : ''}`}
              inert={!isOpen}
            >
              <div className="collapse__inner">
                <div className="accordion__content">{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
