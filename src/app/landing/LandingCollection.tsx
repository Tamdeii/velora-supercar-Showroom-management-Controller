import { ArrowUpRight } from 'lucide-react'
import { landingMedia } from './landingMedia'

export function LandingCollection() {
  return (
    <section className="landing-collection" id="collection">
      <div className="landing-section-heading">
        <div><p className="landing-eyebrow">HongT V1 Range</p><h2>The V1 Range</h2></div>
        <a href="#private-viewing">Book a Private Viewing <ArrowUpRight size={15} /></a>
      </div>
      <div className="landing-vehicle-grid">
        {landingMedia.vehicles.map((vehicle) => (
          <article className="landing-vehicle-card" key={vehicle.name}>
            <div className="landing-vehicle-image">
              <img
                src={vehicle.image}
                alt={vehicle.alt}
                loading="lazy"
                onError={(event) => { event.currentTarget.style.display = 'none' }}
              />
              <span>{vehicle.status}</span>
            </div>
            <div className="landing-vehicle-meta">
              <div><span>{vehicle.meta}</span><h3>{vehicle.name}</h3></div>
              <strong>{vehicle.price}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
