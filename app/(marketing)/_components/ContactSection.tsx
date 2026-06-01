"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 border-t border-muted/40">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-display-md italic text-black dark:text-white mb-8"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl"
        >
          Ready to collaborate or discuss opportunities? Reach out and let's build something great together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="mailto:shmaugmini@outlook.com"
            className="bold-button-accent flex items-center justify-center gap-3"
          >
            <Mail size={20} />
            Send Email
          </a>
          <a
            href="https://linkedin.com/in/haoming-sun"
            target="_blank"
            rel="noopener noreferrer"
            className="bold-button flex items-center justify-center gap-3"
          >
            <FaLinkedin size={20} />
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}
