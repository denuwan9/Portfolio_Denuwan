import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiSmartphone, FiCpu, FiDatabase } from 'react-icons/fi'

const highlights = [
  {
    icon: FiCode,
    title: 'Web Development',
    description: 'Building responsive and performant web applications',
    color: 'neon-cyan',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Apps',
    description: 'Creating cross-platform mobile experiences',
    color: 'neon-purple',
  },
  {
    icon: FiCpu,
    title: 'AI & ML',
    description: 'Integrating intelligent solutions into applications',
    color: 'neon-pink',
  },
  {
    icon: FiDatabase,
    title: 'Backend Systems',
    description: 'Designing scalable server architectures',
    color: 'neon-blue',
  },
]

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-neon-cyan font-mono text-sm uppercase tracking-wider">
              About Me
            </span>
            <h2 className="section-title text-gradient mt-4">
              Who I Am
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Profile card */}
              <div className="relative">
                <div className="glass-card p-8">
                  <div className="flex items-start gap-6">
                    {/* Avatar placeholder */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple p-0.5">
                        <div className="w-full h-full rounded-2xl bg-dark-800 flex items-center justify-center">
                          <span className="text-3xl font-display font-bold text-gradient">
                            DY
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-neon-green rounded-full border-4 border-dark-800" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-1">
                        Denuwan Yasanga
                      </h3>
                      <p className="text-neon-cyan font-mono text-sm mb-2">
                        Software Engineer
                      </p>
                      <p className="text-gray-400 text-sm">
                        Sri Lanka 🇱🇰
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story text */}
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a passionate software engineer with a love for creating elegant,
                  efficient solutions to complex problems. My journey in tech started
                  with curiosity about how things work, and it has evolved into a
                  career building impactful digital experiences.
                </p>
                <p>
                  With expertise spanning web development, mobile applications, and AI
                  integration, I bring a versatile skill set to every project. I believe
                  in writing clean, maintainable code and staying at the forefront of
                  emerging technologies.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies,
                  contributing to open-source projects, or brainstorming the next
                  big idea that could make a difference.
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { number: '3+', label: 'Years Experience' },
                  { number: '20+', label: 'Projects Completed' },
                  { number: '100%', label: 'Client Satisfaction' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glass-card p-4 text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <span className="text-2xl font-display font-bold text-gradient">
                      {stat.number}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side - Highlights */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="glass-card p-6 group"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-${item.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className={`w-6 h-6 text-${item.color}`} />
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-400">{item.description}</p>

                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-${item.color}/5 blur-xl -z-10`}
                  />
                </motion.div>
              ))}

              {/* Code snippet decoration */}
              <motion.div
                className="col-span-2 glass-card p-6 font-mono text-sm"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-gray-500 text-xs">about.js</span>
                </div>
                <pre className="text-gray-400 overflow-x-auto">
                  <code>
                    <span className="text-neon-purple">const</span>{' '}
                    <span className="text-neon-cyan">developer</span> = {'{'}
                    {'\n'}  <span className="text-gray-500">name:</span>{' '}
                    <span className="text-neon-green">"Denuwan Yasanga"</span>,
                    {'\n'}  <span className="text-gray-500">skills:</span> [
                    <span className="text-neon-green">"React"</span>,{' '}
                    <span className="text-neon-green">"Node"</span>,{' '}
                    <span className="text-neon-green">"AI"</span>],
                    {'\n'}  <span className="text-gray-500">passion:</span>{' '}
                    <span className="text-neon-green">"Building the future"</span>,
                    {'\n'}  <span className="text-gray-500">coffee:</span>{' '}
                    <span className="text-neon-purple">true</span>
                    {'\n'}{'}'};
                  </code>
                </pre>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
