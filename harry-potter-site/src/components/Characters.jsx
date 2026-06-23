import { motion } from 'framer-motion'

const charactersData = [
  { id: 1, name: 'Harry Potter', role: 'The Chosen One', house: 'Gryffindor', emoji: '⚡' },
  { id: 2, name: 'Hermione Granger', role: 'The Brightest Witch', house: 'Gryffindor', emoji: '📚' },
  { id: 3, name: 'Ron Weasley', role: 'The Loyal Friend', house: 'Gryffindor', emoji: '♟️' },
  { id: 4, name: 'Draco Malfoy', role: 'The Rival', house: 'Slytherin', emoji: '🐍' },
  { id: 5, name: 'Luna Lovegood', role: 'The Dreamer', house: 'Ravenclaw', emoji: '🌙' },
  { id: 6, name: 'Cedric Diggory', role: 'The Champion', house: 'Hufflepuff', emoji: '🏆' },
]

function CharacterCard({ character }) {
  return (
    <motion.div
      className="character-card"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ rotateY: 10, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="character-emoji">{character.emoji}</div>
      <h3 className="character-name">{character.name}</h3>
      <p className="character-role">{character.role}</p>
      <span className="character-house">{character.house}</span>
    </motion.div>
  )
}

function Characters() {
  return (
    <section id="characters" className="characters-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Characters
      </motion.h2>
      <div className="characters-grid">
        {charactersData.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  )
}

export default Characters