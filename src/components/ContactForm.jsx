import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { contact } from '../config/site.js'
import { contactFormTypes } from '../data/contactForms.js'
import { useLocalize } from '../utils/localize.js'
import Icon from './Icon.jsx'
import Tabs from './Tabs.jsx'
import './ContactForm.css'

/*
 * CONTACT FORM
 * ------------
 * One form with two modes: "Student / General" and "Sponsorship /
 * Partnership". The fields for each mode (and their labels in every
 * language) are listed in src/data/contactForms.js, and this component
 * draws whichever list is selected.
 *
 * WHERE DOES THE MESSAGE GO?  (BACKEND INTEGRATION POINT)
 * This website has no server, so delivery depends on "contact" in
 * src/config/site.js:
 *
 *   contact.formEndpoint set -> sendToEndpoint() posts the message to that
 *                               URL. Success is shown ONLY when the service
 *                               answers that it worked.
 *   contact.email set        -> openEmailApp() opens the visitor's own email
 *                               app with the message filled in. The visitor
 *                               still has to press Send there.
 *   neither set              -> the Send button is disabled.
 *
 * The form never claims a message was sent unless a service confirmed it.
 *
 * LANGUAGES
 * Errors are stored as a "kind" ('required' or 'email'), not as finished
 * sentences, so they switch language together with the rest of the page.
 * The matching sentences are in src/locales/, under "contact" -> "form".
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Checks one field and returns 'required', 'email', or '' if it is fine. */
function getErrorKind(field, value) {
  const trimmedValue = (value ?? '').trim()
  if (field.required && !trimmedValue) return 'required'
  if (field.type === 'email' && trimmedValue && !emailPattern.test(trimmedValue)) {
    return 'email'
  }
  return ''
}

