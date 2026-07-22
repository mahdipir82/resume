import { AnimatedBackground } from './AnimatedBackground'

export function PageShell({ children }) {
  return (
    <>
      <AnimatedBackground />
      <div className="relative isolate min-h-screen text-slate-100">{children}</div>
    </>
  )
}
