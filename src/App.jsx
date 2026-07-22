import { useEffect, useState } from 'react'
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
import { useSkillGroups } from './hooks/useSkillGroups'
import { useSiteContent } from './hooks/useSiteContent'
import { useTimelineItems } from './hooks/useTimelineItems'
import { scrollToSection } from './utils/scrollToSection'

function App() {
  useOnePageNavigation()
  const [showAdminLauncher, setShowAdminLauncher] = useState(false)
  const { content, error, isLoading, resetContent, saveContent } = useSiteContent()
  const {
    createProject,
    deleteProject,
    isLoadingProjects,
    projects,
    projectsError,
    updateProject,
  } = useProjects()
  const {
    createSkillGroup,
    deleteSkillGroup,
    isLoadingSkills,
    skillGroups,
    skillsError,
    updateSkillGroup,
  } = useSkillGroups()
  const {
    createTimelineItem,
    deleteTimelineItem,
    isLoadingTimeline,
    timelineError,
    timelineItems,
    updateTimelineItem,
  } = useTimelineItems()

  useEffect(() => {
    document.title = content.siteTitle || `${content.fullName} | ${content.role}`
  }, [content.fullName, content.role, content.siteTitle])

  useEffect(() => {
    const faviconUrl = content.faviconUrl || '/favicon.svg'
    let faviconLink = document.querySelector("link[rel='icon']")

    if (!faviconLink) {
      faviconLink = document.createElement('link')
      faviconLink.rel = 'icon'
      document.head.appendChild(faviconLink)
    }

    faviconLink.href = faviconUrl

    const extension = faviconUrl.split('?')[0].split('.').pop()
    faviconLink.type = extension === 'svg' ? 'image/svg+xml' : ''
  }, [content.faviconUrl])

  return (
    <PageShell theme={content}>
      <AdminPanel
        showLauncher={showAdminLauncher}
        content={content}
        onCreateProject={createProject}
        onCreateSkillGroup={createSkillGroup}
        onCreateTimelineItem={createTimelineItem}
        onDeleteProject={deleteProject}
        onDeleteSkillGroup={deleteSkillGroup}
        onDeleteTimelineItem={deleteTimelineItem}
        onReset={resetContent}
        onSave={saveContent}
        onUpdateProject={updateProject}
        onUpdateSkillGroup={updateSkillGroup}
        onUpdateTimelineItem={updateTimelineItem}
        projects={projects}
        skillGroups={skillGroups}
        timelineItems={timelineItems}
      />
      {error || projectsError || skillsError || timelineError ? (
        <div className="fixed inset-x-4 bottom-20 z-[80] mx-auto max-w-xl rounded-lg border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm leading-7 text-amber-100 shadow-2xl shadow-black/20 backdrop-blur md:bottom-5">
          {error || projectsError || skillsError || timelineError}
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
      <Header
        initials={content.initials}
        logoUrl={content.logoUrl}
        onLogoDoubleClick={() => setShowAdminLauncher((value) => !value)}
      />
      <main className="pt-20" id="main-content">
        <Hero content={content} />
        <About content={content} />
        <Skills isLoading={isLoadingSkills} skillGroups={skillGroups} />
        <Projects isLoading={isLoadingProjects} projects={projects} />
        <Timeline isLoading={isLoadingTimeline} timelineItems={timelineItems} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </PageShell>
  )
}

export default App
