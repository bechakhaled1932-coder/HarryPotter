import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { motion } from 'framer-motion'

const MusicPlayer = forwardRef((props, ref) => {
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/music/Hedwigs Theme.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    return () => {
      audioRef.current.pause()
      audioRef.current = null
    }
  }, [])

  useImperativeHandle(ref, () => ({
    play: () => audioRef.current?.play(),
  }))

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
        boxShadow: ['0 0 8px #c9a84c', '0 0 20px #c9a84c', '0 0 8px #c9a84c'],
      } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
      title={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? '🔇' : '🔊'}
    </motion.button>
  )
})

export default MusicPlayer