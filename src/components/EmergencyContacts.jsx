import { useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalize } from '../utils/localize.js'
import Icon from './Icon.jsx'
import VerificationBadge from './VerificationBadge.jsx'
import './EmergencyContacts.css'

/*
 * EMERGENCY CONTACTS
 * ------------------
 * The emergency block at the top of a Resources category, built from the
 * items with type: 'emergency' in src/data/resources.js:
 *
 *   - Items with primary: true (police, fire and ambulance) are drawn as
 *     large cards side by side: big number, Call Now, a small copy button.
 *   - Every other hotline is drawn as a compact row underneath. Rows with
 *     lineType: 'information' or 'support' get a label saying so, making
 *     clear they are not emergency services.
 *
 * Props:
 *   contacts - the emergency cards from src/utils/resourceHelpers.js. Each
 *              one is guaranteed to have a valid phone number.
 *
 * Deliberately plain: no fold-outs and no hover motion, so a number can be
 * found and called as quickly as possible.
 */

/* The "icon" field in the data, mapped to the icons in Icon.jsx. */
const emergencyIcons = {
  police: 'badge',
  fire: 'flame',
  medical: 'medical',
  heart: 'heart',
  info: 'info',
  shield: 'shield',
  phone: 'phone',
}

const iconOf = (contact) => emergencyIcons[contact.icon] ?? 'phone'

/* Copies text, also in older browsers without the Clipboard API. */
async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  const copied = document.execCommand('copy')
  field.remove()
  if (!copied) throw new Error('Copy failed')
}

/* A small icon button that copies a number and briefly shows a tick. */
function CopyNumberButton({ number, name }) {
  const { t } = useTranslation()
  // 'idle', 'copied' or 'failed'
  const [status, setStatus] = useState('idle')

  // The tick goes back to the copy icon after two seconds.
  useEffect(() => {
    if (status === 'idle') return undefined
    const timer = window.setTimeout(() => setStatus('idle'), 2000)
    return () => window.clearTimeout(timer)
  }, [status])

  async function handleClick() {
    try {
      await copyText(number)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  const message = {
    copied: t('resources.actions.copied'),
    failed: t('resources.actions.copyFailed'),
  }[status]
  const label = `${t('resources.actions.copyNumber')}: ${name}, ${number}`

  return (
    <>
      <button
        type="button"
        className={`emergency-copy ${status !== 'idle' ? `is-${status}` : ''}`}
        onClick={handleClick}
        aria-label={label}
        title={t('resources.actions.copyNumber')}
      >
        <Icon name={status === 'copied' ? 'check' : 'copy'} size={18} />
      </button>
      {/* Announces the result to screen readers. */}
      <span className="visually-hidden" role="status">
        {message ?? ''}
      </span>
    </>
  )
}

/* Link to the official page about a hotline, when the data gives one. */
function OfficialLink({ contact, name }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  if (!contact.websiteUrl) return null
  return (
    <a
      href={contact.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link emergency-official"
    >
      {localizeText(contact.websiteLabel) || t('resources.actions.officialInfo')}
      <Icon name="externalLink" size={14} />
      <span className="visually-hidden">{`: ${name} ${t('common.opensNewTab')}`}</span>
    </a>
  )
}

/* Police, fire and ambulance: the numbers people must find instantly. */
function PrimaryContact({ contact }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const name = localizeText(contact.name)
  const description = localizeText(contact.description)
  const { display, href } = contact.phone

  return (
    <article className="emergency-primary">
      <span className="emergency-primary__icon">
        <Icon name={iconOf(contact)} size={26} />
      </span>
      <div className="emergency-primary__body">
        <h4 className="emergency-primary__name">{name}</h4>
        <p className="emergency-primary__number">{display}</p>
        {description && <p className="emergency-primary__description">{description}</p>}
        <div className="emergency-primary__actions">
          <a href={href} className="button button--primary emergency-primary__call">
            <Icon name="phone" size={18} />
            {t('resources.actions.callNow')}
            <span className="visually-hidden">{`: ${name}, ${display}`}</span>
          </a>
          <CopyNumberButton number={display} name={name} />
          <OfficialLink contact={contact} name={name} />
        </div>
        <VerificationBadge show={contact.needsVerification} />
      </div>
    </article>
  )
}

/* Every other hotline: one compact row. */
function HotlineRow({ contact }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const name = localizeText(contact.name)
  const description = localizeText(contact.description)
  const { display, href } = contact.phone
  const lineType = ['information', 'support'].includes(contact.lineType) ? contact.lineType : ''

  return (
    <li className="hotline">
      <span className="hotline__icon">
        <Icon name={iconOf(contact)} size={20} />
      </span>
      <div className="hotline__info">
        <div className="hotline__heading">
          <h5 className="hotline__name">{name}</h5>
          {lineType && (
            <span className={`chip hotline__type hotline__type--${lineType}`}>
              {t(`resources.lineTypes.${lineType}`)}
            </span>
          )}
          <VerificationBadge show={contact.needsVerification} />
        </div>
        {description && <p className="hotline__description">{description}</p>}
        <OfficialLink contact={contact} name={name} />
      </div>
      <div className="hotline__actions">
        <span className="hotline__number">{display}</span>
        <a href={href} className="button button--outline hotline__call">
          <Icon name="phone" size={16} />
          {t('resources.actions.call')}
          <span className="visually-hidden">{`: ${name}, ${display}`}</span>
        </a>
        <CopyNumberButton number={display} name={name} />
      </div>
    </li>
  )
}

export default function EmergencyContacts({ contacts }) {
  const { t } = useTranslation()
  const headingId = useId()
  const primary = contacts.filter((contact) => contact.primary === true)
  const others = contacts.filter((contact) => contact.primary !== true)
  // A public caution stays until every number has been checked.
  const hasUnverified = contacts.some((contact) => contact.needsVerification)

  if (contacts.length === 0) return null

  return (
    <section className="emergency" aria-labelledby={headingId}>
      <div className="emergency__header">
        <h3 id={headingId} className="emergency__title">
          <Icon name="phone" size={20} />
          {t('resources.emergencyTitle')}
        </h3>
        {hasUnverified && (
          <p className="emergency__caution">
            <Icon name="alert" size={16} />
            {t('resources.emergencyUnverified')}
          </p>
        )}
      </div>

      {primary.length > 0 && (
        <div className="emergency__primary">
          {primary.map((contact) => (
            <PrimaryContact key={contact.key} contact={contact} />
          ))}
        </div>
      )}

      {others.length > 0 && (
        <div className="emergency__others">
          {primary.length > 0 && (
            <h4 className="emergency__others-title">{t('resources.otherHotlines')}</h4>
          )}
          <ul className="hotline-list">
            {others.map((contact) => (
              <HotlineRow key={contact.key} contact={contact} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
