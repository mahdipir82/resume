import { ExternalLink, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import { ProjectVisual } from '../ui/ProjectVisual'

export function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && closeButtonRef.current) {
        const focusableElements = Array.from(
          document.querySelectorAll(
            '[role="dialog"] button, [role="dialog"] a[href], [role="dialog"] textarea, [role="dialog"] input',
          ),
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      aria-labelledby="project-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
      onMouseDown={onClose}
      role="dialog"
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-black/50 md:p-7"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-300">{project.status}</p>
            <h3 className="mt-2 text-2xl font-bold text-white" id="project-modal-title">
              {project.persianTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-400" dir="ltr">
              {project.title}
            </p>
          </div>
          <button
            aria-label="بستن پنجره جزئیات پروژه"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <ProjectVisual title={project.title} />
        <p className="mt-6 text-base leading-8 text-slate-300">{project.fullDescription}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-bold text-white">ویژگی‌ها</h4>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
              {project.features.map((feature) => (
                <li className="flex gap-2" key={feature}>
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">فناوری‌ها</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                  key={technology}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <Button href={project.githubUrl} rel="noreferrer" target="_blank" variant="secondary">
              GitHub
            </Button>
          ) : null}
          {project.liveUrl ? (
            <Button href={project.liveUrl} rel="noreferrer" target="_blank" variant="secondary">
              مشاهده آنلاین
            </Button>
          ) : null}
          {!project.githubUrl && !project.liveUrl ? (
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              <ExternalLink aria-hidden="true" size={17} />
              لینک‌های پروژه پس از آماده شدن اضافه می‌شوند.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
