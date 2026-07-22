import { AnimatedBackground } from './AnimatedBackground'
import { SideScrollbar } from './SideScrollbar'

export function PageShell({ children }) {
  return (
    <>
      <AnimatedBackground />
      <SideScrollbar />
      <div className="relative z-10 min-h-screen overflow-x-hidden text-slate-100">
        {children}
      </div>
    </>
  )
}
