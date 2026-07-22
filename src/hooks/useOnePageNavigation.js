import { useLayoutEffect } from 'react'

export function useOnePageNavigation() {
  const wheelSpeed = 2.6

  useLayoutEffect(() => {
    if (!window.location.hash) return

    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo(0, 0)
    requestAnimationFrame(() => window.scrollTo(0, 0))
  }, [])

  useLayoutEffect(() => {
    const handleWheel = (event) => {
      const interactiveElement = event.target.closest(
        'input, textarea, select, [role="dialog"]',
      )

      if (interactiveElement) return

      const previousScrollY = window.scrollY

      requestAnimationFrame(() => {
        if (window.scrollY !== previousScrollY) return

        window.scrollBy({
          behavior: 'auto',
          left: 0,
          top: event.deltaY * wheelSpeed,
        })
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => window.removeEventListener('wheel', handleWheel)
  }, [])
}
