export function LandingInnovation() {
  const pillars = [
    ['01', 'Carbon Monocoque Chassis', 'Ultra-rigid carbon-fiber tub engineered for torsional stiffness and a low center of gravity.', '1,283 kg dry weight'],
    ['02', 'Active Aerodynamics', 'Electronically actuated rear wing and underbody diffusers balance high-speed downforce with low-drag stability.', 'Electronically controlled'],
    ['03', 'Powertrain & Thermal Dynamics', 'Mid-mounted 4.0L Twin-Turbocharged V8 paired with a 7-speed dual-clutch seamless-shift gearbox.', '7-speed dual clutch'],
  ]

  return (
    <section className="landing-innovation" id="innovation">
      <div className="landing-section-heading landing-section-heading--dark">
        <div><p className="landing-eyebrow">ENGINEERING</p><h2>Built for aerodynamic precision.</h2><p className="landing-section-intro">Every system is calibrated around mass, airflow and repeatable performance.</p></div>
      </div>
      <div className="landing-innovation-pillars">
        {pillars.map(([number, title, copy, spec]) => (
          <article key={number} className="landing-innovation-row">
            <span className="landing-innovation-number">{number}</span>
            <div><h3>{title}</h3><p>{copy}</p></div>
            <strong>{spec}</strong>
          </article>
        ))}
      </div>
      <div className="landing-metrics">
        <div><strong>710 HP</strong><span>Maximum power</span></div>
        <div><strong>2.8s</strong><span>0–100 km/h</span></div>
        <div><strong>341 km/h</strong><span>Top speed</span></div>
        <div><strong>1,283 kg</strong><span>Dry weight</span></div>
      </div>
    </section>
  )
}
