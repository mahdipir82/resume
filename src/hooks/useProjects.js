import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { defaultProjects } from '../data/projects'

export function useProjects() {
  const [projects, setProjects] = useState(defaultProjects)
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [projectsError, setProjectsError] = useState('')

  const loadProjects = useCallback(async () => {
    try {
      setProjectsError('')
      const remoteProjects = await api.getProjects()
      setProjects(remoteProjects.length > 0 ? remoteProjects : defaultProjects)
    } catch {
      setProjectsError('اتصال پروژه‌ها به بک‌اند برقرار نشد؛ نسخه پیش‌فرض نمایش داده می‌شود.')
      setProjects(defaultProjects)
    } finally {
      setIsLoadingProjects(false)
    }
  }, [])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  const createProject = async (project) => {
    const createdProject = await api.createProject(project)
    setProjects((current) => [...current, createdProject])
  }

  const updateProject = async (project) => {
    const updatedProject = await api.updateProject(project)
    setProjects((current) =>
      current.map((item) => (item.id === updatedProject.id ? updatedProject : item)),
    )
  }

  const deleteProject = async (projectId) => {
    await api.deleteProject(projectId)
    setProjects((current) => current.filter((project) => project.id !== projectId))
  }

  return {
    createProject,
    deleteProject,
    isLoadingProjects,
    projects,
    projectsError,
    reloadProjects: loadProjects,
    updateProject,
  }
}
