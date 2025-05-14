"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, User, Bot, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
}

const sampleQuestions = [
  "What's your approach to building AI products?",
  "How do you balance fitness with work?",
  "What books have influenced you the most?",
  "What's your philosophy on failure?",
]

const preloadedAnswers: Record<string, string> = {
  "What's your approach to building AI products?":
    "I focus on human-centered AI design. Technology should augment human capabilities, not replace them. I start by deeply understanding the user's context and pain points, then work backward to determine where AI can provide the most value. The best AI products are those where the technology feels invisible, and the user experience feels magical.",

  "How do you balance fitness with work?":
    "I don't see fitness and work as competing priorities—they're complementary. Physical training enhances my mental performance and decision-making. I schedule workouts like I schedule meetings: non-negotiable. The key is consistency over intensity, and finding joy in the process rather than fixating on outcomes.",

  "What books have influenced you the most?":
    "Thinking in Systems by Donella Meadows taught me to see patterns and leverage points. Antifragile by Nassim Taleb shaped my approach to uncertainty and risk. Mindset by Carol Dweck fundamentally changed how I view growth and learning. And finally, Deep Work by Cal Newport influenced my approach to focused productivity in a distracted world.",

  "What's your philosophy on failure?":
    "I see failure as high-quality data—expensive but valuable. The key is to fail forward by extracting maximum learning from each setback. I believe in rapid iteration, where each failure refines your approach rather than defining your identity. The most successful people I know aren't those who avoid failure; they're those who recover and adapt quickly.",
}

export default function AskGaurav() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [currentResponse, setCurrentResponse] = useState("")
  const [fullResponse, setFullResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (messages.length > 0 || currentResponse) {
      scrollToBottom()
    }
  }, [messages, currentResponse])

  // Simulate AI thinking
  const simulateThinking = () => {
    setThinking(true)
    return new Promise<void>((resolve) => {
      setTimeout(
        () => {
          setThinking(false)
          resolve()
        },
        Math.random() * 1000 + 500,
      ) // Random thinking time between 500-1500ms
    })
  }

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

    // Simulate AI thinking and response
    await simulateThinking()

    // Find response
    let response =
      "I don't have a specific answer for that yet, but I'm constantly learning and evolving. Feel free to ask something else!"

    // Check if we have a preloaded answer
    for (const [question, answer] of Object.entries(preloadedAnswers)) {
      if (input.toLowerCase().includes(question.toLowerCase().slice(0, 10))) {
        response = answer
        break
      }
    }

    // Set the full response and start generating
    setFullResponse(response)
    setCurrentResponse("")
    setIsGenerating(true)
  }

  const handleSampleQuestion = (question: string) => {
    setInput(question)
  }

  const clearChat = () => {
    setMessages([])
    setCurrentResponse("")
    setFullResponse("")
    setIsGenerating(false)
    setIsTyping(false)
    setThinking(false)
  }

  return (
    <section id="ask" className="py-20 md:py-32 relative neural-bg">
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
            <span className="text-gradient">Ask Gaurav</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            An interactive agent trained on my tone and mental models. Ask me anything.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg overflow-hidden shadow-lg border border-white/10 backdrop-blur-sm bg-opacity-70"
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span className="font-medium">Gaurav AI</span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearChat} className="text-white/70 hover:text-white">
                <RefreshCw className="h-4 w-4 mr-2" /> Clear Chat
              </Button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-hidden">
              {messages.length === 0 && !currentResponse ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="ai-processing mb-4">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Ask me anything</h3>
                  <p className="text-white/60 max-w-md">
                    I can share insights on strategy, AI, fitness, and my approach to building and thinking.
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary/20 text-white border border-primary/30"
                            : "bg-muted text-white/90 border border-white/10"
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          {message.sender === "assistant" ? (
                            <Bot className="h-4 w-4 mr-2 text-primary" />
                          ) : (
                            <User className="h-4 w-4 mr-2 text-white/70" />
                          )}
                          <span className="text-xs font-medium">{message.sender === "user" ? "You" : "Gaurav AI"}</span>
                        </div>
                        <p>{message.content}</p>
                      </div>
                    </motion.div>
                  ))}

                  <AnimatePresence>
                    {thinking && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted border border-white/10">
                          <div className="flex items-center">
                            <Bot className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-xs font-medium">Gaurav AI</span>
                          </div>
                          <div className="ai-processing mt-2">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {isGenerating && !thinking && currentResponse && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted border border-white/10">
                          <div className="flex items-center mb-1">
                            <Bot className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-xs font-medium">Gaurav AI</span>
                          </div>
                          <p>
                            {currentResponse}
                            <span className="animate-pulse">|</span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-muted rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary border border-white/10"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 relative overflow-hidden group"
                  disabled={isTyping || !input.trim()}
                >
                  <span className="relative z-10">
                    <Send className="h-4 w-4" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </form>

              <div className="mt-4">
                <p className="text-xs text-white/50 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSampleQuestion(question)}
                      className="text-xs bg-muted hover:bg-muted/80 text-white/70 px-3 py-1 rounded-full transition-colors border border-white/10"
                      disabled={isTyping}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
