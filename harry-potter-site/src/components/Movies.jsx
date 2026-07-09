import { motion } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp } from '../hooks/useScrollReveal'

const moviesData = [
  { id: 1, title: "The Philosopher's Stone", year: '2001', poster: '/posters/1.png', description: "Harry Potter discovers he's a wizard and begins his journey at Hogwarts School of Witchcraft and Wizardry." },
  { id: 2, title: 'The Chamber of Secrets', year: '2002', poster: '/posters/2.png', description: 'A mysterious force is petrifying Hogwarts students, and Harry hears a sinister voice within the walls.' },
  { id: 3, title: 'The Prisoner of Azkaban', year: '2004', poster: '/posters/3.png', description: 'A dangerous prisoner has escaped from Azkaban, and he seems to be after Harry Potter.' },
  { id: 4, title: 'The Goblet of Fire', year: '2005', poster: '/posters/4.png', description: "Harry is mysteriously selected to compete in the dangerous Triwizard Tournament against his will." },
  { id: 5, title: 'The Order of the Phoenix', year: '2007', poster: '/posters/5.png', description: "Harry forms Dumbledore's Army to fight against the Ministry's refusal to acknowledge Voldemort's return." },
  { id: 6, title: 'The Half-Blood Prince', year: '2009', poster: '/posters/6.png', description: "Dumbledore prepares Harry for the final battle as Voldemort tightens his grip on the wizarding world." },
  { id: 7, title: 'The Deathly Hallows Part 1', year: '2010', poster: '/posters/7.png', description: 'Harry, Ron and Hermione set out on a dangerous mission to destroy the Horcruxes and defeat Voldemort.' },
  { id: 8, title: 'The Deathly Hallows Part 2', year: '2011', poster: '/posters/8.png', description: 'The epic finale — Harry faces Voldemort one last time in the Battle of Hogwarts.' },
]

export default function Movies() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    scrollRef.current.scrollBy({ left: direction * 350, behavior: 'smooth' })
  }

  return (
    <section id="movies" className="movies-section">
      <motion.h2 className="section-title" {...fadeUp}>The Saga</motion.h2>
      <motion.p className="movies-intro" {...fadeUp}>
        Eight magical films spanning a decade — from the boy who lived to the final battle at Hogwarts.
      </motion.p>

      <div className="movies-wrapper">
        <button className="movies-arrow left" onClick={() => scroll(-1)}>‹</button>

        <div className="movies-scroll" ref={scrollRef}>
          {moviesData.map((movie, i) => (
            <motion.div
              key={movie.id}
              className="movie-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="movie-poster-wrapper">
                <img src={movie.poster} alt={movie.title} className="movie-poster" />
                <div className="movie-overlay">
                  <p className="movie-desc">{movie.description}</p>
                </div>
              </div>
              <div className="movie-info">
                <span className="movie-year">{movie.year}</span>
                <h3 className="movie-title">{movie.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <button className="movies-arrow right" onClick={() => scroll(1)}>›</button>
      </div>
    </section>
  )
}