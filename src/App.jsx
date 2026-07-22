import { PageShell } from './components/layout/PageShell'
import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'

function App() {
  return (
    <PageShell>
      <Header />
      <main>
        <Hero />
      </main>
    </PageShell>
  )
}

export default App
