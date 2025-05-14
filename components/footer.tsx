import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="font-display text-xl font-bold text-gradient">GauravOS</span>
            </Link>
            <p className="mt-2 text-sm text-white/60 max-w-md">
              The interactive personal universe of Gaurav. Founder. Gym rat. Strategic thinker. AI builder. Human first.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
            </Link>
            <Link href="mailto:hello@example.com" aria-label="Email">
              <Mail className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">&copy; {new Date().getFullYear()} GauravOS. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-white/60">Designed and built with purpose</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
