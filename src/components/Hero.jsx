import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi'
import ParticleBackground from './ParticleBackground'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Particle Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-dark-900" />}>
        <ParticleBackground />
      </Suspense>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-neon-cyan/20 via-transparent to-transparent blur-3xl"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        style={{ left: '10%', top: '20%' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-neon-purple/20 via-transparent to-transparent blur-3xl"
        animate={{
          x: mousePosition.x * -1.5,
          y: mousePosition.y * -1.5,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        style={{ right: '10%', bottom: '20%' }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-dark-700/50 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse mr-2" />
            <span className="text-sm text-gray-300 font-mono">
              Available for opportunities
            </span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-white">Hi, I'm </span>
          <span className="text-gradient">Denuwan</span>
        </motion.h1>

        {/* Animated role text */}
        <motion.div
          className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 h-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Crafting elegant solutions to complex problems. I build modern,
          scalable applications that make a difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="#projects"
            className="btn-glow text-dark-900 font-semibold"
            whileHover={{ scale: 1.05 }}
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
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
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
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="https://github.com/denuwanyasanga"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-dark-700/50 border border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/denuwanyasanga"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-dark-700/50 border border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLinkedin className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
          <FiArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-neon-cyan/20 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-neon-purple/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-neon-purple rounded-full animate-float" style={{ animationDelay: '2s' }} />
    </section>
  )
}

export default Hero
