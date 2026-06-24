import { motion } from 'framer-motion'
import { fadeUp } from '../hooks/useScrollReveal'

function Footer() {
  return (
    <motion.footer className="footer" {...fadeUp}
    >
      <h2 className="footer-logo">⚡ Hogwarts</h2>
      <p className="footer-quote">"It does not do to dwell on dreams and forget to live."</p>
      <p className="footer-author">— Albus Dumbledore</p>
      <div className="footer-links">
        <a href="#houses">Houses</a>
        <a href="#characters">Characters</a>
        <a href="#spells">Spells</a>
        <a href="#quiz">Quiz</a>
      </div>
      <p className="footer-copy">© 2026 Hogwarts School of Witchcraft and Wizardry</p>
    </motion.footer>
  )
}

export default Footer