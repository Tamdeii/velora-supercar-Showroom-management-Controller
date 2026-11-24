import { ArrowUpRight, Menu, X } from 'lucide-react'

type LandingNavProps = {
  menuOpen: boolean
  onMenuToggle: () => void
  onNavigateMenu: () => void
  onOpenDashboard: () => void
}

export function LandingNav({ menuOpen, onMenuToggle, onNavigateMenu, onOpenDashboard }: LandingNavProps) {
  return (
    <header
      className="landing-nav"
      style={{
        zIndex: 50,
        borderBottom: 'none',
        background: 'linear-gradient(to bottom, rgba(0,0,0,.8), rgba(0,0,0,.4) 55%, transparent)',
      }}
    >
      <button className="landing-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="HongT home">
        <span>HT</span><strong>HongT</strong>
      </button>
      <nav className={menuOpen ? 'landing-links landing-links--open' : 'landing-links'} aria-label="Public navigation">
        <a href="#collection" onClick={onNavigateMenu}>Range</a>
        <a href="#performance" onClick={onNavigateMenu}>Innovation</a>
        <a href="#private-viewing" onClick={onNavigateMenu}>Dealers</a>
      </nav>
      <button className="landing-admin" onClick={onOpenDashboard}>Admin <ArrowUpRight size={15} /></button>
      <button className="landing-menu" onClick={onMenuToggle} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  )
}
