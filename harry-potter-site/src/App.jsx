import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Houses from './components/Houses'
import Characters from './components/Characters'
import Spells from './components/Spells'
import Quiz from './components/Quiz'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'
import MagicCursor from './components/MagicCursor'
import MusicPlayer from './components/MusicPlayer'

function App() {
  return (
    <div>
      <MagicCursor />
      <MusicPlayer />
      <Navbar />
      <Hero />

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
      <Quiz />

      <SectionDivider flipY color="#050505" />
      <Footer />
    </div>
  )
}

export default App