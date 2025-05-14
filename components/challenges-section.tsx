"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, Heart, User, ArrowRight, ChevronRight, ChevronLeft, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Types for challenges
interface Challenge {
  id: string
  title: string
  description: string
  approach: string
  image?: string
  progress: number // 0-100
}

interface ChallengeCategory {
  id: "professional" | "health" | "everything-else"
  name: string
  icon: React.ReactNode
  color: string
  challenges: Challenge[]
}

// Challenge data
const challengeCategories: ChallengeCategory[] = [
  {
    id: "professional",
    name: "Professional",
    icon: <Briefcase className="h-5 w-5" />,
    color: "rgba(120, 0, 255, 0.8)",
    challenges: [
      {
        id: "prof-1",
        title: "Scaling AI Ethics Implementation",
        description:
          "Developing frameworks for AI ethics that scale across organizations and are practical to implement.",
        approach:
          "Creating a modular ethics framework that can be customized based on risk level, domain, and organizational size. Focusing on practical implementation rather than abstract principles.",
        image: "/placeholder.svg?key=upbnk",
        progress: 65,
      },
      {
        id: "prof-2",
        title: "Bridging Technical and Business Leadership",
        description: "Finding the balance between deep technical expertise and strategic business leadership.",
        approach:
          "Developing a 'translation layer' approach where I can communicate complex technical concepts to business stakeholders and vice versa. Regular immersion in both worlds to maintain fluency.",
        progress: 80,
      },
      {
        id: "prof-3",
        title: "Building High-Performance Teams",
        description: "Creating team structures that foster both innovation and execution excellence.",
        approach:
          "Implementing a dual-track system with dedicated innovation time alongside execution focus. Developing metrics that balance creative exploration with delivery reliability.",
        image: "/placeholder.svg?key=xw26n",
        progress: 45,
      },
    ],
  },
  {
    id: "health",
    name: "Health",
    icon: <Heart className="h-5 w-5" />,
    color: "rgba(255, 50, 100, 0.8)",
    challenges: [
      {
        id: "health-1",
        title: "Optimizing Recovery Between Workouts",
        description:
          "Finding the optimal balance between training intensity and recovery to maximize long-term progress.",
        approach:
          "Implementing a data-driven approach using HRV monitoring, sleep tracking, and performance metrics to personalize recovery protocols and training intensity.",
        image: "/placeholder.svg?key=ln5re",
        progress: 70,
      },
      {
        id: "health-2",
        title: "Maintaining Mental Clarity During Intense Work Periods",
        description: "Preserving cognitive performance during high-stress, high-demand work periods.",
        approach:
          "Developing a system of strategic breaks, meditation practices, and environmental design to maintain focus and prevent mental fatigue during extended work sessions.",
        progress: 55,
      },
      {
        id: "health-3",
        title: "Balancing Strength and Mobility",
        description: "Developing both strength and mobility simultaneously without compromising either.",
        approach:
          "Creating an integrated training approach that incorporates mobility work directly into strength training rather than treating them as separate domains.",
        image: "/placeholder.svg?key=3cv45",
        progress: 60,
      },
    ],
  },
  {
    id: "everything-else",
    name: "Everything Else",
    icon: <User className="h-5 w-5" />,
    color: "rgba(0, 200, 255, 0.8)",
    challenges: [
      {
        id: "personal-1",
        title: "Deep Work in a Distracted World",
        description:
          "Creating space for deep, focused work in an environment of constant connectivity and distraction.",
        approach:
          "Designing a personal operating system with clear boundaries between deep work, shallow work, and rest. Using environmental design and digital minimalism to support focus.",
        image: "/placeholder.svg?key=keeuz",
        progress: 75,
      },
      {
        id: "personal-2",
        title: "Balancing Creation and Consumption",
        description: "Finding the right balance between consuming information and creating new work.",
        approach:
          "Implementing a creation-first approach where consumption is intentionally scheduled after creative work. Developing better filters for high-quality information sources.",
        progress: 40,
      },
      {
        id: "personal-3",
        title: "Meaningful Connection in Digital Age",
        description: "Maintaining deep, meaningful relationships despite geographic distribution and busy schedules.",
        approach:
          "Creating rituals for regular, meaningful connection with important people. Using technology intentionally to enhance rather than replace in-person connection.",
        image: "/placeholder.svg?key=k98fg",
        progress: 50,
      },
    ],
  },
]

