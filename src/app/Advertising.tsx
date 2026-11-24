import { ArrowUpRight, Megaphone, MousePointerClick, Plus, TrendingUp } from 'lucide-react'
import { formatCurrency } from '../shared/utils/format'

const campaigns = [
  { id: 'c1', name: 'V1 Carbon launch', channel: 'Search', status: 'Active', budget: 24000, spend: 16800, impressions: 428000, clicks: 18400, conversions: 286 },
  { id: 'c2', name: 'Retargeting — showroom', channel: 'Social', status: 'Active', budget: 12000, spend: 7400, impressions: 315000, clicks: 9200, conversions: 194 },
  { id: 'c3', name: 'Private viewing series', channel: 'Email', status: 'Paused', budget: 8000, spend: 5100, impressions: 64000, clicks: 3800, conversions: 98 },
]

export function AdvertisingPage({ onNotice }: { onNotice: (message: string) => void }) {
  const totalSpend = campaigns.reduce((total, campaign) => total + campaign.spend, 0)
  const totalImpressions = campaigns.reduce((total, campaign) => total + campaign.impressions, 0)
  const totalConversions = campaigns.reduce((total, campaign) => total + campaign.conversions, 0)

  return (
    <div className="page-content advertising-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Campaign performance</p>
          <h1>Advertising</h1>
          <p className="muted">Plan campaigns and track spend, reach, and lead conversion.</p>
        </div>
        <button className="primary-button" onClick={() => onNotice('Campaign creation is ready to connect to the API.')}>
          <Plus size={16} /> New campaign <ArrowUpRight size={15} />
        </button>
      </section>

      <section className="advertising-summary" aria-label="Advertising summary">
        <article><span className="advertising-icon"><Megaphone size={18} /></span><div><span>Active spend</span><strong>{formatCurrency(totalSpend)}</strong></div></article>
        <article><span className="advertising-icon"><MousePointerClick size={18} /></span><div><span>Impressions</span><strong>{totalImpressions.toLocaleString('en-US')}</strong></div></article>
        <article><span className="advertising-icon"><TrendingUp size={18} /></span><div><span>Conversions</span><strong>{totalConversions}</strong></div></article>
      </section>

      <section className="campaign-list" aria-label="Campaign list">
        <div className="campaign-list-heading"><div><h2>Current campaigns</h2><p>Budget and conversion overview</p></div><button className="text-button" onClick={() => onNotice('Campaign analytics are ready to connect to the API.')}>View analytics <ArrowUpRight size={14} /></button></div>
        {campaigns.map((campaign) => {
          const progress = Math.min(100, Math.round((campaign.spend / campaign.budget) * 100))
          return (
            <article className="campaign-row" key={campaign.id}>
              <div className="campaign-main">
                <div className="campaign-icon"><Megaphone size={16} /></div>
                <div className="campaign-copy"><strong>{campaign.name}</strong><span>{campaign.channel} · {campaign.status}</span></div>
              </div>
              <div className="campaign-budget"><span>{formatCurrency(campaign.spend)} / {formatCurrency(campaign.budget)}</span><div className="campaign-progress"><i style={{ width: `${progress}%` }} /></div></div>
              <div className="campaign-stat"><span>Impressions</span><strong>{campaign.impressions.toLocaleString('en-US')}</strong></div>
              <div className="campaign-stat"><span>Conversions</span><strong>{campaign.conversions}</strong></div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
