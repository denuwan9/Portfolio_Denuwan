import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import {
  FiLayout,
  FiServer,
  FiSmartphone,
  FiTool,
  FiCpu,
} from 'react-icons/fi'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiFlutter,
  SiReact as SiReactNative,
  SiFirebase,
  SiGit,
  SiDocker,
  SiFigma,
  SiTensorflow,
  SiOpenai,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiAmazon,
} from 'react-icons/si'

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    shortTitle: 'Front',
    icon: FiLayout,
    color: 'neon-cyan',
    skills: [
      { name: 'React', icon: SiReact, level: 95 },
      { name: 'Next.js', icon: SiNextdotjs, level: 90 },
      { name: 'TypeScript', icon: SiTypescript, level: 88 },
      { name: 'JavaScript', icon: SiJavascript, level: 95 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92 },
      { name: 'HTML5', icon: SiHtml5, level: 98 },
      { name: 'CSS3', icon: SiCss3, level: 95 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    shortTitle: 'Back',
    icon: FiServer,
    color: 'neon-purple',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 90 },
      { name: 'Express', icon: SiExpress, level: 88 },
      { name: 'Python', icon: SiPython, level: 85 },
      { name: 'MongoDB', icon: SiMongodb, level: 88 },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 82 },
      { name: 'Firebase', icon: SiFirebase, level: 85 },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    shortTitle: 'Mobile',
    icon: FiSmartphone,
    color: 'neon-pink',
    skills: [
      { name: 'React Native', icon: SiReactNative, level: 88 },
      { name: 'Flutter', icon: SiFlutter, level: 80 },
      { name: 'Firebase', icon: SiFirebase, level: 85 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    shortTitle: 'Tools',
    icon: FiTool,
    color: 'neon-green',
    skills: [
      { name: 'Git', icon: SiGit, level: 92 },
      { name: 'Docker', icon: SiDocker, level: 78 },
      { name: 'AWS', icon: SiAmazon, level: 75 },
      { name: 'Figma', icon: SiFigma, level: 85 },
    ],
  },
  {
    id: 'ai',
    title: 'AI & ML',
    shortTitle: 'AI',
    icon: FiCpu,
    color: 'neon-blue',
    skills: [
      { name: 'TensorFlow', icon: SiTensorflow, level: 72 },
      { name: 'OpenAI', icon: SiOpenai, level: 80 },
      { name: 'Python ML', icon: SiPython, level: 78 },
    ],
  },
]

const SkillCard = ({ skill, index, isActive }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card p-3 sm:p-4 flex flex-col items-center gap-2 sm:gap-3 transition-all duration-300 hover:border-neon-cyan/30">
        {/* Icon */}
        <motion.div
          className="text-2xl sm:text-3xl text-gray-400 group-hover:text-neon-cyan transition-colors duration-300"
          animate={{ scale: isHovered ? 1.1 : 1, rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <skill.icon />
        </motion.div>

        {/* Name */}
        <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
          {skill.name}
        </span>

        {/* Progress ring */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12">
          <svg className="w-full h-full -rotate-90">
            {/* Background circle */}
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-dark-600"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? skill.level / 100 : 0 }}
              transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="100%" stopColor="#bf00ff" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-mono text-neon-cyan">
            {skill.level}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const activeSkills =
    skillCategories.find((cat) => cat.id === activeCategory)?.skills || []

  return (
    <section id="skills" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-800/50" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-20 right-10 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {/* Section header */}
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-neon-cyan font-mono text-xs sm:text-sm uppercase tracking-wider">
              My Expertise
            </span>
            <h2 className="section-title text-gradient mt-3 sm:mt-4">
              Skills & Technologies
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-3 sm:mt-4 px-4">
              A comprehensive toolkit built through years of hands-on experience
              and continuous learning.
            </p>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mt-4 sm:mt-6 rounded-full" />
          </motion.div>

          {/* Category tabs - Horizontal scroll on mobile */}
          <motion.div
            className="flex justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 shadow-neon-cyan'
                    : 'glass-card text-gray-400 hover:text-white hover:border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{category.title}</span>
                <span className="xs:hidden">{category.shortTitle}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Skills grid */}
          <motion.div
            className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-4"
            layout
          >
            {activeSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isActive={inView}
              />
            ))}
          </motion.div>

          {/* Additional info */}
          <motion.div
            className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              {
                title: 'Clean Code',
                description: 'Writing readable, maintainable, and scalable code following best practices.',
                icon: '✨',
              },
              {
                title: 'Fast Learner',
                description: 'Quick to adapt to new technologies and frameworks as needed.',
                icon: '🚀',
              },
              {
                title: 'Problem Solver',
                description: 'Approaching challenges with analytical thinking and creative solutions.',
                icon: '🧩',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="glass-card p-4 sm:p-6 text-center"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{item.icon}</span>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
