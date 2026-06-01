"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const TOTAL_TOKENS = 1_247_832_048

const PROJECTS = [
  { name: "EasyScaleCloud · Dental Auth Agent", tokens: "~1.0B", model: "Claude 3.5 Sonnet", bar: 0.80 },
  { name: "TalkMeUp · AI Tutoring Platform",    tokens: "~180M", model: "GPT-4o",           bar: 0.145 },
  { name: "Ask Gene · ReAct Matching Agent",    tokens: "~68M",  model: "Claude 3 Haiku",   bar: 0.055 },
]

function useCount(target: number, inView: boolean, duration = 2200) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setVal(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])
  return val
}

export default function TokenTicker() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const count = useCount(TOTAL_TOKENS, inView)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setDone(true), 2300)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 border-t border-muted/40">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display text-display-md italic text-foreground mb-12"
        >
          By the Numbers
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -4, boxShadow: "0 20px 56px rgba(92,122,92,0.12)" }}
          className="rounded-2xl border border-muted/40 bg-secondary overflow-hidden cursor-default"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-muted/40">

            {/* Left — big counter */}
            <div className="px-8 sm:px-10 py-10 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-body uppercase tracking-widest text-accent/70 mb-4">
                  Total Tokens Processed
                </p>

                {/* Counter */}
                <div className="flex items-end gap-1">
                  <span className="font-display text-5xl sm:text-6xl text-accent italic leading-none">
                    {count.toLocaleString("en-US")}
                  </span>
                  {/* blinking cursor */}
                  <motion.span
                    animate={{ opacity: done ? [1, 0] : 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    className="inline-block w-[3px] h-[2.5rem] bg-accent mb-1 ml-1"
                  />
                </div>

                <p className="text-sm text-muted-foreground font-body mt-3">
                  ≈ 1.25 billion tokens across 3 production AI systems
                </p>
              </div>

              {/* Live badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
                <span className="text-xs font-body text-accent uppercase tracking-widest">Estimated lifetime usage</span>
              </div>
            </div>

            {/* Right — project breakdown */}
            <div className="px-8 sm:px-10 py-10 flex flex-col gap-6">
              <p className="text-xs font-body uppercase tracking-widest text-accent/70">
                Breakdown by project
              </p>

              <div className="flex flex-col gap-5">
                {PROJECTS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
                    className="flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-body text-foreground leading-snug">{p.name}</p>
                        <p className="text-xs text-muted-foreground font-body">{p.model}</p>
                      </div>
                      <span className="text-sm font-display italic text-accent ml-4 shrink-0">{p.tokens}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${p.bar * 100}%` } : {}}
                        transition={{ duration: 1.4, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Divider + total */}
              <div className="border-t border-muted/40 pt-4 flex items-center justify-between">
                <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">Total</span>
                <span className="font-display italic text-accent text-base">~1.25B tokens</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
