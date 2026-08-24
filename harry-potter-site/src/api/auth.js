const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }

  return data
}

function authHeaders() {
  const token = localStorage.getItem('hp_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const registerUser = (username, email, password) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  })

export const loginUser = (email, password) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const getProfile = () =>
  request('/user/profile', {
    headers: authHeaders(),
  })

export const updateHouse = (house, answers) =>
  request('/user/house', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ house, answers }),
  })

export const updateWand = (wand) =>
  request('/user/wand', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(wand),
  })

export const toggleFavoriteSpell = (spell) =>
  request('/user/spells/favorite', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ spell }),
  })