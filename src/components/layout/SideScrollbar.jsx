import { useEffect, useRef, useState } from 'react'

function getScrollMetrics() {
  const scrollHeight = document.documentElement.scrollHeight
  const viewportHeight = window.innerHeight
  const maxScroll = Math.max(scrollHeight - viewportHeight, 1)
  const progress = window.scrollY / maxScroll
  const thumbHeight = Math.max((viewportHeight / scrollHeight) * 100, 12)

  return {
    maxScroll,
    progress: Math.min(Math.max(progress, 0), 1),
    thumbHeight,
  }
}

export function SideScrollbar() {
  const [metrics, setMetrics] = useState({ maxScroll: 1, progress: 0, thumbHeight: 18 })
  const trackRef = useRef(null)
  const isDraggingRef = useRef(false)
  const wheelSpeed = 2.6

  useEffect(() => {
    const updateMetrics = () => setMetrics(getScrollMetrics())

    updateMetrics()
    window.addEventListener('scroll', updateMetrics, { passive: true })
    window.addEventListener('resize', updateMetrics)

    return () => {
      window.removeEventListener('scroll', updateMetrics)
      window.removeEventListener('resize', updateMetrics)
    }
  }, [])

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!isDraggingRef.current || !trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const position = (event.clientY - rect.top) / rect.height
      const nextProgress = Math.min(Math.max(position, 0), 1)

      window.scrollTo({ top: nextProgress * metrics.maxScroll })
    }

    const handlePointerUp = () => {
      isDraggingRef.current = false
      document.body.style.userSelect = ''
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [metrics.maxScroll])

  const scrollFromTrack = (event) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const position = (event.clientY - rect.top) / rect.height

    window.scrollTo({
      behavior: 'smooth',
      top: Math.min(Math.max(position, 0), 1) * metrics.maxScroll,
    })
  }

  const scrollWithWheel = (event) => {
    window.scrollBy({
      behavior: 'auto',
      left: 0,
      top: event.deltaY * wheelSpeed,
    })
  }

  const startDrag = (event) => {
    event.preventDefault()
    isDraggingRef.current = true
    document.body.style.userSelect = 'none'
  }

  const availableSpace = 100 - metrics.thumbHeight
  const thumbTop = metrics.progress * availableSpace

  return (
    <div
      aria-label="اسکرول صفحه"
      className="fixed right-3 top-1/2 z-[70] hidden h-[58vh] -translate-y-1/2 md:block"
      role="presentation"
    >
      <button
        aria-label="رفتن به محل کلیک‌شده در صفحه"
        className="relative h-full w-4 rounded-full border border-white/10 bg-white/5 p-0 shadow-lg shadow-black/20 backdrop-blur transition hover:border-cyan-300/35 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        onClick={scrollFromTrack}
        onWheel={scrollWithWheel}
        ref={trackRef}
        type="button"
      >
        <span
          aria-hidden="true"
          className="absolute left-1/2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.55)] transition-[background-color]"
          onPointerDown={startDrag}
          style={{
            height: `${metrics.thumbHeight}%`,
            top: `${thumbTop}%`,
          }}
        />
      </button>
    </div>
  )
}
