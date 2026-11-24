import { ArrowUpRight, CalendarDays, CircleDollarSign, Download, Users } from 'lucide-react'
import { formatCurrency } from '../shared/utils/format'

const payrollEmployees = [
  { id: 'e1', name: 'Maria Garcia', role: 'Senior Sales Associate', department: 'Sales', gross: 45000, status: 'Ready' },
  { id: 'e2', name: 'James Chen', role: 'Service Manager', department: 'Service', gross: 65000, status: 'Ready' },
  { id: 'e3', name: 'Sophie Dupont', role: 'Sales Associate', department: 'Sales', gross: 32000, status: 'Review' },
]

export function PayrollPage({ onNotice }: { onNotice: (message: string) => void }) {
  const grossPayroll = payrollEmployees.reduce((total, employee) => total + employee.gross, 0)

  return (
    <div className="page-content payroll-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">October payroll</p>
          <h1>Payroll</h1>
          <p className="muted">Review compensation, approval status, and upcoming pay runs.</p>
        </div>
        <button className="primary-button" onClick={() => onNotice('Payroll export is ready to connect to the API.')}>
          <Download size={16} /> Export payroll <ArrowUpRight size={15} />
        </button>
      </section>

      <section className="payroll-summary" aria-label="Payroll summary">
        <article className="payroll-card">
          <span className="payroll-card-icon"><CircleDollarSign size={18} /></span>
          <div><span>Gross payroll</span><strong>{formatCurrency(grossPayroll)}</strong></div>
        </article>
        <article className="payroll-card">
          <span className="payroll-card-icon"><Users size={18} /></span>
          <div><span>Employees</span><strong>{payrollEmployees.length}</strong></div>
        </article>
        <article className="payroll-card payroll-card--period">
          <span className="payroll-card-icon"><CalendarDays size={18} /></span>
          <div><span>Current period</span><strong>Oct 1–31</strong></div>
        </article>
      </section>

      <section className="payroll-run">
        <div className="payroll-run-heading">
          <div><h2>October pay run</h2><p>Scheduled for October 31, 2026</p></div>
          <span className="payroll-status">Draft review</span>
        </div>
        <div className="payroll-list">
          {payrollEmployees.map((employee) => (
            <div className="payroll-row" key={employee.id}>
              <span className="payroll-avatar">{employee.name.split(' ').map((part) => part[0]).join('')}</span>
              <div className="payroll-person"><strong>{employee.name}</strong><span>{employee.role} · {employee.department}</span></div>
              <strong className="payroll-gross">{formatCurrency(employee.gross)}</strong>
              <span className={`payroll-row-status payroll-row-status--${employee.status.toLowerCase()}`}>{employee.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
