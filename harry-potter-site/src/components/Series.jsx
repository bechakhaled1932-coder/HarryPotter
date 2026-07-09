import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { fadeUp } from '../hooks/useScrollReveal'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    calculate()
    const timer = setInterval(calculate, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

function CountdownBox({ value, label }) {
  return (
    <motion.div
      className="countdown-box"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 0.3 }}
      key={value}
    >
      <span className="countdown-value">{String(value).padStart(2, '0')}</span>
      <span className="countdown-label">{label}</span>
    </motion.div>
  )
}

export default function Series() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const timeLeft = useCountdown('2026-12-25T00:00:00')

  const handlePlay = () => {
    setPlaying(true)
    setTimeout(() => videoRef.current?.play(), 100)
  }

  const handleClose = () => {
    setPlaying(false)
    videoRef.current?.pause()
  }

  return (
    <section id="series" className="series-section">
      {/* Intro */}
      <motion.div className="series-intro" {...fadeUp}>
        <span className="series-eyebrow">⚡ Coming Soon</span>
        <h2 className="series-title">The Magic Returns</h2>
        <p className="series-text">
          After more than two decades, the wizarding world is coming back to where it all began.
          The highly anticipated <strong>Harry Potter</strong> original series will faithfully adapt
          all seven books of J.K. Rowling's beloved saga — offering a deeper, richer exploration
          of Hogwarts, its characters, and the magic that captured an entire generation.
          A new chapter begins on Christmas Day, 2026.
        </p>
      </motion.div>

      {/* Countdown */}
      <motion.div className="countdown-wrapper" {...fadeUp}>
        <p className="countdown-title">Premieres in</p>
        <div className="countdown-grid">
          <CountdownBox value={timeLeft.days} label="Days" />
          <div className="countdown-sep">:</div>
          <CountdownBox value={timeLeft.hours} label="Hours" />
          <div className="countdown-sep">:</div>
          <CountdownBox value={timeLeft.minutes} label="Minutes" />
          <div className="countdown-sep">:</div>
          <CountdownBox value={timeLeft.seconds} label="Seconds" />
        </div>
        <p className="countdown-date">December 25, 2026</p>
      </motion.div>

      {/* Trailer */}
      <motion.div className="trailer-wrapper" {...fadeUp}>
        <p className="trailer-label">Official Trailer</p>

        {!playing ? (
          <div className="trailer-thumbnail" onClick={handlePlay}>
            <video
              src="/trailer/trailer.mp4"
              className="trailer-preview"
              muted
              preload="metadata"
              onLoadedMetadata={(e) => { e.target.currentTime = 3 }}
            />
            <div className="trailer-overlay">
              <motion.div
                className="trailer-play-btn"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(201,168,76,0.5)',
                    '0 0 35px rgba(201,168,76,0.9)',
                    '0 0 15px rgba(201,168,76,0.5)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ▶
              </motion.div>
              <p className="trailer-play-label">Watch Trailer</p>
            </div>
          </div>
        ) : (
          <motion.div
            className="trailer-video-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button className="trailer-close" onClick={handleClose}>✕ Close</button>
            <video
              ref={videoRef}
              src="/trailer/trailer.mp4"
              className="trailer-video"
              controls
              autoPlay
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}