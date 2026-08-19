import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QUOTES } from '../../data/quotes'

function normalize(str) {
  return str.trim().toLowerCase()
}

function QuotesGame() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState(null) // null | 'correct' | 'incorrect'
  const [finished, setFinished] = useState(false)

  const quote = QUOTES[current]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (status) return

    const isCorrect = normalize(input) === normalize(quote.answer)
    setStatus(isCorrect ? 'correct' : 'incorrect')
    if (isCorrect) setScore((s) => s + 1)

    setTimeout(() => {
      if (current + 1 < QUOTES.length) {
        setCurrent((c) => c + 1)
        setInput('')
        setStatus(null)
      } else {
        setFinished(true)
      }
    }, 1400)
  }

  const reset = () => {
    setCurrent(0)
    setScore(0)
    setInput('')
    setStatus(null)
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
          {score} / {QUOTES.length}
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
        Quote {current + 1} / {QUOTES.length} · Score: {score}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <p className="quote-character">— {quote.character}</p>
          <p className="quote-line">
            "{quote.before} <span className="quote-blank">_____</span>{quote.after}"
          </p>

          <form onSubmit={handleSubmit} className="quote-form">
            <input
              type="text"
              placeholder="Fill in the missing word..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status !== null}
              autoFocus
            />
            <motion.button
              type="submit"
              whileHover={{ scale: status ? 1 : 1.05 }}
              whileTap={{ scale: status ? 1 : 0.95 }}
              disabled={status !== null || input.trim() === ''}
            >
              Check
            </motion.button>
          </form>

          <AnimatePresence>
            {status && (
              <motion.p
                className={`quote-feedback ${status}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {status === 'correct'
                  ? '✨ Correct!'
                  : `❌ The answer was "${quote.answer}"`}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default QuotesGame