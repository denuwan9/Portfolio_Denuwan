import { useEffect, useState } from 'react'

/**
 * Custom hook for smooth scroll behavior with support for
 * section-based navigation and offset handling
 */
export function useSmoothScroll(offset = 80) {
  useEffect(() => {
    // Handle hash changes for smooth scrolling
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          const top = element.offsetTop - offset
          window.scrollTo({
            top,
            behavior: 'smooth'
          })
        }
      }
    }

    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(handleHashChange, 100)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [offset])

  // Function to programmatically scroll to a section
  const scrollTo = (target, customOffset = offset) => {
    const element = typeof target === 'string'
      ? document.querySelector(target)
      : target

    if (element) {
      const top = element.offsetTop - customOffset
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
    }
  }

  return { scrollTo }
}

/**
 * Hook to detect when user is scrolling and direction
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'

      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction)
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}

/**
 * Hook to track scroll position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const percentage = maxScroll > 0 ? (position / maxScroll) * 100 : 0

      setScrollPosition(position)
      setScrollPercentage(percentage)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollPosition, scrollPercentage }
}

/**
 * Hook to detect if element is in viewport
 */
export function useInViewport(ref, threshold = 0.1) {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, threshold])

  return isInViewport
}
