import { motion, AnimatePresence } from 'framer-motion'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const childVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Wrapper for individual animated children
export const AnimatedChild = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      variants={childVariants}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for multiple children
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="enter"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        initial: {},
        enter: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Fade in on scroll
export const FadeInOnScroll = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6
}) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// Scale in on scroll
export const ScaleInOnScroll = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// Blur in on scroll
export const BlurInOnScroll = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// Parallax wrapper
export const ParallaxWrapper = ({
  children,
  className = '',
  speed = 0.5
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: speed * -50 }}
      viewport={{ once: false }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  )
}

// Reveal text animation
export const RevealText = ({
  children,
  className = '',
  delay = 0
}) => {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        variants={{
          hidden: { y: '100%', opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.6,
              delay,
              ease: [0.4, 0, 0.2, 1],
            },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Magnetic hover effect
export const MagneticWrapper = ({ children, className = '' }) => {
  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const x = (clientX - left - width / 2) / 10
    const y = (clientY - top - height / 2) / 10
    currentTarget.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)'
  }

  return (
    <motion.div
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
