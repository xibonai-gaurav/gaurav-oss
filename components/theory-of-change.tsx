"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Lightbulb, Zap, Brain, Sparkles } from "lucide-react"

interface TheoryStage {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const theoryStages: TheoryStage[] = [
  {
    id: "problem",
    title: "Problem Definition",
    description:
      "Most AI implementations fail because they solve technical problems rather than human ones. The first step is reframing the challenge from a human-centered perspective.",
    icon: <Lightbulb className="h-8 w-8 text-yellow-400" />,
  },
  {
    id: "principles",
    title: "First Principles Analysis",
    description:
      "Break down complex problems to their fundamental truths. By understanding the core elements, we can build solutions that address root causes rather than symptoms.",
    icon: <Brain className="h-8 w-8 text-blue-400" />,
  },
  {
    id: "augmentation",
    title: "Human Augmentation",
    description:
      "The goal isn't to replace human intelligence but to extend it. AI should amplify our strengths while compensating for our cognitive limitations.",
    icon: <Zap className="h-8 w-8 text-green-400" />,
  },
  {
    id: "implementation",
    title: "Strategic Implementation",
    description:
      "Technology alone doesn't create change. We need to design systems that align incentives, account for human behavior, and create feedback loops for continuous improvement.",
    icon: <Sparkles className="h-8 w-8 text-purple-400" />,
  },
]

export default function TheoryOfChange() {
  const [activeStage, setActiveStage] = useState(0)
  const [isRevealing, setIsRevealing] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextStage = () => {
    if (activeStage < theoryStages.length - 1) {
      setIsRevealing(false)
      setTimeout(() => {
        setActiveStage(activeStage + 1)
        setIsRevealing(true)
      }, 300)
    }
  }

  const prevStage = () => {
    if (activeStage > 0) {
      setIsRevealing(false)
      setTimeout(() => {
        setActiveStage(activeStage - 1)
        setIsRevealing(true)
      }, 300)
    }
  }

  return (
    <section id="theory" className="py-20 md:py-32 relative neural-bg">
      <div className="absolute inset-0 data-flow"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Theory of Change</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            A framework for transforming how we build AI solutions that create meaningful impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              {theoryStages.map((stage, index) => (
                <motion.button
                  key={stage.id}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    activeStage === index
                      ? "bg-primary/20 border border-primary/50"
                      : "bg-card/50 hover:bg-card/80 border border-white/10"
                  }`}
                  onClick={() => {
                    setIsRevealing(false)
                    setTimeout(() => {
                      setActiveStage(index)
                      setIsRevealing(true)
                    }, 300)
                  }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center">
                    <div className="mr-3 opacity-70">{stage.icon}</div>
                    <div>
                      <div className="font-medium">{stage.title}</div>
                      <div className="text-xs text-white/50">Stage {index + 1}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-4">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: isRevealing ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-lg p-8 backdrop-blur-sm bg-opacity-70 border border-white/10"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">{theoryStages[activeStage].icon}</div>
                <h3 className="text-2xl font-bold">{theoryStages[activeStage].title}</h3>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-white/80">{theoryStages[activeStage].description}</p>

                {activeStage === 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-semibold text-primary">Key Insight</h4>
                    <p>
                      The most valuable problems to solve are often not the ones initially presented. By reframing
                      challenges through a human lens, we discover opportunities for transformative impact rather than
                      incremental improvement.
                    </p>

                    <div className="bg-black/30 border border-white/10 rounded-lg p-4 mt-6">
                      <h5 className="font-semibold mb-2">Example: Decision Fatigue</h5>
                      <p className="text-sm text-white/70">
                        <strong>Technical framing:</strong> "We need an AI that can process more data points for
                        decision-making."
                        <br />
                        <strong>Human-centered reframing:</strong> "Executives face cognitive overload that leads to
                        decision paralysis. How might we reduce the mental burden while improving decision quality?"
                      </p>
                    </div>
                  </div>
                )}

                {activeStage === 1 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-semibold text-primary">Key Insight</h4>
                    <p>
                      Most complex problems have simpler underlying structures. By identifying these fundamental truths,
                      we can build solutions that remain robust even as surface-level conditions change.
                    </p>

                    <div className="bg-black/30 border border-white/10 rounded-lg p-4 mt-6">
                      <h5 className="font-semibold mb-2">First Principles Framework</h5>
                      <ol className="list-decimal list-inside text-sm text-white/70 space-y-2">
                        <li>Identify and challenge assumptions</li>
                        <li>Break down complex systems into fundamental components</li>
                        <li>Rebuild from the ground up with only essential elements</li>
                        <li>Test against real-world constraints</li>
                        <li>Iterate based on feedback</li>
                      </ol>
                    </div>
                  </div>
                )}

                {activeStage === 2 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-semibold text-primary">Key Insight</h4>
                    <p>
                      The most powerful AI systems don't replace human judgment—they enhance it by removing cognitive
                      overhead and providing insights that would otherwise remain hidden.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                        <h5 className="font-semibold mb-2 text-red-400">AI Replacement</h5>
                        <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                          <li>Removes human agency</li>
                          <li>Creates dependency</li>
                          <li>Lacks contextual understanding</li>
                          <li>Optimizes for measurable metrics only</li>
                        </ul>
                      </div>

                      <div className="bg-black/30 border border-primary/20 rounded-lg p-4">
                        <h5 className="font-semibold mb-2 text-green-400">AI Augmentation</h5>
                        <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                          <li>Enhances human capabilities</li>
                          <li>Creates partnership</li>
                          <li>Combines strengths of both</li>
                          <li>Optimizes for human values</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeStage === 3 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-semibold text-primary">Key Insight</h4>
                    <p>
                      Technology deployment is fundamentally a human challenge. The most sophisticated AI will fail if
                      it doesn't account for organizational dynamics, incentive structures, and behavioral psychology.
                    </p>

                    <div className="bg-black/30 border border-white/10 rounded-lg p-4 mt-6">
                      <h5 className="font-semibold mb-2">Implementation Framework</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
                        <div>
                          <h6 className="font-medium text-secondary mb-1">1. Alignment</h6>
                          <p>Ensure the solution aligns with existing incentives or creates new ones</p>
                        </div>
                        <div>
                          <h6 className="font-medium text-secondary mb-1">2. Integration</h6>
                          <p>Design for seamless workflow integration with minimal friction</p>
                        </div>
                        <div>
                          <h6 className="font-medium text-secondary mb-1">3. Feedback</h6>
                          <p>Create tight feedback loops for continuous improvement</p>
                        </div>
                        <div>
                          <h6 className="font-medium text-secondary mb-1">4. Evolution</h6>
                          <p>Build systems that learn and adapt to changing conditions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={prevStage}
                  disabled={activeStage === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>

                <Button
                  variant="outline"
                  className="border-primary/50 text-white hover:bg-primary/20"
                  onClick={nextStage}
                  disabled={activeStage === theoryStages.length - 1}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
