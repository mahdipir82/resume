import { PageShell } from './components/layout/PageShell'
import { Button } from './components/ui/Button'

function App() {
  return (
    <PageShell>
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
        <div>
          <p className="text-sm font-semibold text-cyan-300">Mahdi Pirhayati</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            رزومه و نمونه‌کار مهدی پیرحیاتی
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            توسعه‌دهنده بک‌اند Python و Django، علاقه‌مند به ساخت APIهای تمیز و
            پروژه‌های Full Stack.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects">مشاهده پروژه‌ها</Button>
            <Button href="#contact" variant="secondary">
              تماس با من
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

export default App
