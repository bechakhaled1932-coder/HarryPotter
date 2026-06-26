import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { fadeUp } from '../hooks/useScrollReveal'

const charactersData = [
  {
    id: 1,
    name: 'Harry Potter',
    role: 'The Chosen One',
    house: 'Gryffindor',
    visage: '/visages/Harry.png',
    avatar: '/characters/Harry_Potter.png',
    description: 'The boy who lived. Survived the Killing Curse as an infant, Harry became the greatest hope against Lord Voldemort. Known for his courage, loyalty, and the lightning bolt scar on his forehead.',
  },
  {
    id: 2,
    name: 'Hermione Granger',
    role: 'The Brightest Witch',
    house: 'Gryffindor',
    visage: '/visages/hermoine.png',
    avatar: '/characters/Hermoine.png',
    description: "The most brilliant student Hogwarts has ever seen. Hermione's vast knowledge and quick thinking saved Harry and Ron countless times throughout their adventures.",
  },
  {
    id: 3,
    name: 'Ron Weasley',
    role: 'The Loyal Friend',
    house: 'Gryffindor',
    visage: '/visages/ron.png',
    avatar: '/characters/Ron.png',
    description: "Harry's best friend and the heart of the trio. Ron's humor, loyalty, and unexpected bravery made him an indispensable companion in the fight against dark forces.",
  },
  {
    id: 4,
    name: 'Draco Malfoy',
    role: 'The Rival + l crush dyel aRwa',
    house: 'Slytherin',
    visage: '/visages/draco.png',
    avatar: '/characters/Draco.png',
    description: "Harry's school rival and a proud pure-blood wizard. Though arrogant and cruel, Draco's story reveals the complexity of choices made under pressure and fear.",
  },
  {
    id: 5,
    name: 'Albus Dumbledore',
    role: 'The Headmaster',
    house: 'Gryffindor',
    visage: '/visages/dumbledore.png',
    avatar: '/characters/Dumbledore.png',
    description: 'The greatest wizard of his time and headmaster of Hogwarts. Dumbledore guided Harry with wisdom, love, and carefully kept secrets that shaped the fate of the wizarding world.',
  },
  {
    id: 6,
    name: 'Severus Snape',
    role: 'The Potions Master',
    house: 'Slytherin',
    visage: '/visages/snape.png',
    avatar: '/characters/Snape.png',
    description: "Cold, calculating, and deeply misunderstood. Snape's true loyalty and sacrifice remained hidden until the very end, revealing one of the most complex characters in the wizarding world.",
  },
  {
    id: 7,
    name: 'Rubeus Hagrid',
    role: 'The Keeper of Keys',
    house: 'Gryffindor',
    visage: '/visages/hagrid.png',
    avatar: '/characters/Hagrid.png',
    description: "Half-giant and full-hearted, Hagrid was Harry's first friend in the wizarding world. His love for magical creatures and his fierce loyalty made him a beloved protector of Hogwarts.",
  },
  {
    id: 8,
    name: 'Lord Voldemort',
    role: 'The Dark Lord',
    house: 'Slytherin',
    visage: '/visages/voldemort.png',
    avatar: '/characters/Voldemort.png',
    description: "He who must not be named. Once Tom Riddle, Voldemort became the darkest wizard of all time, feared across the wizarding world for his obsession with immortality and pure-blood supremacy.",
  },
  {
    id: 9,
    name: 'Sirius Black',
    role: 'The Godfather',
    house: 'Gryffindor',
    visage: '/visages/sirius.png',
    avatar: '/characters/Sirius.png',
    description: "Harry's godfather and one of the most loyal friends of James Potter. Wrongly imprisoned in Azkaban for twelve years, Sirius never lost his spirit or his love for Harry.",
  },
  {
    id: 10,
    name: 'Dobby',
    role: 'The Free Elf',
    house: 'None',
    visage: '/visages/dobby.png',
    avatar: '/characters/dobby.png',
    description: "A free house-elf with a heart bigger than any wizard. Dobby's devotion to Harry Potter and his fierce desire for freedom made him one of the most beloved characters in the series.",
  },
]

function Modal({ character, onClose }) {
  return (
    <motion.div
      className="char-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="char-modal"
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 40 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="char-close" onClick={onClose}>✕</button>

        <div className="char-modal-inner">
          <motion.img
            src={character.avatar}
            alt={character.name}
            className="char-modal-avatar"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          />
          <motion.div
            className="char-modal-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span className="char-modal-house">{character.house}</span>
            <h2 className="char-modal-name">{character.name}</h2>
            <p className="char-modal-role">{character.role}</p>
            <div className="char-modal-divider" />
            <p className="char-modal-desc">{character.description}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Characters() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="characters" className="characters-section">
      <motion.h2 className="section-title" {...fadeUp}>
  Characters
</motion.h2>

      <div className="characters-grid">
        {charactersData.map((character) => (
          <motion.div
            key={character.id}
            className="character-card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, borderColor: '#c9a84c' }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            onClick={() => setSelected(character)}
          >
            <img src={character.visage} alt={character.name} className="character-img" />
            <h3 className="character-name">{character.name}</h3>
            <p className="character-role">{character.role}</p>
            <span className="character-house">{character.house}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <Modal character={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Characters