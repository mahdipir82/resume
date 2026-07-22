import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { learningTimeline } from '../data/timeline'

const defaultTimelineItems = learningTimeline.map((title, index) => ({
  id: null,
  title,
  description: 'بخشی از مسیر یادگیری و تمرین عملی برای ساخت پروژه‌های وب.',
  sortOrder: index,
}))

function sortTimelineItems(timelineItems) {
  return [...timelineItems].sort(
    (first, second) =>
      (Number(first.sortOrder) || 0) - (Number(second.sortOrder) || 0) ||
      first.title.localeCompare(second.title),
  )
}

export function useTimelineItems() {
  const [timelineItems, setTimelineItems] = useState(defaultTimelineItems)
  const [isLoadingTimeline, setIsLoadingTimeline] = useState(true)
  const [timelineError, setTimelineError] = useState('')

  const loadTimelineItems = useCallback(async () => {
    try {
      setTimelineError('')
      const remoteTimelineItems = await api.getTimelineItems()
      setTimelineItems(
        remoteTimelineItems.length > 0
          ? sortTimelineItems(remoteTimelineItems)
          : defaultTimelineItems,
      )
    } catch {
      setTimelineError('اتصال مسیر یادگیری به بک‌اند برقرار نشد؛ نسخه پیش‌فرض نمایش داده می‌شود.')
      setTimelineItems(defaultTimelineItems)
    } finally {
      setIsLoadingTimeline(false)
    }
  }, [])

  useEffect(() => {
    loadTimelineItems()
  }, [loadTimelineItems])

  const createTimelineItem = async (timelineItem) => {
    const createdTimelineItem = await api.createTimelineItem(timelineItem)
    setTimelineItems((current) => sortTimelineItems([...current, createdTimelineItem]))
  }

  const updateTimelineItem = async (timelineItem) => {
    const updatedTimelineItem = await api.updateTimelineItem(timelineItem)
    setTimelineItems((current) =>
      sortTimelineItems(
        current.map((item) => (item.id === updatedTimelineItem.id ? updatedTimelineItem : item)),
      ),
    )
  }

  const deleteTimelineItem = async (timelineItemId) => {
    await api.deleteTimelineItem(timelineItemId)
    setTimelineItems((current) => current.filter((item) => item.id !== timelineItemId))
  }

  return {
    createTimelineItem,
    deleteTimelineItem,
    isLoadingTimeline,
    reloadTimelineItems: loadTimelineItems,
    timelineError,
    timelineItems,
    updateTimelineItem,
  }
}
