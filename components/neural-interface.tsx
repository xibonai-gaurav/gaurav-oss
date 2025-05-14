"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

// Neural Interface creates subtle AI-like visual cues and interactions
export default function NeuralInterface() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isScrolling, setIsScrolling] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number } | null>(null)
  const [lastInteraction, setLastInteraction] = useState(Date.now())
  const pathname = usePathname()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setLastInteraction(Date.now())
    }

    const handleScroll = () => {
      setIsScrolling(true)
      setLastInteraction(Date.now())

      // Clear previous timeout
      const timeout = setTimeout(() => {
        setIsScrolling(false)
      }, 500)

      return () => clearTimeout(timeout)
    }

    const handleClick = (e: MouseEvent) => {
      setFocusPoint({ x: e.clientX, y: e.clientY })
      setIsThinking(true)
      setLastInteraction(Date.now())

      setTimeout(() => {
        setIsThinking(false)
        setTimeout(() => {
          setFocusPoint(null)
        }, 1000)
      }, 800)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleClick)
    }
  }, [])

  // Draw neural interface visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Only draw active elements if there was interaction in the last 5 seconds
      const isActive = Date.now() - lastInteraction < 5000

      if (isActive) {
        // Draw focus point (when clicking)
        if (focusPoint) {
          ctx.beginPath()
          ctx.arc(focusPoint.x, focusPoint.y, 50, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(120, 0, 255, 0.1)"
          ctx.lineWidth = 1
          ctx.stroke()

          // Draw expanding circle
          ctx.beginPath()
          const radius = 50 + (isThinking ? Math.sin(Date.now() / 200) * 10 : 0)
          ctx.arc(focusPoint.x, focusPoint.y, radius, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(120, 0, 255, 0.05)"
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Draw subtle mouse trail
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, 100, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(120, 0, 255, 0.01)"
        ctx.fill()

        // Draw scroll indicator
        if (isScrolling) {
          const height = 100
          ctx.fillStyle = "rgba(120, 0, 255, 0.03)"
          ctx.fillRect(0, 0, canvas.width, height)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition, isScrolling, focusPoint, isThinking, lastInteraction])

  return (
    <>
      {/* Neural interface canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" />

      {/* Thinking indicator */}
      <AnimatePresence>
        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
          >
            <div className="ai-processing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle page transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/10 pointer-events-none z-30"
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
    </>
  )
}
