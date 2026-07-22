import { BriefcaseBusiness, Code2, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

const socialLinks = [
  {
    href: 'https://github.com/mahdipir82',
    icon: Code2,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/mahdi-pirhayati/',
    icon: BriefcaseBusiness,
    label: 'LinkedIn',
  },
]

export function Hero() {
  return (
    <section
      className="mx-auto grid min-h-[calc(100vh-77px)] max-w-6xl items-center gap-12 px-5 py-20 md:px-6 lg:grid-cols-[1.05fr_0.95fr]"
      id="home"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <p className="inline-flex rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-sm font-semibold text-cyan-200">
          توسعه‌دهنده بک‌اند Python و Django
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
          مهدی پیرحیاتی
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-semibold leading-9 text-slate-200">
          ساخت APIهای تمیز، بک‌اندهای قابل توسعه و تجربه‌های Full Stack کاربردی.
        </p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          من دانشجوی مهندسی نرم‌افزار و علاقه‌مند به توسعه وب هستم. تمرکز اصلی
          من روی Python، Django، Django REST Framework و PostgreSQL است و با
          ساخت پروژه‌های واقعی برای ورود حرفه‌ای به بازار کار آماده می‌شوم.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#projects">مشاهده پروژه‌ها</Button>
          <Button href="#contact" variant="secondary">
            تماس با من
          </Button>
          <Button as="button" className="cursor-not-allowed opacity-70" disabled icon="download" type="button" variant="ghost">
            رزومه به‌زودی
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition hover:border-cyan-300/40 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                <Icon aria-hidden="true" size={18} />
                {link.label}
              </a>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.12, duration: 0.55, ease: 'easeOut' }}
      >
        <Card className="relative overflow-hidden p-5">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-300/70 to-transparent" />
          <div className="rounded-lg border border-white/10 bg-slate-950/70 p-5 text-left shadow-inner shadow-cyan-950/30" dir="ltr">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <pre className="overflow-hidden whitespace-pre-wrap text-sm leading-7 text-slate-300">
              <code>{`class MahdiPirhayati:
    focus = ["Django", "REST API", "PostgreSQL"]
    learning = ["React", "Full Stack"]
    location = "Malayer, Iran"

    def build(self):
        return "clean backend systems"`}</code>
            </pre>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <MapPin aria-hidden="true" className="mb-3 text-cyan-300" size={20} />
              <p className="text-sm text-slate-400">موقعیت</p>
              <p className="mt-1 font-semibold text-white">ملایر، ایران</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <Mail aria-hidden="true" className="mb-3 text-cyan-300" size={20} />
              <p className="text-sm text-slate-400">ایمیل</p>
              <p className="mt-1 break-all text-sm font-semibold text-white">
                mahdipirhayati1382@gmail.com
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
