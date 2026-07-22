import { ArrowLeft, Download } from 'lucide-react'

const variants = {
  primary:
    'border-cyan-300/70 bg-cyan-300 text-slate-950 shadow-cyan-500/20 hover:bg-cyan-200',
  secondary:
    'border-white/10 bg-white/5 text-slate-100 hover:border-cyan-300/50 hover:bg-cyan-300/10',
  ghost:
    'border-transparent bg-transparent text-slate-300 hover:bg-white/5 hover:text-white',
}

export function Button({
  as: Component = 'a',
  children,
  className = '',
  icon = 'arrow',
  variant = 'primary',
  ...props
}) {
  const Icon = icon === 'download' ? Download : ArrowLeft

  return (
    <Component
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold shadow-lg transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon ? <Icon aria-hidden="true" size={18} strokeWidth={2} /> : null}
    </Component>
  )
}
