import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { skillGroups as defaultSkillGroups } from '../data/skills'

function sortSkillGroups(skillGroups) {
  return [...skillGroups].sort(
    (first, second) =>
      (Number(first.sortOrder) || 0) - (Number(second.sortOrder) || 0) ||
      first.title.localeCompare(second.title),
  )
}

export function useSkillGroups() {
  const [skillGroups, setSkillGroups] = useState(defaultSkillGroups)
  const [isLoadingSkills, setIsLoadingSkills] = useState(true)
  const [skillsError, setSkillsError] = useState('')

  const loadSkillGroups = useCallback(async () => {
    try {
      setSkillsError('')
      const remoteSkillGroups = await api.getSkillGroups()
      setSkillGroups(
        remoteSkillGroups.length > 0 ? sortSkillGroups(remoteSkillGroups) : defaultSkillGroups,
      )
    } catch {
      setSkillsError('اتصال مهارت‌ها به بک‌اند برقرار نشد؛ نسخه پیش‌فرض نمایش داده می‌شود.')
      setSkillGroups(defaultSkillGroups)
    } finally {
      setIsLoadingSkills(false)
    }
  }, [])

  useEffect(() => {
    loadSkillGroups()
  }, [loadSkillGroups])

  const createSkillGroup = async (skillGroup) => {
    const createdSkillGroup = await api.createSkillGroup(skillGroup)
    setSkillGroups((current) => sortSkillGroups([...current, createdSkillGroup]))
  }

  const updateSkillGroup = async (skillGroup) => {
    const updatedSkillGroup = await api.updateSkillGroup(skillGroup)
    setSkillGroups((current) =>
      sortSkillGroups(
        current.map((item) => (item.id === updatedSkillGroup.id ? updatedSkillGroup : item)),
      ),
    )
  }

  const deleteSkillGroup = async (skillGroupId) => {
    await api.deleteSkillGroup(skillGroupId)
    setSkillGroups((current) => current.filter((skillGroup) => skillGroup.id !== skillGroupId))
  }

  return {
    createSkillGroup,
    deleteSkillGroup,
    isLoadingSkills,
    reloadSkillGroups: loadSkillGroups,
    skillGroups,
    skillsError,
    updateSkillGroup,
  }
}
