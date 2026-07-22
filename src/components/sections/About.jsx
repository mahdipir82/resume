import { GraduationCap, HeartHandshake, MapPin, Server } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

const facts = [
  { icon: MapPin, label: 'ساکن ملایر' },
  { icon: GraduationCap, label: 'کارشناسی مهندسی نرم‌افزار' },
  { icon: Server, label: 'علاقه‌مند به توسعه بک‌اند' },
  { icon: HeartHandshake, label: 'آماده همکاری و کارآموزی' },
]

export function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-6" id="about">
      <SectionHeading
        eyebrow="درباره من"
        title="مسیرم را با یادگیری عمیق بک‌اند و ساخت پروژه واقعی جلو می‌برم."
        description="تمرکز من روی نوشتن کد تمیز، طراحی API قابل فهم و کار با داده‌هاست؛ چیزهایی که در پروژه‌های واقعی ارزش خودشان را نشان می‌دهند."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-6 md:p-8">
          <p className="text-lg leading-9 text-slate-200">
            من مهدی پیرحیاتی، دانشجوی مهندسی نرم‌افزار و علاقه‌مند به توسعه وب
            هستم. تمرکز اصلی من روی توسعه بک‌اند با Python و Django، طراحی API
            و کار با پایگاه‌داده PostgreSQL است.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-300">
            با ساخت پروژه‌های واقعی، مهارت‌هایم را مرحله‌به‌مرحله گسترش می‌دهم
            و تلاش می‌کنم برای ورود حرفه‌ای به بازار کار آماده شوم. برای من
            کیفیت ساختار، خوانایی کد و قابلیت توسعه اهمیت زیادی دارد.
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
