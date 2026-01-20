import { useEffect, useState, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiArrowDown, FiMail } from 'react-icons/fi'

// Lazy load heavy 3D component for better performance
const ParticleBackground = lazy(() => import('./ParticleBackground'))

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const { scrollY } = useScroll()

  // Parallax effects based on scroll
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const contentY = useTransform(scrollY, [0, 500], [0, 50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Mouse move handler only for desktop
    const handleMouseMove = (e) => {
      if (window.innerWidth >= 768) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* 3D Particle Background - Only load on desktop */}
      {!isMobile && (
        <Suspense fallback={<div className="absolute inset-0 bg-dark-900" />}>
          <motion.div style={{ y: backgroundY }} className="absolute inset-0">
            <ParticleBackground />
          </motion.div>
        </Suspense>
      )}

      {/* Mobile gradient background */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-neon-purple/10 via-transparent to-transparent" />
        </div>
      )}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 md:opacity-30" />

      {/* Animated gradient orbs - Hidden on mobile for performance */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-gradient-radial from-neon-cyan/20 via-transparent to-transparent blur-3xl"
            animate={{
              x: mousePosition.x * 2,
              y: mousePosition.y * 2,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
            style={{ left: '10%', top: '20%' }}
          />
          <motion.div
            className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-gradient-radial from-neon-purple/20 via-transparent to-transparent blur-3xl"
            animate={{
              x: mousePosition.x * -1.5,
              y: mousePosition.y * -1.5,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
            style={{ right: '10%', bottom: '20%' }}
          />
        </>
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full pt-20 md:pt-24"
        style={{ y: isMobile ? 0 : contentY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-dark-700/50 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse mr-2" />
            <span className="text-xs sm:text-sm text-gray-300 font-mono">
              Available for opportunities
            </span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 leading-tight"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="text-gradient inline-block">Denuwan</span>
        </motion.h1>

        {/* Animated role text */}
        <motion.div
          variants={itemVariants}
          className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 sm:mb-8 h-8 sm:h-12 flex items-center justify-center"
        >
          <TypeAnimation
            sequence={[
              'Software Engineer',
              2000,
              'Web Developer',
              2000,
              'Mobile App Creator',
              2000,
              'AI Enthusiast',
              2000,
              'Problem Solver',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-mono"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0 leading-relaxed"
        >
          Crafting elegant solutions to complex problems. I build modern,
          scalable applications that make a difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0"
        >
          <motion.a
            href="#projects"
            className="btn-glow text-dark-900 font-semibold w-full sm:w-auto text-center"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="relative z-10">View My Work</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-outline w-full sm:w-auto text-center"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 sm:gap-6"
        >
          {[
            { href: 'https://github.com/denuwanyasanga', icon: FiGithub, label: 'GitHub' },
            { href: 'https://linkedin.com/in/denuwanyasanga', icon: FiLinkedin, label: 'LinkedIn' },
            { href: 'mailto:hello@denuwan.dev', icon: FiMail, label: 'Email' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="p-3 rounded-full bg-dark-700/50 border border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={{ opacity }}
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-neon-cyan transition-colors touch-manipulation"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="Scroll to about section"
        >
          <span className="text-xs font-mono uppercase tracking-wider hidden sm:block">Scroll</span>
          <FiArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Decorative elements - Hidden on mobile */}
      <div className="hidden md:block">
        <motion.div
          className="absolute top-1/4 left-10 w-20 h-20 border border-neon-cyan/20 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-32 h-32 border border-neon-purple/20 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-2 h-2 bg-neon-cyan rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-neon-purple rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>
    </section>
  )
}

export default Hero
