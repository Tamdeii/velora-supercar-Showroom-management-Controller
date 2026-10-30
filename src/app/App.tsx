import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CarFront,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Command,
  LayoutDashboard,
  Megaphone,
  Menu,
  Package,
  PanelLeftClose,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react'
import { formatCurrency, getInitials, sumBy } from '../shared/utils/format'
import { monthlyPerformance, overviewMetrics, recentTransactions } from '../shared/data/demoData'
import type { NavItem } from './types'

const navItems: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Finance', icon: CircleDollarSign },
  { label: 'People', icon: Users },
  { label: 'Payroll', icon: BriefcaseBusiness },
  { label: 'Products', icon: Package },
  { label: 'Advertising', icon: Megaphone },
]

export function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setCollapsed] = useState(false)
  const [showShowcase, setShowShowcase] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const totalRevenue = useMemo(() => sumBy(recentTransactions, (item) => item.income), [])
  const navigateTo = (page: string) => {
    setActivePage(page)
    setSidebarOpen(false)
    setNotice(null)
  }
  const showNotice = (message: string) => setNotice(message)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''} ${isSidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark">V</div>
          {!isCollapsed && <span className="brand-name">velora</span>}
          <button className="icon-button sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>
        <div className="workspace-switcher">
          <div className="workspace-avatar">VE</div>
          {!isCollapsed && <><div className="workspace-copy"><strong>Velora Enterprise</strong><span>Business workspace</span></div><ChevronRight size={15} /></>}
        </div>
        <nav aria-label="Main navigation">
          <span className="nav-caption">{!isCollapsed && 'Workspace'}</span>
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${activePage === label ? 'nav-item--active' : ''}`} onClick={() => navigateTo(label)} aria-current={activePage === label ? 'page' : undefined}>
              <Icon size={18} strokeWidth={activePage === label ? 2.4 : 1.8} />
              {!isCollapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => setShowShowcase(true)}><CarFront size={18} /><span className={isCollapsed ? 'sr-only' : ''}>View showcase</span></button>
          <button className={`nav-item ${activePage === 'Settings' ? 'nav-item--active' : ''}`} onClick={() => navigateTo('Settings')} aria-current={activePage === 'Settings' ? 'page' : undefined}><Settings size={18} /><span className={isCollapsed ? 'sr-only' : ''}>Settings</span></button>
          <div className="user-chip">
            <div className="avatar avatar--dark">{getInitials('Alex Morgan')}</div>
            {!isCollapsed && <div className="user-copy"><strong>Alex Morgan</strong><span>Administrator</span></div>}
            {!isCollapsed && <MoreDots />}
          </div>
          <button className="collapse-button" onClick={() => setCollapsed(!isCollapsed)} aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}>
            {isCollapsed ? <PanelLeftClose size={17} /> : <><PanelLeftClose size={17} /><span>Collapse</span></>}
          </button>
        </div>
      </aside>
      {isSidebarOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <main className="main-content">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <button className="search-trigger"><Search size={16} /><span>Search</span><kbd><Command size={11} /> K</kbd></button>
            <button className="avatar avatar--purple" aria-label="Open profile">AM</button>
          </div>
        </header>
        {activePage === 'Overview' ? (
          <OverviewPage totalRevenue={totalRevenue} onShowcase={() => setShowShowcase(true)} onNotice={showNotice} />
        ) : (
          <SectionPlaceholder title={activePage} onNotice={showNotice} />
        )}
        {notice && <div className="app-notice" role="status">{notice}<button className="notice-dismiss" onClick={() => setNotice(null)} aria-label="Dismiss notification"><X size={14} /></button></div>}
      </main>
      {showShowcase && <ShowcaseModal onClose={() => setShowShowcase(false)} />}
    </div>
  )
}

function OverviewPage({ totalRevenue, onShowcase, onNotice }: { totalRevenue: number; onShowcase: () => void; onNotice: (message: string) => void }) {
  return (
    <div className="page-content">
      <section className="page-heading">
        <div><p className="eyebrow">Sunday, October 18, 2026</p><h1>Good morning, Alex <span className="wave">✦</span></h1><p className="muted">Here is what is happening across your business today.</p></div>
        <button className="primary-button" onClick={onShowcase}><CarFront size={16} /> View product showcase <ArrowUpRight size={15} /></button>
      </section>
      <section className="metrics-grid" aria-label="Business metrics">
        {overviewMetrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
      </section>
      <section className="content-grid">
        <div className="panel performance-panel">
          <div className="panel-heading"><div><h2>Business performance</h2><p>Revenue and expenses over the last 6 months</p></div><button className="select-button">Last 6 months <ChevronRight size={14} /></button></div>
          <div className="chart-wrap"><div className="chart-y-axis"><span>$200k</span><span>$150k</span><span>$100k</span><span>$50k</span><span>$0</span></div><div className="chart"><div className="grid-lines">{[1,2,3,4,5].map((line) => <i key={line} />)}</div><svg viewBox="0 0 620 230" preserveAspectRatio="none" role="img" aria-label="Revenue and expenses chart"><path className="chart-area" d="M0,160 C45,145 65,172 105,132 S165,112 207,126 S260,66 310,91 S373,85 415,51 S470,75 515,39 S575,50 620,18 L620,230 L0,230Z" /><path className="chart-line chart-line--revenue" d="M0,160 C45,145 65,172 105,132 S165,112 207,126 S260,66 310,91 S373,85 415,51 S470,75 515,39 S575,50 620,18" /><path className="chart-line chart-line--expense" d="M0,190 C47,178 75,187 111,170 S170,179 207,159 S263,150 310,164 S376,130 415,140 S468,124 515,130 S578,104 620,116" /></svg><div className="chart-labels">{monthlyPerformance.map((item) => <span key={item.month}>{item.month}</span>)}</div></div></div>
          <div className="legend"><span><i className="legend-dot legend-dot--purple" />Revenue <strong>{formatCurrency(totalRevenue)}</strong></span><span><i className="legend-dot legend-dot--orange" />Expenses <strong>$184,320</strong></span></div>
        </div>
        <div className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Latest business transactions</p></div><button className="text-button" onClick={() => onNotice('The full transactions view is ready to connect to the API.')}>View all <ArrowUpRight size={14} /></button></div><div className="activity-list">{recentTransactions.slice(0, 5).map((transaction) => <div className="activity-row" key={transaction.id}><div className={`transaction-icon transaction-icon--${transaction.type}`}><ClipboardList size={15} /></div><div className="activity-copy"><strong>{transaction.label}</strong><span>{transaction.date}</span></div><strong className={transaction.income > 0 ? 'amount amount--positive' : 'amount'}>{transaction.income > 0 ? '+' : '-'}{formatCurrency(Math.abs(transaction.income || transaction.expense))}</strong></div>)}</div></div>
      </section>
      <section className="insight-banner"><div className="insight-icon"><BarChart3 size={21} /></div><div><strong>Your revenue is up 18.4% this month</strong><p>Nice work. You are on track to reach your quarterly goal of $1.2M.</p></div><button className="text-button" onClick={() => onNotice('Reporting will be available when the analytics API is connected.')}>View report <ArrowUpRight size={14} /></button></section>
    </div>
  )
}

function MetricCard({ label, value, change, detail, tone }: (typeof overviewMetrics)[number]) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><span className={`metric-icon metric-icon--${tone}`}>{tone === 'green' ? <CircleDollarSign size={16} /> : tone === 'purple' ? <BarChart3 size={16} /> : <Users size={16} />}</span></div><strong className="metric-value">{value}</strong><div className="metric-bottom"><span className={`change change--${change > 0 ? 'up' : 'down'}`}>{change > 0 ? '+' : ''}{change}%</span><span>{detail}</span></div></article>
}

function SectionPlaceholder({ title, onNotice }: { title: string; onNotice: (message: string) => void }) {
  return <div className="page-content"><section className="page-heading"><div><p className="eyebrow">{title === 'Settings' ? 'Workspace configuration' : 'Workspace module'}</p><h1>{title}</h1><p className="muted">{title === 'Settings' ? 'Manage workspace preferences and integrations.' : 'This module is ready for your business data and workflows.'}</p></div><button className="primary-button" onClick={() => onNotice(`${title} creation flow is ready to connect to the API.`)}><Package size={16} /> Create new <ArrowUpRight size={15} /></button></section><div className="empty-state panel"><div className="empty-state-icon"><ClipboardList size={24} /></div><h2>{title === 'Settings' ? 'Configure your workspace' : `Build your ${title.toLowerCase()} workspace`}</h2><p>{title === 'Settings' ? 'Connect your preferences and data integrations to continue.' : 'Connect your data source to start tracking this area with clarity.'}</p><button className="secondary-button" onClick={() => onNotice(`${title} data source setup is ready for the next integration step.`)}>Connect data source</button></div></div>
}

function ShowcaseModal({ onClose }: { onClose: () => void }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Product showcase"><div className="showcase-modal"><button className="modal-close icon-button" onClick={onClose} aria-label="Close showcase"><X size={18} /></button><div className="showcase-visual"><div className="showcase-glow" /><div className="showcase-copy"><span className="eyebrow">Velora signature collection</span><h2>Designed to<br /><em>move differently.</em></h2><p>Explore a curated portfolio of performance, precision, and presence.</p><button className="light-button">Explore collection <ArrowUpRight size={15} /></button></div><div className="car-silhouette" aria-hidden="true">V</div></div><div className="showcase-footer"><span>01 / 03</span><strong>Velora V1 — Carbon Edition</strong><span>Scroll to explore <ChevronRight size={14} /></span></div></div></div>
}

function MoreDots() { return <span className="more-dots">•••</span> }
