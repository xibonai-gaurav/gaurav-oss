"use client"

import type React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Dumbbell, Heart, Brain, Calendar } from "lucide-react"

interface WorkoutDay {
  day: string
  focus: string
  exercises: string[]
}

interface Benchmark {
  name: string
  value: string
  icon: React.ReactNode
}

const workoutSplit: WorkoutDay[] = [
  {
    day: "Monday",
    focus: "Push",
    exercises: ["Bench Press", "Overhead Press", "Tricep Extensions", "Lateral Raises"],
  },
  {
    day: "Tuesday",
    focus: "Pull",
    exercises: ["Deadlifts", "Pull-ups", "Barbell Rows", "Bicep Curls"],
  },
  {
    day: "Wednesday",
    focus: "Legs",
    exercises: ["Squats", "Romanian Deadlifts", "Leg Press", "Calf Raises"],
  },
  {
    day: "Thursday",
    focus: "Rest & Recovery",
    exercises: ["Mobility Work", "Light Cardio", "Stretching"],
  },
  {
    day: "Friday",
    focus: "Upper Body",
    exercises: ["Incline Bench", "Weighted Pull-ups", "Shoulder Press", "Arms"],
  },
  {
    day: "Saturday",
    focus: "Lower Body",
    exercises: ["Front Squats", "Hip Thrusts", "Lunges", "Leg Extensions"],
  },
  {
    day: "Sunday",
    focus: "Active Recovery",
    exercises: ["Hiking", "Swimming", "Yoga"],
  },
]

const benchmarks: Benchmark[] = [
  {
    name: "Deadlift",
    value: "405 lbs",
    icon: <Dumbbell className="h-6 w-6 text-primary" />,
  },
  {
    name: "VO2 Max",
    value: "52 ml/kg/min",
    icon: <Heart className="h-6 w-6 text-secondary" />,
  },
  {
    name: "Consistency",
    value: "94%",
    icon: <Calendar className="h-6 w-6 text-accent" />,
  },
  {
    name: "Mind-Muscle",
    value: "Strong",
    icon: <Brain className="h-6 w-6 text-white" />,
  },
]

export default function GymSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="gym" className="py-20 md:py-32 relative neural-bg">
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
            <span className="text-gradient">Body of Work</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Where physical discipline fuels mental performance and creative breakthroughs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="adaptive-container"
          >
            <h3 className="text-2xl font-bold mb-6">Weekly Training Split</h3>
            <div className="bg-card rounded-lg p-6 backdrop-blur-sm bg-opacity-70 border border-white/10">
              <div className="space-y-4">
                {workoutSplit.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{day.day}</span>
                      <span className="text-primary">{day.focus}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {day.exercises.map((exercise) => (
                        <span key={exercise} className="text-sm text-white/70">
                          • {exercise}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="adaptive-container"
            >
              <h3 className="text-2xl font-bold mb-6">Current Benchmarks</h3>
              <div className="grid grid-cols-2 gap-4">
                {benchmarks.map((benchmark, index) => (
                  <motion.div
                    key={benchmark.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-lg p-6 flex flex-col items-center text-center card-hover backdrop-blur-sm bg-opacity-70 border border-white/10"
                  >
                    <div className="mb-3">{benchmark.icon}</div>
                    <div className="text-2xl font-bold mb-1">{benchmark.value}</div>
                    <div className="text-sm text-white/70">{benchmark.name}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="adaptive-container"
            >
              <h3 className="text-2xl font-bold mb-6">Mind × Muscle Connection</h3>
              <div className="bg-card rounded-lg p-6 backdrop-blur-sm bg-opacity-70 border border-white/10">
                <p className="text-white/80 mb-4">
                  Physical training isn't just about aesthetics—it's a cornerstone of my cognitive performance and
                  decision-making framework.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Resistance training improves executive function and working memory</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span>Cardio enhances neuroplasticity and creative problem-solving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Discipline in the gym translates to discipline in business and life</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span>Physical resilience builds mental toughness for entrepreneurial challenges</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
