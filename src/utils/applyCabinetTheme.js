import { cabinet } from '../config/cabinet.js'

/*
 * Copies the cabinet colours from src/config/cabinet.js into CSS variables,
 * so every stylesheet can use var(--cabinet-primary) and friends.
 * This runs once when the website starts (see src/main.jsx).
 *
 * If a colour is missing from cabinet.js, the fallback value defined in
 * src/styles/variables.css is used instead.
 */
export function applyCabinetTheme() {
  const rootStyle = document.documentElement.style
  const { primary, deep, soft, accent } = cabinet.colors

  if (primary) rootStyle.setProperty('--cabinet-primary', primary)
  if (deep) rootStyle.setProperty('--cabinet-deep', deep)
  if (soft) rootStyle.setProperty('--cabinet-soft', soft)
  if (accent) rootStyle.setProperty('--cabinet-accent', accent)
}
