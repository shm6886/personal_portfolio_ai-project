"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

const ROTATING_PHRASES = [
  "Building production-grade LLM agent systems.",
  "Served 5,000+ daily users with <5% bounce rate.",
  "93.5% decision accuracy in dental AI agent.",
  "Improved precision@3 from 0.41 → 0.74 with RAG.",
  "60% automation of 2M+ annual requests.",
]

const NAME_CHARS_1 = "Haoming".split("")
const NAME_CHARS_2 = "Sun".split("")

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [cardHovered, setCardHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Magnetic CTA
  const ctaMagX = useMotionValue(0)
  const ctaMagY = useMotionValue(0)
  const ctaSpringX = useSpring(ctaMagX, { stiffness: 200, damping: 20 })
  const ctaSpringY = useSpring(ctaMagY, { stiffness: 200, damping: 20 })
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(i => (i + 1) % ROTATING_PHRASES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    setTilt({ x: y * -14, y: x * 14 })
  }, [])

  const handleCardMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setCardHovered(false)
  }, [])

  const handleCtaMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ctaRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    ctaMagX.set((e.clientX - left - width / 2) * 0.12)
    ctaMagY.set((e.clientY - top - height / 2) * 0.12)
  }, [ctaMagX, ctaMagY])

  const handleCtaMouseLeave = useCallback(() => {
    ctaMagX.set(0)
    ctaMagY.set(0)
  }, [ctaMagX, ctaMagY])

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Floating background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { w: 400, h: 400, x: "10%", y: "15%", dur: 8, delay: 0 },
          { w: 300, h: 300, x: "75%", y: "60%", dur: 10, delay: 2 },
          { w: 200, h: 200, x: "55%", y: "10%", dur: 7, delay: 1 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/5"
            style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y }}
            animate={{ y: [0, -24, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative">
        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[70vh]">

          {/* Left Side */}
          <div>
            {/* Animated name letters */}
            <h1 className="font-display text-display-xl text-foreground leading-none mb-4 italic">
              <span className="flex flex-wrap">
                {NAME_CHARS_1.map((char, i) => (
                  <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate="visible"
                    whileHover={{ scale: 1.25, color: "#5C7A5C", transition: { duration: 0.15 } }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
              <span className="accent-underline flex flex-wrap">
                {NAME_CHARS_2.map((char, i) => (
                  <motion.span key={i} custom={NAME_CHARS_1.length + i} variants={letterVariants} initial="hidden" animate="visible"
                    whileHover={{ scale: 1.25, color: "#5C7A5C", transition: { duration: 0.15 } }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-display text-display-md text-accent mb-6"
            >
              AI Agent Developer
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="w-16 h-0.5 bg-accent mb-6"
            />

            {/* Rotating Description */}
            <div className="h-16 mb-4 flex items-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed"
                >
                  {ROTATING_PHRASES[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Phrase dots */}
            <div className="flex gap-1.5 mb-8">
              {ROTATING_PHRASES.map((_, i) => (
                <button key={i} onClick={() => setPhraseIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === phraseIndex ? "w-6 bg-accent" : "w-1.5 bg-muted"}`}
                />
              ))}
            </div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="flex gap-4 mb-8"
            >
              {[
                { href: "https://github.com/haoming-sun", icon: <FaGithub size={22} />, label: "GitHub" },
                { href: "https://linkedin.com/in/haoming-sun", icon: <FaLinkedin size={22} />, label: "LinkedIn" },
              ].map(({ href, icon, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full border border-muted/60 hover:border-accent hover:text-accent transition-colors cursor-pointer shadow-sm"
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Image with 3D tilt + zoom */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onMouseEnter={() => setCardHovered(true)}
              className="relative cursor-pointer"
              style={{ perspective: "800px" }}
            >
              <div className="absolute bottom-[-12px] right-[-12px] w-full h-full bg-accent/20 rounded-2xl" />
              <motion.div
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-[26rem] bg-surface overflow-hidden shadow-bold rounded-2xl group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  animate={{ scale: cardHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src="/images/profile.png"
                    alt="Haoming Sun Profile Photo"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                {/* Shine */}
                <motion.div
                  animate={{
                    background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 + tilt.x * 3}%, rgba(255,255,255,0.18) 0%, transparent 65%)`,
                  }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Magnetic CTA */}
        <motion.div
          ref={ctaRef}
          onMouseMove={handleCtaMouseMove}
          onMouseLeave={handleCtaMouseLeave}
          style={{ x: ctaSpringX, y: ctaSpringY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 lg:mt-0"
        >
          <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
            <Link
              href="/chat"
              className="group flex items-center justify-between w-full p-6 border border-muted/50 hover:border-accent/40 hover:shadow-bold-accent bg-surface transition-all cursor-pointer rounded-2xl shadow-sm"
            >
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground italic">
                  Chat with Haoming
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-1">
                  Ask about AI agents, evaluation frameworks, production systems, and technical depth
                </p>
              </div>
              <motion.div
                whileHover={{ x: 6, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowRight className="w-7 h-7 text-foreground flex-shrink-0 ml-4" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
