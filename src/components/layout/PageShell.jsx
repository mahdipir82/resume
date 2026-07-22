import { AnimatedBackground } from './AnimatedBackground'
import { SideScrollbar } from './SideScrollbar'

export function PageShell({ children, theme }) {
  const themeStyle = {
    '--site-accent': theme?.accentColor ?? '#67e8f9',
    '--site-accent-soft': theme?.accentSoftColor ?? '#22d3ee',
    '--site-bg': theme?.backgroundColor ?? '#020817',
    '--site-bg-end': theme?.backgroundColorEnd ?? '#020617',
    '--site-card-tint': theme?.cardTintColor ?? '#0f172a',
    '--site-secondary-accent': theme?.secondaryAccentColor ?? '#8b5cf6',
  }

  return (
    <div style={themeStyle}>
      <AnimatedBackground theme={theme} />
      <SideScrollbar />
      <div className="relative z-10 min-h-screen overflow-x-hidden text-slate-100">
        {children}
      </div>
    </div>
  )
}
