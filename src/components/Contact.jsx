import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiCheck,
  FiAlertCircle,
} from 'react-icons/fi'

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'denuwanyasanga9@gmail.com',
    href: 'mailto:denuwanyasanga9@gmail.com',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Colombo, Sri Lanka',
    href: null,
  },
]

const socialLinks = [
  {
    icon: FiGithub,
    label: 'GitHub',
    href: 'https://github.com/denuwan9',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/denuwan-yasanga-9a4442309/',
  },
  {
    icon: FiTwitter,
    label: 'Twitter',
    href: 'https://twitter.com/denuwanyasanga',
  },
]

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const FORMSPREE_ID = 'xbddpval'

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null)
        }, 5000)
      } else {
        setSubmitStatus('error')
        // Auto-hide error message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null)
        }, 5000)
      }
    } catch (error) {
      setSubmitStatus('error')
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = `
    w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-dark-700/50 border border-white/10
    text-sm sm:text-base text-white placeholder-gray-500 outline-none transition-all duration-300
    focus:border-neon-cyan/50 focus:shadow-[0_0_20px_rgba(0,245,255,0.1)]
    hover:border-white/20
  `

  const errorClasses = 'border-red-500/50 focus:border-red-500/50'

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      {/* Decorative orbs - hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 -left-40 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-1/4 -right-40 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl" />

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
              Get In Touch
            </span>
            <h2 className="section-title text-gradient mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl">
              Let's Work Together
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-2 sm:mt-4 text-sm sm:text-base px-4">
              Have a project in mind or just want to chat? Feel free to reach out.
              I'm always open to discussing new opportunities.
            </p>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mt-4 sm:mt-6 rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 sm:space-y-8"
            >
              <div className="glass-card p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4 sm:mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-3 sm:gap-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-colors flex-shrink-0">
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-neon-cyan" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-400">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm sm:text-base text-white hover:text-neon-cyan transition-colors truncate block"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm sm:text-base text-white truncate">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social links */}
                <div className="mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-white/10">
                  <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Follow me</p>
                  <div className="flex gap-3 sm:gap-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-600/50 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/10 border border-white/10 hover:border-neon-cyan/30 transition-all"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <link.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative card - hidden on very small screens */}
              <motion.div
                className="hidden xs:block glass-card p-4 sm:p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple p-0.5">
                  <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">💬</span>
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">
                  Let's Chat!
                </h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  I typically respond within 24 hours. Looking forward to hearing
                  from you!
                </p>
              </motion.div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="glass-card p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4 sm:mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  {/* Name input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your name"
                      className={`${inputClasses} ${errors.name ? errorClasses : ''}`}
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                      })}
                    />
                    {errors.name && (
                      <motion.p
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Email input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className={`${inputClasses} ${errors.email ? errorClasses : ''}`}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <motion.p
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Subject input */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      placeholder="What's this about?"
                      className={`${inputClasses} ${errors.subject ? errorClasses : ''}`}
                      {...register('subject', {
                        required: 'Subject is required',
                      })}
                    />
                    {errors.subject && (
                      <motion.p
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.subject.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Message textarea */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      className={`${inputClasses} resize-none ${
                        errors.message ? errorClasses : ''
                      }`}
                      {...register('message', {
                        required: 'Message is required',
                        minLength: {
                          value: 10,
                          message: 'Message must be at least 10 characters',
                        },
                      })}
                    />
                    {errors.message && (
                      <motion.p
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-glow flex items-center justify-center gap-2 text-dark-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Status messages */}
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                        submitStatus === 'success'
                          ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                          : 'bg-red-500/10 border border-red-500/30 text-red-400'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {submitStatus === 'success' ? (
                        <>
                          <FiCheck className="w-5 h-5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Message sent!</p>
                            <p className="text-sm opacity-80">
                              Thanks for reaching out. I'll get back to you soon.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Something went wrong</p>
                            <p className="text-sm opacity-80">
                              Please try again or email me directly.
                            </p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
