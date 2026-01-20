import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiBriefcase,
  FiBook,
  FiAward,
  FiCalendar,
  FiMapPin,
} from 'react-icons/fi'

const experiences = [
  {
    id: 1,
    type: 'work',
    title: 'Software Engineer',
    company: 'Tech Solutions Ltd',
    location: 'Colombo, Sri Lanka',
    period: '2023 - Present',
    description:
      'Leading development of enterprise web applications using React, Node.js, and cloud technologies. Implementing CI/CD pipelines and mentoring junior developers.',
    highlights: [
      'Built scalable microservices architecture',
      'Reduced deployment time by 60%',
      'Led team of 4 developers',
    ],
  },
  {
    id: 2,
    type: 'work',
    title: 'Full Stack Developer',
    company: 'Digital Innovations',
    location: 'Remote',
    period: '2022 - 2023',
    description:
      'Developed and maintained multiple client projects including e-commerce platforms, CRM systems, and mobile applications.',
    highlights: [
      'Delivered 15+ projects on time',
      'Implemented real-time features',
      'Improved app performance by 40%',
    ],
  },
  {
    id: 3,
    type: 'work',
    title: 'Junior Developer',
    company: 'StartUp Hub',
    location: 'Colombo, Sri Lanka',
    period: '2021 - 2022',
    description:
      'Started career working on diverse projects, learning industry best practices, and contributing to product development.',
    highlights: [
      'Learned agile methodologies',
      'Built first production app',
      'Collaborated with design team',
    ],
  },
]

const education = [
  {
    id: 1,
    type: 'education',
    title: 'BSc in Computer Science',
    company: 'University of Colombo',
    location: 'Colombo, Sri Lanka',
    period: '2018 - 2022',
    description:
      'Focused on software engineering, algorithms, and artificial intelligence. Graduated with honors.',
    highlights: [
      'Dean\'s List - 3 semesters',
      'Best Final Year Project Award',
      'Led University Coding Club',
    ],
  },
  {
    id: 2,
    type: 'education',
    title: 'Professional Certifications',
    company: 'Various Platforms',
    location: 'Online',
    period: '2020 - Present',
    description:
      'Continuous learning through professional certifications and courses.',
    highlights: [
      'AWS Certified Developer',
      'Google Cloud Professional',
      'Meta React Developer',
    ],
  },
]

const TimelineItem = ({ item, index, isLeft }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className={`relative flex items-center ${
        isLeft ? 'md:flex-row-reverse' : ''
      }`}
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline dot - mobile version */}
      <div className="absolute left-4 top-6 z-10 md:hidden">
        <motion.div
          className={`w-3 h-3 rounded-full ${
            item.type === 'work' ? 'bg-neon-cyan' : 'bg-neon-purple'
          }`}
        />
      </div>

      {/* Timeline dot - desktop */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <motion.div
          className={`w-4 h-4 rounded-full border-4 border-dark-900 ${
            item.type === 'work' ? 'bg-neon-cyan' : 'bg-neon-purple'
          }`}
          whileHover={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        />
      </div>

      {/* Content */}
      <div className={`w-full pl-10 md:pl-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.div
          className="glass-card p-4 sm:p-6 relative overflow-hidden group cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {/* Type badge */}
          <div
            className={`absolute top-0 right-0 px-3 py-1 text-xs font-mono ${
              item.type === 'work'
                ? 'bg-neon-cyan/20 text-neon-cyan'
                : 'bg-neon-purple/20 text-neon-purple'
            }`}
          >
            {item.type === 'work' ? 'Experience' : 'Education'}
          </div>

          {/* Header */}
          <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                item.type === 'work'
                  ? 'bg-neon-cyan/10 text-neon-cyan'
                  : 'bg-neon-purple/10 text-neon-purple'
              }`}
            >
              {item.type === 'work' ? (
                <FiBriefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <FiBook className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-display font-bold text-white truncate">
                {item.title}
              </h3>
              <p className="text-neon-cyan text-xs sm:text-sm truncate">{item.company}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-2 sm:gap-4 text-2xs sm:text-xs text-gray-400 mb-3 sm:mb-4">
            <span className="flex items-center gap-1">
              <FiCalendar className="w-3 h-3" />
              {item.period}
            </span>
            <span className="flex items-center gap-1">
              <FiMapPin className="w-3 h-3" />
              {item.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{item.description}</p>

          {/* Expandable highlights */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <FiAward className="w-4 h-4 text-neon-cyan" />
                    <span className="text-sm font-semibold text-white">
                      Key Highlights
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-400"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand indicator */}
          <div className="text-center mt-4">
            <motion.span
              className="text-xs text-gray-500"
              animate={{ rotate: isExpanded ? 180 : 0 }}
            >
              {isExpanded ? '▲ Less' : '▼ More'}
            </motion.span>
          </div>

          {/* Accent line */}
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 ${
              item.type === 'work'
                ? 'bg-gradient-to-r from-neon-cyan to-transparent'
                : 'bg-gradient-to-r from-neon-purple to-transparent'
            }`}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const items = activeTab === 'work' ? experiences : education

  return (
    <section id="experience" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-800/50" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-1/3 -left-20 w-40 h-40 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-1/3 -right-20 w-40 h-40 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref}>
          {/* Section header */}
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-neon-cyan font-mono text-xs sm:text-sm uppercase tracking-wider">
              My Journey
            </span>
            <h2 className="section-title text-gradient mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl">
              Experience & Education
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-2 sm:mt-4 text-sm sm:text-base px-4">
              A timeline of my professional journey and educational background.
            </p>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mt-4 sm:mt-6 rounded-full" />
          </motion.div>

          {/* Tab switcher */}
          <motion.div
            className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={() => setActiveTab('work')}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === 'work'
                  ? 'bg-neon-cyan text-dark-900 shadow-neon-cyan'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBriefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Work</span> Experience
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === 'education'
                  ? 'bg-neon-purple text-dark-900 shadow-neon-purple'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Education
            </motion.button>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line - mobile */}
            <div className="absolute left-[21px] top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent md:hidden" />
            {/* Vertical line - desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent hidden md:block" />

            {/* Timeline items */}
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {items.map((item, index) => (
                  <TimelineItem
                    key={item.id}
                    item={item}
                    index={index}
                    isLeft={index % 2 === 0}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Download CV button */}
          <motion.div
            className="text-center mt-10 sm:mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="/resume.pdf"
              download
              className="btn-outline inline-flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Download Resume</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
