"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, Zap, Activity, X, Maximize2, Minimize2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Types for our thought visualization
interface Thought {
  id: string
  content: string
  snippet: string
  category: "ai" | "philosophy" | "strategy" | "innovation" | "health"
  intensity: number // 0-1, how "bright" or prominent the thought is
  connections: string[] // IDs of connected thoughts
  position?: { x: number; y: number } // For visualization
  velocity?: { x: number; y: number } // For animation
  size?: number // Visual size of the thought
  image?: string // Optional image URL
}

interface ThoughtCluster {
  id: string
  name: string
  description: string
  thoughts: Thought[]
  color: string
  icon: React.ReactNode
}

// Gaurav's current thoughts
const thoughtClusters: ThoughtCluster[] = [
  {
    id: "ai-stuff",
    name: "AI Stuff",
    description: "My current thoughts on AI and its implications",
    color: "rgba(120, 0, 255, 0.8)",
    icon: <Zap className="h-4 w-4" />,
    thoughts: [
      {
        id: "ai-1",
        content: "AI Alignment",
        snippet:
          "The most pressing challenge in AI is ensuring systems remain aligned with human values as they become more capable. This requires ongoing dialogue rather than fixed rules.",
        category: "ai",
        intensity: 0.9,
        connections: ["ai-2", "ai-4", "philosophy-3"],
        image: "/placeholder.svg?key=54vql",
      },
      {
        id: "ai-2",
        content: "Explainable AI",
        snippet:
          "For AI to be trusted, it must be able to explain its reasoning. The black box problem is a significant barrier to adoption in critical domains.",
        category: "ai",
        intensity: 0.8,
        connections: ["ai-1", "ai-3"],
      },
      {
        id: "ai-3",
        content: "AI Regulation",
        snippet:
          "Finding the balance between innovation and safety in AI regulation is crucial. Too restrictive and we stifle progress; too permissive and we risk unintended consequences.",
        category: "ai",
        intensity: 0.7,
        connections: ["ai-2", "philosophy-2"],
      },
      {
        id: "ai-4",
        content: "Multimodal AI",
        snippet:
          "The future of AI is multimodal - systems that can seamlessly process and generate text, images, audio, and more in an integrated way.",
        category: "ai",
        intensity: 0.6,
        connections: ["ai-1", "innovation-2"],
        image: "/placeholder.svg?key=43s75",
      },
    ],
  },
  {
    id: "philosophy",
    name: "Philosophy",
    description: "My philosophical musings and questions",
    color: "rgba(255, 100, 200, 0.8)",
    icon: <Brain className="h-4 w-4" />,
    thoughts: [
      {
        id: "philosophy-1",
        content: "Consciousness",
        snippet:
          "What if consciousness is simply what information processing feels like from the inside? This perspective shifts how we think about AI and our own experience.",
        category: "philosophy",
        intensity: 0.9,
        connections: ["philosophy-2", "ai-1"],
        image: "/placeholder.svg?key=me5mq",
      },
      {
        id: "philosophy-2",
        content: "Evolving Values",
        snippet:
          "Human values aren't static—they evolve through cultural dialogue and technological change. This makes encoding values into AI systems particularly challenging.",
        category: "philosophy",
        intensity: 0.8,
        connections: ["philosophy-1", "philosophy-3", "ai-3"],
      },
      {
        id: "philosophy-3",
        content: "Purpose Creation",
        snippet:
          "Purpose isn't something we discover but something we create through meaningful action. The search for meaning is itself the meaning.",
        category: "philosophy",
        intensity: 0.7,
        connections: ["philosophy-2", "health-2"],
      },
    ],
  },
  {
    id: "strategy",
    name: "Strategy",
    description: "My strategic thinking on various challenges",
    color: "rgba(255, 200, 0, 0.8)",
    icon: <Sparkles className="h-4 w-4" />,
    thoughts: [
      {
        id: "strategy-1",
        content: "First Principles",
        snippet:
          "Breaking problems down to their fundamental truths and building up from there is the most effective way to innovate rather than reasoning by analogy.",
        category: "strategy",
        intensity: 0.9,
        connections: ["strategy-2", "innovation-1"],
      },
      {
        id: "strategy-2",
        content: "Win-Win Solutions",
        snippet:
          "The most sustainable strategies create value for all stakeholders. Zero-sum thinking is a cognitive trap that limits possibilities.",
        category: "strategy",
        intensity: 0.8,
        connections: ["strategy-1", "strategy-3", "health-1"],
      },
      {
        id: "strategy-3",
        content: "Long-term Thinking",
        snippet:
          "In a world obsessed with quarterly results, thinking in decades creates enormous competitive advantage and leads to more meaningful outcomes.",
        category: "strategy",
        intensity: 0.7,
        connections: ["strategy-2", "innovation-3"],
        image: "/placeholder.svg?key=h0bd9",
      },
    ],
  },
  {
    id: "innovation",
    name: "Innovation",
    description: "My thoughts on creativity and innovation",
    color: "rgba(0, 255, 150, 0.8)",
    icon: <Sparkles className="h-4 w-4" />,
    thoughts: [
      {
        id: "innovation-1",
        content: "Interdisciplinary Thinking",
        snippet:
          "The most interesting innovations happen at the intersection of different fields. Connecting ideas across domains leads to breakthrough insights.",
        category: "innovation",
        intensity: 0.9,
        connections: ["innovation-2", "strategy-1"],
        image: "/placeholder.svg?key=rmguk",
      },
      {
        id: "innovation-2",
        content: "Constraints Drive Creativity",
        snippet:
          "Unlimited resources often lead to mediocre results. It's constraints that force us to think differently and find creative solutions.",
        category: "innovation",
        intensity: 0.8,
        connections: ["innovation-1", "innovation-3", "ai-4"],
      },
      {
        id: "innovation-3",
        content: "Obvious in Retrospect",
        snippet:
          "The best innovations seem obvious in retrospect. This is the paradox of innovation - it's hard to see before it exists, then impossible to unsee afterward.",
        category: "innovation",
        intensity: 0.7,
        connections: ["innovation-2", "strategy-3"],
      },
    ],
  },
  {
    id: "health",
    name: "Health",
    description: "My thoughts on physical and mental wellbeing",
    color: "rgba(0, 200, 255, 0.8)",
    icon: <Activity className="h-4 w-4" />,
    thoughts: [
      {
        id: "health-1",
        content: "Mind-Body Connection",
        snippet:
          "Physical training isn't just about aesthetics—it's a cornerstone of cognitive performance. The mind and body are not separate systems but one integrated whole.",
        category: "health",
        intensity: 0.9,
        connections: ["health-2", "strategy-2"],
        image: "/placeholder.svg?height=300&width=400&query=Mind+body+connection+fitness",
      },
      {
        id: "health-2",
        content: "Recovery Focus",
        snippet:
          "The most sophisticated training approaches focus as much on recovery as they do on exertion. Growth happens during rest, not during stress.",
        category: "health",
        intensity: 0.8,
        connections: ["health-1", "health-3", "philosophy-3"],
      },
      {
        id: "health-3",
        content: "Consistency Over Intensity",
        snippet:
          "Sustainable progress comes from consistent moderate effort rather than sporadic extreme effort. This applies to both physical and mental development.",
        category: "health",
        intensity: 0.7,
        connections: ["health-2"],
      },
    ],
  },
]

