import { ArrowUpRight, CircleDollarSign, ReceiptText, TrendingDown, TrendingUp } from 'lucide-react'
import { formatCurrency } from '../shared/utils/format'
import { recentTransactions } from '../shared/data/demoData'

export function FinancePage({ onNotice }: { onNotice: (message: string) => void }) {
  const income = recentTransactions.reduce((total, item) => total + item.income, 0)
  const expenses = recentTransactions.reduce((total, item) => total + item.expense, 0)
  const net = income - expenses

  return (
    <div className="page-content finance-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Financial overview</p>
          <h1>Finance</h1>
          <p className="muted">Monitor showroom income, spending, and monthly cash position.</p>
        </div>
        <button className="primary-button" onClick={() => onNotice('Financial report export is ready to connect to the API.')}>
          <ReceiptText size={16} /> Export report <ArrowUpRight size={15} />
        </button>
      </section>

      <section className="finance-summary" aria-label="Finance summary">
        <article className="finance-card finance-card--income">
          <div className="finance-card-icon"><TrendingUp size={18} /></div>
          <div><span>Total income</span><strong>{formatCurrency(income)}</strong></div>
          <span className="finance-trend">+12.8%</span>
        </article>
        <article className="finance-card finance-card--expense">
          <div className="finance-card-icon"><TrendingDown size={18} /></div>
          <div><span>Total expenses</span><strong>{formatCurrency(expenses)}</strong></div>
          <span className="finance-trend finance-trend--down">+4.1%</span>
        </article>
        <article className="finance-card finance-card--net">
          <div className="finance-card-icon"><CircleDollarSign size={18} /></div>
          <div><span>Net position</span><strong>{formatCurrency(net)}</strong></div>
          <span className="finance-trend">Healthy</span>
        </article>
      </section>

      <section className="finance-ledger" aria-label="Recent finance activity">
        <div className="finance-ledger-heading">
          <div><h2>Recent cash flow</h2><p>Latest recorded financial movements</p></div>
          <button className="text-button" onClick={() => onNotice('Full finance ledger is ready to connect to the API.')}>View ledger <ArrowUpRight size={14} /></button>
        </div>
        <div className="finance-rows">
          {recentTransactions.map((item) => (
            <div className="finance-row" key={item.id}>
              <span className={`finance-row-icon finance-row-icon--${item.type}`}><ReceiptText size={15} /></span>
              <div className="finance-row-copy"><strong>{item.label}</strong><span>{item.date}</span></div>
              <span className="finance-row-type">{item.type}</span>
              <strong className={item.income > 0 ? 'finance-amount finance-amount--income' : 'finance-amount'}>
                {item.income > 0 ? '+' : '-'}{formatCurrency(item.income || item.expense)}
              </strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
