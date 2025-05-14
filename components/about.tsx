"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface TimelineItem {
  year: string
  title: string
  description: string
  image: string
}

const timelineItems: TimelineItem[] = [
  {
    year: "Origin",
    title: "The Beginning",
    description:
      "Started with a curiosity for how things work and a drive to build. Early fascination with technology and human potential shaped my path forward.",
    image: "/abstract-technology.png",
  },
  {
    year: "Philosophy",
    title: "My Core Beliefs",
    description:
      "I believe in the power of disciplined thinking, consistent action, and the fusion of human creativity with technological advancement.",
    image: "/placeholder.svg?key=lai1h",
  },
  {
    year: "Approach",
    title: "How I Think",
    description:
      "I approach problems by breaking them down to first principles, finding patterns others miss, and building solutions that scale beyond the immediate need.",
    image: "/placeholder.svg?key=wxh7z",
  },
  {
    year: "Growth",
    title: "My Philosophy",
    description:
      "Growth happens at the edge of comfort. I embrace failure as data, physical training as mental conditioning, and continuous learning as the only constant.",
    image: "/placeholder.svg?key=13s4s",
  },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeItem, setActiveItem] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Handle timeline navigation
  const handleTimelineClick = (index: number) => {
    setActiveItem(index)
  }

  return (
    <section id="about" className="py-20 md:py-32 relative neural-bg">
      <div className="absolute inset-0 data-flow"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            About Me, <span className="text-gradient">But Cinematic</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore my story, beliefs, and approach to life and work.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Timeline navigation */}
          <div className="md:w-1/4">
            <div className="sticky top-24 space-y-2">
              {timelineItems.map((item, index) => (
                <motion.button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    activeItem === index
                      ? "bg-primary/20 border border-primary/50"
                      : "bg-card/50 hover:bg-card/80 border border-white/10"
                  }`}
                  onClick={() => handleTimelineClick(index)}
                  whileHover={{ x: 5 }}
                >
                  <div className="font-display text-sm text-primary/80">{item.year}</div>
                  <div className="font-medium">{item.title}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="md:w-3/4" ref={containerRef}>
            <div className="relative">
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-accent/50 origin-top"
                style={{ height: lineHeight }}
              />

              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeItem === index ? 1 : 0.3,
                    scale: activeItem === index ? 1 : 0.98,
                  }}
                  transition={{ duration: 0.5 }}
                  className="mb-20 pl-6 relative"
                >
                  <div
                    className={`absolute left-0 top-0 w-3 h-3 rounded-full ${
                      activeItem === index ? "bg-primary" : "bg-white/30"
                    } transform -translate-x-1.5`}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <div className="text-primary font-display text-lg mb-4">{item.year}</div>
                      <p className="text-white/80">{item.description}</p>
                    </div>

                    <div className="order-1 md:order-2">
                      <div className="relative h-64 rounded-lg overflow-hidden card-hover">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Button
            variant="outline"
            className="border-primary/50 text-white hover:bg-primary/20 group relative overflow-hidden"
            onClick={() => {
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span className="relative z-10 flex items-center">
              See My Work <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
