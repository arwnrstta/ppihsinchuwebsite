/*
 * ICON
 * ----
 * All icons used on the website, drawn as small inline SVGs so no icon
 * library is needed. Use it like this:  <Icon name="calendar" />
 *
 * To add an icon, add a new entry to "outlineIcons" (drawn with lines) or
 * "solidIcons" (filled shapes, used for social media logos). Icons are drawn
 * on a 24 x 24 grid.
 */

const outlineIcons = {
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowLeft: <path d="M19 12H5m6 6-6-6 6-6" />,
  externalLink: <path d="M7 17 17 7M8 7h9v9" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  ticket: (
    <path d="M4 9V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6ZM14.5 5v3M14.5 11v2M14.5 16v3" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.4 3.6 5.2 3.6 8.5s-1.1 6.1-3.6 8.5c-2.5-2.4-3.6-5.2-3.6-8.5s1.1-6.1 3.6-8.5Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M2.8 19.5c.6-3.3 3-5 6.2-5s5.6 1.7 6.2 5M16 5.6a3.2 3.2 0 0 1 0 5.8M18.3 14.9c1.6.7 2.6 2.3 2.9 4.6" />
    </>
  ),
  document: (
    <>
      <path d="M6.5 3h7.5l4.5 4.5V19a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v4.5h4.5M8.5 12.5h7M8.5 16.5h7" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="m4 17.5 5-5 3.5 3.5 2.5-2.5 5 5" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.3v.2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.1" />
    </>
  ),
}

const solidIcons = {
  play: <path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.5-6.5a1 1 0 0 0 0-1.7L9.5 4.6A1 1 0 0 0 8 5.5Z" />,
  linkedin: (
    <path d="M5 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.2 9.5h3.6V20.5H3.2V9.5Zm5.8 0h3.45v1.5h.05c.48-.9 1.65-1.8 3.4-1.8 3.6 0 4.3 2.3 4.3 5.4v5.9h-3.6v-5.2c0-1.25 0-2.85-1.75-2.85s-2 1.35-2 2.75v5.3H9V9.5Z" />
  ),
  facebook: (
    <path d="M13.6 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.05-1.25-.1-2.4-.1-2.4 0-4 1.45-4 4.1v2.3H7.7V13h2.7v8h3.2Z" />
  ),
  youtube: (
    <path d="M21.6 7.3a2.5 2.5 0 0 0-1.75-1.8C18.3 5.1 12 5.1 12 5.1s-6.3 0-7.85.4A2.5 2.5 0 0 0 2.4 7.3C2 8.9 2 12 2 12s0 3.1.4 4.7a2.5 2.5 0 0 0 1.75 1.8c1.55.4 7.85.4 7.85.4s6.3 0 7.85-.4a2.5 2.5 0 0 0 1.75-1.8c.4-1.6.4-4.7.4-4.7s0-3.1-.4-4.7ZM10 15V9l5.2 3-5.2 3Z" />
  ),
  tiktok: (
    <path d="M16.3 3c.3 2.2 1.6 3.7 3.7 3.9v3.1a6.7 6.7 0 0 1-3.65-1.15v6.05c0 3.4-2.5 5.6-5.5 5.6A5.4 5.4 0 0 1 5.4 15.1c0-3.3 2.8-5.7 6.1-5.2v3.2c-1.5-.35-2.9.6-2.9 2.05 0 1.3 1 2.25 2.25 2.25 1.4 0 2.35-1 2.35-2.7V3h3.1Z" />
  ),
}

export default function Icon({ name, size = 20 }) {
  const isSolid = name in solidIcons
  const shape = isSolid ? solidIcons[name] : outlineIcons[name]
  if (!shape) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isSolid ? 'currentColor' : 'none'}
      stroke={isSolid ? 'none' : 'currentColor'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      // Icons are decorative. The button or link around them carries the label.
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  )
}
