import { Edit3, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

const emptySkillGroup = {
  title: '',
  icon: 'code',
  skills: [],
  sortOrder: 0,
}

const iconOptions = [
  { label: 'Code', value: 'code' },
  { label: 'Database', value: 'database' },
  { label: 'Web', value: 'globe' },
  { label: 'Tools', value: 'wrench' },
]

function parseSkills(value) {
  return value
    .split('\n')
    .map((line) => {
      const [name, level = ''] = line.split('|').map((item) => item.trim())
      return { name, level }
    })
    .filter((skill) => skill.name)
}

function formatSkills(skills) {
  return Array.isArray(skills)
    ? skills.map((skill) => `${skill.name}${skill.level ? ` | ${skill.level}` : ''}`).join('\n')
    : ''
}

export function SkillManager({ onCreate, onDelete, onUpdate, skillGroups }) {
  const [draft, setDraft] = useState({ ...emptySkillGroup, skillsText: '' })
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')
  const [isBusy, setIsBusy] = useState(false)

  useEffect(() => {
    if (!editingId) return

    const skillGroup = skillGroups.find((item) => item.id === editingId)

    if (skillGroup) {
      setDraft({
        ...skillGroup,
        skillsText: formatSkills(skillGroup.skills),
      })
    }
  }, [editingId, skillGroups])

  const updateDraft = (key, value) => {
    setDraft((current) => ({ ...current, [key]: value }))
    setStatus('')
  }

  const resetForm = () => {
    setDraft({ ...emptySkillGroup, skillsText: '' })
    setEditingId(null)
  }

  const submitSkillGroup = async (event) => {
    event.preventDefault()
    setIsBusy(true)
    setStatus('')

    const payload = {
      ...draft,
      skills: parseSkills(draft.skillsText ?? ''),
      sortOrder: Number(draft.sortOrder) || 0,
    }

    delete payload.skillsText

    try {
      if (editingId) {
        await onUpdate(payload)
        setStatus('دسته مهارت ویرایش شد.')
      } else {
        await onCreate(payload)
        setStatus('دسته مهارت اضافه شد.')
      }
      resetForm()
    } catch (error) {
      setStatus(error.message || 'ذخیره مهارت‌ها انجام نشد.')
    } finally {
      setIsBusy(false)
    }
  }

  const deleteSkillGroup = async (skillGroupId) => {
    setIsBusy(true)
    setStatus('')

    try {
      await onDelete(skillGroupId)
      if (editingId === skillGroupId) resetForm()
      setStatus('دسته مهارت حذف شد.')
    } catch {
      setStatus('حذف دسته مهارت انجام نشد.')
    } finally {
      setIsBusy(false)
    }
  }

  const inputClass =
    'mt-2 w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10'

  return (
    <div className="grid gap-5 border-t border-white/10 pt-6">
      <div>
        <p className="text-sm font-semibold text-cyan-300">مدیریت مهارت‌ها</p>
        <h3 className="mt-2 text-xl font-bold text-white">
          اضافه، حذف یا ویرایش دسته‌های مهارت
        </h3>
      </div>

      <form className="grid gap-4" onSubmit={submitSkillGroup}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">عنوان دسته</span>
            <input
              className={inputClass}
              dir="ltr"
              onChange={(event) => updateDraft('title', event.target.value)}
              value={draft.title}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">آیکن</span>
            <select
              className={inputClass}
              dir="ltr"
              onChange={(event) => updateDraft('icon', event.target.value)}
              value={draft.icon}
            >
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
            <span className="text-sm font-semibold text-slate-200">
              مهارت‌ها، هر مورد در یک خط: نام | سطح
            </span>
            <textarea
              className={`${inputClass} min-h-36 leading-8`}
              dir="ltr"
              onChange={(event) => updateDraft('skillsText', event.target.value)}
              placeholder="React | مسلط"
              value={draft.skillsText}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button as="button" disabled={isBusy} icon={null} type="submit">
            <Plus aria-hidden="true" size={18} />
            {editingId ? 'ذخیره ویرایش مهارت‌ها' : 'اضافه کردن دسته مهارت'}
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
        {skillGroups.map((skillGroup) => (
          <Card className="p-4" key={skillGroup.id ?? skillGroup.title}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-bold text-white" dir="ltr">
                  {skillGroup.title}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {(skillGroup.skills ?? []).length} مهارت
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  as="button"
                  disabled={!skillGroup.id}
                  icon={null}
                  onClick={() => setEditingId(skillGroup.id)}
                  type="button"
                  variant="secondary"
                >
                  <Edit3 aria-hidden="true" size={17} />
                  ویرایش
                </Button>
                <Button
                  as="button"
                  disabled={!skillGroup.id}
                  icon={null}
                  onClick={() => deleteSkillGroup(skillGroup.id)}
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
