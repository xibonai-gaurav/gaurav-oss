"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  thumbnail: string
  problem: string
  solution: string
  insight: string
  tools: string[]
}

const projects: Project[] = [
  {
    id: "project1",
    title: "AI-Powered Decision Engine",
    category: "Artificial Intelligence",
    thumbnail: "/placeholder.svg?key=8n1cu",
    problem: "Executives were drowning in data but starving for insights, leading to decision paralysis.",
    solution:
      "Built an AI system that synthesizes multiple data sources and presents clear, actionable recommendations.",
    insight: "The best AI doesn't replace human judgment—it amplifies it by removing cognitive overhead.",
    tools: ["Python", "TensorFlow", "React", "AWS"],
  },
  {
    id: "project2",
    title: "Fitness Optimization Platform",
    category: "Health Tech",
    thumbnail: "/placeholder.svg?key=7jrsj",
    problem: "Traditional fitness apps track activity but fail to optimize for individual physiology and goals.",
    solution: "Created a platform that uses biometric data to personalize workout and recovery protocols.",
    insight: "The future of fitness is personalized, data-driven, and focused on recovery as much as exertion.",
    tools: ["React Native", "Node.js", "MongoDB", "Apple HealthKit"],
  },
  {
    id: "project3",
    title: "Strategic Growth Framework",
    category: "Business Strategy",
    thumbnail: "/business-strategy-framework.png",
    problem: "Startups were scaling operations before finding product-market fit, burning cash inefficiently.",
    solution: "Developed a framework that aligns resource allocation with validated growth opportunities.",
    insight:
      "Successful scaling isn't about growing everything at once—it's about sequencing the right moves at the right time.",
    tools: ["Strategic Planning", "Market Analysis", "Financial Modeling"],
  },
  {
    id: "project4",
    title: "Cognitive Enhancement App",
    category: "Productivity",
    thumbnail: "/placeholder.svg?key=5xblq",
    problem: "Knowledge workers struggle with focus in an increasingly distracting digital environment.",
    solution: "Built an app that combines neuroscience principles with productivity techniques to optimize deep work.",
    insight: "Productivity isn't about doing more things—it's about doing the right things with complete attention.",
    tools: ["Swift", "Firebase", "Machine Learning", "UX Research"],
  },
]

export default function WorkShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentView, setCurrentView] = useState<"grid" | "focus">("grid")
  const [focusedIndex, setFocusedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleProjectSelect = (project: Project, index: number) => {
    setSelectedProject(project)
    setFocusedIndex(index)
    setCurrentView("focus")
  }

  const handleClose = () => {
    setSelectedProject(null)
    setCurrentView("grid")
  }

  const handleNext = () => {
    const nextIndex = (focusedIndex + 1) % projects.length
    setFocusedIndex(nextIndex)
    setSelectedProject(projects[nextIndex])
  }

  const handlePrev = () => {
    const prevIndex = (focusedIndex - 1 + projects.length) % projects.length
    setFocusedIndex(prevIndex)
    setSelectedProject(projects[prevIndex])
  }

  return (
    <section id="work" className="py-20 md:py-32 relative neural-bg">
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
            <span className="text-gradient">The Work</span> Showcase
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            A visual journey through projects, companies, and experiments that define my approach.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentView === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="cursor-pointer"
                  onClick={() => handleProjectSelect(project, index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-card rounded-lg overflow-hidden card-hover h-full backdrop-blur-sm bg-opacity-70 border border-white/10">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <span className="text-xs text-primary font-medium uppercase tracking-wider">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-bold mt-1">{project.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-white/70 line-clamp-3">{project.problem}</p>
                      <Button
                        variant="ghost"
                        className="mt-4 text-primary hover:text-primary hover:bg-primary/10 group flex items-center"
                      >
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="focus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {selectedProject && (
                <div className="bg-card rounded-lg overflow-hidden border border-white/10 backdrop-blur-sm bg-opacity-70">
                  <div className="relative">
                    <div className="relative h-72 md:h-96">
                      <Image
                        src={selectedProject.thumbnail || "/placeholder.svg"}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    </div>

                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white bg-black/50 hover:bg-black/70 rounded-full"
                        onClick={handleClose}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white bg-black/50 hover:bg-black/70 rounded-full"
                        onClick={handlePrev}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white bg-black/50 hover:bg-black/70 rounded-full"
                        onClick={handleNext}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 p-6">
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs text-primary font-medium uppercase tracking-wider"
                      >
                        {selectedProject.category}
                      </motion.span>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-3xl font-bold mt-1"
                      >
                        {selectedProject.title}
                      </motion.h3>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-1"
                      >
                        <h4 className="text-lg font-semibold mb-2 text-primary">The Problem</h4>
                        <p className="text-white/80">{selectedProject.problem}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="md:col-span-1"
                      >
                        <h4 className="text-lg font-semibold mb-2 text-secondary">What Was Built</h4>
                        <p className="text-white/80">{selectedProject.solution}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="md:col-span-1"
                      >
                        <h4 className="text-lg font-semibold mb-2 text-accent">Key Insight</h4>
                        <p className="text-white/80">{selectedProject.insight}</p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mt-8"
                    >
                      <h4 className="text-lg font-semibold mb-2 text-white/90">Tools Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map((tool, index) => (
                          <motion.span
                            key={tool}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="px-3 py-1 bg-muted rounded-full text-sm text-white/80"
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-8 flex justify-end"
                    >
                      <Button
                        variant="outline"
                        className="border-primary/50 text-white hover:bg-primary/20"
                        onClick={handleClose}
                      >
                        Back to Projects
                      </Button>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
