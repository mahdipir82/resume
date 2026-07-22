export function Card({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component
      className={`rounded-lg border border-white/10 bg-white/[0.045] shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition duration-200 hover:border-cyan-300/35 hover:bg-white/[0.065] ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
