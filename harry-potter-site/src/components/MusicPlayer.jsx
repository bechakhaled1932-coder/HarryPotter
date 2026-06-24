import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/music/Hedwigs Theme.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.4

    // Autoplay dès que possible
    const play = () => {
      audioRef.current.play().catch(() => {
        // Si le navigateur bloque l'autoplay, on joue au premier clic
        document.addEventListener('click', () => audioRef.current.play(), { once: true })
      })
    }
    play()

    return () => {
      audioRef.current.pause()
      audioRef.current = null
    }
  }, [])

  const toggleMute = () => {
    audioRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <motion.button
      className="mute-btn"
      onClick={toggleMute}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={!muted ? {
        boxShadow: ['0 0 8px #c9a84c', '0 0 20px #c9a84c', '0 0 8px #c9a84c']
      } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
      title={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? '🔇' : '🔊'}
    </motion.button>
  )
}