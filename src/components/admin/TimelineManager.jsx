import { Edit3, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

const emptyTimelineItem = {
  title: '',
  description: '',
  sortOrder: 0,
}

export function TimelineManager({ onCreate, onDelete, onUpdate, timelineItems }) {
  const [draft, setDraft] = useState(emptyTimelineItem)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')
  const [isBusy, setIsBusy] = useState(false)

  useEffect(() => {
    if (!editingId) return

    const timelineItem = timelineItems.find((item) => item.id === editingId)

    if (timelineItem) {
      setDraft(timelineItem)
    }
  }, [editingId, timelineItems])

  const updateDraft = (key, value) => {
    setDraft((current) => ({ ...current, [key]: value }))
    setStatus('')
  }

  const resetForm = () => {
    setDraft(emptyTimelineItem)
    setEditingId(null)
  }

  const submitTimelineItem = async (event) => {
    event.preventDefault()
    setIsBusy(true)
    setStatus('')

    const payload = {
      ...draft,
      sortOrder: Number(draft.sortOrder) || 0,
    }

    try {
      if (editingId) {
        await onUpdate(payload)
        setStatus('مرحله مسیر یادگیری ویرایش شد.')
      } else {
        await onCreate(payload)
        setStatus('مرحله مسیر یادگیری اضافه شد.')
      }
      resetForm()
    } catch (error) {
      setStatus(error.message || 'ذخیره مسیر یادگیری انجام نشد.')
    } finally {
      setIsBusy(false)
    }
  }

  const deleteTimelineItem = async (timelineItemId) => {
    setIsBusy(true)
    setStatus('')

    try {
      await onDelete(timelineItemId)
      if (editingId === timelineItemId) resetForm()
      setStatus('مرحله مسیر یادگیری حذف شد.')
    } catch {
      setStatus('حذف مرحله مسیر یادگیری انجام نشد.')
    } finally {
      setIsBusy(false)
    }
  }

  const inputClass =
    'mt-2 w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10'

  return (
    <div className="grid gap-5 border-t border-white/10 pt-6">
      <div>
        <p className="text-sm font-semibold text-cyan-300">مدیریت مسیر یادگیری</p>
        <h3 className="mt-2 text-xl font-bold text-white">
          اضافه، حذف یا ویرایش مرحله‌های Timeline
        </h3>
      </div>

      <form className="grid gap-4" onSubmit={submitTimelineItem}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-200">عنوان مرحله</span>
            <input
              className={inputClass}
              onChange={(event) => updateDraft('title', event.target.value)}
              value={draft.title}
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
            <span className="text-sm font-semibold text-slate-200">توضیح مرحله</span>
            <textarea
              className={`${inputClass} min-h-28 leading-8`}
              onChange={(event) => updateDraft('description', event.target.value)}
              value={draft.description}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button as="button" disabled={isBusy} icon={null} type="submit">
            <Plus aria-hidden="true" size={18} />
            {editingId ? 'ذخیره ویرایش مرحله' : 'اضافه کردن مرحله'}
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
        {timelineItems.map((timelineItem) => (
          <Card className="p-4" key={timelineItem.id ?? timelineItem.title}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-bold text-white">{timelineItem.title}</p>
                <p className="mt-1 line-clamp-2 text-sm leading-7 text-slate-400">
                  {timelineItem.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  as="button"
                  disabled={!timelineItem.id}
                  icon={null}
                  onClick={() => setEditingId(timelineItem.id)}
                  type="button"
                  variant="secondary"
                >
                  <Edit3 aria-hidden="true" size={17} />
                  ویرایش
                </Button>
                <Button
                  as="button"
                  disabled={!timelineItem.id}
                  icon={null}
                  onClick={() => deleteTimelineItem(timelineItem.id)}
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
