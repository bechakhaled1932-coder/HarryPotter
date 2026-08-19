import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TRIVIA_QUESTIONS } from '../../data/trivia'

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function TriviaGame() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [finished, setFinished] = useState(false)

  const question = TRIVIA_QUESTIONS[current]

  const handleAnswer = (option) => {
    if (selected) return
    setSelected(option)
    if (option === question.answer) setScore((s) => s + 1)

    setTimeout(() => {
      if (current + 1 < TRIVIA_QUESTIONS.length) {
        setCurrent((c) => c + 1)
        setSelected(null)
      } else {
        setFinished(true)
      }
    }, 900)
  }

  const reset = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }

  if (finished) {
    return (
      <motion.div
        className="game-result"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="game-result-label">Your score</p>
        <h3 className="game-result-score">
          {score} / {TRIVIA_QUESTIONS.length}
        </h3>
        <motion.button
          className="game-reset-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
        >
          Play Again
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="game-card">
      <div className="game-progress">
        Question {current + 1} / {TRIVIA_QUESTIONS.length} · Score: {score}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="game-question">{question.question}</h3>
          <div className="game-options">
            {question.options.map((option) => {
              const isCorrect = option === question.answer
              const isSelected = option === selected
              let stateClass = ''
              if (selected) {
                if (isCorrect) stateClass = 'correct'
                else if (isSelected) stateClass = 'incorrect'
              }
              return (
                <motion.button
                  key={option}
                  className={`game-option ${stateClass}`}
                  whileHover={{ scale: selected ? 1 : 1.02 }}
                  whileTap={{ scale: selected ? 1 : 0.98 }}
                  onClick={() => handleAnswer(option)}
                  disabled={selected !== null}
                >
                  {option}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TriviaGame