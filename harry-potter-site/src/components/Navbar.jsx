import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

      <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>
    </motion.nav>
  )
}

export default Navbar