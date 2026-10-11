import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from './Icon.jsx'
import './Modal.css'

/*
 * MODAL
 * -----
 * A pop-up window that appears above the page. Used for event details and
 * the gallery lightbox.
 *
 * It is built on the browser's own <dialog> element, which already handles
 * the accessibility work: it keeps keyboard focus inside the pop-up, closes
 * on the Escape key, and returns focus to the button that opened it.
 *
 * Usage: render it only while it should be open.
 *   {isOpen && <Modal onClose={() => setIsOpen(false)} label="Details">...</Modal>}
 *
 * Props:
 *   onClose   - called when the visitor closes the pop-up
 *   label     - a name for the pop-up, read by screen readers
 *   variant   - 'panel' (default, a white card) or 'lightbox' (dark, full screen)
 */
export default function Modal({ onClose, label, variant = 'panel', children }) {
  const { t } = useTranslation()
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    // Stop the page behind the pop-up from scrolling.
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      dialog.close()
    }
  }, [])

  /* Clicking the dark area outside the content closes the pop-up. */
  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) onClose()
  }

  /* The Escape key fires "cancel". We close through onClose so React stays in charge. */
  function handleCancel(event) {
    event.preventDefault()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={`modal modal--${variant}`}
      aria-label={label}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
    >
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label={t('common.close')}
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </dialog>
  )
}
