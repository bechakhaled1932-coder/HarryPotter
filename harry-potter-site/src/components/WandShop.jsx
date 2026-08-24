import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WANDS } from '../data/wands'
import { WAND_QUESTIONS } from '../data/wandQuestions'
import { fadeUp } from '../hooks/useScrollReveal'
import { useAuth } from '../context/AuthContext'
import { updateWand } from '../api/auth'

function WandShop() {
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState({ phoenix: 0, dragon: 0, unicorn: 0, veela: 0 })
  const [result, setResult] = useState(null)
  const [selected, setSelected] = useState(null)
  const [saveStatus, setSaveStatus] = useState('idle') // idle | saving | saved | error

  const { user, refreshUser } = useAuth()

  const handleAnswer = (core) => {
    setSelected(core)
    const newScores = { ...scores, [core]: scores[core] + 1 }
    setScores(newScores)

    setTimeout(async () => {
      if (current + 1 < WAND_QUESTIONS.length) {
        setCurrent(current + 1)
        setSelected(null)
      } else {
        const winner = Object.entries(newScores).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
        setResult(winner)

        if (user) {
          setSaveStatus('saving')
          try {
            const updatedUser = await updateWand(WANDS[winner])
            refreshUser(updatedUser)
            setSaveStatus('saved')
          } catch {
            setSaveStatus('error')
          }
        }
      }
    }, 600)
  }

  const reset = () => {
    setCurrent(0)
    setScores({ phoenix: 0, dragon: 0, unicorn: 0, veela: 0 })
    setResult(null)
    setSelected(null)
    setSaveStatus('idle')
  }

  const wand = result ? WANDS[result] : null

  return (
    <section id="wand-shop" className="wand-section">
      <motion.h2 className="section-title" {...fadeUp}>
        Ollivanders — The Wand Chooses the Wizard
      </motion.h2>
      <motion.p className="wand-intro" {...fadeUp}>
        Answer honestly. It is said that the wand always makes the right choice.
      </motion.p>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={current}
            className="quiz-card"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <div className="quiz-progress">
              Question {current + 1} / {WAND_QUESTIONS.length}
            </div>
            <div className="quiz-progress-bar">
              <motion.div
                className="quiz-progress-fill"
                animate={{ width: `${((current + 1) / WAND_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <h3 className="quiz-question">{WAND_QUESTIONS[current].question}</h3>
            <div className="quiz-options">
              {WAND_QUESTIONS[current].options.map((option, i) => (
                <motion.button
                  key={i}
                  className={`quiz-option ${selected === option.core ? 'selected' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option.core)}
                  disabled={selected !== null}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            className="wand-result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ borderColor: wand.accent, boxShadow: `0 0 40px ${wand.glow}` }}
          >
            <p className="result-label">Your wand has chosen you...</p>
            <div className="wand-emoji">{wand.emoji}</div>
            <h2 className="result-wand" style={{ color: wand.accent }}>
              {wand.wood} & {wand.core}
            </h2>
            <p className="wand-specs">
              {wand.length} · {wand.flexibility}
            </p>
            <p className="result-tagline">"{wand.tagline}"</p>

            {user ? (
              <p className="quiz-save-status">
                {saveStatus === 'saving' && '💾 Saving to your account...'}
                {saveStatus === 'saved' && '✅ Saved to your account!'}
                {saveStatus === 'error' && '⚠️ Could not save, please try again later.'}
              </p>
            ) : (
              <p className="quiz-save-status">
                🔒 Log in to save your wand to your account
              </p>
            )}

            <motion.button
              className="quiz-reset"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default WandShop