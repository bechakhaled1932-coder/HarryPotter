import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showSpell, setShowSpell] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const castSpell = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    toggleTheme(next)
    setShowSpell(true)
    setTimeout(() => setShowSpell(false), 1500)
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="navbar-logo">⚡ Hogwarts</h1>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {['houses', 'characters', 'spells', 'quiz'].map((item) => (
          <li key={item}>
            <a href={`#${item}`} onClick={() => setMenuOpen(false)}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-right">
        <motion.button
          className="spell-btn"
          onClick={castSpell}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'dark' ? '☀️ Lumos' : '🌑 Nox'}
        </motion.button>

        <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Spell flash animation */}
      <AnimatePresence>
        {showSpell && (
          <motion.div
            className="spell-flash"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {theme === 'light' ? '✨ Lumos!' : '🌑 Nox!'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar