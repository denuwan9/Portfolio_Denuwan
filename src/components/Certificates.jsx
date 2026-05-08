import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiExternalLink, FiCalendar, FiUser, FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi'
import MagneticButton from './MagneticButton'

const certificates = [
  {
    id: 1,
    title: "SpringBoot Certificate",
    issuer: "STEMLink",
    date: "2026-04-07",
    link: "https://credsverse.com/credentials/5a95522d-d0ae-429a-9cf5-57cd79e66f34",
    image: `${import.meta.env.BASE_URL}certificates/spring.png`,
    icon: FiAward,
    color: "#00f5ff"
  },
  {
    id: 2,
    title: "Getting Started with MongoDB Atlase",
    issuer: "MongoDB",
    date: "2026-04-26",
    link: "https://learn.mongodb.com/c/fEDpFTpMSjC5HY0NX9oPaw",
    image: `${import.meta.env.BASE_URL}certificates/MongoDB1.png`,
    icon: FiAward,
    color: "#bf00ff"
  },
  {
    id: 3,
    title: "Relational to Document Model",
    issuer: "MongoDB",
    date: "2026-04-27",
    link: "https://learn.mongodb.com/c/6M77dZ5vS3-tnSDMOAnbtQ",
    image: `${import.meta.env.BASE_URL}certificates/MongoDB2.png`,
    icon: FiAward,
    color: "#ff00f5"
  },
  
]

const CertificateCard = ({ certificate, index }) => {
  const cardRef = useRef(null)
  const [isFlipped, setIsFlipped] = useState(false)
  
  // Flip back when clicking outside the card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFlipped && cardRef.current && !cardRef.current.contains(event.target)) {
        setIsFlipped(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isFlipped])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e) => {
    if (isFlipped) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)

    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-[350px] sm:h-[380px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tilt Container */}
      <motion.div
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
          transformStyle: "preserve-3d",
          perspective: 2000,
        }}
        className="w-full h-full relative"
      >
        {/* Flip Container */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full h-full relative"
        >
          {/* FRONT SIDE */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ 
              transform: "translateZ(1px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          >
            <div className="glass-card p-6 sm:p-8 relative hover-spotlight overflow-hidden h-full flex flex-col border-white/5 hover:border-neon-cyan/30 transition-colors duration-500">
              <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-dark-800 border border-white/10 group-hover:border-neon-cyan/50 transition-all duration-500 shadow-lg group-hover:shadow-neon-cyan/20`}>
                    <certificate.icon className="w-6 h-6 sm:w-7 sm:h-7 text-neon-cyan" />
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 text-gray-400 border border-white/5">
                    <FiExternalLink className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors line-clamp-2 leading-tight">
                  {certificate.title}
                </h3>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-3 text-sm sm:text-base text-gray-400">
                    <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-neon-purple" />
                    </div>
                    <span className="font-medium">{certificate.issuer}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm sm:text-base text-gray-400">
                    <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                      <FiCalendar className="w-4 h-4 text-neon-cyan" />
                    </div>
                    <span className="font-medium">{certificate.date}</span>
                  </div>
                </div>
              </div>
              
              {/* Click Hint */}
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                CLICK TO VIEW
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ 
              transform: "rotateY(180deg) translateZ(1px)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          >
            <div className="glass-card overflow-hidden h-full flex flex-col border-neon-cyan/30">
              <div className="relative flex-1 bg-dark-800">
                <img 
                  src={certificate.image} 
                  alt={certificate.title}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="absolute inset-0 items-center justify-center hidden bg-dark-800 flex-col gap-4">
                  <FiAward className="w-16 h-16 text-neon-cyan opacity-20" />
                  <p className="text-gray-500 text-xs font-mono">CERTIFICATE IMAGE</p>
                </div>
                
                {/* Back CTA */}
                <div className="absolute bottom-4 right-4 z-20">
                  <a 
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 rounded-full bg-neon-cyan text-dark-900 shadow-neon-cyan hover:scale-110 transition-transform flex items-center justify-center"
                  >
                    <FiExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="p-4 bg-dark-700/50 backdrop-blur-md border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-neon-cyan uppercase">Certificate View</span>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                  Click to Flip Back
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const Certificates = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const totalPages = Math.ceil(certificates.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentCertificates = certificates.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    const element = document.getElementById('certificates')
    if (element) {
      const offset = element.offsetTop - 100
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }

  return (
    <section id="certificates" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Glowing accents */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref}>
          {/* Section header */}
          <motion.div
            className={`text-center mb-16 sm:mb-24 reveal-skew ${inView ? 'in-view' : ''}`}
          >
            <span className="inline-block text-neon-cyan font-mono text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
              Verified Achievements
            </span>
            <h2 className="section-title text-gradient text-4xl sm:text-5xl md:text-6xl mb-6">
              Certifications
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              A curated selection of professional milestones that reflect my 
              dedication to continuous learning and technical excellence.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mx-auto mt-8 rounded-full shadow-neon-cyan/20" />
          </motion.div>

          {/* Grid - Centered when only 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <AnimatePresence mode="wait">
              {currentCertificates.map((cert, index) => (
                <CertificateCard key={cert.id} certificate={cert} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              className="flex justify-center items-center gap-6 mt-20 sm:mt-24"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <MagneticButton>
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                    currentPage === 1 
                      ? 'border-white/5 text-gray-700 cursor-not-allowed' 
                      : 'border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan shadow-lg shadow-neon-cyan/5'
                  }`}
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
              </MagneticButton>

              <div className="flex gap-3">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl font-mono text-sm sm:text-lg transition-all duration-500 relative overflow-hidden group ${
                      currentPage === i + 1
                        ? 'text-dark-900 font-bold'
                        : 'glass-card text-gray-400 hover:text-white'
                    }`}
                  >
                    {currentPage === i + 1 && (
                      <motion.div 
                        layoutId="activePage"
                        className="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-purple"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{i + 1}</span>
                  </button>
                ))}
              </div>

              <MagneticButton>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                    currentPage === totalPages 
                      ? 'border-white/5 text-gray-700 cursor-not-allowed' 
                      : 'border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple shadow-lg shadow-neon-purple/5'
                  }`}
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </MagneticButton>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Certificates
