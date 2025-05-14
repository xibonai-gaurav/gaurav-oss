"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SmartScroll() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }

      // Update last scroll position
      setLastScrollY(currentScrollY)

      // Show scroll to top button when scrolled down enough
      setShowScrollTop(currentScrollY > window.innerHeight / 2)

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? currentScrollY / totalHeight : 0
      setScrollProgress(progress)

      // Set scrolling state
      setIsScrolling(true)

      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Set new timeout to detect when scrolling stops
      const timeout = setTimeout(() => {
        setIsScrolling(false)
      }, 200)

      setScrollTimeout(timeout)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [lastScrollY, scrollTimeout])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {/* Scroll direction indicator */}
      <AnimatePresence>
        {isScrolling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed right-5 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none"
          >
            <div className="h-20 w-1 bg-white/10 rounded-full relative overflow-hidden">
              <motion.div
                className="absolute w-full bg-primary rounded-full"
                style={{
                  height: `${scrollProgress * 100}%`,
                  bottom: 0,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-40"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
