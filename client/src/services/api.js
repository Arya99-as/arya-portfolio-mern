const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';

async function safeJsonParse(response, fallbackError = 'Invalid server response') {
  try {
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    throw new Error(fallbackError);
  }
}

// 1. Projects API
export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  const data = await safeJsonParse(response, 'Failed to parse projects list');
  return Array.isArray(data) ? data : (data.data || []);
};

export const fetchProjectById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project details');
  }
  const data = await safeJsonParse(response, 'Failed to parse project details');
  return data.data || data;
};

// 2. Achievements API
export const fetchAchievements = async () => {
  const response = await fetch(`${API_BASE_URL}/achievements`);
  if (!response.ok) {
    throw new Error('Failed to fetch achievements');
  }
  const data = await safeJsonParse(response, 'Failed to parse achievements list');
  return data.data || (Array.isArray(data) ? data : []);
};

// 3. Gallery API
export const fetchGallery = async () => {
  const response = await fetch(`${API_BASE_URL}/gallery`);
  if (!response.ok) {
    throw new Error('Failed to fetch gallery items');
  }
  const data = await safeJsonParse(response, 'Failed to parse gallery items');
  return data.data || (Array.isArray(data) ? data : []);
};

// 4. Portfolio Stats API
export const fetchStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio statistics');
  }
  const data = await safeJsonParse(response, 'Failed to parse statistics');
  return data.data || data;
};

// 5. Contact API
export const submitContactForm = async (contactData) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactData)
  });

  const data = await safeJsonParse(response, 'Failed to send message');
  if (!response.ok) {
    throw new Error(data.message || 'Failed to send message');
  }
  return data;
};

// 6. Admin Authentication & Management APIs
export const loginAdminApi = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await safeJsonParse(response, 'Server response invalid. Please verify backend server is running.');
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Invalid email or password');
  }
  return data;
};

export const createProjectApi = async (projectData, token) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  const data = await safeJsonParse(response, 'Failed to create project');
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create project');
  }
  return data;
};

export const deleteProjectApi = async (projectId, token) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await safeJsonParse(response, 'Failed to delete project');
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete project');
  }
  return data;
};

export const fetchContactsApi = async (token) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await safeJsonParse(response, 'Failed to fetch contact messages');
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch contact messages');
  }
  return data.data || data;
};

export const fetchAdminDashboardStatsApi = async (token) => {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await safeJsonParse(response, 'Failed to fetch admin stats');
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch admin stats');
  }
  return data;
};
