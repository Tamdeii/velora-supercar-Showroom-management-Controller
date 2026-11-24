import { useState } from 'react'
import { Bell, Building2, Check, ShieldCheck, UserRound } from 'lucide-react'

export function SettingsPage({ onNotice }: { onNotice: (message: string) => void }) {
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [leadNotifications, setLeadNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  return (
    <div className="page-content settings-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Workspace configuration</p>
          <h1>Settings</h1>
          <p className="muted">Manage workspace profile, security, and notification preferences.</p>
        </div>
        <button className="primary-button" onClick={() => onNotice('Workspace settings saved locally.')}>
          <Check size={16} /> Save changes
        </button>
      </section>

      <div className="settings-layout">
        <aside className="settings-nav" aria-label="Settings sections">
          <button className="settings-nav-item settings-nav-item--active"><Building2 size={16} /> Workspace</button>
          <button className="settings-nav-item"><UserRound size={16} /> Profile</button>
          <button className="settings-nav-item"><Bell size={16} /> Notifications</button>
          <button className="settings-nav-item"><ShieldCheck size={16} /> Security</button>
        </aside>

        <div className="settings-content">
          <section className="settings-section">
            <div className="settings-section-heading"><div><h2>Workspace profile</h2><p>Basic information shown across the showroom workspace.</p></div></div>
            <div className="settings-fields">
              <label><span>Workspace name</span><input defaultValue="HongT Enterprise" /></label>
              <label><span>Primary email</span><input type="email" defaultValue="admin@hongt.com" /></label>
              <label><span>Showroom location</span><input defaultValue="Beverly Hills Flagship" /></label>
              <label><span>Timezone</span><select defaultValue="America/Los_Angeles"><option value="America/Los_Angeles">Pacific Time</option><option value="America/New_York">Eastern Time</option><option value="Europe/London">London</option></select></label>
            </div>
          </section>

          <section className="settings-section">
            <div className="settings-section-heading"><div><h2>Notifications</h2><p>Choose which updates should reach your workspace.</p></div></div>
            <div className="settings-toggles">
              <ToggleRow label="Email alerts" description="Receive important account and inventory alerts." checked={emailAlerts} onChange={setEmailAlerts} />
              <ToggleRow label="Lead notifications" description="Notify sales staff when a new inquiry arrives." checked={leadNotifications} onChange={setLeadNotifications} />
              <ToggleRow label="Weekly digest" description="Send a weekly summary of showroom performance." checked={weeklyDigest} onChange={setWeeklyDigest} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="settings-toggle-row">
      <div><strong>{label}</strong><span>{description}</span></div>
      <button type="button" className={`settings-toggle ${checked ? 'settings-toggle--on' : ''}`} aria-label={`Toggle ${label}`} aria-pressed={checked} onClick={() => onChange(!checked)}><i /></button>
    </div>
  )
}
