import { BriefcaseBusiness, Code2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 text-slate-400 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} مهدی پیرحیاتی. طراحی و توسعه با React
        </p>
        <div className="flex items-center gap-3">
          <a
            aria-label="GitHub مهدی پیرحیاتی"
            className="rounded-lg p-2 transition hover:bg-white/5 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            href="https://github.com/mahdipir82"
            rel="noreferrer"
            target="_blank"
          >
            <Code2 aria-hidden="true" size={19} />
          </a>
          <a
            aria-label="LinkedIn مهدی پیرحیاتی"
            className="rounded-lg p-2 transition hover:bg-white/5 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            href="https://www.linkedin.com/in/mahdi-pirhayati/"
            rel="noreferrer"
            target="_blank"
          >
            <BriefcaseBusiness aria-hidden="true" size={19} />
          </a>
        </div>
      </div>
    </footer>
  )
}
