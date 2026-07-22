import { useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ProjectVisual } from '../ui/ProjectVisual'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectModal } from './ProjectModal'

export function Projects({ isLoading = false, projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-6" id="projects">
      <SectionHeading
        eyebrow="پروژه‌ها"
        title="نمونه‌کاری که مسیر یادگیری و ساخت محصول را نشان می‌دهد."
        description="پروژه‌ها از بک‌اند خوانده می‌شوند و هر پروژه‌ای که در پنل ادمین اضافه کنید اینجا نمایش داده می‌شود."
      />

      {isLoading ? (
        <Card className="p-6 text-slate-300">در حال دریافت پروژه‌ها از بک‌اند...</Card>
      ) : null}

      {!isLoading && projects.length === 0 ? (
        <Card className="p-6 text-slate-300">هنوز پروژه‌ای ثبت نشده است.</Card>
      ) : null}

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card className="overflow-hidden" key={project.id}>
            <div className="grid gap-6 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-6">
              <ProjectVisual title={project.title} />
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-sm font-semibold text-cyan-200">
                    {project.status}
                  </span>
                  {project.featured ? (
                    <span className="rounded-lg border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-sm text-violet-100">
                      پروژه شاخص
                    </span>
                  ) : null}
                </div>
                <h3 className="text-2xl font-bold text-white">{project.persianTitle}</h3>
                <p className="mt-1 text-sm text-slate-400" dir="ltr">
                  {project.title}
                </p>
                <p className="mt-4 leading-8 text-slate-300">{project.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200"
                      key={technology}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Button as="button" onClick={() => setSelectedProject(project)} type="button">
                    مشاهده جزئیات
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
