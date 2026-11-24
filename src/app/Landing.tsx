import { useState } from 'react'
import { LandingNav } from './landing/LandingNav'
import { LandingHero } from './landing/LandingHero'
import { LandingProof } from './landing/LandingProof'
import { LandingCollection } from './landing/LandingCollection'
import { LandingViewing } from './landing/LandingViewing'

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const openDashboard = () => {
    window.history.pushState({}, '', '/dashboard')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div className="landing-page">
      <LandingNav menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)} onNavigateMenu={() => setMenuOpen(false)} onOpenDashboard={openDashboard} />
      <main>
        <LandingHero />
        <LandingProof />
        <LandingCollection />
        <LandingViewing />
      </main>
    </div>
  )
}
