import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { HOUSES, HOUSE_IDS } from '../data/houses'
import { fadeUp, fadeLeft, fadeRight } from '../hooks/useScrollReveal'


function Houses() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % HOUSE_IDS.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + HOUSE_IDS.length) % HOUSE_IDS.length)
  }

  const houseKey = HOUSE_IDS[currentIndex]
  const house = HOUSES[houseKey]

  return (
    <section id="houses" className="houses-section">
      <motion.h2 className="section-title" {...fadeUp}>
  The Four Houses
</motion.h2>

      <div className="carousel-container">
        <button className="carousel-btn" onClick={goPrev}>‹</button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={houseKey}
            className="house-card"
            style={{
              borderColor: house.accent,
              background: `linear-gradient(135deg, ${house.accent}44, #0a0a0a)`,
              boxShadow: `0 0 30px ${house.glow}`,
            }}
            custom={direction}
            initial={{ opacity: 0, x: direction * 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -200 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={house.logo}
              alt={house.name}
              className="house-logo"
            />
            <h2 className="house-name" style={{ color: house.accent2 }}>
              {house.name}
            </h2>
            <p className="house-tagline">"{house.tagline}"</p>
          </motion.div>
        </AnimatePresence>

        <button className="carousel-btn" onClick={goNext}>›</button>
      </div>

      <div className="carousel-dots">
        {HOUSE_IDS.map((id, i) => (
          <button
            key={id}
            className={`dot ${i === currentIndex ? 'active' : ''}`}
            style={i === currentIndex ? { background: HOUSES[id].accent2, borderColor: HOUSES[id].accent2 } : {}}
            onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
          />
        ))}
      </div>
    </section>
  )
}

export default Houses