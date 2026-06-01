"use client"

import Hero from "./_components/Hero"
import StatsSection from "./_components/StatsSection"
import TokenTicker from "./_components/TokenTicker"
import SkillsSection from "./_components/SkillsSection"
import ContactSection from "./_components/ContactSection"

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-body">
      {/* Main Content */}
      <div className="relative">
        {/* Hero Section - Split Screen */}
        <Hero />

        {/* Achievement Stats */}
        <StatsSection />

        {/* Token Ticker */}
        <TokenTicker />

        {/* Tech Stack */}
        <SkillsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-muted/40">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-display text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} HAOMING SUN. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
