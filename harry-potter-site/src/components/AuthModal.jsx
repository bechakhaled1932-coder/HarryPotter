import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

function AuthModal({ open, onClose }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login, register, authError } = useAuth()

  const resetFields = () => {
    setUsername('')
    setEmail('')
    setPassword('')
  }

  const switchMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'))
    resetFields()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const success =
      mode === 'login'
        ? await login(email, password)
        : await register(username, email, password)
    setSubmitting(false)

    if (success) {
      resetFields()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="auth-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="auth-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="auth-modal-close" onClick={onClose}>
              ✕
            </button>

            <h2>{mode === 'login' ? '🔑 Connexion' : '✨ Inscription'}</h2>

            <form onSubmit={handleSubmit} className="auth-form">
              {mode === 'register' && (
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />

              {authError && <p className="auth-error">{authError}</p>}

              <motion.button
                type="submit"
                className="auth-submit-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={submitting}
              >
                {submitting
                  ? 'Un instant...'
                  : mode === 'login'
                  ? 'Se connecter'
                  : "S'inscrire"}
              </motion.button>
            </form>

            <p className="auth-switch">
              {mode === 'login' ? 'Pas encore de compte ?' : 'Déjà un compte ?'}{' '}
              <button type="button" onClick={switchMode}>
                {mode === 'login' ? "S'inscrire" : 'Se connecter'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal