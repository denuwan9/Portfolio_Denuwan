import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: FiGithub,
      href: 'https://github.com/denuwanyasanga',
      label: 'GitHub',
    },
    {
      icon: FiLinkedin,
      href: 'https://linkedin.com/in/denuwanyasanga',
      label: 'LinkedIn',
    },
    {
      icon: FiTwitter,
      href: 'https://twitter.com/denuwanyasanga',
      label: 'Twitter',
    },
  ]

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative py-8 sm:py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/5">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              className="inline-block text-xl sm:text-2xl font-display font-bold text-gradient mb-3 sm:mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Denuwan Yasanga
            </motion.a>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xs mx-auto sm:mx-0">
              Software Engineer passionate about building innovative digital
              experiences and solving complex problems.
            </p>
          </div>

          {/* Quick links */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="text-xs sm:text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3 justify-center sm:justify-start">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-dark-700/50 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/10 border border-white/5 hover:border-neon-cyan/30 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            © {currentYear} Denuwan Yasanga. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
            Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-current" />
            </motion.span>
            using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
