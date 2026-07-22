import { PageShell } from './components/layout/PageShell'
import { AdminPanel } from './components/admin/AdminPanel'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Timeline } from './components/sections/Timeline'
import { useOnePageNavigation } from './hooks/useOnePageNavigation'
import { useProjects } from './hooks/useProjects'
import { useSiteContent } from './hooks/useSiteContent'
import { scrollToSection } from './utils/scrollToSection'

function App() {
  useOnePageNavigation()
  const { content, error, isLoading, resetContent, saveContent } = useSiteContent()
  const {
    createProject,
    deleteProject,
    isLoadingProjects,
    projects,
    projectsError,
    updateProject,
  } = useProjects()

  return (
    <PageShell theme={content}>
      <AdminPanel
        content={content}
        onCreateProject={createProject}
        onDeleteProject={deleteProject}
        onReset={resetContent}
        onSave={saveContent}
        onUpdateProject={updateProject}
        projects={projects}
      />
      {error || projectsError ? (
        <div className="fixed inset-x-4 bottom-20 z-[80] mx-auto max-w-xl rounded-lg border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm leading-7 text-amber-100 shadow-2xl shadow-black/20 backdrop-blur md:bottom-5">
          {error || projectsError}
        </div>
      ) : null}
      {isLoading ? (
        <div className="fixed left-5 top-5 z-[80] rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 backdrop-blur">
          اتصال به بک‌اند...
        </div>
      ) : null}
      <button
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-300 focus:px-4 focus:py-3 focus:font-semibold focus:text-slate-950"
        onClick={() => scrollToSection('about')}
        type="button"
      >
        رفتن به محتوای اصلی
      </button>
      <Header initials={content.initials} />
      <main id="main-content">
        <Hero content={content} />
        <About content={content} />
        <Skills />
        <Projects isLoading={isLoadingProjects} projects={projects} />
        <Timeline />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </PageShell>
  )
}

export default App
