import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  top: `${8 + ((index * 37) % 82)}%`,
  right: `${4 + ((index * 53) % 88)}%`,
  delay: index * 0.35,
  size: 2 + (index % 3),
}))

export function AnimatedBackground() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020817]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_20%_25%,rgba(168,85,247,0.12),transparent_32%),linear-gradient(180deg,#020817_0%,#06111f_48%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:56px_56px]" />
      <motion.div
        aria-hidden="true"
        className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl"
        animate={reducedMotion ? undefined : { y: [0, 28, 0], x: [0, -18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-20 bottom-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
        animate={reducedMotion ? undefined : { y: [0, -24, 0], x: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {particles.map((particle) => (
        <motion.span
          aria-hidden="true"
          className="absolute rounded-full bg-cyan-200/50"
          key={particle.id}
          style={{
            height: particle.size,
            right: particle.right,
            top: particle.top,
            width: particle.size,
          }}
          animate={reducedMotion ? undefined : { opacity: [0.18, 0.75, 0.18], y: [0, -18, 0] }}
          transition={{
            delay: particle.delay,
            duration: 5 + (particle.id % 4),
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
