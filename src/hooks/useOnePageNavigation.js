import { useEffect } from 'react'

function scrollToElement(targetId) {
  const target = document.getElementById(targetId)

  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function useOnePageNavigation() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const handleClick = (event) => {
      const link = event.target.closest('a[href^="#"]')

      if (!link) return

      const targetId = link.getAttribute('href')?.slice(1)

      if (!targetId) return

      event.preventDefault()
      scrollToElement(targetId)
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [])
}
