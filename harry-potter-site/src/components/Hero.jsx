import { motion } from 'framer-motion'

function Hero() {
  return (
    <div className="hero">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="hero-title"
      >
        ⚡ Welcome to Hogwarts ⚡
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="hero-subtitle"
      >
        Where magic begins...
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="hero-btn"
      >
        Enter Hogwarts
      </motion.button>
    </div>
  )
}

export default Hero