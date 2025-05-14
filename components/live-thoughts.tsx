"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lightbulb, Book, Code, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Thought {
  id: string
  content: string
  type: "idea" | "book" | "project" | "insight"
  date: string
}

const thoughts: Thought[] = [
  {
    id: "thought1",
    content:
      "The most valuable skill in the AI era isn't coding—it's knowing what to ask for and how to evaluate the output.",
    type: "insight",
    date: "2 days ago",
  },
  {
    id: "thought2",
    content:
      "Reading 'Thinking in Systems' by Donella Meadows. Her framework for identifying leverage points in complex systems is transformative for product strategy.",
    type: "book",
    date: "1 week ago",
  },
  {
    id: "thought3",
    content:
      "Working on a new framework for evaluating AI readiness in traditional businesses. Most companies focus on the wrong metrics.",
    type: "project",
    date: "3 days ago",
  },
  {
    id: "thought4",
    content:
      "The best founders I know don't just solve problems—they anticipate them before they become visible to others.",
    type: "idea",
    date: "5 days ago",
  },
  {
    id: "thought5",
    content:
      "Hypothesis: The companies that will dominate the next decade will be those that master the art of human-AI collaboration, not just AI implementation.",
    type: "insight",
    date: "1 day ago",
  },
  {
    id: "thought6",
    content:
      "Building a personal knowledge management system that combines graph-based connections with spaced repetition for learning.",
    type: "project",
    date: "4 days ago",
  },
]

export default function LiveThoughts() {
  const [filter, setFilter] = useState<string | null>(null)
  const [activeThought, setActiveThought] = useState<Thought | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)

  const filteredThoughts = filter ? thoughts.filter((thought) => thought.type === filter) : thoughts

  useEffect(() => {
    // Auto-rotate through thoughts
    const interval = setInterval(() => {
      if (!activeThought) {
        setActiveThought(filteredThoughts[0])
        setIsRevealing(true)
      } else {
        const currentIndex = filteredThoughts.findIndex((t) => t.id === activeThought.id)
        const nextIndex = (currentIndex + 1) % filteredThoughts.length
        setIsRevealing(false)
        setTimeout(() => {
          setActiveThought(filteredThoughts[nextIndex])
          setIsRevealing(true)
        }, 500)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeThought, filteredThoughts])

  const getIcon = (type: string) => {
    switch (type) {
      case "idea":
        return <Lightbulb className="h-5 w-5 text-yellow-400" />
      case "book":
        return <Book className="h-5 w-5 text-blue-400" />
      case "project":
        return <Code className="h-5 w-5 text-green-400" />
      case "insight":
        return <Sparkles className="h-5 w-5 text-purple-400" />
      default:
        return null
    }
  }

  const handleThoughtClick = (thought: Thought) => {
    setActiveThought(thought)
    setIsRevealing(true)
  }

  return (
    <section id="thoughts" className="py-20 md:py-32 relative neural-bg">
      <div className="absolute inset-0 data-flow"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Live Thoughts</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            A digital whiteboard of ideas, projects, and insights in progress.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={filter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(null)}
              className={filter === null ? "bg-primary/80" : "border-white/20"}
            >
              All
            </Button>
            <Button
              variant={filter === "idea" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("idea")}
              className={filter === "idea" ? "bg-yellow-500/80" : "border-white/20"}
            >
              <Lightbulb className="h-4 w-4 mr-2" /> Ideas
            </Button>
            <Button
              variant={filter === "book" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("book")}
              className={filter === "book" ? "bg-blue-500/80" : "border-white/20"}
            >
              <Book className="h-4 w-4 mr-2" /> Books
            </Button>
            <Button
              variant={filter === "project" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("project")}
              className={filter === "project" ? "bg-green-500/80" : "border-white/20"}
            >
              <Code className="h-4 w-4 mr-2" /> Projects
            </Button>
            <Button
              variant={filter === "insight" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("insight")}
              className={filter === "insight" ? "bg-purple-500/80" : "border-white/20"}
            >
              <Sparkles className="h-4 w-4 mr-2" /> Insights
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <motion.div
            className="bg-card rounded-lg p-8 backdrop-blur-sm bg-opacity-70 border border-white/10 min-h-[200px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {activeThought ? (
              <motion.div
                key={activeThought.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealing ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-muted inline-block">{getIcon(activeThought.type)}</div>
                </div>
                <p className="text-xl md:text-2xl font-display text-white/90 max-w-2xl mx-auto">
                  "{activeThought.content}"
                </p>
                <div className="mt-4 text-sm text-white/50">{activeThought.date}</div>
              </motion.div>
            ) : (
              <div className="ai-processing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredThoughts.map((thought, index) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => handleThoughtClick(thought)}
              className="cursor-pointer"
            >
              <div
                className={`bg-card rounded-lg p-6 h-full card-hover backdrop-blur-sm bg-opacity-70 border ${
                  activeThought?.id === thought.id ? "border-primary" : "border-white/10"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-full bg-muted">{getIcon(thought.type)}</div>
                  <span className="text-xs text-white/50">{thought.date}</span>
                </div>
                <p className="text-white/90 line-clamp-3">{thought.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
