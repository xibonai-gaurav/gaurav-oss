"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UserPreferences } from "@/types/user"

interface AIAssistantProps {
  preferences: UserPreferences
}

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
}

export default function AIAssistant({ preferences }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentResponse, setCurrentResponse] = useState("")
  const [fullResponse, setFullResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: "initial",
        content: getPersonalizedGreeting(preferences),
        sender: "assistant",
      }
      setMessages([initialMessage])
    }
  }, [isOpen, messages.length, preferences])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, currentResponse])

  // Simulate typing effect for AI responses
  useEffect(() => {
    if (isGenerating && currentResponse.length < fullResponse.length) {
      const timeout = setTimeout(() => {
        setCurrentResponse(fullResponse.slice(0, currentResponse.length + 1))
      }, 15) // Speed of typing
      return () => clearTimeout(timeout)
    } else if (isGenerating && currentResponse.length === fullResponse.length) {
      setIsGenerating(false)
      setIsTyping(false)

      // Add the complete message to the messages array
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: fullResponse,
          sender: "assistant",
        },
      ])

      // Reset current response
      setCurrentResponse("")
    }
  }, [currentResponse, fullResponse, isGenerating])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      // Generate response based on user input and preferences
      const response = generateResponse(input, preferences, messages)

      // Set the full response and start generating
      setFullResponse(response)
      setCurrentResponse("")
      setIsGenerating(true)
    }, 1000)
  }

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-primary text-white rounded-full p-3 shadow-lg z-40"
      >
        <Bot className="h-6 w-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed ${
              isExpanded ? "inset-4 md:inset-10" : "bottom-20 right-5 w-80 md:w-96"
            } bg-black/90 backdrop-blur-md rounded-lg border border-white/10 shadow-xl z-50 flex flex-col transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                <span className="font-medium text-sm">Gaurav AI Assistant</span>
              </div>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white/70 hover:text-white"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white/70 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary/20 text-white border border-primary/30"
                        : "bg-muted text-white/90 border border-white/10"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.sender === "assistant" ? <Bot className="h-3 w-3 mr-1 text-primary" /> : null}
                      <span className="text-xs font-medium">{message.sender === "user" ? "You" : "Gaurav AI"}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Currently generating message */}
              {isGenerating && currentResponse && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted border border-white/10">
                    <div className="flex items-center mb-1">
                      <Bot className="h-3 w-3 mr-1 text-primary" />
                      <span className="text-xs font-medium">Gaurav AI</span>
                    </div>
                    <p className="text-sm">
                      {currentResponse}
                      <span className="animate-pulse">|</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && !isGenerating && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted border border-white/10">
                    <div className="flex items-center mb-1">
                      <Bot className="h-3 w-3 mr-1 text-primary" />
                      <span className="text-xs font-medium">Gaurav AI</span>
                    </div>
                    <div className="ai-processing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary border border-white/10"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  disabled={isTyping || !input.trim()}
                >
                  <Bot className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Helper functions
function getPersonalizedGreeting(preferences: UserPreferences): string {
  const interests = preferences.interestAreas || []

  if (interests.includes("AI Ethics")) {
    return "Hello! I'm Gaurav's AI assistant. I see you're interested in AI Ethics. How can I help you explore responsible AI development today?"
  } else if (interests.includes("Strategic Thinking")) {
    return "Welcome! I'm here to help you navigate Gaurav's strategic frameworks and approaches. What would you like to know about?"
  } else if (interests.includes("Physical Performance")) {
    return "Hi there! I notice you're interested in physical performance. Would you like to explore how Gaurav integrates physical training with cognitive performance?"
  } else {
    return "Hello! I'm Gaurav's AI assistant. I'm here to help you explore his work, ideas, and approaches. What would you like to know about?"
  }
}

function generateResponse(input: string, preferences: UserPreferences, messages: Message[]): string {
  // Simple response generation based on keywords
  const inputLower = input.toLowerCase()

  if (inputLower.includes("ai") || inputLower.includes("artificial intelligence")) {
    return "Gaurav approaches AI as a tool for human augmentation rather than replacement. He focuses on building systems that enhance human capabilities while addressing ethical considerations from the ground up."
  } else if (inputLower.includes("workout") || inputLower.includes("fitness") || inputLower.includes("gym")) {
    return "Physical training is a cornerstone of Gaurav's approach to cognitive performance. He views the gym as a laboratory for building mental resilience, discipline, and focus that transfers to intellectual and creative work."
  } else if (inputLower.includes("book") || inputLower.includes("reading")) {
    return "Some of Gaurav's most influential books include 'Thinking in Systems' by Donella Meadows, 'Antifragile' by Nassim Taleb, and 'Mindset' by Carol Dweck. These have shaped his approach to problem-solving and strategic thinking."
  } else if (inputLower.includes("theory of change") || inputLower.includes("framework")) {
    return "Gaurav's Theory of Change framework focuses on four key stages: Problem Definition, First Principles Analysis, Human Augmentation, and Strategic Implementation. This approach ensures solutions address root causes rather than symptoms."
  } else {
    return "That's an interesting question. Gaurav approaches problems by breaking them down to first principles and focusing on human-centered solutions. Would you like to explore a specific aspect of his work or thinking?"
  }
}
