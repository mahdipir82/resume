export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  const header = document.querySelector('[data-site-header]')

  if (!section) return

  const headerOffset = header?.getBoundingClientRect().height ?? 0
  const top = section.getBoundingClientRect().top + window.scrollY - headerOffset - 20

  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: Math.max(top, 0),
  })
}
