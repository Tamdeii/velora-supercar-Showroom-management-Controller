import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

const dealers = [
  ['HongT Beverly Hills Flagship', '9460 Wilshire Boulevard, Beverly Hills, CA 90212', '+1 310 555 0188', 'Sales · Private Viewing · Service Center'],
  ['HongT Miami Design District', '140 NE 39th Street, Miami, FL 33137', '+1 305 555 0146', 'Sales · Bespoke Atelier'],
  ['HongT London Mayfair', '24 Berkeley Square, London W1J 6HE', '+44 20 7946 0182', 'Sales · Collector Provenance'],
]

export function LandingDealers() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitted(false)
    setError('')
    const formData = new FormData(event.currentTarget)
    const edition = formData.get('edition')?.toString()
    const vehicleIds: Record<string, string> = {
      'HongT V1 Standard Edition': 'v1-standard',
      'HongT V1 Touring Edition': 'v1-touring',
      'HongT V1 Carbon Edition': 'v1-carbon',
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:4000'}/api/v1/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          vehicleId: edition ? vehicleIds[edition] : undefined,
          message: formData.get('message') || undefined,
          source: `dealer-form:${formData.get('showroom')}`,
        }),
      })
      if (!response.ok) throw new Error('Request could not be sent.')
      setSubmitted(true)
      event.currentTarget.reset()
    } catch {
      setError('We could not send your request. Please try again or contact the showroom directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="landing-dealers" id="dealers">
      <div className="landing-section-heading">
        <div><p className="landing-eyebrow">GLOBAL SHOWROOMS</p><h2>Official HongT Dealers</h2><p className="landing-section-intro">Speak with a HongT representative about specification, provenance and private appointments.</p></div>
      </div>
      <div className="landing-dealer-grid">
        {dealers.map(([name, address, phone, services]) => (
          <article className="landing-dealer" key={name}>
            <p className="landing-dealer-kicker">HongT V1 · Official showroom</p>
            <h3>{name}</h3>
            <p>{address}</p>
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
            <p className="landing-dealer-hours">Monday–Saturday · 09:00–18:00</p>
            <strong>{services}</strong>
          </article>
        ))}
      </div>
      <div className="landing-inquiry">
        <div><p className="landing-eyebrow">PRIVATE APPOINTMENT</p><h3>Contact Your Dealer</h3><p>Tell us which edition and showroom best suit your enquiry.</p></div>
        <form onSubmit={handleSubmit}>
          <label>Full Name<input name="name" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Preferred Showroom<select name="showroom" defaultValue=""><option value="" disabled>Select a showroom</option>{dealers.map(([name]) => <option key={name}>{name}</option>)}</select></label>
          <label>Model Edition<select name="edition" defaultValue=""><option value="" disabled>Select an edition</option><option>HongT V1 Standard Edition</option><option>HongT V1 Touring Edition</option><option>HongT V1 Carbon Edition</option></select></label>
          <label className="landing-inquiry-wide">Message<textarea name="message" rows={4} /></label>
          <button className="landing-primary landing-inquiry-wide" type="submit" disabled={submitting}>{submitted ? 'Request Received' : submitting ? 'Sending Request' : 'Send Request'} <ArrowUpRight size={15} /></button>
          {error && <p role="alert" className="landing-inquiry-error">{error}</p>}
        </form>
      </div>
    </section>
  )
}
