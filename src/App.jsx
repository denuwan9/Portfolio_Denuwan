import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import FloatingActions from './components/FloatingActions'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Custom cursor - only on desktop */}
          {!isMobile && <CustomCursor />}

          {/* Scroll progress indicator */}
          <ScrollProgress />

          {/* Noise texture overlay */}
          <div className="noise-overlay" />

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main className={!isMobile ? 'cursor-none' : ''}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating action buttons */}
          <FloatingActions />
        </>
      )}
    </>
  )
}

export default App
