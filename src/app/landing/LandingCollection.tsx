import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { landingMedia } from './landingMedia'

export function LandingCollection() {
  const [selectedEdition, setSelectedEdition] = useState(0)
  const selectedVehicle = landingMedia.vehicles[selectedEdition]
  const editionDetails = [
    {
      description: '4.0L twin-turbo V8 producing 710 HP, reaching 100 km/h in 2.9 seconds',
      specs: ['4.0L Twin-Turbo V8', '710 HP', '2.9s', '1,283 kg', '1,540 kg'],
    },
    {
      description: 'Full Alcantara and quilted leather cabin with adaptive comfort suspension',
      specs: ['4.0L Twin-Turbo V8', '710 HP', '2.8s', '1,316 kg', '1,575 kg'],
    },
    {
      description: 'Exposed carbon aerodynamic package with forged wheels and track telemetry',
      specs: ['4.0L Twin-Turbo V8', '710 HP', '2.8s', '1,283 kg', '1,520 kg'],
    },
  ]

  return (
    <section className="landing-collection" id="range">
      <div className="landing-section-heading">
        <div><p className="landing-eyebrow">HONGT V1 2026 RANGE</p><h2>The V1 Range</h2><p className="landing-section-intro">Three specifications of one mid-engined platform, each defined by its intended use.</p></div>
        <a href="#dealers">Book a Private Viewing <ArrowUpRight size={15} /></a>
      </div>
      <div className="landing-vehicle-grid">
        {landingMedia.vehicles.map((vehicle, index) => (
          <article className="landing-vehicle-card" key={vehicle.name}>
            <div className="landing-vehicle-image">
              <img
                src={vehicle.image}
                alt={vehicle.alt}
                loading="lazy"
                onError={(event) => { event.currentTarget.style.display = 'none' }}
              />
              <span className="landing-vehicle-badge">{vehicle.status}</span>
            </div>
            <div className="landing-vehicle-meta">
              <button className="landing-edition-selector" onClick={() => setSelectedEdition(index)} aria-pressed={selectedEdition === index}>
                <span>{vehicle.meta}</span><h3>{vehicle.name}</h3>
              </button>
              <strong>{vehicle.price}</strong>
            </div>
            <p className="landing-vehicle-description">{editionDetails[index].description}</p>
            <div className="landing-card-actions"><button onClick={() => setSelectedEdition(index)}>Discover More</button><a href="#dealers">Enquire <ArrowUpRight size={14} /></a></div>
          </article>
        ))}
      </div>
      <div className="landing-comparison">
        <div className="landing-comparison-heading"><div><p className="landing-eyebrow">V1 PLATFORM</p><h3>{selectedVehicle.name}</h3></div><span>{selectedVehicle.status}</span></div>
        <div className="landing-comparison-grid">
          {['Engine', 'Maximum Power', '0–100 km/h', 'Dry Weight', 'Curb Spec'].map((label, index) => (
            <div key={label}><span>{label}</span><strong>{editionDetails[selectedEdition].specs[index]}</strong></div>
          ))}
        </div>
      </div>
    </section>
  )
}
