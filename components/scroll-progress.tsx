"use client"

import { motion, useScroll } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
