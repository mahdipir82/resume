import { Edit3, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

const emptyProject = {
  title: '',
  persianTitle: '',
  shortDescription: '',
  fullDescription: '',
  image: '',
  imageAlt: '',
  technologies: [],
  features: [],
  githubUrl: '',
  liveUrl: '',
  status: 'در حال توسعه',
  featured: false,
  sortOrder: 0,
}

function splitLines(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function joinLines(value) {
  return Array.isArray(value) ? value.join('\n') : ''
}

export function ProjectManager({ onCreate, onDelete, onUpdate, projects }) {
  const [draft, setDraft] = useState(emptyProject)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')
  const [isBusy, setIsBusy] = useState(false)

  useEffect(() => {
    if (!editingId) return

    const project = projects.find((item) => item.id === editingId)

    if (project) {
      setDraft({
        ...project,
        featuresText: joinLines(project.features),
        technologiesText: joinLines(project.technologies),
      })
    }
  }, [editingId, projects])

  const updateDraft = (key, value) => {
    setDraft((current) => ({ ...current, [key]: value }))
    setStatus('')
  }

  const resetForm = () => {
    setDraft(emptyProject)
    setEditingId(null)
  }

  const submitProject = async (event) => {
    event.preventDefault()
    setIsBusy(true)
    setStatus('')

    const payload = {
      ...draft,
      features: splitLines(draft.featuresText ?? ''),
      sortOrder: Number(draft.sortOrder) || 0,
      technologies: splitLines(draft.technologiesText ?? ''),
    }

    delete payload.featuresText
    delete payload.technologiesText

    try {
      if (editingId) {
        await onUpdate(payload)
        setStatus('پروژه ویرایش شد.')
      } else {
        await onCreate(payload)
        setStatus('پروژه اضافه شد.')
      }
      resetForm()
    } catch (error) {
      setStatus(error.message || 'ذخیره پروژه انجام نشد.')
    } finally {
      setIsBusy(false)
    }
  }

  const deleteProject = async (projectId) => {
    setIsBusy(true)
    setStatus('')

    try {
      await onDelete(projectId)
      if (editingId === projectId) resetForm()
      setStatus('پروژه حذف شد.')
    } catch {
      setStatus('حذف پروژه انجام نشد.')
    } finally {
      setIsBusy(false)
    }
  }

  const inputClass =
    'mt-2 w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10'

  return (
    <div className="grid gap-5 border-t border-white/10 pt-6">
      <div>
        <p className="text-sm font-semibold text-cyan-300">مدیریت پروژه‌ها</p>
        <h3 className="mt-2 text-xl font-bold text-white">
          افزودن پروژه جدید به بخش نمونه‌کارها
        </h3>
      </div>

      <form className="grid gap-4" onSubmit={submitProject}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">عنوان انگلیسی</span>
            <input
              className={inputClass}
              dir="ltr"
              onChange={(event) => updateDraft('title', event.target.value)}
              value={draft.title}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">عنوان فارسی</span>
            <input
              className={inputClass}
              onChange={(event) => updateDraft('persianTitle', event.target.value)}
              value={draft.persianTitle}
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold text-slate-200">توضیح کوتاه</span>
            <textarea
              className={`${inputClass} min-h-24 leading-8`}
              onChange={(event) => updateDraft('shortDescription', event.target.value)}
              value={draft.shortDescription}
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold text-slate-200">توضیح کامل</span>
            <textarea
              className={`${inputClass} min-h-32 leading-8`}
              onChange={(event) => updateDraft('fullDescription', event.target.value)}
              value={draft.fullDescription}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">وضعیت</span>
            <input
              className={inputClass}
              onChange={(event) => updateDraft('status', event.target.value)}
              value={draft.status}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">ترتیب نمایش</span>
            <input
              className={inputClass}
              dir="ltr"
              onChange={(event) => updateDraft('sortOrder', event.target.value)}
              type="number"
              value={draft.sortOrder}
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold text-slate-200">فناوری‌ها، هر مورد در یک خط</span>
            <textarea
              className={`${inputClass} min-h-28 leading-8`}
              dir="ltr"
              onChange={(event) => updateDraft('technologiesText', event.target.value)}
              value={draft.technologiesText ?? joinLines(draft.technologies)}
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-semibold text-slate-200">ویژگی‌ها، هر مورد در یک خط</span>
            <textarea
              className={`${inputClass} min-h-28 leading-8`}
              onChange={(event) => updateDraft('featuresText', event.target.value)}
              value={draft.featuresText ?? joinLines(draft.features)}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">لینک GitHub</span>
            <input
              className={inputClass}
              dir="ltr"
              onChange={(event) => updateDraft('githubUrl', event.target.value)}
              value={draft.githubUrl}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">لینک آنلاین</span>
            <input
              className={inputClass}
              dir="ltr"
              onChange={(event) => updateDraft('liveUrl', event.target.value)}
              value={draft.liveUrl}
            />
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-200">
            <input
              checked={draft.featured}
              className="h-4 w-4 accent-cyan-300"
              onChange={(event) => updateDraft('featured', event.target.checked)}
              type="checkbox"
            />
            پروژه شاخص باشد
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button as="button" disabled={isBusy} icon={null} type="submit">
            <Plus aria-hidden="true" size={18} />
            {editingId ? 'ذخیره ویرایش پروژه' : 'اضافه کردن پروژه'}
          </Button>
          {editingId ? (
            <Button as="button" icon={null} onClick={resetForm} type="button" variant="ghost">
              انصراف از ویرایش
            </Button>
          ) : null}
          {status ? <p className="text-sm text-cyan-200">{status}</p> : null}
        </div>
      </form>

      <div className="grid gap-3">
        {projects.map((project) => (
          <Card className="p-4" key={project.id}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-bold text-white">{project.persianTitle}</p>
                <p className="mt-1 text-sm text-slate-400" dir="ltr">
                  {project.title}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  as="button"
                  icon={null}
                  onClick={() => setEditingId(project.id)}
                  type="button"
                  variant="secondary"
                >
                  <Edit3 aria-hidden="true" size={17} />
                  ویرایش
                </Button>
                <Button
                  as="button"
                  icon={null}
                  onClick={() => deleteProject(project.id)}
                  type="button"
                  variant="ghost"
                >
                  <Trash2 aria-hidden="true" size={17} />
                  حذف
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
