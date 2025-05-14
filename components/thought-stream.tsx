"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, X, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThoughtNode {
  id: string
  content: string
  type: "premise" | "reasoning" | "insight" | "question" | "conclusion"
}

interface ThoughtChain {
  id: string
  topic: string
  nodes: ThoughtNode[]
}

// Sample thought chains that mimic LLM reasoning
const thoughtChains: ThoughtChain[] = [
  {
    id: "ai-ethics",
    topic: "AI Ethics",
    nodes: [
      {
        id: "premise-1",
        content: "AI systems are becoming increasingly powerful and autonomous.",
        type: "premise",
      },
      {
        id: "reasoning-1",
        content: "As autonomy increases, the potential impact of AI decisions grows exponentially.",
        type: "reasoning",
      },
      {
        id: "reasoning-2",
        content: "Human values are complex, contextual, and often contradictory.",
        type: "reasoning",
      },
      {
        id: "question-1",
        content: "How do we ensure AI systems align with human values when those values are difficult to formalize?",
        type: "question",
      },
      {
        id: "insight-1",
        content: "AI alignment requires ongoing dialogue rather than fixed rules.",
        type: "insight",
      },
      {
        id: "conclusion-1",
        content:
          "The most ethical AI systems will be those that can adapt to evolving human values and explain their reasoning.",
        type: "conclusion",
      },
    ],
  },
  {
    id: "human-augmentation",
    topic: "Human Augmentation",
    nodes: [
      {
        id: "premise-1",
        content: "Humans have cognitive limitations and biases.",
        type: "premise",
      },
      {
        id: "reasoning-1",
        content: "Technology can compensate for these limitations while amplifying our strengths.",
        type: "reasoning",
      },
      {
        id: "reasoning-2",
        content: "The goal should be symbiosis rather than replacement.",
        type: "reasoning",
      },
      {
        id: "question-1",
        content: "What interfaces would create the most natural extension of human cognition?",
        type: "question",
      },
      {
        id: "insight-1",
        content: "The best interfaces disappear, becoming extensions of ourselves rather than external tools.",
        type: "insight",
      },
      {
        id: "conclusion-1",
        content:
          "Human-AI symbiosis will redefine what it means to be human, extending our capabilities while preserving our agency.",
        type: "conclusion",
      },
    ],
  },
  {
    id: "future-work",
    topic: "Future of Work",
    nodes: [
      {
        id: "premise-1",
        content: "AI is automating routine cognitive and physical tasks.",
        type: "premise",
      },
      {
        id: "reasoning-1",
        content: "This will displace certain jobs while creating new categories of work.",
        type: "reasoning",
      },
      {
        id: "reasoning-2",
        content: "The transition will be uneven across industries and demographics.",
        type: "reasoning",
      },
      {
        id: "question-1",
        content: "How do we ensure economic benefits are broadly shared during this transition?",
        type: "question",
      },
      {
        id: "insight-1",
        content: "The most valuable skills will be those that complement AI rather than compete with it.",
        type: "insight",
      },
      {
        id: "conclusion-1",
        content:
          "We need to reimagine education, work, and economic systems for a world where human-AI collaboration is the norm.",
        type: "conclusion",
      },
    ],
  },
]

export default function ThoughtStream() {
  const [activeChain, setActiveChain] = useState<ThoughtChain | null>(null)
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Start a new thought chain
  const startNewChain = () => {
    const randomIndex = Math.floor(Math.random() * thoughtChains.length)
    const newChain = thoughtChains[randomIndex]
    setActiveChain(newChain)
    setCurrentNodeIndex(0)
    setIsVisible(true)
  }

  // Expand the thought chain to show the next node
  const showNextNode = () => {
    if (!activeChain) return

    if (currentNodeIndex < activeChain.nodes.length - 1) {
      setCurrentNodeIndex(currentNodeIndex + 1)
    } else {
      // If we've shown all nodes, prepare to fade out
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          setCurrentNodeIndex(0)
          setActiveChain(null)
        }, 500)
      }, 5000)
    }
  }

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Close the thought stream
  const closeThoughtStream = () => {
    setIsExpanded(false)
    setIsVisible(false)
    setTimeout(() => {
      setCurrentNodeIndex(0)
      setActiveChain(null)
    }, 500)
  }

  // Periodically start new thought chains
  useEffect(() => {
    const interval = setInterval(() => {
      if (!activeChain && Math.random() > 0.7) {
        startNewChain()
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [activeChain])

  // Gradually reveal the thought chain
  useEffect(() => {
    if (!activeChain || currentNodeIndex >= activeChain.nodes.length) return

    const timer = setTimeout(() => {
      showNextNode()
    }, 3000)

    return () => clearTimeout(timer)
  }, [activeChain, currentNodeIndex])

  // Get color based on thought type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "premise":
        return "border-blue-500/30 text-blue-400"
      case "reasoning":
        return "border-purple-500/30 text-purple-400"
      case "question":
        return "border-yellow-500/30 text-yellow-400"
      case "insight":
        return "border-green-500/30 text-green-400"
      case "conclusion":
        return "border-primary/30 text-primary"
      default:
        return "border-white/30 text-white"
    }
  }

  // Get icon based on thought type
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "premise":
        return "Premise"
      case "reasoning":
        return "Reasoning"
      case "question":
        return "Question"
      case "insight":
        return "Insight"
      case "conclusion":
        return "Conclusion"
      default:
        return "Thought"
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Thought stream button */}
      {!isExpanded && (
        <Button
          onClick={toggleExpanded}
          className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-sm text-white/80 hover:bg-black/60 hover:text-white flex items-center space-x-2"
          variant="ghost"
        >
          <Brain className="h-4 w-4 mr-2 text-primary" />
          {activeChain ? `Thinking: ${activeChain.topic}` : "Thought Stream"}
        </Button>
      )}

      {/* Expanded thought stream */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed bottom-5 right-5 w-96 z-40"
          >
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">
                    {activeChain ? `Thought Stream: ${activeChain.topic}` : "Thought Stream"}
                  </h3>
                </div>
                <div className="flex space-x-1">
                  {!activeChain && (
                    <Button
                      onClick={startNewChain}
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 text-white/70 hover:text-white"
                    >
                      <Brain className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    onClick={toggleExpanded}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white/70 hover:text-white"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={closeThoughtStream}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white/70 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Thought chain visualization */}
              <div className="p-4 max-h-[60vh] overflow-y-auto scrollbar-hidden">
                {activeChain ? (
                  <div className="space-y-3 thought-chain pl-6">
                    {activeChain.nodes.slice(0, currentNodeIndex + 1).map((node, index) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-3 border ${getTypeColor(
                          node.type,
                        )} rounded-lg bg-black/40 backdrop-blur-sm thought-node`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-medium opacity-70">{getTypeLabel(node.type)}</span>
                          <span className="text-xs opacity-50">Step {index + 1}</span>
                        </div>
                        <p className="text-sm">{node.content}</p>
                      </motion.div>
                    ))}

                    {/* Next thought indicator */}
                    {currentNodeIndex < activeChain.nodes.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="ai-processing">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <p className="text-white/60 mb-4">No active thought stream</p>
                    <Button
                      onClick={startNewChain}
                      className="px-3 py-1 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-md text-sm text-white"
                    >
                      Start Thinking
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
