import { useEffect, useRef, useState } from 'react'

/*
 * REVEAL
 * ------
 * Wraps any content and fades it gently upward the first time it scrolls
 * into view. The animation itself is defined in src/styles/global.css
 * (the ".reveal" class).
 *
 * Props:
 *   as        - which HTML tag to render ('div' by default, e.g. 'li')
 *   delay     - milliseconds to wait before animating. Give cards in a row
 *               increasing delays (0, 80, 160...) for a staggered effect.
 *   className - extra classes for the wrapper
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...otherProps
}) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate once only, then stop watching.
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={elementRef}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...otherProps}
    >
      {children}
    </Tag>
  )
}
