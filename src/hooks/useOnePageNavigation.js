import { useLayoutEffect } from 'react'

export function useOnePageNavigation() {
  useLayoutEffect(() => {
    if (!window.location.hash) return

    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo(0, 0)
    requestAnimationFrame(() => window.scrollTo(0, 0))
  }, [])
}
