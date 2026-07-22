import { BriefcaseBusiness, Home, Mail, Menu, Route, Sparkles, UserRound, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollToSection } from '../../utils/scrollToSection'

const navItems = [
  { id: 'home', label: 'خانه', icon: Home },
  { id: 'about', label: 'درباره من', icon: UserRound },
  { id: 'skills', label: 'مهارت‌ها', icon: Sparkles },
  { id: 'projects', label: 'پروژه‌ها', icon: BriefcaseBusiness },
  { id: 'timeline', label: 'مسیر یادگیری', icon: Route },
  { id: 'contact', label: 'تماس با من', icon: Mail },
]

export function Header({ initials = 'MP', logoUrl = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [clickedSection, setClickedSection] = useState(null)
  const sectionIds = useMemo(() => navItems.map((item) => item.id), [])
  const activeSection = useActiveSection(sectionIds)
  const visibleActiveSection = clickedSection ?? activeSection

  useEffect(() => {
    if (!clickedSection) return

    const timeoutId = window.setTimeout(() => setClickedSection(null), 700)

    return () => window.clearTimeout(timeoutId)
  }, [clickedSection])

  const handleNavigation = (sectionId) => {
    setClickedSection(sectionId)
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  const linkClass = (id) =>
    `inline-flex h-11 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${
      visibleActiveSection === id
        ? 'bg-cyan-300/10 text-cyan-200'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
      data-site-header
    >
      <nav
        aria-label="ناوبری اصلی"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6"
      >
        <button
          className="inline-flex h-11 min-w-11 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 text-lg font-bold tracking-normal text-white transition hover:bg-cyan-300/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          onClick={() => handleNavigation('home')}
          type="button"
        >
          {logoUrl ? (
            <img alt="لوگوی سایت" className="h-7 w-7 object-contain" src={logoUrl} />
          ) : (
            initials
          )}
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                aria-label={item.label}
                className={linkClass(item.id)}
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                title={item.label}
                type="button"
              >
                <Icon aria-hidden="true" size={20} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? 'بستن منو' : 'باز کردن منو'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </nav>

      <div
        className={`grid overflow-hidden border-t border-white/10 bg-slate-950/90 transition-all duration-300 lg:hidden ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-5 py-3">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <button
                  aria-label={item.label}
                  className={linkClass(item.id)}
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  title={item.label}
                  type="button"
                  >
                    <Icon aria-hidden="true" size={20} />
                    <span>{item.label}</span>
                  </button>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
