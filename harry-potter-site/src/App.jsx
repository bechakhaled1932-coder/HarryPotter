import { useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WandShop from './components/WandShop'
import Houses from './components/Houses'
import Characters from './components/Characters'
import Spells from './components/Spells'
import Quiz from './components/Quiz'
import GamesSection from './components/GamesSection'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'
import MagicCursor from './components/MagicCursor'
import MusicPlayer from './components/MusicPlayer'
import Intro from './components/Intro'
import Movies from './components/Movies'
import Series from './components/Series'


function App() {
  const [entered, setEntered] = useState(false)
  const musicRef = useRef(null)

  const handleEnter = () => {
    setEntered(true)
    setTimeout(() => musicRef.current?.play(), 500)
  }

  return (
    <div>
      <MagicCursor />
      <MusicPlayer ref={musicRef} />

      {!entered && <Intro onEnter={handleEnter} />}

      {entered && (
        <>
          <Navbar />
          <Hero />

          <SectionDivider color="#0d0d0d" />
          <WandShop />

          <SectionDivider flipY color="#0a0a0a" />
          <SectionDivider color="#0a0a0a" />
          <Houses />

          <SectionDivider flipY color="#0d0d0d" />
          <SectionDivider color="#0d0d0d" />
          <Characters />

          <SectionDivider flipY color="#0a0a0a" />
          <SectionDivider color="#0a0a0a" />
          <Spells />

          <SectionDivider flipY color="#0d0d0d" />
          <SectionDivider color="#0d0d0d" />
          <Movies />

          <SectionDivider flipY color="#0a0a0a" />
          <SectionDivider color="#0a0a0a" />
          <Series />

          <SectionDivider flipY color="#0d0d0d" />
          <SectionDivider color="#0d0d0d" />
          <Quiz />

          <SectionDivider flipY color="#0d0d0d" />
          <SectionDivider color="#0d0d0d" />
          <GamesSection />

          <SectionDivider flipY color="#050505" />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App