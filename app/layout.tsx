import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import NeuralInterface from "@/components/neural-interface"
import AmbientSound from "@/components/ambient-sound"
import NeuralThoughtStream from "@/components/neural-thought-stream"
import NeuralCanvas from "@/components/neural-canvas"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "GauravOS | The Interactive Personal Universe of Gaurav",
  description: "Founder. Gym rat. Strategic thinker. AI builder. Human first.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="relative">
            <NeuralCanvas />
            <ScrollProgress />
            <NeuralInterface />
            <NeuralThoughtStream />
            <AmbientSound />
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
