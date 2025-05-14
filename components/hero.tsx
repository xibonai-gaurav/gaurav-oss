"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const taglines = [
  "I turn chaos into clarity.",
  "Building minds that build.",
  "Brains. Biceps. Bold Ideas.",
  "Where strategy meets strength.",
  "Thinking deeper. Building better.",
]

export default function Hero() {
  const [currentTagline, setCurrentTagline] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [typedText, setTypedText] = useState("")
  const fullText = "Welcome to Gaurav's World"
  const typingSpeed = 80 // ms per character
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [typedText])

  // Tagline rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Minimal background effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 0, 10, 1)")
      gradient.addColorStop(1, "rgba(10, 0, 20, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(120, 0, 255, 0.05)"
      ctx.lineWidth = 0.5

      const gridSize = 50

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(drawBackground)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawBackground()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <span className="inline-block terminal-text">{typedText}</span>
            {isTyping && <span className="inline-block animate-pulse">|</span>}
          </h1>

          <div className="h-16 md:h-20 mb-8 flex items-center justify-center">
            <motion.h2
              key={currentTagline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-display text-gradient-alt glow-accent"
            >
              {taglines[currentTagline]}
            </motion.h2>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            <Button
              size="lg"
              className="mt-8 bg-primary/20 hover:bg-primary/30 border border-primary/50 text-white group relative overflow-hidden"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <span className="relative z-10 flex items-center">
                Explore the Layers <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce"
      >
        <ArrowDown className="h-6 w-6 text-white/60" />
      </motion.div>
    </section>
  )
}
