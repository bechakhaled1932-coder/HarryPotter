import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../hooks/useScrollReveal'
import TriviaGame from './games/TriviaGame'
import QuotesGame from './games/QuotesGame'

const TABS = [
  { id: 'trivia', label: '🧠 Trivia' },
  { id: 'quotes', label: '📜 Fill the Blanks' },
]

function GamesSection() {
  const [activeTab, setActiveTab] = useState('trivia')

  return (
    <section id="games" className="games-section">
      <motion.h2 className="section-title" {...fadeUp}>
        Wizarding Games
      </motion.h2>

      <div className="games-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`games-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'trivia' ? <TriviaGame /> : <QuotesGame />}
      </motion.div>
    </section>
  )
}

export default GamesSection