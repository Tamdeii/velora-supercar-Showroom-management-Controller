import { useMemo, useState } from 'react'
import { ArrowUpRight, Search, UserPlus } from 'lucide-react'
import { formatCurrency } from '../shared/utils/format'

type Employee = {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
  jobTitle: string
  salaryCents: number
  active: boolean
}

const employees: Employee[] = [
  { id: 'e1', firstName: 'Maria', lastName: 'Garcia', email: 'maria@velora.com', department: 'Sales', jobTitle: 'Senior Sales Associate', salaryCents: 4500000, active: true },
  { id: 'e2', firstName: 'James', lastName: 'Chen', email: 'james@velora.com', department: 'Service', jobTitle: 'Service Manager', salaryCents: 6500000, active: true },
  { id: 'e3', firstName: 'Sophie', lastName: 'Dupont', email: 'sophie@velora.com', department: 'Sales', jobTitle: 'Sales Associate', salaryCents: 3200000, active: true },
]

export function EmployeesPage({ onNotice }: { onNotice: (message: string) => void }) {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('all')

  const filtered = useMemo(() =>
    employees.filter(
      (e) =>
        e.firstName.toLowerCase().includes(search.toLowerCase()) ||
        e.lastName.toLowerCase().includes(search.toLowerCase()) ||
        e.department.toLowerCase().includes(dept.toLowerCase())
    ),
    [search, dept]
  )

  return (
    <div className="page-content people-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Team management</p>
          <h1>People</h1>
          <p className="muted">Manage showroom staff, roles, and department coverage.</p>
        </div>
        <button className="primary-button" onClick={() => onNotice('Employee creation is ready to connect to the API.')}>
          <UserPlus size={16} /> Add employee <ArrowUpRight size={15} />
        </button>
      </section>

      <section className="people-toolbar" aria-label="Employee filters">
        <div className="control-group">
          <label className="control-label">Search</label>
          <div className="control-input-wrapper">
            <Search size={14} className="control-icon" />
            <input
              className="control-input"
              type="search"
              placeholder="Search name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search employees"
            />
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Department</label>
          <select className="control-select" value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="all">All departments</option>
            <option value="Sales">Sales</option>
            <option value="Service">Service</option>
          </select>
        </div>
        <div className="people-count"><strong>{filtered.length}</strong><span>employees</span></div>
      </section>

      <section className="people-table-wrap" aria-label="Employee directory">
        <table className="table people-table">
          <thead>
            <tr><th>Employee</th><th>Department</th><th>Role</th><th>Salary</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filtered.map((employee) => (
              <tr key={employee.id} className="table-row">
                <td>
                  <div className="person-cell">
                    <span className="person-avatar">{employee.firstName[0]}{employee.lastName[0]}</span>
                    <div><strong>{employee.firstName} {employee.lastName}</strong><span>{employee.email}</span></div>
                  </div>
                </td>
                <td>{employee.department}</td>
                <td>{employee.jobTitle}</td>
                <td><strong>{formatCurrency(employee.salaryCents / 100)}</strong></td>
                <td><span className={`badge ${employee.active ? 'badge--income' : 'badge--expense'}`}>{employee.active ? 'Active' : 'Inactive'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}