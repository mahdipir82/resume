const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

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
  getSiteContent: () => request('/site-content/'),
  createProject: (project) =>
    request('/projects/', {
      body: JSON.stringify(project),
      method: 'POST',
    }),
  deleteProject: (projectId) => request(`/projects/${projectId}/`, { method: 'DELETE' }),
  loginAdmin: (password) =>
    request('/admin/login/', {
      body: JSON.stringify({ password }),
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
  setupAdmin: (password) =>
    request('/admin/setup/', {
      body: JSON.stringify({ password }),
      method: 'POST',
    }),
}
