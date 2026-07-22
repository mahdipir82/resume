import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { defaultSiteContent } from '../data/siteContent'

export function useSiteContent() {
  const [content, setContent] = useState(defaultSiteContent)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadContent = useCallback(async () => {
    try {
      setError('')
      const remoteContent = await api.getSiteContent()
      setContent({ ...defaultSiteContent, ...remoteContent })
    } catch {
      setError('اتصال به بک‌اند برقرار نشد؛ نسخه پیش‌فرض نمایش داده می‌شود.')
      setContent(defaultSiteContent)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadContent()
  }, [loadContent])

  const saveContent = async (nextContent) => {
    const normalizedContent = { ...defaultSiteContent, ...nextContent }
    const savedContent = await api.saveSiteContent(normalizedContent)
    const mergedContent = { ...defaultSiteContent, ...savedContent }
    setContent(mergedContent)
    return mergedContent
  }

  const resetContent = async () => {
    const resetRemoteContent = await api.resetSiteContent()
    const mergedContent = { ...defaultSiteContent, ...resetRemoteContent }
    setContent(mergedContent)
    return mergedContent
  }

  return { content, error, isLoading, reloadContent: loadContent, resetContent, saveContent }
}
