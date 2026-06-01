"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  const dotX = useSpring(x, { stiffness: 900, damping: 50 })
  const dotY = useSpring(y, { stiffness: 900, damping: 50 })
  const ringX = useSpring(x, { stiffness: 250, damping: 28 })
  const ringY = useSpring(y, { stiffness: 250, damping: 28 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(
        !!el.closest('a, button, [role="button"], label, input, [class*="cursor-pointer"]')
      )
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
    }
  }, [x, y, visible])

  if (!visible) return null

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Trailing ring */}
      <motion.div
        className="absolute rounded-full border-2 border-accent"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 48 : 30,
          height: hovering ? 48 : 30,
          opacity: hovering ? 0.8 : 0.45,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
      {/* Dot */}
      <motion.div
        className="absolute rounded-full bg-accent"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 5 : 8, height: hovering ? 5 : 8, opacity: hovering ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 700, damping: 40 }}
      />
    </div>
  )
}
