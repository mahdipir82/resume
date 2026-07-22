import { GraduationCap, HeartHandshake, MapPin, Server } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

export function About({ content }) {
  const facts = [
    { icon: MapPin, label: `ساکن ${content.location}` },
    { icon: GraduationCap, label: content.education },
    { icon: Server, label: content.focus },
    { icon: HeartHandshake, label: content.availability },
  ]

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-6" id="about">
      <SectionHeading
        eyebrow="درباره من"
        title={content.aboutTitle}
        description={content.aboutDescription}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-6 md:p-8">
          <p className="text-lg leading-9 text-slate-200">{content.aboutPrimary}</p>
          <p className="mt-5 text-base leading-8 text-slate-300">
            {content.aboutSecondary}
          </p>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {facts.map((fact, index) => {
            const Icon = fact.icon
            return (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                key={fact.label}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                viewport={{ once: true, amount: 0.4 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full p-5">
                  <Icon aria-hidden="true" className="text-cyan-300" size={24} />
                  <p className="mt-4 font-semibold leading-7 text-white">{fact.label}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
