"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

// Circular progress ring for percentage stats
function RingProgress({ value, max = 100, size = 140, stroke = 9, inView }: {
  value: number; max?: number; size?: number; stroke?: number; inView: boolean
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased * (value / max))
      if (p === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value, max])

  const dashOffset = circumference * (1 - progress)

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      {/* Track */}
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(92,122,92,0.12)" strokeWidth={stroke} />
      {/* Progress */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        style={{ transition: "none" }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E0BF6A" />
          <stop offset="100%" stopColor="#A8892A" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Vertical bar fill for count stats
function BarProgress({ value, max, inView }: { value: number; max: number; inView: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased * (value / max))
      if (p === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value, max])

  return (
    <div className="flex items-end gap-1 h-16">
      {Array.from({ length: 10 }).map((_, i) => {
        const threshold = (i + 1) / 10
        const filled = progress >= threshold
        const partial = progress > i / 10 && progress < threshold
        const fillPct = partial ? ((progress - i / 10) / 0.1) * 100 : filled ? 100 : 0
        return (
          <div key={i} className="flex-1 rounded-sm overflow-hidden bg-accent/10" style={{ height: `${40 + i * 7}%` }}>
            <div
              className="w-full bg-accent rounded-sm transition-none"
              style={{ height: `${fillPct}%`, background: `linear-gradient(to top, #A8892A, #E0BF6A)` }}
            />
          </div>
        )
      })}
    </div>
  )
}

function useCount(value: number, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(eased * value)
      if (p === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])
  return count
}

export default function StatsSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: "-60px" })

  const dau = useCount(2000000, inView)
  const acc = useCount(93.5, inView)
  const auto = useCount(60, inView)

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 border-t border-muted/40">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-display-md italic text-foreground mb-12"
        >
          Achievements
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* Card 1 — Daily Users (bar chart) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ scale: 1.03, y: -6, boxShadow: "0 20px 56px rgba(92,122,92,0.15)" }}
            className="relative overflow-hidden rounded-2xl border border-muted/40 bg-secondary cursor-default group px-7 pt-8 pb-7 flex flex-col gap-4"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/60 via-accent to-accent/30 rounded-t-2xl" />

            <div className="text-xs font-body uppercase tracking-widest text-accent/70">Annual Requests</div>

            <BarProgress value={2000000} max={2000000} inView={inView} />

            <div>
              <div className="font-display text-5xl sm:text-6xl text-accent italic leading-none">
                {dau >= 1000000 ? (dau / 1000000).toFixed(1).replace(".0","") + "M" : dau >= 1000 ? Math.round(dau).toLocaleString("en-US") : Math.round(dau)}
                <span className="text-3xl">+</span>
              </div>
              <div className="text-sm text-muted-foreground font-body mt-2">Dental prior auth · EasyScaleCloud</div>
            </div>
          </motion.div>

          {/* Card 2 — Decision Accuracy (ring) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ scale: 1.03, y: -6, boxShadow: "0 20px 56px rgba(92,122,92,0.15)" }}
            className="relative overflow-hidden rounded-2xl border border-muted/40 bg-secondary cursor-default group px-7 pt-8 pb-7 flex flex-col gap-4"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/60 via-accent to-accent/30 rounded-t-2xl" />

            <div className="text-xs font-body uppercase tracking-widest text-accent/70">Decision Accuracy</div>

            <div className="relative flex items-center justify-center">
              <RingProgress value={93.5} max={100} size={140} stroke={10} inView={inView} />
              <div className="absolute flex flex-col items-center">
                <span className="font-display text-3xl text-accent italic leading-none">{acc.toFixed(1)}<span className="text-xl">%</span></span>
                <span className="text-[10px] text-gray-400 font-body mt-0.5">of 100%</span>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground font-body">Dental prior auth · EasyScaleCloud</div>
            </div>
          </motion.div>

          {/* Card 3 — Requests Automated (ring) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -6, boxShadow: "0 20px 56px rgba(92,122,92,0.15)" }}
            className="relative overflow-hidden rounded-2xl border border-muted/40 bg-secondary cursor-default group px-7 pt-8 pb-7 flex flex-col gap-4"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/60 via-accent to-accent/30 rounded-t-2xl" />

            <div className="text-xs font-body uppercase tracking-widest text-accent/70">Requests Automated</div>

            <div className="relative flex items-center justify-center">
              <RingProgress value={60} max={100} size={140} stroke={10} inView={inView} />
              <div className="absolute flex flex-col items-center">
                <span className="font-display text-3xl text-accent italic leading-none">{Math.round(auto)}<span className="text-xl">%</span></span>
                <span className="text-[10px] text-gray-400 font-body mt-0.5">of 2M+ reqs</span>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground font-body">EasyScaleCloud</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
