import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Create a reactive percentage value
  const percentage = useTransform(scrollYProgress, (value) => Math.round(value * 100))
  const [percentValue, setPercentValue] = useState(0)

  // Use useEffect to sync the motion value to state for rendering
  useEffect(() => {
    return percentage.onChange((v) => setPercentValue(v))
  }, [percentage])

  return (
    <>
      {/* Top progress bar with glow */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left shadow-[0_0_10px_rgba(0,245,255,0.5)]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #00f5ff 0%, #bf00ff 50%, #ff00f5 100%)',
        }}
      />

      {/* Circular progress indicator - hidden on mobile */}
      <motion.div 
        className="fixed bottom-8 right-8 z-[100] hidden md:block"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative w-16 h-16 flex items-center justify-center group"
          aria-label="Back to top"
        >
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="175.9"
              style={{ pathLength: scrollYProgress }}
              className="text-neon-cyan shadow-neon-cyan"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <AnimatePresence mode="wait">
               {percentValue > 95 ? (
                 <motion.div
                   key="arrow"
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -5 }}
                 >
                   <svg className="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                   </svg>
                 </motion.div>
               ) : (
                 <motion.span
                   key="percent"
                   className="text-[10px] font-mono font-bold text-white/50 group-hover:text-neon-cyan transition-colors"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                 >
                   {percentValue}%
                 </motion.span>
               )}
             </AnimatePresence>
          </div>
          
          {/* Hover pulse effect */}
          <div className="absolute inset-0 rounded-full bg-neon-cyan/5 scale-0 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
        </button>
      </motion.div>
    </>
  )
}

export default ScrollProgress
