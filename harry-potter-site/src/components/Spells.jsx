import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeUp, zoomIn } from '../hooks/useScrollReveal'

const spellsData = [
  { id: 1, name: 'Expelliarmus', type: 'Charm', description: 'Disarms your opponent, forcing them to drop whatever they are holding.', color: '#c8102e', icon: '⚡' },
  { id: 2, name: 'Lumos', type: 'Charm', description: 'Creates a beam of light at the tip of the wand, illuminating dark places.', color: '#eeba30', icon: '💡' },
  { id: 3, name: 'Wingardium Leviosa', type: 'Charm', description: 'Levitates objects into the air with a swish and flick of the wand.', color: '#946b2d', icon: '🪄' },
  { id: 4, name: 'Avada Kedavra', type: 'Unforgivable', description: 'The Killing Curse. One of the three Unforgivable Curses, it causes instant death.', color: '#1a472a', icon: '💀' },
  { id: 5, name: 'Patronus', type: 'Charm', description: 'Conjures a spirit guardian that protects against Dementors.', color: '#5e8cde', icon: '🦌' },
  { id: 6, name: 'Alohomora', type: 'Charm', description: 'Unlocks doors and windows that are not protected by magic.', color: '#ecb939', icon: '🔓' },
  { id: 7, name: 'Crucio', type: 'Unforgivable', description: 'Inflicts intense pain on the victim. One of the three Unforgivable Curses.', color: '#740001', icon: '😱' },
  { id: 8, name: 'Accio', type: 'Charm', description: 'Summons objects to the caster from a distance.', color: '#0e1a40', icon: '🌀' },
]

function SpellCard({ spell }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="spell-card-wrapper"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="spell-card-inner"
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s ease',
        }}
      >
        {/* Front */}
        <div className="spell-front" style={{ borderColor: spell.color }}>
          <div className="spell-icon">{spell.icon}</div>
          <h3 className="spell-name" style={{ color: spell.color }}>{spell.name}</h3>
          <span className="spell-type" style={{ borderColor: spell.color, color: spell.color }}>{spell.type}</span>
          <p className="spell-hint">Click to reveal</p>
        </div>

        {/* Back */}
        <div
          className="spell-back"
          style={{
            borderColor: spell.color,
            background: `linear-gradient(135deg, ${spell.color}33, #0a0a0a)`,
          }}
        >
          <h3 className="spell-name" style={{ color: spell.color }}>{spell.name}</h3>
          <p className="spell-description">{spell.description}</p>
        </div>
      </div>
    </div>
  )
}

function Spells() {
  return (
    <section id="spells" className="spells-section">
      <motion.h2 className="section-title" {...fadeUp}>
  Spells & Magic
</motion.h2>
      <p className="spells-subtitle">Click on a card to reveal the spell</p>
      <div className="spells-grid">
        {spellsData.map((spell) => (
          <motion.div
            key={spell.id} {...zoomIn} transition={{ ...zoomIn.transition, delay: spell.id * 0.08 }}
          >
            <SpellCard spell={spell} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Spells