// Neural Thought Stream Component
export default function NeuralThoughtStream() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeCluster, setActiveCluster] = useState<ThoughtCluster | null>(null)
  const [activeThought, setActiveThought] = useState<Thought | null>(null)
  const [relatedThoughts, setRelatedThoughts] = useState<Thought[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [thoughtMap, setThoughtMap] = useState<Map<string, Thought>>(new Map())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [isThinking, setIsThinking] = useState(false)
  const [thoughtActivity, setThoughtActivity] = useState<number[]>([0, 0, 0, 0, 0])

  // Initialize thought map for quick lookups
  useEffect(() => {
    const map = new Map<string, Thought>()
    thoughtClusters.forEach((cluster) => {
      cluster.thoughts.forEach((thought) => {
        map.set(thought.id, { ...thought })
      })
    })
    setThoughtMap(map)

    // Start with a random cluster
    const randomIndex = Math.floor(Math.random() * thoughtClusters.length)
    setActiveCluster(thoughtClusters[randomIndex])

    setIsInitialized(true)
  }, [])

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

  // Initialize thought positions when dimensions change
  useEffect(() => {
    if (!activeCluster || dimensions.width === 0 || !isInitialized) return

    // Only update positions if they haven't been set yet
    const needsPositioning = activeCluster.thoughts.some((thought) => !thought.position)

    if (!needsPositioning) return

    // Position thoughts in a force-directed layout
    const thoughts = activeCluster.thoughts.map((thought) => {
      // Only initialize position if not already set
      if (!thought.position) {
        return {
          ...thought,
          position: {
            x: Math.random() * dimensions.width * 0.8 + dimensions.width * 0.1,
            y: Math.random() * dimensions.height * 0.8 + dimensions.height * 0.1,
          },
          velocity: { x: 0, y: 0 },
          size: 10 + thought.content.length / 5,
        }
      }
      return thought
    })

    // Update the cluster with positioned thoughts
    setActiveCluster({
      ...activeCluster,
      thoughts,
    })
  }, [activeCluster, dimensions.width, dimensions.height, isInitialized])

  // Draw the neural network visualization
  useEffect(() => {
    if (!canvasRef.current || !activeCluster || !isInitialized || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Store the current state to avoid dependency issues
    const currentActiveCluster = activeCluster
    const currentActiveThought = activeThought
    const currentThoughtMap = thoughtMap

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const thoughts = currentActiveCluster.thoughts

      // Draw connections first (so they appear behind nodes)
      ctx.lineWidth = 1
      thoughts.forEach((thought) => {
        if (!thought.position) return

        thought.connections.forEach((connId) => {
          const connectedThought = currentThoughtMap.get(connId)
          if (connectedThought?.position) {
            // Draw connection line
            ctx.beginPath()
            ctx.moveTo(thought.position!.x, thought.position!.y)
            ctx.lineTo(connectedThought.position.x, connectedThought.position.y)

            // Style based on whether this is an active thought
            if (
              currentActiveThought &&
              (thought.id === currentActiveThought.id || connectedThought.id === currentActiveThought.id)
            ) {
              ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`
            }

            ctx.stroke()
          }
        })
      })

      // Create a copy of thoughts to avoid mutating the original state
      const updatedThoughts = [...thoughts]

      // Draw nodes (thoughts)
      updatedThoughts.forEach((thought, index) => {
        if (!thought.position) return

        // Apply simple physics
        if (thought.velocity) {
          thought.position.x += thought.velocity.x
          thought.position.y += thought.velocity.y

          // Dampen velocity
          thought.velocity.x *= 0.98
          thought.velocity.y *= 0.98

          // Bounce off edges
          if (thought.position.x < 0 || thought.position.x > canvas.width) {
            thought.velocity.x *= -1
          }
          if (thought.position.y < 0 || thought.position.y > canvas.height) {
            thought.velocity.y *= -1
          }
        }

        // Determine if this is the active thought or related to it
        const isActive = currentActiveThought && thought.id === currentActiveThought.id
        const isRelated = currentActiveThought && currentActiveThought.connections.includes(thought.id)

        // Draw the thought node
        ctx.beginPath()
        const radius = thought.size || 10
        ctx.arc(thought.position.x, thought.position.y, radius, 0, Math.PI * 2)

        // Style based on state
        if (isActive) {
          ctx.fillStyle = currentActiveCluster.color
          ctx.shadowColor = currentActiveCluster.color
          ctx.shadowBlur = 15
        } else if (isRelated) {
          ctx.fillStyle = currentActiveCluster.color.replace("0.8", "0.6")
          ctx.shadowColor = currentActiveCluster.color
          ctx.shadowBlur = 10
        } else {
          ctx.fillStyle = currentActiveCluster.color.replace("0.8", `${0.2 + thought.intensity * 0.3}`)
          ctx.shadowBlur = 0
        }

        ctx.fill()
        ctx.shadowBlur = 0

        // Draw pulsing effect for active thought
        if (isActive && thought.size) {
          ctx.beginPath()
          ctx.arc(thought.position.x, thought.position.y, radius + 5 + Math.sin(Date.now() / 200) * 3, 0, Math.PI * 2)
          ctx.strokeStyle = currentActiveCluster.color.replace("0.8", "0.4")
          ctx.stroke()
        }

        // Draw text label for the thought
        ctx.font = "10px Inter, sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Only draw text if the node is large enough
        if (radius > 12) {
          // Limit text length based on node size
          const maxLength = Math.floor(radius / 3)
          let displayText = thought.content
          if (displayText.length > maxLength) {
            displayText = displayText.substring(0, maxLength) + "..."
          }
          ctx.fillText(displayText, thought.position.x, thought.position.y)
        }

        // Draw image icon if thought has an image
        if (thought.image) {
          const iconSize = 6
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
          ctx.fillRect(thought.position.x + radius - iconSize - 2, thought.position.y - radius + 2, iconSize, iconSize)
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [activeCluster, dimensions.width, dimensions.height, activeThought])

  // Handle clicking on a thought
  const handleThoughtClick = (thought: Thought) => {
    // Make a copy to avoid mutating the original object
    const thoughtCopy = { ...thought }

    setActiveThought(thoughtCopy)

    // Find related thoughts
    const related = thoughtCopy.connections.map((id) => thoughtMap.get(id)).filter((t) => t !== undefined) as Thought[]

    setRelatedThoughts(related)

    // Apply a small force to the clicked thought
    if (activeCluster) {
      // Find the thought in the active cluster and update it
      const updatedThoughts = activeCluster.thoughts.map((t) => {
        if (t.id === thoughtCopy.id && t.velocity) {
          return {
            ...t,
            velocity: {
              x: t.velocity.x + (Math.random() - 0.5) * 2,
              y: t.velocity.y + (Math.random() - 0.5) * 2,
            },
          }
        }
        return t
      })

      // Update the active cluster with the modified thoughts
      setActiveCluster({
        ...activeCluster,
        thoughts: updatedThoughts,
      })
    }
  }

  // Simulate "thinking" activity
  useEffect(() => {
    // Store the current values to avoid dependency issues
    const currentActiveCluster = activeCluster
    const currentIsThinking = isThinking
    const currentActiveThought = activeThought
    const currentThoughtMap = thoughtMap

    const interval = setInterval(() => {
      // Randomly update thought activity levels
      setThoughtActivity((prev) => prev.map(() => Math.min(1, Math.max(0, Math.random() * 0.7 + 0.3))))

      // Occasionally switch to a different thought cluster
      if (Math.random() > 0.95 && !currentActiveThought && currentActiveCluster) {
        const clusters = thoughtClusters.filter((c) => c.id !== currentActiveCluster?.id)
        if (clusters.length > 0) {
          const randomCluster = clusters[Math.floor(Math.random() * clusters.length)]

          setIsThinking(true)
          setTimeout(() => {
            setActiveCluster(randomCluster)
            setIsThinking(false)
          }, 1000)
        }
      }

      // Occasionally highlight a random thought
      if (Math.random() > 0.9 && currentActiveCluster && !currentIsThinking) {
        const randomThought =
          currentActiveCluster.thoughts[Math.floor(Math.random() * currentActiveCluster.thoughts.length)]

        // Instead of directly calling handleThoughtClick which might cause issues,
        // just set the active thought directly
        setActiveThought(randomThought)

        // Find related thoughts
        if (currentThoughtMap) {
          const related = randomThought.connections
            .map((id) => currentThoughtMap.get(id))
            .filter((t) => t !== undefined) as Thought[]

          setRelatedThoughts(related)
        }
      }
    }, 8000)

    return () => clearInterval(interval)
  }, []) // Empty dependency array to run only once

  // Handle clicking on the canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!activeCluster || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find if we clicked on a thought
    const clickedThought = activeCluster.thoughts.find((thought) => {
      if (!thought.position || !thought.size) return false

      const dx = thought.position.x - x
      const dy = thought.position.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)

      return distance < thought.size
    })

    if (clickedThought) {
      handleThoughtClick(clickedThought)
    } else {
      // Clicked on empty space, clear selection
      setActiveThought(null)
      setRelatedThoughts([])
    }
  }

  // Switch to a different thought cluster
  const switchCluster = (cluster: ThoughtCluster) => {
    if (cluster.id === activeCluster?.id) return

    setIsThinking(true)
    setActiveThought(null)
    setRelatedThoughts([])

    setTimeout(() => {
      setActiveCluster(cluster)
      setIsThinking(false)
    }, 1000)
  }

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    setActiveThought(null)
    setRelatedThoughts([])
  }

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-5 right-5 z-50 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-3 hover:bg-black/60"
      >
        <Brain className="h-5 w-5 text-primary" />
      </button>
    )
  }

  return (
    <div
      className={`fixed ${
        isExpanded ? "inset-4 md:inset-10" : "bottom-5 right-5 w-80 h-80 md:w-96 md:h-96"
      } bg-black/40 backdrop-blur-md rounded-lg border border-white/10 shadow-xl z-50 flex flex-col transition-all duration-500 overflow-hidden`}
      ref={containerRef}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-white/10">
        <div className="flex items-center">
          <Brain className="h-4 w-4 text-primary mr-2" />
          <span className="font-medium text-sm">Gaurav's Current Thoughts</span>
          {isThinking && (
            <div className="ml-2">
              <div className="ai-processing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white/70 hover:text-white"
            onClick={toggleExpanded}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white/70 hover:text-white"
            onClick={toggleVisibility}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Thought visualization */}
      <div className="relative flex-1 overflow-hidden">
        {/* Neural network visualization */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-pointer" onClick={handleCanvasClick} />

        {/* Thought cluster navigation */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {thoughtClusters.map((cluster, index) => (
            <button
              key={cluster.id}
              className={`px-2 py-1 rounded-full text-xs flex items-center ${
                activeCluster?.id === cluster.id
                  ? "bg-white/20 text-white"
                  : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-white"
              }`}
              style={{
                boxShadow: activeCluster?.id === cluster.id ? `0 0 10px ${cluster.color}` : "none",
              }}
              onClick={() => switchCluster(cluster)}
            >
              <div className="mr-1">{cluster.icon}</div>
              <span>{cluster.name}</span>

              {/* Activity indicator */}
              <div
                className="ml-1 w-1 h-4 bg-white/20 rounded-full overflow-hidden"
                style={{ opacity: activeCluster?.id === cluster.id ? 1 : 0.5 }}
              >
                <div
                  className="bg-white transition-all duration-300 w-full rounded-full"
                  style={{
                    height: `${thoughtActivity[index] * 100}%`,
                    backgroundColor: cluster.color,
                  }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Active thought detail */}
        <AnimatePresence>
          {activeThought && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 border-t border-white/10"
            >
              <div className="flex items-start space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: activeCluster?.color || "rgba(120, 0, 255, 0.3)" }}
                >
                  {activeThought.category === "ai" && <Zap className="h-4 w-4" />}
                  {activeThought.category === "health" && <Activity className="h-4 w-4" />}
                  {activeThought.category === "philosophy" && <Brain className="h-4 w-4" />}
                  {activeThought.category === "strategy" && <Sparkles className="h-4 w-4" />}
                  {activeThought.category === "innovation" && <Sparkles className="h-4 w-4" />}
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold mb-1">{activeThought.content}</h4>
                  <p className="text-xs text-white/80">{activeThought.snippet}</p>

                  {activeThought.image && (
                    <div className="mt-3 rounded-md overflow-hidden">
                      <Image
                        src={activeThought.image || "/placeholder.svg"}
                        alt={activeThought.content}
                        width={300}
                        height={150}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {relatedThoughts.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-white/50 mb-1">Connected Thoughts:</div>
                      <div className="flex flex-wrap gap-2">
                        {relatedThoughts.map((thought) => (
                          <button
                            key={thought.id}
                            className="text-xs bg-white/10 hover:bg-white/20 rounded-full px-2 py-1 flex items-center"
                            onClick={() => handleThoughtClick(thought)}
                          >
                            {thought.image && <ImageIcon className="h-3 w-3 mr-1 opacity-70" />}
                            <span>
                              {thought.content.length > 20 ? thought.content.substring(0, 20) + "..." : thought.content}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