export default function ChallengesSection() {
  const [activeCategory, setActiveCategory] = useState<ChallengeCategory>(challengeCategories[0])
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Handle canvas resizing
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [isExpanded])

  // Draw the futuristic background
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(120, 0, 255, 0.1)"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw moving particles
      const time = Date.now() * 0.001
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time * 0.3 + i * 0.5) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(time * 0.2 + i * 0.7) * 0.5 + 0.5) * canvas.height
        const size = Math.sin(time * 0.1 + i) * 2 + 3

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)

        // Use the active category color for particles
        const color = activeCategory ? activeCategory.color : "rgba(120, 0, 255, 0.8)"
        ctx.fillStyle = color.replace("0.8", "0.3")
        ctx.fill()
      }

      // Draw data flow lines
      ctx.strokeStyle = activeCategory ? activeCategory.color.replace("0.8", "0.2") : "rgba(120, 0, 255, 0.2)"
      ctx.lineWidth = 2

      for (let i = 0; i < 5; i++) {
        const startX = Math.sin(time * 0.2 + i * 2) * canvas.width * 0.5 + canvas.width * 0.5
        const startY = 0
        const endX = Math.sin(time * 0.1 + i * 3) * canvas.width * 0.5 + canvas.width * 0.5
        const endY = canvas.height

        ctx.beginPath()
        ctx.moveTo(startX, startY)

        // Create a curved line
        const cp1x = startX
        const cp1y = canvas.height * 0.3
        const cp2x = endX
        const cp2y = canvas.height * 0.7

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY)
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions.width, dimensions.height, activeCategory])

  // Set active challenge index when active challenge changes
  useEffect(() => {
    if (activeChallenge) {
      const index = activeCategory.challenges.findIndex((c) => c.id === activeChallenge.id)
      if (index !== -1) {
        setActiveChallengeIndex(index)
      }
    }
  }, [activeChallenge, activeCategory])

  const handleCategoryChange = (category: ChallengeCategory) => {
    setActiveCategory(category)
    setActiveChallenge(null)
    setActiveChallengeIndex(0)
  }

  const handleChallengeChange = (index: number) => {
    if (index >= 0 && index < activeCategory.challenges.length) {
      setActiveChallenge(activeCategory.challenges[index])
      setActiveChallengeIndex(index)
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <section id="challenges" className="py-20 md:py-32 relative" ref={containerRef}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Current Challenges</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            The problems I'm currently working through and my approaches to solving them.
          </p>
        </motion.div>

        {/* Category tabs - floating holographic style */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-black/30 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-[0_0_15px_rgba(120,0,255,0.3)]">
            {challengeCategories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-3 rounded-full flex items-center space-x-2 transition-all ${
                  activeCategory.id === category.id
                    ? "bg-black/50 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-black/20"
                }`}
                style={{
                  boxShadow: activeCategory.id === category.id ? `0 0 10px ${category.color}` : "none",
                  borderColor: activeCategory.id === category.id ? category.color : "transparent",
                }}
                onClick={() => handleCategoryChange(category)}
              >
                <span
                  className="mr-2"
                  style={{ color: activeCategory.id === category.id ? category.color : "rgba(255,255,255,0.6)" }}
                >
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Futuristic challenge display */}
        <div
          className={`relative bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all duration-500 ${isExpanded ? "h-[80vh]" : "h-[500px]"}`}
        >
          {/* Expand/collapse button */}
          <button
            className="absolute top-4 right-4 z-20 bg-black/50 rounded-full p-2 text-white/70 hover:text-white"
            onClick={toggleExpanded}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          {/* Holographic interface */}
          <div className="absolute inset-0 flex flex-col md:flex-row">
            {/* Side navigation */}
            <div
              className="w-full md:w-1/4 border-r border-white/10 p-4 overflow-y-auto"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), linear-gradient(to right, ${activeCategory.color.replace("0.8", "0.1")}, transparent)`,
              }}
            >
              <div className="space-y-2">
                {activeCategory.challenges.map((challenge, index) => (
                  <motion.button
                    key={challenge.id}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      activeChallenge?.id === challenge.id
                        ? "bg-black/50 border border-white/20"
                        : "bg-black/20 hover:bg-black/30 border border-transparent"
                    }`}
                    style={{
                      boxShadow:
                        activeChallenge?.id === challenge.id
                          ? `0 0 10px ${activeCategory.color.replace("0.8", "0.3")}`
                          : "none",
                      borderColor:
                        activeChallenge?.id === challenge.id
                          ? activeCategory.color.replace("0.8", "0.5")
                          : "transparent",
                    }}
                    onClick={() => handleChallengeChange(index)}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{challenge.title}</h3>
                      <div
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: activeCategory.color.replace("0.8", "0.2"),
                          color: activeCategory.color.replace("0.8", "1"),
                        }}
                      >
                        {challenge.progress}%
                      </div>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${challenge.progress}%`,
                          backgroundColor: activeCategory.color,
                        }}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeChallenge ? (
                  <motion.div
                    key={activeChallenge.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    {/* Challenge image */}
                    {activeChallenge.image && (
                      <div className="relative h-1/3 w-full">
                        <Image
                          src={activeChallenge.image || "/placeholder.svg"}
                          alt={activeChallenge.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

                        {/* Holographic overlay effect */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30"
                          style={{ animation: "scan 3s linear infinite" }}
                        />
                      </div>
                    )}

                    {/* Challenge content */}
                    <div className={`flex-1 p-6 ${activeChallenge.image ? "pt-0" : ""} overflow-y-auto`}>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold" style={{ color: activeCategory.color.replace("0.8", "1") }}>
                          {activeChallenge.title}
                        </h3>

                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 rounded-full bg-black/30 hover:bg-black/50 disabled:opacity-50"
                            onClick={() => handleChallengeChange(activeChallengeIndex - 1)}
                            disabled={activeChallengeIndex === 0}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <span className="text-sm text-white/70">
                            {activeChallengeIndex + 1} / {activeCategory.challenges.length}
                          </span>
                          <button
                            className="p-2 rounded-full bg-black/30 hover:bg-black/50 disabled:opacity-50"
                            onClick={() => handleChallengeChange(activeChallengeIndex + 1)}
                            disabled={activeChallengeIndex === activeCategory.challenges.length - 1}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Progress indicator */}
                      <div className="mb-8">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span style={{ color: activeCategory.color.replace("0.8", "1") }}>
                            {activeChallenge.progress}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
                          <div
                            className="h-full"
                            style={{
                              width: `${activeChallenge.progress}%`,
                              background: `linear-gradient(to right, ${activeCategory.color}, ${activeCategory.color.replace("0.8", "0.6")})`,
                              boxShadow: `0 0 10px ${activeCategory.color.replace("0.8", "0.5")}`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Challenge details */}
                      <div className="space-y-6">
                        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-white/10">
                          <h4
                            className="text-lg font-semibold mb-2"
                            style={{ color: activeCategory.color.replace("0.8", "1") }}
                          >
                            The Challenge
                          </h4>
                          <p className="text-white/80">{activeChallenge.description}</p>
                        </div>

                        <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-white/10">
                          <h4
                            className="text-lg font-semibold mb-2"
                            style={{ color: activeCategory.color.replace("0.8", "1") }}
                          >
                            My Approach
                          </h4>
                          <p className="text-white/80">{activeChallenge.approach}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                    style={{
                      background: `radial-gradient(circle at center, ${activeCategory.color.replace("0.8", "0.1")}, transparent 70%)`,
                    }}
                  >
                    <div className="text-6xl mb-4" style={{ color: activeCategory.color.replace("0.8", "0.3") }}>
                      {activeCategory.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Select a Challenge</h3>
                    <p className="text-white/60 max-w-md mb-6">
                      Explore my current {activeCategory.name.toLowerCase()} challenges and how I'm approaching them.
                    </p>
                    <Button
                      variant="outline"
                      className="border-white/20 hover:bg-white/10"
                      style={{
                        borderColor: activeCategory.color.replace("0.8", "0.3"),
                        color: activeCategory.color.replace("0.8", "1"),
                      }}
                      onClick={() => handleChallengeChange(0)}
                    >
                      View First Challenge <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  )
}
