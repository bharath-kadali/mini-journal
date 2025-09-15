// API service layer for MiniJournal
const API_BASE_URL = "http://localhost:3000"

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt_token")
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (response.status === 401) {
    // Token expired or invalid - clear it and redirect to login
    localStorage.removeItem("jwt_token")
    window.location.reload()
    throw new Error("Authentication expired")
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Authentication API calls
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    return handleResponse(response)
  },

  register: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    return handleResponse(response)
  },
}

// Journal entries API calls
export const entriesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/entries`, {
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },

  create: async (entryData) => {
    const response = await fetch(`${API_BASE_URL}/entries`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(entryData),
    })
    return handleResponse(response)
  },

  update: async (id, entryData) => {
    const response = await fetch(`${API_BASE_URL}/entries/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(entryData),
    })
    return handleResponse(response)
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/entries/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })

    if (response.status === 401) {
      localStorage.removeItem("jwt_token")
      window.location.reload()
      throw new Error("Authentication expired")
    }

    if (!response.ok) {
      throw new Error(`Failed to delete entry: ${response.status}`)
    }

    return true
  },
}
