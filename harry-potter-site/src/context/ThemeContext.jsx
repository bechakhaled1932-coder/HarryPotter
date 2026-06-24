import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = (mode) => {
    setTheme(mode)
    document.documentElement.setAttribute('data-theme', mode)
  }

  // Écoute le clavier — tape "lumos" ou "nox" n'importe où
  useEffect(() => {
    let typed = ''
    const handleKey = (e) => {
      typed += e.key.toLowerCase()
      if (typed.includes('lumos')) { toggleTheme('light'); typed = '' }
      else if (typed.includes('nox')) { toggleTheme('dark'); typed = '' }
      if (typed.length > 10) typed = typed.slice(-10)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)