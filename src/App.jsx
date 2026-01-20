import { useEffect, useState, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Components - Eager load critical above-the-fold components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'

// Lazy load below-the-fold components for better performance
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Experience = lazy(() => import('./components/Experience'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const CustomCursor = lazy(() => import('./components/CustomCursor'))
const FloatingActions = lazy(() => import('./components/FloatingActions'))

// Section loading fallback
const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <motion.div
      className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
)

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }

    checkMobile()
    checkReducedMotion()

    window.addEventListener('resize', checkMobile)

    // Listen for reduced motion changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.addEventListener('change', checkReducedMotion)

    // Simulate loading with a minimum display time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, isReducedMotion ? 500 : 2500)

    // Preload critical fonts
    document.fonts.ready.then(() => {
      console.log('Fonts loaded')
    })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
      motionQuery.removeEventListener('change', checkReducedMotion)
    }
  }, [isReducedMotion])

  // Handle hash navigation on page load
  useEffect(() => {
    if (!isLoading && window.location.hash) {
      const element = document.querySelector(window.location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [isLoading])

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {/* Main application */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="app"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Custom cursor - only on desktop with motion enabled */}
            {!isMobile && !isReducedMotion && (
              <Suspense fallback={null}>
                <CustomCursor />
              </Suspense>
            )}

            {/* Scroll progress indicator */}
            <ScrollProgress />

            {/* Noise texture overlay */}
            <div className="noise-overlay" aria-hidden="true" />

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main
              id="main-content"
              className={!isMobile && !isReducedMotion ? 'cursor-none' : ''}
              role="main"
            >
              {/* Hero - loaded eagerly */}
              <Hero />

              {/* Lazy loaded sections */}
              <Suspense fallback={<SectionLoader />}>
                <About />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Skills />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Projects />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Experience />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
            </main>

            {/* Footer */}
            <Suspense fallback={null}>
              <Footer />
            </Suspense>

            {/* Floating action buttons */}
            <Suspense fallback={null}>
              <FloatingActions />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
