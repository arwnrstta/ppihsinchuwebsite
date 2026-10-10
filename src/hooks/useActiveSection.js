import { useEffect, useState } from 'react'

/*
 * Tells the navbar which section the visitor is currently looking at, so the
 * matching menu item can be highlighted.
 *
 * It watches every section and picks the one that crosses a thin horizontal
 * band near the top-middle of the screen.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      // The margins shrink the "viewport" to a band 35%-40% down the screen.
      { rootMargin: '-35% 0px -60% 0px' },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
