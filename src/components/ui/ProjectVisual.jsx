import { ShoppingBag, Sparkles } from 'lucide-react'

export function ProjectVisual({ title }) {
  return (
    <div
      aria-label={`تصویر Placeholder پروژه ${title}`}
      className="relative flex aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-slate-950"
      role="img"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.16),transparent_32%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative m-auto w-[78%] rounded-lg border border-cyan-300/20 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-cyan-100">
            <ShoppingBag aria-hidden="true" size={20} />
            <span className="text-sm font-semibold">Code82</span>
          </div>
          <Sparkles aria-hidden="true" className="text-violet-300" size={18} />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div className="rounded-md border border-white/10 bg-slate-900/70 p-3" key={item}>
              <div className="mb-3 h-12 rounded bg-cyan-300/10" />
              <div className="h-2 rounded bg-white/35" />
              <div className="mt-2 h-2 w-2/3 rounded bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
