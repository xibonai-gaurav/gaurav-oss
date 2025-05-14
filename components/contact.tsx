"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, MessageSquare, Dumbbell, Code, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "talk", label: "Talk", icon: <MessageSquare className="h-5 w-5" /> },
  { id: "build", label: "Build", icon: <Code className="h-5 w-5" /> },
  { id: "lift", label: "Lift", icon: <Dumbbell className="h-5 w-5" /> },
  { id: "strategize", label: "Strategize", icon: <Lightbulb className="h-5 w-5" /> },
]

export default function Contact() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formStep, setFormStep] = useState(0)

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setFormStep(1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setSelectedCategory(null)
      setFormStep(0)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const goBack = () => {
    setFormStep(formStep - 1)
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative neural-bg">
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
            <span className="text-gradient">Let&apos;s Make Something</span> Extraordinary Together
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Have an idea, opportunity, or just want to connect? Let me know what you&apos;re thinking.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-lg p-8 text-center backdrop-blur-sm bg-opacity-70 border border-white/10"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-white/70">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <AnimatedFormContainer formStep={formStep}>
              {formStep === 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">What would you like to do?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                          selectedCategory === category.id
                            ? "bg-primary/20 border border-primary/50"
                            : "bg-muted hover:bg-muted/80 border border-transparent"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                            selectedCategory === category.id ? "text-primary" : "text-white/70"
                          }`}
                        >
                          {category.icon}
                        </div>
                        <span className={selectedCategory === category.id ? "font-medium" : "text-white/70"}>
                          {category.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {formStep === 1 && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-muted rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary border border-white/10"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-muted rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary border border-white/10"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full bg-muted rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none border border-white/10"
                      ></textarea>
                    </div>

                    <div className="flex space-x-3">
                      <Button type="button" variant="outline" className="flex-1 border-white/20" onClick={goBack}>
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Sending</span>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          </>
                        ) : (
                          <>
                            Send Message <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-white/50">
                  Or schedule a call directly via{" "}
                  <a href="#" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    Calendly
                  </a>
                </p>
              </div>
            </AnimatedFormContainer>
          )}
        </div>
      </div>
    </section>
  )
}

function AnimatedFormContainer({ children, formStep }: { children: React.ReactNode; formStep: number }) {
  return (
    <motion.div
      key={`form-step-${formStep}`}
      initial={{ opacity: 0, x: formStep === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: formStep === 0 ? 20 : -20 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg p-6 md:p-8 backdrop-blur-sm bg-opacity-70 border border-white/10"
    >
      {children}
    </motion.div>
  )
}
