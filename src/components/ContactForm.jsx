import { useState } from 'react'
import { contact, site } from '../config/site.js'
import { contactFormTypes } from '../data/contactForms.js'
import Icon from './Icon.jsx'
import Tabs from './Tabs.jsx'
import './ContactForm.css'

/*
 * CONTACT FORM
 * ------------
 * One form with two modes: "Student / General" and "Sponsorship /
 * Partnership". The fields for each mode are listed in
 * src/data/contactForms.js, and this component draws whichever list is
 * selected.
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
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Checks one field and returns an error message, or '' if it is fine. */
function validateField(field, value) {
  const trimmedValue = (value ?? '').trim()
  if (field.required && !trimmedValue) return `Please enter ${field.label.toLowerCase()}.`
  if (field.type === 'email' && trimmedValue && !emailPattern.test(trimmedValue)) {
    return 'Please enter a valid email address.'
  }
  return ''
}

export default function ContactForm() {
  const [formTypeId, setFormTypeId] = useState(contactFormTypes[0].id)
  // What the visitor has typed, kept separately for each form type.
  const [valuesByType, setValuesByType] = useState({})
  const [errors, setErrors] = useState({})
  // status.kind is 'idle', 'sending', 'success', 'email-opened' or 'error'.
  const [status, setStatus] = useState({ kind: 'idle' })

  const formType = contactFormTypes.find((type) => type.id === formTypeId)
  const values = valuesByType[formTypeId] ?? {}

  const deliveryMethod = contact.formEndpoint
    ? 'endpoint'
    : contact.email
      ? 'email'
      : 'none'

  function switchFormType(newTypeId) {
    setFormTypeId(newTypeId)
    setErrors({})
    setStatus({ kind: 'idle' })
  }

  function updateValue(fieldName, newValue) {
    setValuesByType({
      ...valuesByType,
      [formTypeId]: { ...values, [fieldName]: newValue },
    })
    // Clear this field's error as soon as the visitor starts fixing it.
    if (errors[fieldName]) setErrors({ ...errors, [fieldName]: '' })
  }

  /* Option 1: send to an online form service. */
  async function sendToEndpoint() {
    setStatus({ kind: 'sending' })
    try {
      const response = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ inquiryType: formType.title, ...values }),
      })
      if (!response.ok) throw new Error(`Form service answered ${response.status}`)

      setStatus({ kind: 'success' })
      setValuesByType({ ...valuesByType, [formTypeId]: {} })
    } catch {
      setStatus({ kind: 'error' })
    }
  }

  /* Option 2: open the visitor's email app with the message written out. */
  function openEmailApp() {
    const subject = values.subject || `${formType.title} via ${site.name} website`
    const bodyLines = formType.fields
      .filter((field) => field.name !== 'subject' && values[field.name])
      .map((field) => `${field.label}: ${values[field.name]}`)

    const mailtoLink =
      `mailto:${contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(bodyLines.join('\n\n'))}`
    window.location.assign(mailtoLink)

    setStatus({ kind: 'email-opened' })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}
    formType.fields.forEach((field) => {
      const errorMessage = validateField(field, values[field.name])
      if (errorMessage) newErrors[field.name] = errorMessage
    })
    setErrors(newErrors)

    const firstInvalidField = formType.fields.find((field) => newErrors[field.name])
    if (firstInvalidField) {
      // Move the cursor to the first problem so it is easy to fix.
      document.getElementById(`contact-${formTypeId}-${firstInvalidField.name}`)?.focus()
      return
    }

    if (deliveryMethod === 'endpoint') sendToEndpoint()
    else if (deliveryMethod === 'email') openEmailApp()
  }

  return (
    <div className="contact-form">
      <Tabs
        tabs={contactFormTypes}
        activeId={formTypeId}
        onChange={switchFormType}
        label="Type of inquiry"
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
        <h3 className="contact-form__title">{formType.title}</h3>

        <div className="contact-form__fields">
          {formType.fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              inputId={`contact-${formTypeId}-${field.name}`}
              value={values[field.name] ?? ''}
              error={errors[field.name]}
              onChange={(newValue) => updateValue(field.name, newValue)}
            />
          ))}
        </div>

        <div className="contact-form__footer">
          <button
            type="submit"
            className="button button--primary"
            disabled={deliveryMethod === 'none' || status.kind === 'sending'}
          >
            {status.kind === 'sending' ? 'Sending…' : 'Send message'}
            <Icon name="arrowRight" size={18} />
          </button>

          <p className="contact-form__delivery-note">
            {deliveryMethod === 'endpoint' && 'Your message is sent securely to the PPI Hsinchu team.'}
            {deliveryMethod === 'email' &&
              'This opens your email app with your message ready to send.'}
            {deliveryMethod === 'none' &&
              'Online messaging is not connected yet. Contact details will be added here soon.'}
          </p>
        </div>

        {/* role="status" makes screen readers announce the result. */}
        <div role="status" className="contact-form__status">
          {status.kind === 'success' && (
            <p className="contact-form__message contact-form__message--success">
              Thank you. Your message has been sent and we will reply by email.
            </p>
          )}
          {status.kind === 'email-opened' && (
            <p className="contact-form__message">
              Your email app should now be open with your message. Press Send
              there to deliver it. If nothing opened, email us directly at{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
          )}
          {status.kind === 'error' && (
            <p className="contact-form__message contact-form__message--error">
              Sorry, your message could not be sent. Please try again later
              {contact.email ? ` or email us at ${contact.email}.` : '.'}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

/* One labelled input, dropdown or text area, with its error message. */
function FormField({ field, inputId, value, error, onChange }) {
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
        {field.label}
        {!field.required && <span className="form-field__optional"> (optional)</span>}
      </label>

      {field.type === 'textarea' && (
        <textarea {...sharedProps} rows={5} className="form-field__input" />
      )}

      {field.type === 'select' && (
        <select {...sharedProps} className="form-field__input select">
          <option value="">Please choose</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
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
