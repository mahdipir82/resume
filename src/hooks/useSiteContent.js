import { useEffect, useState } from 'react'
import { defaultSiteContent } from '../data/siteContent'

const storageKey = 'mahdi-portfolio-content'

export function useSiteContent() {
  const [content, setContent] = useState(defaultSiteContent)

  useEffect(() => {
    try {
      const savedContent = window.localStorage.getItem(storageKey)

      if (savedContent) {
        setContent({ ...defaultSiteContent, ...JSON.parse(savedContent) })
      }
    } catch {
      setContent(defaultSiteContent)
    }
  }, [])

  const saveContent = (nextContent) => {
    const normalizedContent = { ...defaultSiteContent, ...nextContent }
    setContent(normalizedContent)
    window.localStorage.setItem(storageKey, JSON.stringify(normalizedContent))
  }

  const resetContent = () => {
    setContent(defaultSiteContent)
    window.localStorage.removeItem(storageKey)
  }

  return { content, resetContent, saveContent }
}
