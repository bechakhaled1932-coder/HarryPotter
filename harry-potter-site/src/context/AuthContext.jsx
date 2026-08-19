import { createContext, useContext, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { registerUser, loginUser, getProfile } from '../api/auth.js'

const AuthContext = createContext(null)

const EMAILJS_SERVICE_ID = 'service_fmp3nga'
const EMAILJS_TEMPLATE_ID = 'template_vkwhad6'
const EMAILJS_PUBLIC_KEY = '1Zq4Hy5tP1oExuZYD'

function sendWelcomeEmail(username, email) {
  emailjs
    .send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      { username, to_email: email },
      { publicKey: EMAILJS_PUBLIC_KEY }
    )
    .catch((err) => console.error('❌ Failed to send welcome email:', err))
}

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
      sendWelcomeEmail(data.user.username, data.user.email)
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