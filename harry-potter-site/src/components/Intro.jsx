import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Intro({ onEnter }) {
  const [leaving, setLeaving] = useState(false)

  const handleEnter = () => {
    setLeaving(true)
    setTimeout(onEnter, 1000)
  }

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          className="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="intro-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <motion.h1
              className="intro-title"
              animate={{
                textShadow: [
                  '0 0 20px rgba(201,168,76,0.5)',
                  '0 0 50px rgba(201,168,76,1)',
                  '0 0 20px rgba(201,168,76,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡ Hogwarts
            </motion.h1>
            <p className="intro-subtitle">School of Witchcraft and Wizardry</p>
            <motion.button
              className="intro-btn"
              onClick={handleEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 10px rgba(201,168,76,0.3)',
                  '0 0 25px rgba(201,168,76,0.8)',
                  '0 0 10px rgba(201,168,76,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🪄 Enter Hogwarts
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="leaving"
          className="intro-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      )}
    </AnimatePresence>
  )
}