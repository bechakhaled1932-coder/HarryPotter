import { createContext, useContext, useState, useEffect } from 'react'
import { registerUser, loginUser, getProfile } from '../api/auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('hp_token'))
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    async function loadProfile() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const profile = await getProfile()
        setUser(profile)
      } catch {
        localStorage.removeItem('hp_token')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [token])

  async function register(username, email, password) {
    setAuthError(null)
    try {
      const data = await registerUser(username, email, password)
      localStorage.setItem('hp_token', data.token)
      setToken(data.token)
      setUser(data.user)
      return true
    } catch (err) {
      setAuthError(err.message)
      return false
    }
  }

  async function login(email, password) {
    setAuthError(null)
    try {
      const data = await loginUser(email, password)
      localStorage.setItem('hp_token', data.token)
      setToken(data.token)
      setUser(data.user)
      return true
    } catch (err) {
      setAuthError(err.message)
      return false
    }
  }

  function logout() {
    localStorage.removeItem('hp_token')
    setToken(null)
    setUser(null)
  }

  function refreshUser(updatedUser) {
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, authError, register, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}