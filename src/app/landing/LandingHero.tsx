import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { landingMedia } from './landingMedia'

export function LandingHero() {
  return (
    <section
      className="landing-hero"
      aria-labelledby="landing-title"
      style={{ minHeight: '100vh', height: '100vh', gridTemplateColumns: '1fr' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          zIndex: 1,
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,.85), rgba(0,0,0,.5) 52%, transparent)',
        }}
      />
      <div className="landing-hero-copy">
        <h1 id="landing-title">Rare machines.<br /> <em>Luxurious standards.</em></h1>
        <p className="landing-subtitle">A private collection of super cars, selected for VIP, and the way they make every road feel furious</p>
        <div className="landing-actions">
          <a className="landing-primary" href="#range">Discover <ArrowUpRight size={16} /></a>
          <a className="landing-secondary" href="#dealers">Enquire</a>
        </div>
      </div>
      <div
        className="landing-hero-visual"
        aria-label="HongT V1 Carbon Edition"
        style={{ position: 'absolute', zIndex: 0, inset: 0, width: '100%', height: '100%' }}
      >
        <video className="landing-hero-video" autoPlay muted loop playsInline poster={landingMedia.heroPoster}>
          {landingMedia.heroLoopWebm && <source src={landingMedia.heroLoopWebm} type="video/webm" />}
          <source src={landingMedia.heroLoopMp4} type="video/mp4" />
        </video>
      </div>
      <a className="landing-scroll" href="#range" aria-label="Scroll to range"><ArrowDown size={16} /></a>
    </section>
  )
}
