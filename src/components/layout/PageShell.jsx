import { AnimatedBackground } from './AnimatedBackground'

export function PageShell({ children }) {
  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen overflow-x-hidden text-slate-100">
        {children}
      </div>
    </>
  )
}
