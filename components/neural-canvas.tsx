"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  connections: number[]
  active: boolean
  pulseRadius: number
  pulseOpacity: number
  isPulsing: boolean
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false)
  const [lastInteraction, setLastInteraction] = useState(Date.now())
  const pathname = usePathname()
  const nodesRef = useRef<Node[]>([])
  const animationRef = useRef<number>()

  // Initialize and handle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    // Initialize neural network nodes
    const initNodes = () => {
      const nodeCount = Math.min(Math.floor(window.innerWidth / 100), 30)
      const nodes: Node[] = []

      for (let i = 0; i < nodeCount; i++) {
        const node: Node = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 2 + 1,
          connections: [],
          active: Math.random() > 0.7,
          pulseRadius: 0,
          pulseOpacity: 0,
          isPulsing: false,
        }
        nodes.push(node)
      }

      // Create connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        const connectionCount = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < connectionCount; j++) {
          const targetIndex = Math.floor(Math.random() * nodes.length)
          if (targetIndex !== i && !nodes[i].connections.includes(targetIndex)) {
            nodes[i].connections.push(targetIndex)
          }
        }
      }

      nodesRef.current = nodes
    }

    // Trigger pulse on random nodes
    const triggerRandomPulse = () => {
      if (Math.random() > 0.97 && nodesRef.current.length > 0) {
        const randomIndex = Math.floor(Math.random() * nodesRef.current.length)
        const node = nodesRef.current[randomIndex]
        if (!node.isPulsing) {
          node.isPulsing = true
          node.pulseRadius = 0
          node.pulseOpacity = 0.5
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Only draw if there was interaction in the last 30 seconds
      const isActive = Date.now() - lastInteraction < 30000

      if (isActive) {
        // Update and draw nodes
        for (let i = 0; i < nodesRef.current.length; i++) {
          const node = nodesRef.current[i]

          // Update position
          node.x += node.vx
          node.y += node.vy

          // Bounce off edges
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1

          // Draw connections
          for (let j = 0; j < node.connections.length; j++) {
            const targetIndex = node.connections[j]
            const target = nodesRef.current[targetIndex]

            const dx = target.x - node.x
            const dy = target.y - node.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 200) {
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(target.x, target.y)
              ctx.strokeStyle = `rgba(120, 0, 255, ${0.05 * (1 - distance / 200)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }

          // Draw node
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
          ctx.fillStyle = node.active ? "rgba(120, 0, 255, 0.5)" : "rgba(255, 255, 255, 0.2)"
          ctx.fill()

          // Draw pulse effect
          if (node.isPulsing) {
            ctx.beginPath()
            ctx.arc(node.x, node.y, node.pulseRadius, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(120, 0, 255, ${node.pulseOpacity})`
            ctx.lineWidth = 1
            ctx.stroke()

            // Update pulse
            node.pulseRadius += 1
            node.pulseOpacity -= 0.01

            if (node.pulseOpacity <= 0) {
              node.isPulsing = false
            }
          }
        }

        // Mouse interaction
        if (isMouseInCanvas) {
          ctx.beginPath()
          ctx.arc(mousePosition.x, mousePosition.y, 100, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(120, 0, 255, 0.03)"
          ctx.fill()

          // Connect to nearby nodes
          for (let i = 0; i < nodesRef.current.length; i++) {
            const node = nodesRef.current[i]
            const dx = node.x - mousePosition.x
            const dy = node.y - mousePosition.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              ctx.beginPath()
              ctx.moveTo(mousePosition.x, mousePosition.y)
              ctx.lineTo(node.x, node.y)
              ctx.strokeStyle = `rgba(120, 0, 255, ${0.1 * (1 - distance / 150)})`
              ctx.lineWidth = 0.5
              ctx.stroke()

              // Slightly attract nodes to mouse
              node.x += dx * 0.001
              node.y += dy * 0.001
            }
          }
        }

        // Trigger random pulses
        triggerRandomPulse()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setLastInteraction(Date.now())
    }

    const handleMouseEnter = () => {
      setIsMouseInCanvas(true)
    }

    const handleMouseLeave = () => {
      setIsMouseInCanvas(false)
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Find closest node and trigger pulse
      let closestNode = null
      let minDistance = Number.POSITIVE_INFINITY

      for (let i = 0; i < nodesRef.current.length; i++) {
        const node = nodesRef.current[i]
        const dx = node.x - x
        const dy = node.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < minDistance) {
          minDistance = distance
          closestNode = node
        }
      }

      if (closestNode && minDistance < 100) {
        closestNode.isPulsing = true
        closestNode.pulseRadius = 0
        closestNode.pulseOpacity = 0.5
        closestNode.active = !closestNode.active
      }

      setLastInteraction(Date.now())
    }

    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("click", handleClick)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("click", handleClick)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMouseInCanvas, mousePosition, lastInteraction, pathname])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-auto z-0" />
}
