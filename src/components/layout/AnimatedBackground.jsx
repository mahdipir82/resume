import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  top: `${8 + ((index * 37) % 82)}%`,
  right: `${4 + ((index * 53) % 88)}%`,
  delay: index * 0.35,
  size: 2 + (index % 3),
}))

export function AnimatedBackground({ theme }) {
  const reducedMotion = useReducedMotion()
  const animationEnabled = theme?.animationEnabled !== false
  const motionEnabled = animationEnabled && !reducedMotion
  const speed = Number(theme?.animationSpeed) || 1
  const intensity = Number(theme?.animationIntensity) || 1
  const primaryOpacity = Math.min(0.26, 0.18 * intensity)
  const secondaryOpacity = Math.min(0.22, 0.12 * intensity)
  const particleOpacity = Math.min(0.75, 0.5 * intensity)

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: 'var(--site-bg)' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at top right, color-mix(in srgb, var(--site-accent-soft) ${primaryOpacity * 100}%, transparent), transparent 34%), radial-gradient(circle at 20% 25%, color-mix(in srgb, var(--site-secondary-accent) ${secondaryOpacity * 100}%, transparent), transparent 32%), linear-gradient(180deg, var(--site-bg) 0%, var(--site-card-tint) 48%, var(--site-bg-end) 100%)`,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:56px_56px]"
        animate={motionEnabled ? { backgroundPosition: ['0px 0px', '56px 56px'] } : undefined}
        transition={{ duration: 18 / speed, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -inset-x-32 top-1/3 h-32 rotate-[-10deg] bg-gradient-to-l from-transparent via-[var(--site-accent)] to-transparent blur-2xl"
        style={{ opacity: 0.08 * intensity }}
        animate={motionEnabled ? { x: ['25%', '-25%', '25%'] } : undefined}
        transition={{ duration: 16 / speed, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-32 top-20 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'var(--site-accent-soft)', opacity: 0.14 * intensity }}
        animate={motionEnabled ? { y: [0, 28, 0], x: [0, -18, 0] } : undefined}
        transition={{ duration: 12 / speed, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-20 bottom-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'var(--site-secondary-accent)', opacity: 0.1 * intensity }}
        animate={motionEnabled ? { y: [0, -24, 0], x: [0, 18, 0] } : undefined}
        transition={{ duration: 14 / speed, repeat: Infinity, ease: 'easeInOut' }}
      />
      {particles.map((particle) => (
        <motion.span
          aria-hidden="true"
          className="absolute rounded-full"
          key={particle.id}
          style={{
            background: 'var(--site-accent)',
            height: particle.size,
            opacity: particleOpacity,
            right: particle.right,
            top: particle.top,
            width: particle.size,
          }}
          animate={motionEnabled ? { opacity: [0.18, particleOpacity, 0.18], y: [0, -18, 0] } : undefined}
          transition={{
            delay: particle.delay,
            duration: (5 + (particle.id % 4)) / speed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
