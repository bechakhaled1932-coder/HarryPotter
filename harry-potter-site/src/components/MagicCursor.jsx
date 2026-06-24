import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Particle({ x, y, color, id }) {
  const angle = Math.random() * 360
  const distance = 40 + Math.random() * 60
  const tx = Math.cos((angle * Math.PI) / 180) * distance
  const ty = Math.sin((angle * Math.PI) / 180) * distance

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
        zIndex: 99999,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  )
}

function TrailDot({ x, y, index }) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: `rgba(201, 168, 76, ${0.6 - index * 0.1})`,
        pointerEvents: 'none',
        zIndex: 99998,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0.6, scale: 1 }}
      animate={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4 }}
    />
  )
}

const COLORS = ['#c9a84c', '#fff5c0', '#f5c842', '#ffe066', '#ffffff', '#a67c00']

export default function MagicCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [particles, setParticles] = useState([])
  const [trail, setTrail] = useState([])
  const [clicking, setClicking] = useState(false)
  const particleId = useRef(0)
  const trailId = useRef(0)
  const lastTrail = useRef(0)

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = 'auto' }
  }, [])

  // Track mouse movement
  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })

      const now = Date.now()
      if (now - lastTrail.current > 30) {
        lastTrail.current = now
        const id = trailId.current++
        setTrail((prev) => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id }])
        setTimeout(() => {
          setTrail((prev) => prev.filter((t) => t.id !== id))
        }, 400)
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  // Click effect — burst of particles
  useEffect(() => {
    const handleClick = (e) => {
      setClicking(true)
      setTimeout(() => setClicking(false), 150)

      const count = 12
      const newParticles = Array.from({ length: count }, () => {
        const id = particleId.current++
        return { id, x: e.clientX, y: e.clientY, color: COLORS[Math.floor(Math.random() * COLORS.length)] }
      })

      setParticles((prev) => [...prev, ...newParticles])
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((n) => n.id === p.id)))
      }, 900)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      {/* Trail */}
      <AnimatePresence>
        {trail.map((dot, i) => (
          <TrailDot key={dot.id} x={dot.x} y={dot.y} index={i} />
        ))}
      </AnimatePresence>

      {/* Particles on click */}
      <AnimatePresence>
        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} color={p.color} id={p.id} />
        ))}
      </AnimatePresence>

      {/* Wand cursor */}
      <motion.div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          pointerEvents: 'none',
          zIndex: 99999,
          translateX: '-4px',
          translateY: '-4px',
        }}
        animate={{ scale: clicking ? 0.85 : 1 }}
        transition={{ duration: 0.1 }}
      >
        {/* Wand tip glow */}
        <motion.div
          style={{
            position: 'absolute',
            top: -4,
            left: -4,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#fff5c0',
            boxShadow: '0 0 8px 4px rgba(201,168,76,0.8)',
          }}
          animate={{
            boxShadow: clicking
              ? '0 0 20px 10px rgba(201,168,76,1)'
              : ['0 0 6px 3px rgba(201,168,76,0.6)', '0 0 12px 6px rgba(201,168,76,0.9)', '0 0 6px 3px rgba(201,168,76,0.6)'],
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        {/* Wand body */}
        <svg
          width="36"
          height="10"
          viewBox="0 0 36 10"cd
          style={{ transform: 'rotate(135deg)', transformOrigin: '0 0' }}
        >
          {/* Handle */}
          <rect x="10" y="3" width="24" height="4" rx="2" fill="#5c3d1e" />
          {/* Tip */}
          <polygon points="0,5 10,2 10,8" fill="#8B5E3C" />
          {/* Band */}
          <rect x="10" y="3" width="4" height="4" fill="#c9a84c" />
        </svg>
      </motion.div>
    </>
  )
}