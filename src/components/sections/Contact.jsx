import { BriefcaseBusiness, Code2, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

const initialForm = {
  email: '',
  message: '',
  name: '',
  subject: '',
}

export function Contact({ content }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const contactLinks = [
    {
      href: `mailto:${content.email}`,
      icon: Mail,
      label: content.email,
      title: 'ایمیل',
    },
    {
      href: `tel:${content.phone}`,
      icon: Phone,
      label: content.phone,
      title: 'شماره تماس',
    },
    {
      href: content.githubUrl,
      icon: Code2,
      label: content.githubLabel,
      title: 'GitHub',
    },
    {
      href: content.linkedinUrl,
      icon: BriefcaseBusiness,
      label: content.linkedinLabel,
      title: 'LinkedIn',
    },
  ].filter((link) => link.href)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) nextErrors.name = 'نام را وارد کنید.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'ایمیل معتبر وارد کنید.'
    }
    if (!form.subject.trim()) nextErrors.subject = 'موضوع را وارد کنید.'
    if (form.message.trim().length < 10) {
      nextErrors.message = 'پیام باید حداقل ۱۰ کاراکتر باشد.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const body = encodeURIComponent(
      `نام: ${form.name}\nایمیل: ${form.email}\n\n${form.message}`,
    )
    const subject = encodeURIComponent(form.subject)
    window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`
  }

  const inputClass =
    'mt-2 w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10'

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-6" id="contact">
      <SectionHeading
        eyebrow="تماس با من"
        title={content.contactTitle}
        description={content.contactDescription}
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          {contactLinks.map((link) => {
            const Icon = link.icon
            return (
              <Card
                as="a"
                className="block p-5"
                href={link.href}
                key={link.title}
                rel="noreferrer"
                target={link.href.startsWith('http') ? '_blank' : undefined}
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                    <Icon aria-hidden="true" size={21} />
                  </span>
                  <div>
                    <p className="text-sm text-slate-400">{link.title}</p>
                    <p className="mt-1 break-all font-semibold text-white" dir="ltr">
                      {link.label}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-5 md:p-6">
          <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-semibold text-slate-200">
                نام
                <input
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass}
                  name="name"
                  onChange={updateField}
                  placeholder="نام شما"
                  value={form.name}
                />
                {errors.name ? (
                  <span className="mt-2 block text-xs text-rose-300" id="name-error">
                    {errors.name}
                  </span>
                ) : null}
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                ایمیل
                <input
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={Boolean(errors.email)}
                  className={inputClass}
                  dir="ltr"
                  name="email"
                  onChange={updateField}
                  placeholder="you@example.com"
                  type="email"
                  value={form.email}
                />
                {errors.email ? (
                  <span className="mt-2 block text-xs text-rose-300" id="email-error">
                    {errors.email}
                  </span>
                ) : null}
              </label>
            </div>
            <label className="block text-sm font-semibold text-slate-200">
              موضوع
              <input
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                aria-invalid={Boolean(errors.subject)}
                className={inputClass}
                name="subject"
                onChange={updateField}
                placeholder="موضوع پیام"
                value={form.subject}
              />
              {errors.subject ? (
                <span className="mt-2 block text-xs text-rose-300" id="subject-error">
                  {errors.subject}
                </span>
              ) : null}
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              پیام
              <textarea
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-invalid={Boolean(errors.message)}
                className={`${inputClass} min-h-36 resize-y leading-8`}
                name="message"
                onChange={updateField}
                placeholder="پیام خود را بنویسید..."
                value={form.message}
              />
              {errors.message ? (
                <span className="mt-2 block text-xs text-rose-300" id="message-error">
                  {errors.message}
                </span>
              ) : null}
            </label>
            <div>
              <Button as="button" type="submit">
                آماده‌سازی ایمیل
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
