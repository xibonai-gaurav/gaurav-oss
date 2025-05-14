import Hero from "@/components/hero"
import About from "@/components/about"
import WorkShowcase from "@/components/work-showcase"
import GymSection from "@/components/gym-section"
import LiveThoughts from "@/components/live-thoughts"
import AskGaurav from "@/components/ask-gaurav"
import Contact from "@/components/contact"
import TheoryOfChange from "@/components/theory-of-change"
import SmartScroll from "@/components/smart-scroll"
import ChallengesSection from "@/components/challenges-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SmartScroll />

      <Hero />
      <About />
      <WorkShowcase />
      <ChallengesSection />
      <GymSection />
      <LiveThoughts />
      <TheoryOfChange />
      <AskGaurav />
      <Contact />
    </main>
  )
}
