import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiFolder, FiStar } from 'react-icons/fi'

const projects = [
  {
    id: 1,
    title: 'Master Neon',
    description:
      'A custom neon sign builder application allowing users to design and visualize personalized LED neon signs with real-time preview and pricing.',
    image: '/projects/master-neon.jpg',
    tags: ['React', 'Node.js', 'Canvas API', 'MongoDB'],
    github: 'https://github.com/denuwanyasanga/master-neon',
    live: 'https://master-neon.com',
    featured: true,
    color: '#00f5ff',
  },
  {
    id: 2,
    title: 'AI Fitness Trainer',
    description:
      'An AI-powered fitness application that creates personalized workout plans, tracks progress, and provides real-time form correction using computer vision.',
    image: '/projects/fitness-ai.jpg',
    tags: ['React Native', 'TensorFlow', 'Python', 'Firebase'],
    github: 'https://github.com/denuwanyasanga/ai-fitness',
    live: 'https://ai-fitness-app.com',
    featured: true,
    color: '#bf00ff',
  },
  {
    id: 3,
    title: 'Student Management System',
    description:
      'A comprehensive student management platform with features for enrollment, grade tracking, attendance, and automated reporting for educational institutions.',
    image: '/projects/student-system.jpg',
    tags: ['Next.js', 'PostgreSQL', 'Prisma', 'TypeScript'],
    github: 'https://github.com/denuwanyasanga/student-management',
    live: 'https://student-ms.com',
    featured: true,
    color: '#ff00f5',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    image: '/projects/ecommerce.jpg',
    tags: ['React', 'Stripe', 'Node.js', 'MongoDB'],
    github: 'https://github.com/denuwanyasanga/ecommerce',
    live: null,
    featured: false,
    color: '#00ff80',
  },
  {
    id: 5,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, team features, and productivity analytics.',
    image: '/projects/taskapp.jpg',
    tags: ['Vue.js', 'Firebase', 'Tailwind'],
    github: 'https://github.com/denuwanyasanga/taskapp',
    live: 'https://taskapp-demo.com',
    featured: false,
    color: '#0080ff',
  },
  {
    id: 6,
    title: 'Weather Dashboard',
    description:
      'A beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.',
    image: '/projects/weather.jpg',
    tags: ['React', 'Weather API', 'Charts.js'],
    github: 'https://github.com/denuwanyasanga/weather',
    live: null,
    featured: false,
    color: '#00f5ff',
  },
]

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative perspective-1000 ${
        project.featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative glass-card overflow-hidden h-full preserve-3d"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        whileHover={{ z: 50 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Project image/gradient background */}
        <div
          className="relative h-48 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}20 0%, transparent 100%)`,
          }}
        >
          {/* Placeholder pattern */}
          <div className="absolute inset-0 bg-grid opacity-30" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-dark-900/80 backdrop-blur-sm border border-neon-cyan/30">
              <FiStar className="w-3 h-3 text-neon-cyan" />
              <span className="text-xs font-mono text-neon-cyan">Featured</span>
            </div>
          )}

          {/* Folder icon */}
          <div className="absolute bottom-4 left-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${project.color}20` }}
            >
              <FiFolder className="w-6 h-6" style={{ color: project.color }} />
            </div>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4 bg-dark-900/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="w-5 h-5 text-white" />
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink className="w-5 h-5 text-white" />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 group-hover:text-gradient transition-all">
            {project.title}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-2xs sm:text-xs font-mono rounded-full bg-dark-600/50 text-gray-400 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
          }}
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10 blur-xl"
        style={{ backgroundColor: project.color }}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

const Projects = () => {
  const [showAll, setShowAll] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const displayedProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <section id="projects" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />

      {/* Decorative orbs - hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 -right-40 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-1/4 -left-40 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref}>
          {/* Section header */}
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-neon-cyan font-mono text-xs sm:text-sm uppercase tracking-wider">
              My Work
            </span>
            <h2 className="section-title text-gradient mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl">
              Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-2 sm:mt-4 text-sm sm:text-base px-4">
              A selection of projects that showcase my skills and passion for
              building innovative solutions.
            </p>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mt-4 sm:mt-6 rounded-full" />
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Show more button */}
          {projects.length > 3 && (
            <motion.div
              className="text-center mt-8 sm:mt-12"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="btn-outline inline-flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAll ? 'Show Less' : 'View All Projects'}
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ↓
                </motion.span>
              </motion.button>
            </motion.div>
          )}

          {/* GitHub CTA */}
          <motion.div
            className="mt-10 sm:mt-16 text-center glass-card p-6 sm:p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <FiGithub className="w-8 h-8 sm:w-10 sm:h-10 text-neon-cyan mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
              Want to see more?
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Check out my GitHub for more projects, open-source contributions,
              and code experiments.
            </p>
            <motion.a
              href="https://github.com/denuwanyasanga"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-2 text-dark-900 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="relative z-10">View GitHub Profile</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
