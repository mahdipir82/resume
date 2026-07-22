import { useCallback, useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  const updateActiveSection = useCallback(() => {
    const header = document.querySelector('[data-site-header]')
    const headerOffset = header?.getBoundingClientRect().height ?? 0
    const activationLine = window.scrollY + headerOffset + 96
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8

    if (pageBottom) {
      setActiveSection(sections.at(-1).id)
      return
    }

    const currentSection = sections.reduce((current, section) => {
      if (section.offsetTop <= activationLine) return section

      return current
    }, sections[0])

    setActiveSection(currentSection.id)
  }, [sectionIds])

  useEffect(() => {
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [updateActiveSection])

  return activeSection
}
