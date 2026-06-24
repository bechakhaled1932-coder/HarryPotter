import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HOUSES } from '../data/houses'
import { fadeUp } from '../hooks/useScrollReveal'

const questions = [
  {
    id: 1,
    question: 'You find a wallet full of money on the street. What do you do?',
    options: [
      { text: 'Return it immediately, no hesitation', house: 'gryffindor' },
      { text: 'Keep it, finders keepers', house: 'slytherin' },
      { text: 'Research the best way to find the owner', house: 'ravenclaw' },
      { text: 'Turn it in to the nearest police station', house: 'hufflepuff' },
    ],
  },
  {
    id: 2,
    question: 'What would you most like to be known for?',
    options: [
      { text: 'My bravery and heroism', house: 'gryffindor' },
      { text: 'My power and success', house: 'slytherin' },
      { text: 'My wisdom and knowledge', house: 'ravenclaw' },
      { text: 'My kindness and loyalty', house: 'hufflepuff' },
    ],
  },
  {
    id: 3,
    question: 'Which subject would you excel at in Hogwarts?',
    options: [
      { text: 'Defense Against the Dark Arts', house: 'gryffindor' },
      { text: 'Potions', house: 'slytherin' },
      { text: 'Charms', house: 'ravenclaw' },
      { text: 'Herbology', house: 'hufflepuff' },
    ],
  },
  {
    id: 4,
    question: 'Your greatest fear is...',
    options: [
      { text: 'Being seen as a coward', house: 'gryffindor' },
      { text: 'Failure and mediocrity', house: 'slytherin' },
      { text: 'Ignorance and stupidity', house: 'ravenclaw' },
      { text: 'Losing the people I love', house: 'hufflepuff' },
    ],
  },
  {
    id: 5,
    question: 'Choose a magical creature as your companion:',
    options: [
      { text: '🦁 Lion — bold and majestic', house: 'gryffindor' },
      { text: '🐍 Serpent — wise and cunning', house: 'slytherin' },
      { text: '🦅 Eagle — free and sharp-eyed', house: 'ravenclaw' },
      { text: '🦡 Badger — loyal and hardworking', house: 'hufflepuff' },
    ],
  },
]

function Quiz() {
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState({ gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 })
  const [result, setResult] = useState(null)
  const [selected, setSelected] = useState(null)

  const handleAnswer = (house) => {
    setSelected(house)
    const newScores = { ...scores, [house]: scores[house] + 1 }
    setScores(newScores)

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1)
        setSelected(null)
      } else {
        const winner = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b)[0]
        setResult(winner)
      }
    }, 600)
  }

  const reset = () => {
    setCurrent(0)
    setScores({ gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 })
    setResult(null)
    setSelected(null)
  }

  const house = result ? HOUSES[result] : null

  return (
    <section id="quiz" className="quiz-section">
      <motion.h2 className="section-title" {...fadeUp}>
  Find Your House
</motion.h2>

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
              Question {current + 1} / {questions.length}
            </div>
            <div className="quiz-progress-bar">
              <motion.div
                className="quiz-progress-fill"
                animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <h3 className="quiz-question">{questions[current].question}</h3>
            <div className="quiz-options">
              {questions[current].options.map((option, i) => (
                <motion.button
                  key={i}
                  className={`quiz-option ${selected === option.house ? 'selected' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option.house)}
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
            className="quiz-result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ borderColor: house.accent, boxShadow: `0 0 40px ${house.glow}` }}
          >
            <p className="result-label">You belong in...</p>
            <img src={house.logo} alt={house.name} className="result-logo" />
            <h2 className="result-house" style={{ color: house.accent2 }}>{house.name}</h2>
            <p className="result-tagline">"{house.tagline}"</p>
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

export default Quiz