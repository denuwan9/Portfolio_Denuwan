import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useMousePosition } from '../hooks/useMousePosition'

const CustomCursor = () => {
  const { x, y } = useMousePosition()
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Smooth spring animation for cursor movement
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  // Delayed follower
  const followerConfig = { damping: 15, stiffness: 150 }
  const followerX = useSpring(0, followerConfig)
  const followerY = useSpring(0, followerConfig)

  useEffect(() => {
    cursorX.set(x)
    cursorY.set(y)
    followerX.set(x)
    followerY.set(y)
  }, [x, y, cursorX, cursorY, followerX, followerY])

  // Track hover state for interactive elements
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isClicking ? 6 : isHovering ? 16 : 8,
            height: isClicking ? 6 : isHovering ? 16 : 8,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Cursor follower ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-neon-cyan/50"
          animate={{
            width: isClicking ? 30 : isHovering ? 50 : 40,
            height: isClicking ? 30 : isHovering ? 50 : 40,
            borderColor: isHovering
              ? 'rgba(191, 0, 255, 0.6)'
              : 'rgba(0, 245, 255, 0.5)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}

export default CustomCursor
