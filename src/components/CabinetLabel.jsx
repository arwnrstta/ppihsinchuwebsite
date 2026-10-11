import { cabinet } from '../config/cabinet.js'

/*
 * CABINET LABEL
 * -------------
 * The small label on an event that names the cabinet which ran it.
 *
 *   - The CURRENT cabinet is shown in the cabinet's purple.
 *   - Any earlier cabinet is shown in grey, so past administrations are
 *     easy to tell apart.
 *
 * "Current" means the name is exactly the same as "name" in
 * src/config/cabinet.js. When a new cabinet takes over and that file is
 * updated, the old cabinet's events turn grey by themselves.
 *
 * Props:
 *   name - the cabinet name from the event ("cabinet" in src/data/events.js).
 *          Nothing is shown when it is empty.
 */
export default function CabinetLabel({ name }) {
  if (!name) return null
  const isCurrentCabinet = name === cabinet.name

  return (
    <span className={`chip ${isCurrentCabinet ? 'chip--cabinet' : 'chip--past-cabinet'}`}>
      {name}
    </span>
  )
}
