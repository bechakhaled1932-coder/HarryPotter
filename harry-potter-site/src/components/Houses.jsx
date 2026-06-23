import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const housesData = [
  {
    id: 1,
    name: 'Gryffindor',
    image: '/Gryffinfor.jpg',
    colors: ['#740001', '#D3A625'],
    trait: 'Bravery, courage, nerve and chivalry',
    founder: 'Godric Gryffindor',
  },
  {
    id: 2,
    name: 'Slytherin',
    image: '/Slytherin.jpg',
    colors: ['#1A472A', '#AAAAAA'],
    trait: 'Ambition, cunning, leadership and resourcefulness',
    founder: 'Salazar Slytherin',
  },
  {
    id: 3,
    name: 'Ravenclaw',
    image: '/Ravenclaw.jpg',
    colors: ['#0E1A40', '#946B2D'],
    trait: 'Intelligence, creativity, learning and wit',
    founder: 'Rowena Ravenclaw',
  },
  {
    id: 4,
    name: 'Hufflepuff',
    image: '/Hufflepuff.jpg',
    colors: ['#ECB939', '#372E29'],
    trait: 'Hard work, patience, justice and loyalty',
    founder: 'Helga Hufflepuff',
  },
]

function Houses() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % housesData.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + housesData.length) % housesData.length)
  }

  const house = housesData[current]

  return (
    <section id="houses" className="houses-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        The Four Houses
      </motion.h2>

      <div className="carousel-container">
        <button className="carousel-btn" onClick={goPrev}>‹</button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={house.id}
            className="house-card"
            style={{
              borderColor: house.colors[0],
              background: `linear-gradient(135deg, ${house.colors[0]}44, #0a0a0a)`,
            }}
            custom={direction}
            initial={{ opacity: 0, x: direction * 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -200 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={house.image}
              alt={house.name}
              className="house-logo"
            />
            <h2 className="house-name" style={{ color: house.colors[0] }}>
              {house.name}
            </h2>
            <p className="house-founder">Founded by {house.founder}</p>
            <p className="house-trait">{house.trait}</p>
          </motion.div>
        </AnimatePresence>

        <button className="carousel-btn" onClick={goNext}>›</button>
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {housesData.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
          />
        ))}
      </div>
    </section>
  )
}

export default Houses