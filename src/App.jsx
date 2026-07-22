import { PageShell } from './components/layout/PageShell'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Timeline } from './components/sections/Timeline'
import { useOnePageNavigation } from './hooks/useOnePageNavigation'
import { scrollToSection } from './utils/scrollToSection'

function App() {
  useOnePageNavigation()

  return (
    <PageShell>
      <button
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-300 focus:px-4 focus:py-3 focus:font-semibold focus:text-slate-950"
        onClick={() => scrollToSection('about')}
        type="button"
      >
        رفتن به محتوای اصلی
      </button>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </PageShell>
  )
}

export default App
