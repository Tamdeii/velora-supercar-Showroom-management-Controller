import { useEffect, useState } from 'react'
import { LandingNav } from './landing/LandingNav'
import { LandingHero } from './landing/LandingHero'
import { LandingCollection } from './landing/LandingCollection'
import { LandingInnovation } from './landing/LandingInnovation'
import { LandingDealers } from './landing/LandingDealers'

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = ['range', 'innovation', 'dealers']
    const updateActiveSection = () => {
      const currentSection = sections
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .find((section) => section.getBoundingClientRect().top <= 160 && section.getBoundingClientRect().bottom > 160)
      setActiveSection(currentSection?.id ?? '')
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  const openDashboard = () => {
    window.history.pushState({}, '', '/dashboard')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div className="landing-page">
      <LandingNav activeSection={activeSection} menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)} onNavigateMenu={() => setMenuOpen(false)} onOpenDashboard={openDashboard} />
      <main>
        <LandingHero />
        <LandingCollection />
        <LandingInnovation />
        <LandingDealers />
      </main>
    </div>
  )
}
