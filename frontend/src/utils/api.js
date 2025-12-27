const API_BASE_URL = 'http://localhost:3001/api';

const handleApiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const api = {
  // Equipment APIs
  getEquipment: async () => {
    return handleApiCall(`${API_BASE_URL}/equipment`);
  },
  
  createEquipment: async (equipment) => {
    return handleApiCall(`${API_BASE_URL}/equipment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equipment)
    });
  },
  
  updateEquipment: async (id, equipment) => {
    return handleApiCall(`${API_BASE_URL}/equipment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equipment)
    });
  },
  
  deleteEquipment: async (id) => {
    return handleApiCall(`${API_BASE_URL}/equipment/${id}`, {
      method: 'DELETE'
    });
  },

  // Request APIs
  getRequests: async () => {
    return handleApiCall(`${API_BASE_URL}/requests`);
  },
  
  createRequest: async (request) => {
    return handleApiCall(`${API_BASE_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
  },
  
  updateRequest: async (id, request) => {
    return handleApiCall(`${API_BASE_URL}/requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
  },
  
  deleteRequest: async (id) => {
    return handleApiCall(`${API_BASE_URL}/requests/${id}`, {
      method: 'DELETE'
    });
  },

  // Team APIs
  getTeams: async () => {
    return handleApiCall(`${API_BASE_URL}/teams`);
  },
  
  createTeam: async (team) => {
    return handleApiCall(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team)
    });
  },
  
  updateTeam: async (id, team) => {
    return handleApiCall(`${API_BASE_URL}/teams/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team)
    });
  },
  
  deleteTeam: async (id) => {
    return handleApiCall(`${API_BASE_URL}/teams/${id}`, {
      method: 'DELETE'
    });
  },

  // User APIs
  login: async (credentials) => {
    return handleApiCall(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
  },
  
  register: async (user) => {
    return handleApiCall(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  },
  
  getUsers: async () => {
    return handleApiCall(`${API_BASE_URL}/users`);
  }
};