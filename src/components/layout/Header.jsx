import { Menu, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollToSection } from '../../utils/scrollToSection'

const navItems = [
  { id: 'home', label: 'خانه' },
  { id: 'about', label: 'درباره من' },
  { id: 'skills', label: 'مهارت‌ها' },
  { id: 'projects', label: 'پروژه‌ها' },
  { id: 'timeline', label: 'مسیر یادگیری' },
  { id: 'contact', label: 'تماس با من' },
]

export function Header({ initials = 'MP' }) {
  const [isOpen, setIsOpen] = useState(false)
  const sectionIds = useMemo(() => navItems.map((item) => item.id), [])
  const activeSection = useActiveSection(sectionIds)

  const handleNavigation = (sectionId) => {
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  const linkClass = (id) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${
      activeSection === id
        ? 'bg-cyan-300/10 text-cyan-200'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl"
      data-site-header
    >
      <nav
        aria-label="ناوبری اصلی"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6"
      >
        <button
          className="rounded-lg text-lg font-bold tracking-normal text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          onClick={() => handleNavigation('home')}
          type="button"
        >
          {initials}
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              className={linkClass(item.id)}
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
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
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            {navItems.map((item) => (
              <button
                className={linkClass(item.id)}
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