export default function ContactForm() {
  const { t } = useTranslation()
  const localizeText = useLocalize()

  const [formTypeId, setFormTypeId] = useState(contactFormTypes[0].id)
  // What the visitor has typed, kept separately for each form type.
  const [valuesByType, setValuesByType] = useState({})
  // For each field name: 'required', 'email' or ''.
  const [errorKinds, setErrorKinds] = useState({})
  // status is 'idle', 'sending', 'success', 'email-opened' or 'error'.
  const [status, setStatus] = useState('idle')

  const formType = contactFormTypes.find((type) => type.id === formTypeId)
  const formTitle = localizeText(formType.title)
  const values = valuesByType[formTypeId] ?? {}

  const deliveryMethod = contact.formEndpoint
    ? 'endpoint'
    : contact.email
      ? 'email'
      : 'none'

  function switchFormType(newTypeId) {
    setFormTypeId(newTypeId)
    setErrorKinds({})
    setStatus('idle')
  }

  function updateValue(fieldName, newValue) {
    setValuesByType({
      ...valuesByType,
      [formTypeId]: { ...values, [fieldName]: newValue },
    })
    // Clear this field's error as soon as the visitor starts fixing it.
    if (errorKinds[fieldName]) setErrorKinds({ ...errorKinds, [fieldName]: '' })
  }

  /* Option 1: send to an online form service. */
  async function sendToEndpoint() {
    setStatus('sending')
    try {
      const response = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ inquiryType: formTitle, ...values }),
      })
      if (!response.ok) throw new Error(`Form service answered ${response.status}`)

      setStatus('success')
      setValuesByType({ ...valuesByType, [formTypeId]: {} })
    } catch {
      setStatus('error')
    }
  }

  /* Option 2: open the visitor's email app with the message written out. */
  function openEmailApp() {
    const subject = values.subject || t('contact.form.emailSubject', { type: formTitle })
    const bodyLines = formType.fields
      .filter((field) => field.name !== 'subject' && values[field.name])
      .map((field) => `${localizeText(field.label)}: ${values[field.name]}`)

    const mailtoLink =
      `mailto:${contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(bodyLines.join('\n\n'))}`
    window.location.assign(mailtoLink)

    setStatus('email-opened')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrorKinds = {}
    formType.fields.forEach((field) => {
      const errorKind = getErrorKind(field, values[field.name])
      if (errorKind) newErrorKinds[field.name] = errorKind
    })
    setErrorKinds(newErrorKinds)

    const firstInvalidField = formType.fields.find((field) => newErrorKinds[field.name])
    if (firstInvalidField) {
      // Move the cursor to the first problem so it is easy to fix.
      document.getElementById(`contact-${formTypeId}-${firstInvalidField.name}`)?.focus()
      return
    }

    if (deliveryMethod === 'endpoint') sendToEndpoint()
    else if (deliveryMethod === 'email') openEmailApp()
  }

  /* Turns an error kind into a sentence in the visitor's language. */
  function getErrorMessage(field) {
    const errorKind = errorKinds[field.name]
    if (!errorKind) return ''
    return t(`contact.form.errors.${errorKind}`, { field: localizeText(field.label) })
  }

  const formTypeTabs = contactFormTypes.map((type) => ({
    id: type.id,
    label: localizeText(type.label),
  }))

  return (
    <div className="contact-form">
      <Tabs
        tabs={formTypeTabs}
        activeId={formTypeId}
        onChange={switchFormType}
        label={t('contact.form.typeLabel')}
        idPrefix="contact"
      />

      <form
        // "key" gives each form type a fresh form with its own fade-in.
        key={formTypeId}
        role="tabpanel"
        id="contact-panel"
        aria-labelledby={`contact-tab-${formTypeId}`}
        className="contact-form__form fade-up"
        onSubmit={handleSubmit}
        // Turns off the browser's own pop-up messages; ours are shown instead.
        noValidate
      >
        <h3 className="contact-form__title">{formTitle}</h3>

        <div className="contact-form__fields">
          {formType.fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              inputId={`contact-${formTypeId}-${field.name}`}
              value={values[field.name] ?? ''}
              error={getErrorMessage(field)}
              onChange={(newValue) => updateValue(field.name, newValue)}
            />
          ))}
        </div>

        <div className="contact-form__footer">
          <button
            type="submit"
            className="button button--primary"
            disabled={deliveryMethod === 'none' || status === 'sending'}
          >
            {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
            <Icon name="arrowRight" size={18} />
          </button>

          <p className="contact-form__delivery-note">
            {deliveryMethod === 'endpoint' && t('contact.form.deliveryEndpoint')}
            {deliveryMethod === 'email' && t('contact.form.deliveryEmail')}
            {deliveryMethod === 'none' && t('contact.form.deliveryNone')}
          </p>
        </div>

        {/* role="status" makes screen readers announce the result. */}
        <div role="status" className="contact-form__status">
          {status === 'success' && (
            <p className="contact-form__message contact-form__message--success">
              {t('contact.form.success')}
            </p>
          )}
          {status === 'email-opened' && (
            <p className="contact-form__message">
              {t('contact.form.emailOpened')}{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          )}
          {status === 'error' && (
            <p className="contact-form__message contact-form__message--error">
              {contact.email
                ? t('contact.form.errorWithEmail', { email: contact.email })
                : t('contact.form.error')}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

/* One labelled input, dropdown or text area, with its error message. */
function FormField({ field, inputId, value, error, onChange }) {
  const { t } = useTranslation()
  const localizeText = useLocalize()
  const errorId = `${inputId}-error`

  // Settings shared by every kind of input.
  const sharedProps = {
    id: inputId,
    name: field.name,
    value,
    required: field.required,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? errorId : undefined,
    onChange: (event) => onChange(event.target.value),
  }

  return (
    <div className={`form-field ${field.wide ? 'form-field--wide' : ''}`}>
      <label htmlFor={inputId} className="form-field__label">
        {localizeText(field.label)}
        {!field.required && (
          <span className="form-field__optional"> {t('contact.form.optional')}</span>
        )}
      </label>

      {field.type === 'textarea' && (
        <textarea {...sharedProps} rows={5} className="form-field__input" />
      )}

      {field.type === 'select' && (
        <select {...sharedProps} className="form-field__input select">
          <option value="">{t('contact.form.choose')}</option>
          {field.options.map((option, index) => {
            const optionText = localizeText(option)
            return (
              <option key={index} value={optionText}>
                {optionText}
              </option>
            )
          })}
        </select>
      )}

      {(field.type === 'text' || field.type === 'email') && (
        <input
          {...sharedProps}
          type={field.type}
          autoComplete={field.type === 'email' ? 'email' : undefined}
          className="form-field__input"
        />
      )}

      {error && (
        <p id={errorId} className="form-field__error">
          <Icon name="alert" size={16} />
          {error}
        </p>
      )}
    </div>
  )
}
