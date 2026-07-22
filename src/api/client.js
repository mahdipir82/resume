const loopbackHosts = ['localhost', '127.0.0.1']

function getApiBaseUrl() {
  const fallbackHost = typeof window === 'undefined' ? '127.0.0.1' : window.location.hostname
  const configuredUrl = import.meta.env.VITE_API_URL ?? `http://${fallbackHost}:8000/api`

  if (typeof window === 'undefined') {
    return configuredUrl.replace(/\/$/, '')
  }

  try {
    const url = new URL(configuredUrl)

    if (loopbackHosts.includes(url.hostname) && loopbackHosts.includes(window.location.hostname)) {
      url.hostname = window.location.hostname
    }

    return url.toString().replace(/\/$/, '')
  } catch {
    return configuredUrl.replace(/\/$/, '')
  }
}

const apiBaseUrl = getApiBaseUrl()

async function request(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.detail ?? 'Request failed')
  }

  return data
}

export const api = {
  getAdminStatus: () => request('/admin/status/'),
  getProjects: () => request('/projects/'),
  getSkillGroups: () => request('/skill-groups/'),
  getSiteContent: () => request('/site-content/'),
  getTimelineItems: () => request('/timeline-items/'),
  createProject: (project) =>
    request('/projects/', {
      body: JSON.stringify(project),
      method: 'POST',
    }),
  createSkillGroup: (skillGroup) =>
    request('/skill-groups/', {
      body: JSON.stringify(skillGroup),
      method: 'POST',
    }),
  createTimelineItem: (timelineItem) =>
    request('/timeline-items/', {
      body: JSON.stringify(timelineItem),
      method: 'POST',
    }),
  deleteProject: (projectId) => request(`/projects/${projectId}/`, { method: 'DELETE' }),
  deleteSkillGroup: (skillGroupId) =>
    request(`/skill-groups/${skillGroupId}/`, { method: 'DELETE' }),
  deleteTimelineItem: (timelineItemId) =>
    request(`/timeline-items/${timelineItemId}/`, { method: 'DELETE' }),
  loginAdmin: (username, password) =>
    request('/admin/login/', {
      body: JSON.stringify({ password, username }),
      method: 'POST',
    }),
  logoutAdmin: () => request('/admin/logout/', { method: 'POST' }),
  resetSiteContent: () => request('/site-content/reset/', { method: 'POST' }),
  saveSiteContent: (content) =>
    request('/site-content/', {
      body: JSON.stringify(content),
      method: 'PUT',
    }),
  updateProject: (project) =>
    request(`/projects/${project.id}/`, {
      body: JSON.stringify(project),
      method: 'PUT',
    }),
  updateSkillGroup: (skillGroup) =>
    request(`/skill-groups/${skillGroup.id}/`, {
      body: JSON.stringify(skillGroup),
      method: 'PUT',
    }),
  updateTimelineItem: (timelineItem) =>
    request(`/timeline-items/${timelineItem.id}/`, {
      body: JSON.stringify(timelineItem),
      method: 'PUT',
    }),
  setupAdmin: (username, password) =>
    request('/admin/setup/', {
      body: JSON.stringify({ password, username }),
      method: 'POST',
    }),
}
