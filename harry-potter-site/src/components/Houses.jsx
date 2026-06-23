import { motion } from 'framer-motion'

const housesData = [
  {
    id: 1,
    name: 'Gryffindor',
    animal: '🦁',
    colors: ['#740001', '#D3A625'],
    trait: 'Bravery, courage, nerve and chivalry',
    founder: 'Godric Gryffindor',
  },
  {
    id: 2,
    name: 'Slytherin',
    animal: '🐍',
    colors: ['#1A472A', '#AAAAAA'],
    trait: 'Ambition, cunning, leadership and resourcefulness',
    founder: 'Salazar Slytherin',
  },
  {
    id: 3,
    name: 'Ravenclaw',
    animal: '🦅',
    colors: ['#0E1A40', '#946B2D'],
    trait: 'Intelligence, creativity, learning and wit',
    founder: 'Rowena Ravenclaw',
  },
  {
    id: 4,
    name: 'Hufflepuff',
    animal: '🦡',
    colors: ['#ECB939', '#372E29'],
    trait: 'Hard work, patience, justice and loyalty',
    founder: 'Helga Hufflepuff',
  },
]

function HouseCard({ house }) {
  return (
    <motion.div
      className="house-card"
      style={{ borderColor: house.colors[0], background: `linear-gradient(135deg, ${house.colors[0]}33, #0a0a0a)` }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, borderColor: house.colors[1] }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="house-animal">{house.animal}</div>
      <h2 className="house-name" style={{ color: house.colors[0] }}>{house.name}</h2>
      <p className="house-founder">Founded by {house.founder}</p>
      <p className="house-trait">{house.trait}</p>
    </motion.div>
  )
}

function Houses() {
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
      <div className="houses-grid">
        {housesData.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </section>
  )
}

export default Houses