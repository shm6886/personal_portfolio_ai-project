"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { CDN_ASSETS } from "@/lib/constants"
import { Sparkles, Zap, Target, Users } from "lucide-react"

const TYPING_PHRASES = [
  "AI Agent Developer.",
  "LLM Systems Builder.",
  "Production ML Engineer.",
  "RAG & Evaluation Expert.",
]

const QUICK_STATS = [
  { icon: Users, label: "5,000+ Daily Users", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { icon: Target, label: "93.5% Accuracy", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { icon: Zap, label: "60% Automated", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { icon: Sparkles, label: "~1.25B Tokens", color: "bg-purple-50 border-purple-200 text-purple-700" },
]

function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, phraseIndex])

  return (
    <span className="text-accent font-display italic">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1em] bg-accent align-middle ml-0.5"
      />
    </span>
  )
}

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-2xl mx-auto md:mt-6 px-2"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main card */}
      <div className="border border-muted/40 rounded-2xl bg-secondary shadow-sm overflow-hidden">

        {/* Top gradient bar */}
        <div className="h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40" />

        <div className="py-10 px-8 flex flex-col items-center text-center gap-5">

          {/* Avatar with pulsing ring */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-accent/20"
            />
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent/40 shadow-md">
              <Image
                src={CDN_ASSETS.PROFILE_PHOTO}
                alt="Haoming Sun"
                width={80}
                height={80}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Online dot */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-secondary"
            />
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-1">
              Hi! I'm Haoming's <span className="text-accent italic">AI Assistant</span>
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              Ask me anything — I'll tell you about&nbsp;
              <TypewriterText />
            </p>
          </div>

          {/* Quick stat chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {QUICK_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-body font-medium cursor-default ${stat.color}`}
              >
                <stat.icon size={11} />
                {stat.label}
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs text-muted-foreground font-body mt-3"
      >
        Click a suggestion below or type your own question
      </motion.p>
    </motion.div>
  )
}
