import { PageShell } from './components/layout/PageShell'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Hero } from './components/sections/Hero'
import { Skills } from './components/sections/Skills'

function App() {
  return (
    <PageShell>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
      </main>
    </PageShell>
  )
}

export default App
