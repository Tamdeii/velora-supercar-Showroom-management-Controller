import { useMemo, useState } from 'react'
import { ArrowUpRight, CircleDollarSign, ClipboardList, Plus, Search, Truck } from 'lucide-react'
import { formatCurrency } from '../shared/utils/format'
import type { Transaction } from '../shared/data/demoData'
import { recentTransactions } from '../shared/data/demoData'

export function TransactionsPage({ onNotice }: { onNotice: (message: string) => void }) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense' | 'payroll'>('all')

  const filtered = useMemo(() => {
    return recentTransactions.filter((t) => {
      const matchesSearch = t.label.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'all' || t.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [search, typeFilter])

  const total = useMemo(() => {
    return filtered.reduce((sum, t) => sum + (t.income || 0) - (t.expense || 0), 0)
  }, [filtered])

  return (
    <div className="page-content transactions-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Finance & Sales</p>
          <h1>Transactions</h1>
          <p className="muted">Track vehicle sales, expenses, and payroll.</p>
        </div>
        <button className="primary-button" onClick={() => onNotice('Transaction entry form is ready to connect to the API.')}>
          <Plus size={16} /> New transaction
          <ArrowUpRight size={15} />
        </button>
      </section>

      <section className="inventory-controls" aria-label="Transaction filters">
        <div className="control-group">
          <label className="control-label">Search</label>
          <div className="control-input-wrapper">
            <Search size={14} className="control-icon" />
            <input
              className="control-input"
              type="search"
              placeholder="Search by label or reference…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search transactions"
            />
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Type</label>
          <select className="control-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)}>
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="payroll">Payroll</option>
          </select>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Transaction summary">
        <article className="metric-card">
          <div className="metric-top"><span>Net total</span><span className="metric-icon metric-icon--green">{total >= 0 ? <CircleDollarSign size={16} /> : <Truck size={16} />}</span></div>
          <strong className="metric-value">{formatCurrency(total)}</strong>
          <div className="metric-bottom"><span className={`change change--${total >= 0 ? 'up' : 'down'}`}>{total >= 0 ? '+' : ''}{total >= 0 ? 'profit' : 'loss'}</span><span>across filtered transactions</span></div>
        </article>
      </section>

      <section className="vehicle-grid" aria-label="Transaction list">
        {filtered.length === 0 ? (
          <div className="empty-state panel">
            <div className="empty-state-icon"><ClipboardList size={24} /></div>
            <h2>No transactions found</h2>
            <p>Adjust your filters or add a new transaction.</p>
            <button className="secondary-button" onClick={() => setSearch('')}>Clear filters</button>
          </div>
        ) : (
          <div className="transaction-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Reference</th><th>Label</th><th>Date</th><th>Type</th><th className="text-right">Amount</th><th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id} className="table-row">
                    <td><span className="table-cell-mono">{tx.id}</span></td>
                    <td><span className="table-cell-label">{tx.label}</span></td>
                    <td><span className="table-cell-muted">{tx.date}</span></td>
                    <td><span className={`badge badge--${tx.type}`}>{tx.type}</span></td>
                    <td className="text-right"><strong>{tx.income > 0 ? '+' : '-'}{formatCurrency(tx.income || tx.expense)}</strong></td>
                    <td className="text-right"><button className="icon-button" title="View" aria-label={`View ${tx.label}`} onClick={() => onNotice(`Transaction detail for ${tx.label} is ready to connect to the API.`)}><ClipboardList size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}